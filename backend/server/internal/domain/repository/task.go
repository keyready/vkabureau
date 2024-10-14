package repository

import (
	"context"
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"net/http"
	"server/internal/domain/types/dto"
	"server/internal/domain/types/enum"
	"server/internal/domain/types/models"
	"server/internal/domain/types/request"
	"server/internal/domain/types/response"
	"time"
)

type TaskRepository interface {
	AddTask(addTask request.AddTask) (httpCode int, err error)
	UpdateTask(updateTask request.UpdateTask) (httpCode int, err error)
	FetchTaskForProjects(projectIdString string) (httpCode int, err error, tasks []response.TaskData)
	JoinToTask(joinToTask request.JoinToTask) (httpCode int, err error)
}

type TaskRepositoryImpl struct {
	mongoDB *mongo.Database
}

func NewTaskRepository(mongoDB *mongo.Database) TaskRepository {
	return TaskRepositoryImpl{mongoDB: mongoDB}
}

func (t TaskRepositoryImpl) JoinToTask(joinToTask request.JoinToTask) (httpCode int, err error) {
	contributorId, _ := primitive.ObjectIDFromHex(joinToTask.UserID)
	taskId, _ := primitive.ObjectIDFromHex(joinToTask.TaskID)

	_, mongoErr := t.mongoDB.Collection("tasks").
		UpdateOne(context.Background(),
			bson.M{"_id": taskId},
			bson.M{
				"$addToSet": bson.M{
					"contributors": contributorId,
				},
			},
		)
	if mongoErr != nil {
		return http.StatusInternalServerError, fmt.Errorf("Ошибка присоединения к задаче: %s", mongoErr.Error())
	}

	var project models.Project
	mongoErr = t.mongoDB.Collection("projects").
		FindOne(
			context.Background(),
			bson.M{
				"tasks": bson.M{
					"$elemMatch": bson.M{
						"$eq": taskId,
					},
				},
			},
		).Decode(&project)

	if mongoErr != nil {
		return http.StatusInternalServerError, fmt.Errorf("Не нашел проект, которому принадлежит интерсующая тебя задача: %s", mongoErr.Error())
	}

	_, mongoErr = t.mongoDB.Collection("forums").
		UpdateOne(
			context.Background(),
			bson.M{"entityId": project.ID},
			bson.M{
				"$addToSet": bson.M{
					"membersId": contributorId,
				},
			},
		)
	if mongoErr != nil {
		return http.StatusInternalServerError, fmt.Errorf("Ошибка добавления в общий чат проекта %s", mongoErr.Error())
	}

	_, mongoErr = t.mongoDB.Collection("forums"). //Добавил в чат к задаче
							UpdateOne(
			context.Background(),
			bson.M{"entityId": taskId},
			bson.M{
				"$addToSet": bson.M{
					"membersId": contributorId,
				},
			},
		)
	if mongoErr != nil {
		return http.StatusInternalServerError, fmt.Errorf("Ошибка присоединения к чату таска: %s", mongoErr.Error())
	}
	return http.StatusOK, nil
}

func (t TaskRepositoryImpl) FetchTaskForProjects(projectIdString string) (httpCode int, err error, tasks []response.TaskData) {
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
		for _, taskId := range currentProject.Tasks {
			var task response.TaskData

			pipeline := mongo.Pipeline{
				{
					{"$match", bson.D{{"_id", taskId}}},
				},
				{
					{"$lookup", bson.D{
						{"from", "users"},
						{"localField", "contributors"},
						{"foreignField", "_id"},
						{"as", "contributors"}},
					},
				},
			}

			cursor, cursorErr := t.mongoDB.Collection("tasks").
				Aggregate(context.Background(), pipeline)
			if cursorErr != nil {
				return http.StatusInternalServerError, fmt.Errorf("Ошибка извлечения одного таска: %s", cursorErr.Error()), tasks
			}
			defer cursor.Close(context.Background())

			if cursor.Next(context.Background()) {
				errDecode := cursor.Decode(&task)
				if errDecode != nil {
					return http.StatusInternalServerError, fmt.Errorf("Ошибка декода таска %s", errDecode), tasks
				}
				tasks = append(tasks, task)
			}
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
		InsertOne(context.Background(), &models.Task{
			Title:        addTask.Title,
			Description:  addTask.Description,
			Priority:     enum.Priority(addTask.Priority),
			Contributors: []primitive.ObjectID{},
			Status:       enum.CREATED,
			CreatedAt:    time.Now(),
			Deadline:     deadlineTime,
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

	var project models.Project
	mongoErr = t.mongoDB.Collection("projects").
		FindOne(context.Background(), bson.M{"_id": projectId}).
		Decode(&project)

	_, mongoErr = t.mongoDB.Collection("forums").
		InsertOne(context.Background(), &models.Forum{
			EntityID:  newTask.InsertedID.(primitive.ObjectID),
			Title:     fmt.Sprintf("Форум для задачи «%s»", addTask.Title),
			MembersID: []primitive.ObjectID{project.Author},
			Messages:  []dto.MessageData{},
		})

	if mongoErr != nil {
		return http.StatusInternalServerError, fmt.Errorf("Ошибка создания форума: %s", mongoErr.Error())
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
