package repository

import (
	"context"
	"fmt"
	"net/http"
	"server/internal/domain/types/dto"
	"server/internal/domain/types/enum"
	"server/internal/domain/types/models"
	"server/internal/domain/types/request"
	"server/internal/domain/types/response"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type ProjectRepository interface {
	CreateProject(createProject request.CreateProject, documentNames []string) (httpCode int, err error)
	DeleteProject(ctx context.Context, projectIDString string) (httpCode int, err error)
	ChangeProject(ctx context.Context, changeProject request.UpdateProject) (httpCode int, err error)
	FetchProject(projectId primitive.ObjectID) (httpCode int, err error, project response.ProjectData)
	FetchAllProjects() (httpCode int, err error, projects []response.ProjectData)
	OwnProjects(login string) (httpCode int, err error, projects []response.ProjectData)
	LikeProject(likeProject request.LikeProject) (httpCode int, err error)
}

type ProjectRepositoryImpl struct {
	mongoDB *mongo.Database
}

func NewProjectRepositoryImpl(mongoDB *mongo.Database) ProjectRepository {
	return &ProjectRepositoryImpl{mongoDB: mongoDB}
}

func (p ProjectRepositoryImpl) ChangeProject(ctx context.Context, changeProject request.UpdateProject) (httpCode int, err error) {
	var author models.User
	err = p.mongoDB.
		Collection("users").
		FindOne(context.Background(), bson.D{bson.E{Key: "login", Value: changeProject.Author}}).
		Decode(&author)
	if err != nil {
		return http.StatusNotFound, fmt.Errorf("Автор %s не найден", changeProject.Author)
	}
	projectID, _ := primitive.ObjectIDFromHex(changeProject.ProjectID)

	_, err = p.mongoDB.Collection("projects").
		UpdateOne(
			context.Background(),
			bson.M{"_id": projectID, "author": author.ID},
			bson.M{"$set": bson.M{
				"title":       changeProject.Title,
				"description": changeProject.Description,
				"updatedAt":   time.Now(),
			}},
		)
	if err != nil {
		return http.StatusBadRequest,
			fmt.Errorf(
				"Ошибка изменения статуса проекта %s \n Вы либо не являетесь креатором, либо такого проекта не существует",
				changeProject.ProjectID,
			)
	}

	return http.StatusOK, nil
}

func (p ProjectRepositoryImpl) DeleteProject(ctx context.Context, projectIDString string) (httpCode int, err error) {
	projectID, _ := primitive.ObjectIDFromHex(projectIDString)

	filter := bson.M{"_id": projectID}

	_, err = p.mongoDB.Collection("projects").
		DeleteOne(
			ctx,
			filter,
			nil,
		)
	if err != nil {
		return http.StatusInternalServerError, err
	}

	return http.StatusOK, nil
}

func (p ProjectRepositoryImpl) LikeProject(likeProject request.LikeProject) (httpCode int, err error) {
	var project models.Project

	followerId, _ := primitive.ObjectIDFromHex(likeProject.FollowerId)
	projectId, _ := primitive.ObjectIDFromHex(likeProject.ProjectId)

	findProject := bson.M{"_id": projectId}

	mongoErr := p.mongoDB.Collection("projects").
		FindOne(context.TODO(), findProject).
		Decode(&project)
	if mongoErr != nil {
		return http.StatusNotFound, fmt.Errorf("Не удалось извлечь объект лайков: %v", mongoErr)
	}

	followerExist := false
	for _, id := range project.Likes.FollowersId {
		if id == followerId {
			followerExist = true
			break
		}
	}

	var update bson.M
	if followerExist {
		update = bson.M{
			"$pull": bson.M{"likes.followersId": followerId},
			"$inc":  bson.M{"likes.value": -1},
		}
	} else {
		update = bson.M{
			"$addToSet": bson.M{"likes.followersId": followerId},
			"$inc":      bson.M{"likes.value": 1},
		}
	}

	_, mongoErr = p.mongoDB.Collection("projects").
		UpdateOne(context.Background(), findProject, update)
	if mongoErr != nil {
		return http.StatusInternalServerError, fmt.Errorf("Ошибка лайка/дизлайка: %s", mongoErr.Error())
	}

	return http.StatusOK, nil
}

func (p ProjectRepositoryImpl) OwnProjects(login string) (httpCode int, err error, projects []response.ProjectData) {
	var author models.User
	p.mongoDB.
		Collection("users").
		FindOne(context.Background(), bson.D{bson.E{Key: "login", Value: login}}).
		Decode(&author)

	pipeline := mongo.Pipeline{
		{
			{"$match", bson.D{bson.E{Key: "author", Value: author.ID}}},
		},
		{
			{"$lookup", bson.D{
				{"from", "users"},
				{"localField", "author"},
				{"foreignField", "_id"},
				{"as", "author"},
			}},
		},
		{
			{"$lookup", bson.D{
				{"from", "tasks"},
				{"localField", "tasks"},
				{"foreignField", "_id"},
				{"as", "tasks"},
			}},
		},
		{
			{"$unwind", "$author"},
		},
	}

	cursor, _ := p.mongoDB.
		Collection("projects").
		Aggregate(context.Background(), pipeline)
	defer cursor.Close(context.Background())

	cursorErr := cursor.All(context.Background(), &projects)
	if cursorErr != nil {
		return http.StatusInternalServerError, cursorErr, projects
	}

	return http.StatusOK, nil, projects
}

func (p ProjectRepositoryImpl) FetchAllProjects() (httpCode int, err error, projects []response.ProjectData) {

	pipeline := mongo.Pipeline{
		{
			{"$match", bson.D{}},
		},
		{
			{"$lookup", bson.D{
				{"from", "users"},
				{"localField", "author"},
				{"foreignField", "_id"},
				{"as", "author"},
			}},
		},
		{
			{"$lookup", bson.D{
				{"from", "tasks"},
				{"localField", "tasks"},
				{"foreignField", "_id"},
				{"as", "tasks"},
			}},
		},
		{
			{"$unwind", "$author"},
		},
	}
	cursor, _ := p.mongoDB.
		Collection("projects").
		Aggregate(context.Background(), pipeline)

	defer cursor.Close(context.Background())

	cursorErr := cursor.All(context.Background(), &projects)
	if cursorErr != nil {
		return http.StatusInternalServerError, cursorErr, projects
	}

	return http.StatusOK, nil, projects
}

func (p ProjectRepositoryImpl) FetchProject(projectId primitive.ObjectID) (httpCode int, err error, project response.ProjectData) {

	var projectExist models.Project
	mongoErr := p.mongoDB.Collection("projects").
		FindOne(
			context.Background(),
			bson.M{"_id": projectId},
		).Decode(&projectExist)
	if mongoErr != nil {
		return http.StatusNotFound, fmt.Errorf("Проект не сущесвует"), project
	}

	pipeline := mongo.Pipeline{
		{
			{"$match", bson.D{{"_id", projectId}}},
		},
		{
			{"$lookup", bson.D{
				{"from", "users"},
				{"localField", "author"},
				{"foreignField", "_id"},
				{"as", "author"}},
			},
		},
		{
			{"$lookup", bson.D{
				{"from", "tasks"},
				{"localField", "tasks"},
				{"foreignField", "_id"},
				{"as", "tasks"},
			}},
		},
		{
			{"$unwind", "$author"},
		},
	}

	cursor, _ := p.mongoDB.Collection("projects").
		Aggregate(context.Background(), pipeline)

	if cursor.Next(context.Background()) {
		errDecode := cursor.Decode(&project)
		if errDecode != nil {
			return http.StatusInternalServerError, nil, project
		}
	}
	return http.StatusOK, nil, project
}

func (p ProjectRepositoryImpl) CreateProject(createProject request.CreateProject, documentNames []string) (httpCode int, err error) {
	var author models.User
	err = p.mongoDB.
		Collection("users").
		FindOne(context.Background(), bson.D{bson.E{Key: "login", Value: createProject.Author}}).
		Decode(&author)
	if err != nil {
		return http.StatusNotFound, fmt.Errorf("Автор %s не найден", createProject.Author)
	}

	newProject, err := p.mongoDB.
		Collection("projects").
		InsertOne(context.Background(), &models.Project{
			Title:       createProject.Title,
			Description: createProject.Description,
			Documents:   documentNames,
			Tasks:       []primitive.ObjectID{},
			Likes: dto.LikeData{
				Value:       0,
				FollowersId: []primitive.ObjectID{},
			},
			Status:    enum.CREATED,
			Author:    author.ID,
			CreatedAt: time.Now(),
		})
	if err != nil {
		return http.StatusInternalServerError, fmt.Errorf("Ошибка создания проекта %s", createProject.Title)
	}

	_, mongoErr := p.mongoDB.Collection("forums").
		InsertOne(context.Background(), &models.Forum{
			EntityID:  newProject.InsertedID.(primitive.ObjectID),
			Title:     fmt.Sprintf("Форум для проекта «%s»", createProject.Title),
			MembersID: []primitive.ObjectID{author.ID},
			Messages:  []dto.MessageData{},
		})
	if mongoErr != nil {
		return http.StatusInternalServerError, fmt.Errorf("Ошибка создания форума %s", mongoErr)
	}

	return http.StatusCreated, nil
}
