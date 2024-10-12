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
	ctx     context.Context
}

type UserRepository interface {
	SignUp(signUp request.SignUp) (httpCode int, err error)
	Login(login request.Login) (httpCode int, err error, userExist *models.User)
	Profile(login string) (httpCode int, err error, profile response.ProfileData)
	UserData(login string) (httpCode int, err error, userData response.UserData)
	ChangeProfile(changeProfile request.ChangeProfile) (httpCode int, err error, updateProfile request.ChangeProfile)
}

func NewUserRepositoryImpl(mongoDB *mongo.Database) UserRepository {
	return &UserRepositoryImpl{mongoDB: mongoDB}
}

func (u *UserRepositoryImpl) ChangeProfile(changeProfile request.ChangeProfile) (httpCode int, err error, updateProfile request.ChangeProfile) {
	_, err = u.mongoDB.
		Collection("users").
		UpdateOne(context.Background(),
			bson.M{"login": changeProfile.Login},
			bson.M{"$set": bson.M{
				"login":      changeProfile.Login,
				"firstname":  changeProfile.Firstname,
				"lastname":   changeProfile.Lastname,
				"middlename": changeProfile.Middlename,
				"avatar":     changeProfile.Avatar,
				"rank":       changeProfile.Rank,
				"division":   changeProfile.Division,
			}},
		)
	if err != nil {
		return http.StatusInternalServerError, fmt.Errorf("Не удалось изменить профиль %s", changeProfile.Login), changeProfile
	}

	return http.StatusOK, nil, changeProfile
}

func (u *UserRepositoryImpl) Profile(login string) (httpCode int, err error, profile response.ProfileData) {
	err = u.mongoDB.
		Collection("users").
		FindOne(u.ctx, bson.M{"login": login}).Decode(&profile)
	if err != nil {
		return http.StatusNotFound, fmt.Errorf("Невозможно просмотреть профиль %s", login), profile
	}

	return http.StatusOK, nil, profile
}

func (u *UserRepositoryImpl) UserData(login string) (httpCode int, err error, userData response.UserData) {
	err = u.mongoDB.
		Collection("users").
		FindOne(u.ctx, bson.M{"login": login}).
		Decode(&userData)
	if err != nil {
		return http.StatusNotFound, fmt.Errorf("Данные юзера %s не найдены", login), userData
	}

	return http.StatusOK, nil, userData
}

func (u *UserRepositoryImpl) SignUp(signUp request.SignUp) (httpCode int, err error) {
	var userExist models.User
	err = u.mongoDB.
		Collection("users").
		FindOne(u.ctx, bson.D{bson.E{Key: "login", Value: signUp.Login}}).
		Decode(&userExist)
	if err == nil {
		return http.StatusBadRequest, fmt.Errorf("Пользователь %s уже зарегистрирован", signUp.Login)
	}

	_, err = u.mongoDB.
		Collection("users").
		InsertOne(u.ctx, signUp)
	if err != nil {
		return http.StatusInternalServerError, fmt.Errorf("Ошибка при записи в БД")
	}

	return http.StatusCreated, nil
}

func (u *UserRepositoryImpl) Login(login request.Login) (httpCode int, err error, userExist *models.User) {
	err = u.mongoDB.
		Collection("users").
		FindOne(u.ctx, bson.D{bson.E{Key: "login", Value: login.UserLogin}}).
		Decode(&userExist)
	if err != nil {
		return http.StatusBadRequest, fmt.Errorf("Пользователь %s не зарегистрирован", login.UserLogin), nil
	}

	return http.StatusOK, nil, userExist
}
