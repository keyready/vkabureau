package repository

import (
	"context"
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"net/http"
	"server/internal/domain/types/enum"
	"server/internal/domain/types/models"
	"server/internal/domain/types/request"
	"server/internal/domain/types/response"
)

type ProjectRepository interface {
	CreateProject(createProject request.CreateProject) (httpCode int, err error)
	UpdateProject(updateProject request.UpdateProject) (httpCode int, err error)
	AddTask(addTask request.AddTask) (httpCode int, err error)
	UpdateTask(updateTask request.UpdateTask) (httpCode int, err error)
	FetchProject(projectId primitive.ObjectID) (httpCode int, err error, project *response.ProjectData)
	FetchAllProjects() (httpCode int, err error, projects []*response.ProjectData)
}

type ProjectRepositoryImpl struct {
	mongoDB *mongo.Database
}

func NewProjectRepositoryImpl(mongoDB *mongo.Database) ProjectRepository {
	return &ProjectRepositoryImpl{mongoDB: mongoDB}
}

func (p ProjectRepositoryImpl) FetchAllProjects() (httpCode int, err error, projects []*response.ProjectData) {
	cursor, _ := p.mongoDB.
		Collection("projects").
		Find(context.Background(), bson.D{})
	mongoErr := cursor.All(context.Background(), &projects)

	if mongoErr != nil {
		return http.StatusNotFound, fmt.Errorf("Проекты не найдены"), projects
	}

	return http.StatusOK, nil, projects
}

func (p ProjectRepositoryImpl) FetchProject(projectId primitive.ObjectID) (httpCode int, err error, project *response.ProjectData) {
	mongoErr := p.mongoDB.Collection("projects").
		FindOne(context.Background(), bson.D{bson.E{Key: "_id", Value: projectId}}).
		Decode(&project)
	if mongoErr != nil {
		return http.StatusNotFound, fmt.Errorf("Ошибка поиска проекта: %s", mongoErr), nil
	}

	return http.StatusOK, nil, project
}

func (p ProjectRepositoryImpl) UpdateTask(updateTask request.UpdateTask) (httpCode int, err error) {
	_, mongoErr := p.mongoDB.Collection("projects").
		UpdateOne(
			context.Background(),
			bson.M{"_id": primitive.ObjectIDFromHex(updateTask.ProjectID), "tasks.title": updateTask.TaskTitle},
			bson.M{"$set": bson.M{
				"tasks.$.status":    enum.Status(updateTask.NewStatus),
				"tasks.$.priority":  enum.Priority(updateTask.NewPriority),
				"tasks.$.updatedAt": updateTask.UpdatedAt,
			}},
		)
	if mongoErr != nil {
		return http.StatusInternalServerError, fmt.Errorf("Ошибка изменения таска: %s", mongoErr)
	}

	return http.StatusOK, nil
}

func (p ProjectRepositoryImpl) AddTask(addTask request.AddTask) (httpCode int, err error) {
	_, mongoErr := p.mongoDB.Collection("projects").
		UpdateOne(
			context.Background(),
			bson.M{"_id": primitive.ObjectIDFromHex(addTask.ProjectID)},
			bson.M{"$push": bson.M{
				"tasks": &models.Task{
					Title:       addTask.Title,
					Description: addTask.Description,
					Priority:    enum.Priority(addTask.Priority),
					Status:      enum.CREATED,
					CreatedAt:   addTask.CreatedAt,
				},
			}},
		)
	if mongoErr != nil {
		return http.StatusInternalServerError, fmt.Errorf("Ошибка добавления таска %s", mongoErr)
	}

	return http.StatusOK, nil
}

func (p ProjectRepositoryImpl) UpdateProject(updateProject request.UpdateProject) (httpCode int, err error) {
	var author models.User
	err = p.mongoDB.
		Collection("users").
		FindOne(context.Background(), bson.D{bson.E{Key: "author", Value: updateProject.Author}}).
		Decode(&author)
	if err != nil {
		return http.StatusNotFound, fmt.Errorf("Автор %s не найден", updateProject.Author)
	}

	_, err = p.mongoDB.Collection("projects").
		UpdateOne(
			context.Background(),
			bson.M{"_id": primitive.ObjectIDFromHex(updateProject.ProjectID), "author": author.ID},
			bson.M{"$set": bson.M{
				"status":    enum.Status(updateProject.NewStatus),
				"updatedAt": updateProject.UpdatedAt,
			}},
		)
	if err != nil {
		return http.StatusBadRequest,
			fmt.Errorf(
				"Ошибка изменения статуса проекта %s \n Вы либо не являетесь креатором, либо такого проекта не существует",
				updateProject.ProjectID,
			)
	}

	return http.StatusOK, nil
}

func (p ProjectRepositoryImpl) CreateProject(createProject request.CreateProject) (httpCode int, err error) {
	var author models.User
	err = p.mongoDB.
		Collection("users").
		FindOne(context.Background(), bson.D{bson.E{Key: "login", Value: createProject.Author}}).
		Decode(&author)
	if err != nil {
		return http.StatusNotFound, fmt.Errorf("Автор %s не найден", createProject.Author)
	}

	_, err = p.mongoDB.
		Collection("projects").
		InsertOne(context.Background(), &models.Project{
			Title:       createProject.Title,
			Description: createProject.Description,
			Status:      enum.CREATED,
			Author:      author.ID,
			CreatedAt:   createProject.CreatedAt,
			StartedAt:   createProject.StartedAt,
			FinishedAt:  createProject.FinishedAt,
		})
	if err != nil {
		return http.StatusInternalServerError, fmt.Errorf("Ошибка создания проекта %s", createProject.Title)
	}

	return http.StatusCreated, nil
}
