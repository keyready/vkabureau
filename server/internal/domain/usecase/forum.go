package usecase

import (
	"server/internal/domain/repository"
	"server/internal/domain/types/dto"
	"server/internal/domain/types/models"
	"server/internal/domain/types/request"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type ForumUsecase interface {
	SendMessage(sendMessage request.SendMessage, attachNames []string) (httpCode int, err error)
	FetchAllMessages(forumIdString string) (httpCode int, err error, messages []dto.MessageData)
	MyForums(me string) (httpCode int, err error, forums []models.Forum)
	FetchOneForum(forumIdString string) (httpCode int, err error, forum models.Forum)
}

type ForumUsecaseImpl struct {
	forumRepo repository.ForumRepository
}

func NewForumUsecase(forumRepo repository.ForumRepository) ForumUsecase {
	return &ForumUsecaseImpl{forumRepo: forumRepo}
}

func (f ForumUsecaseImpl) FetchOneForum(forumIdString string) (httpCode int, err error, forum models.Forum) {
	forumId, _ := primitive.ObjectIDFromHex(forumIdString)
	httpCode, err, forum = f.forumRepo.FetchOneForum(forumId)
	if err != nil {
		return httpCode, err, forum
	}
	return httpCode, nil, forum
}

func (f ForumUsecaseImpl) MyForums(me string) (httpCode int, err error, forums []models.Forum) {
	httpCode, err, forums = f.forumRepo.MyForums(me)
	if err != nil {
		return httpCode, err, forums
	}
	return httpCode, nil, forums
}

func (f ForumUsecaseImpl) FetchAllMessages(forumIdString string) (httpCode int, err error, messages []dto.MessageData) {
	httpCode, err, messages = f.forumRepo.FetchAllMessages(forumIdString)
	if err != nil {
		return httpCode, err, messages
	}
	return httpCode, nil, messages
}

func (f ForumUsecaseImpl) SendMessage(sendMessage request.SendMessage, attachNames []string) (httpCode int, err error) {
	httpCode, err = f.forumRepo.SendMessage(sendMessage, attachNames)
	if err != nil {
		return httpCode, err
	}
	return httpCode, nil
}
