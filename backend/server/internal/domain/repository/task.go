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
	"time"
)

type TaskRepository interface {
	AddTask(addTask request.AddTask) (httpCode int, err error)
	UpdateTask(updateTask request.UpdateTask) (httpCode int, err error)
	FetchTaskForProjects(projectIdString string) (httpCode int, err error, tasks []models.Task)
}

type TaskRepositoryImpl struct {
	mongoDB *mongo.Database
}

func NewTaskRepository(mongoDB *mongo.Database) TaskRepository {
	return TaskRepositoryImpl{mongoDB: mongoDB}
}

func (t TaskRepositoryImpl) FetchTaskForProjects(projectIdString string) (httpCode int, err error, tasks []models.Task) {
	projectId, _ := primitive.ObjectIDFromHex(projectIdString)

	var currentProject models.Project
	mongoErr := t.mongoDB.Collection("projects").
		FindOne(context.Background(),
			bson.M{"_id": projectId},
		).Decode(&currentProject)

	if mongoErr != nil {
		return http.StatusNotFound, fmt.Errorf("Проект %s не найден", projectIdString), tasks
	}

	if len(currentProject.Tasks) > 0 {
		cursor, cursorErr := t.mongoDB.Collection("tasks").
			Find(
				context.Background(),
				bson.M{
					"_id": bson.M{
						"$in": currentProject.Tasks,
					},
				},
			)
		if cursorErr != nil {
			return http.StatusInternalServerError, fmt.Errorf("Не удалось извлечь следующие таски: %s", currentProject.Tasks), tasks
		}
		defer cursor.Close(context.Background())

		for cursor.Next(context.Background()) {
			var task models.Task
			decodeErr := cursor.Decode(&task)
			if decodeErr != nil {
				return http.StatusInternalServerError, fmt.Errorf("Не удалось декодировать таск %s", task.ID), tasks
			}
			tasks = append(tasks, task)
		}
	} else {
		return http.StatusOK, nil, tasks
	}

	return http.StatusOK, nil, tasks
}

func (t TaskRepositoryImpl) AddTask(addTask request.AddTask) (httpCode int, err error) {
	projectId, _ := primitive.ObjectIDFromHex(addTask.ProjectID)
	deadlineTime, _ := time.Parse(time.RFC3339, addTask.Deadline)

	newTask, mongoErr := t.mongoDB.Collection("tasks").
		InsertOne(context.Background(), models.Task{
			Title:       addTask.Title,
			Description: addTask.Description,
			Priority:    enum.Priority(addTask.Priority),
			Status:      enum.CREATED,
			CreatedAt:   time.Now(),
			Deadline:    deadlineTime,
		})
	if mongoErr != nil {
		return http.StatusInternalServerError, fmt.Errorf("Ошибка добавления таска %s", mongoErr)
	}

	_, mongoErr = t.mongoDB.Collection("projects").
		UpdateOne(
			context.Background(),
			bson.M{"_id": projectId},
			bson.M{
				"$addToSet": bson.M{
					"tasks": newTask.InsertedID,
				},
			},
		)

	if mongoErr != nil {
		return http.StatusNotFound, fmt.Errorf("Ошибка добавление таска в проект %s", mongoErr)
	}

	return http.StatusOK, nil
}

func (t TaskRepositoryImpl) UpdateTask(updateTask request.UpdateTask) (httpCode int, err error) {
	taskId, _ := primitive.ObjectIDFromHex(updateTask.TaskID)

	_, mongoErr := t.mongoDB.Collection("tasks").
		UpdateOne(context.Background(),
			bson.M{"_id": taskId},
			bson.M{
				"$set": bson.M{
					"status":    enum.Status(updateTask.NewStatus),
					"priority":  enum.Priority(updateTask.NewPriority),
					"updatedAt": time.Now(),
				},
			},
		)
	if mongoErr != nil {
		return http.StatusInternalServerError, fmt.Errorf("Ошибка изменения таска: %s", mongoErr)
	}

	return http.StatusOK, nil
}
