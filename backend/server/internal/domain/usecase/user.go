package usecase

import (
	"context"
	"errors"
	"golang.org/x/crypto/bcrypt"
	"net/http"
	"server/internal/domain/repository"
	"server/internal/domain/types/dto"
	"server/internal/domain/types/request"
	"server/internal/domain/types/response"
	"server/pkg/helpers"
	"time"
)

type UserUsecase interface {
	SignUp(signUp request.SignUp) (httpCode int, err error)
	Login(login request.Login) (httpCode int, err error, loginResponse *response.LoginResponse)
	Profile(login string) (httpCode int, err error, profile *response.ProfileData)
	UserData(login string) (httpCode int, err error, userData *response.UserData)
}

type UserUsecaseImpl struct {
	userRepo repository.UserRepository
	ctx      context.Context
}

func NewUserUsecaseImpl(userRepo repository.UserRepository) UserUsecase {
	return &UserUsecaseImpl{userRepo: userRepo}
}

func (u *UserUsecaseImpl) UserData(ctx context.Context, login string) (httpCode int, err error, userData *response.UserData) {
	httpCode, err, userData = u.userRepo.UserData(ctx, login)
	if err != nil {
		return httpCode, err, nil
	}
	return httpCode, nil, userData
}

func (u *UserUsecaseImpl) Profile(ctx context.Context, login string) (httpCode int, err error, profile *response.ProfileData) {
	httpCode, err, profile = u.userRepo.Profile(ctx, login)
	if err != nil {
		return httpCode, err, nil
	}
	return httpCode, nil, profile
}

func (u *UserUsecaseImpl) SignUp(ctx context.Context, signUp request.SignUp) (httpCode int, err error) {
	hashPassword, _ := bcrypt.GenerateFromPassword([]byte(signUp.Password), bcrypt.DefaultCost)
	signUp.Password = string(hashPassword)

	createdAt, _ := time.Parse(time.RFC3339, time.Now().String())
	signUp.CreatedAt = createdAt

	httpCode, err = u.userRepo.SignUp(ctx, signUp)
	if err != nil {
		return httpCode, err
	}

	return httpCode, nil
}

func (u *UserUsecaseImpl) Login(ctx context.Context, login request.Login) (httpCode int, err error, loginResponse *response.LoginResponse) {
	httpCode, err, userExist := u.userRepo.Login(ctx, login)
	if err != nil {
		return httpCode, err, nil
	}

	passwdValid := bcrypt.CompareHashAndPassword([]byte(userExist.Password), []byte(login.Password))
	if passwdValid != nil {
		return http.StatusBadRequest, errors.New("Неверный пароль"), nil
	}

	loginResponse.AccessToken = helpers.GenerateAccessToken(dto.JwtPayload{Login: login.UserLogin})

	return httpCode, nil, loginResponse
}
