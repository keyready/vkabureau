package repository

import (
	"context"
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"net/http"
	"server/internal/domain/types/dto"
	"server/internal/domain/types/models"
	"server/internal/domain/types/request"
)

type ForumRepository interface {
	SendMessage(sendMessage request.SendMessage) (httpCode int, err error)
	FetchAllMessages(forumIdString string) (httpCode int, err error, messages []dto.MessageData)
	MyForums(me string) (httpCode int, err error, forums []models.Forum)
}

type ForumRepositoryImpl struct {
	mongoDB *mongo.Database
}

func NewForum(mongoDB *mongo.Database) *ForumRepositoryImpl {
	return &ForumRepositoryImpl{mongoDB: mongoDB}
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
					"$in": []primitive.ObjectID{member.ID},
				},
			},
		)
	defer cursor.Close(context.Background())
	if mongoErr != nil {
		return http.StatusInternalServerError, fmt.Errorf("Не извлек форумы, в которых %s участник: %s", me, mongoErr), forums
	}

	if cursor.Next(context.Background()) {
		var forum models.Forum
		cursorErr := cursor.Decode(&forum)
		if cursorErr != nil {
			return http.StatusInternalServerError, fmt.Errorf("Ошибка при декоде одного форума %s", cursorErr), forums
		}
		forums = append(forums, forum)
	}

	return http.StatusOK, nil, forums
}

func (f ForumRepositoryImpl) SendMessage(sendMessage request.SendMessage) (httpCode int, err error) {
	_, mongoErr := f.mongoDB.Collection("forums").
		UpdateOne(
			context.TODO(),
			bson.M{"_id": sendMessage.ForumId},
			bson.M{
				"$push": bson.M{
					"messages": bson.M{
						"author":          sendMessage.Message.Author,
						"body":            sendMessage.Message.Body,
						"attachmentsName": sendMessage.Message.AttachmentsName,
						"createdAt":       sendMessage.Message.CreatedAt,
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
