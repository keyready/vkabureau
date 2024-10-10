package repository

import (
	"context"
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"net/http"
	"server/internal/domain/types/models"
	"server/internal/domain/types/request"
	"server/internal/domain/types/response"
)

type UserRepositoryImpl struct {
	mongoDB *mongo.Database
}

type UserRepository interface {
	SignUp(ctx context.Context, signUp request.SignUp) (httpCode int, err error)
	Login(ctx context.Context, login request.Login) (httpCode int, err error, userExist *models.User)
	Profile(ctx context.Context, login string) (httpCode int, err error, profile *response.ProfileData)
	UserData(ctx context.Context, login string) (httpCode int, err error, userData *response.UserData)
}

func NewUserRepositoryImpl(mongoDB *mongo.Database) UserRepository {
	return &UserRepositoryImpl{mongoDB: mongoDB}
}

func (u *UserRepositoryImpl) Profile(ctx context.Context, login string) (httpCode int, err error, profile *response.ProfileData) {
	err = u.mongoDB.
		Collection("users").
		FindOne(ctx, bson.M{"login": login}).Decode(&profile)
	if err != nil {
		return http.StatusNotFound, fmt.Errorf("Невозможно просмотреть профиль %s", login), nil
	}

	return http.StatusOK, nil, profile
}

func (u *UserRepositoryImpl) UserData(ctx context.Context, login string) (httpCode int, err error, userData *response.UserData) {
	err = u.mongoDB.
		Collection("users").
		FindOne(ctx, bson.M{"login": login}).
		Decode(&userData)
	if err != nil {
		return http.StatusNotFound, fmt.Errorf("Данные юзера %s не найдены", login), nil
	}

	return http.StatusOK, nil, nil
}

func (u *UserRepositoryImpl) SignUp(ctx context.Context, signUp request.SignUp) (httpCode int, err error) {
	var userExist models.User
	err = u.mongoDB.
		Collection("users").
		FindOne(ctx, bson.D{bson.E{Key: "login", Value: signUp.Login}}).
		Decode(&userExist)
	if err == nil {
		return http.StatusBadRequest, fmt.Errorf("Пользователь %s уже зарегистрирован", signUp.Login)
	}

	_, err = u.mongoDB.
		Collection("users").
		InsertOne(ctx, signUp)
	if err != nil {
		return http.StatusInternalServerError, fmt.Errorf("Ошибка при записи в БД")
	}

	return http.StatusCreated, nil
}

func (u *UserRepositoryImpl) Login(ctx context.Context, login request.Login) (httpCode int, err error, userExist *models.User) {
	err = u.mongoDB.
		Collection("users").
		FindOne(ctx, bson.D{bson.E{Key: "login", Value: login.UserLogin}}).
		Decode(&userExist)
	if err != nil {
		return http.StatusBadRequest, fmt.Errorf("Пользователь %s не зарегистрирован", login.UserLogin), nil
	}

	return http.StatusOK, nil, userExist
}
