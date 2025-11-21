package repository

import (
	"context"
	"fmt"
	"net/http"
	"server/internal/domain/types/dto"
	"server/internal/domain/types/models"
	"server/internal/domain/types/request"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type ForumRepository interface {
	SendMessage(sendMessage request.SendMessage, attachNames []string) (httpCode int, err error)
	FetchAllMessages(forumIdString string) (httpCode int, err error, messages []dto.MessageData)
	MyForums(me string) (httpCode int, err error, forums []models.Forum)
	FetchOneForum(forumId primitive.ObjectID) (httpCode int, err error, forum models.Forum)
}

type ForumRepositoryImpl struct {
	mongoDB *mongo.Database
}

func NewForum(mongoDB *mongo.Database) *ForumRepositoryImpl {
	return &ForumRepositoryImpl{mongoDB: mongoDB}
}

func (f ForumRepositoryImpl) FetchOneForum(forumId primitive.ObjectID) (httpCode int, err error, forum models.Forum) {
	mongoErr := f.mongoDB.Collection("forums").
		FindOne(
			context.Background(),
			bson.M{"_id": forumId},
		).Decode(&forum)
	if mongoErr != nil {
		return http.StatusNotFound, fmt.Errorf("Форум %s не найден", forumId), forum
	}
	return http.StatusOK, nil, forum
}

func (f ForumRepositoryImpl) MyForums(me string) (httpCode int, err error, forums []models.Forum) {
	var member models.User
	f.mongoDB.Collection("users").
		FindOne(
			context.Background(),
			bson.M{"login": me}).Decode(&member)

	cursor, mongoErr := f.mongoDB.Collection("forums").
		Find(
			context.Background(),
			bson.M{
				"membersId": bson.M{
					"$elemMatch": bson.M{
						"$eq": member.ID,
					},
				},
			},
		)
	defer cursor.Close(context.TODO())
	if mongoErr != nil {
		return http.StatusInternalServerError, fmt.Errorf("Не извлек форумы, в которых %s участник: %s", me, mongoErr), forums
	}

	if cursorErr := cursor.All(context.TODO(), &forums); cursorErr != nil {
		return http.StatusInternalServerError, fmt.Errorf("Не декодировал все форумы %s", cursorErr.Error()), forums
	}

	return http.StatusOK, nil, forums
}

func (f ForumRepositoryImpl) SendMessage(sendMessage request.SendMessage, attachNames []string) (httpCode int, err error) {
	forumId, _ := primitive.ObjectIDFromHex(sendMessage.ForumId)

	_, mongoErr := f.mongoDB.Collection("forums").
		UpdateOne(
			context.TODO(),
			bson.M{"_id": forumId},
			bson.M{
				"$push": bson.M{
					"messages": bson.M{
						"author":          sendMessage.Author,
						"body":            sendMessage.Body,
						"attachmentsName": attachNames,
						"createdAt":       time.Now(),
					},
				},
			},
		)
	if mongoErr != nil {
		return httpCode, fmt.Errorf("Ошибка отправки сообщения: %s", mongoErr.Error())
	}
	return http.StatusOK, nil
}

func (f ForumRepositoryImpl) FetchAllMessages(forumIdString string) (httpCode int, err error, messages []dto.MessageData) {
	forumId, _ := primitive.ObjectIDFromHex(forumIdString)

	mongoErr := f.mongoDB.Collection("forums").
		FindOne(
			context.Background(),
			bson.M{"_id": forumId},
		).Decode(&messages)

	if mongoErr != nil {
		return http.StatusInternalServerError, fmt.Errorf("Не удалось просмотреть сообщения: %s", mongoErr), messages
	}

	return http.StatusOK, nil, messages
}
