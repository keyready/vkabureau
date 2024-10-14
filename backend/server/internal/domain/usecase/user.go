package usecase

import (
	"context"
	"errors"
	"golang.org/x/crypto/bcrypt"
	"net/http"
	"server/internal/domain/repository"
	"server/internal/domain/types/dto"
	"server/internal/domain/types/models"
	"server/internal/domain/types/request"
	"server/internal/domain/types/response"
	"server/pkg/helpers"
	"time"
)

type UserUsecase interface {
	SignUp(signUp request.SignUp) (httpCode int, err error)
	Login(login request.Login) (httpCode int, err error, loginResponse response.LoginResponse)
	Profile(login string) (httpCode int, err error, profile response.ProfileData)
	UserData(login string) (httpCode int, err error, userData response.UserData)
	ChangeProfile(changeProfile request.ChangeProfile) (httpCode int, err error, updateProfile request.ChangeProfile)
	FetchAllQuestions() (httpCode int, err error, questions []models.RecoveryQuestion)
}

type UserUsecaseImpl struct {
	userRepo repository.UserRepository
	ctx      context.Context
}

func NewUserUsecaseImpl(userRepo repository.UserRepository) UserUsecase {
	return &UserUsecaseImpl{userRepo: userRepo}
}

func (u *UserUsecaseImpl) FetchAllQuestions() (httpCode int, err error, questions []models.RecoveryQuestion) {
	httpCode, _, questions = u.userRepo.FetchAllQuestions()
	return httpCode, nil, questions
}

func (u *UserUsecaseImpl) ChangeProfile(changeProfile request.ChangeProfile) (httpCode int, err error, updateProfile request.ChangeProfile) {
	httpCode, err, updateProfile = u.userRepo.ChangeProfile(changeProfile)
	if err != nil {
		return httpCode, err, updateProfile
	}
	return httpCode, nil, updateProfile
}

func (u *UserUsecaseImpl) UserData(login string) (httpCode int, err error, userData response.UserData) {
	httpCode, err, userData = u.userRepo.UserData(login)
	if err != nil {
		return httpCode, err, userData
	}
	return httpCode, nil, userData
}

func (u *UserUsecaseImpl) Profile(login string) (httpCode int, err error, profile response.ProfileData) {
	httpCode, err, profile = u.userRepo.Profile(login)
	if err != nil {
		return httpCode, err, profile
	}
	return httpCode, nil, profile
}

func (u *UserUsecaseImpl) SignUp(signUp request.SignUp) (httpCode int, err error) {
	hashPassword, _ := bcrypt.GenerateFromPassword([]byte(signUp.Password), bcrypt.DefaultCost)
	signUp.Password = string(hashPassword)

	createdAt, _ := time.Parse(time.RFC3339, time.Now().String())
	signUp.CreatedAt = createdAt

	httpCode, err = u.userRepo.SignUp(signUp)
	if err != nil {
		return httpCode, err
	}

	return httpCode, nil
}

func (u *UserUsecaseImpl) Login(login request.Login) (httpCode int, err error, loginResponse response.LoginResponse) {
	httpCode, err, userExist := u.userRepo.Login(login)
	if err != nil {
		return httpCode, err, loginResponse
	}

	passwdValid := bcrypt.CompareHashAndPassword([]byte(userExist.Password), []byte(login.Password))
	if passwdValid != nil {
		return http.StatusBadRequest, errors.New("Неверный пароль"), loginResponse
	}

	loginResponse.AccessToken = helpers.GenerateAccessToken(dto.JwtPayload{Login: login.UserLogin})

	return httpCode, nil, loginResponse
}
