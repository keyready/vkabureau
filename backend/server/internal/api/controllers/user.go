package controllers

import (
	"github.com/gin-gonic/gin"
	"server/internal/domain/types/e"
	"server/internal/domain/types/request"
	"server/internal/domain/usecase"
	"server/pkg/err"
)

type UserController struct {
	userUsecase usecase.UserUsecase
}

func NewUserControllers(userUsecase usecase.UserUsecase) *UserController {
	return &UserController{userUsecase: userUsecase}
}

func (uc *UserController) UserData(ctx *gin.Context) {
	login := ctx.GetString("login")

	httpCode, usecaseErr, userData := uc.userUsecase.UserData(login)
	if usecaseErr != nil {
		err.ErrorHandler(ctx, &e.ServerError{Message: usecaseErr.Error()})
	}

	ctx.JSON(httpCode, userData)
}

func (uc *UserController) Profile(ctx *gin.Context) {
	login := ctx.Param("login")

	httpCode, usecaseErr, profile := uc.userUsecase.Profile(login)
	if usecaseErr != nil {
		err.ErrorHandler(ctx, &e.ServerError{Message: usecaseErr.Error()})
	}

	ctx.JSON(httpCode, profile)
}

func (uc *UserController) SignUp(ctx *gin.Context) {
	var signUp request.SignUp
	if bindErr := ctx.ShouldBindJSON(&signUp); bindErr != nil {
		err.ErrorHandler(ctx, &e.ValidationError{Message: bindErr.Error()})
	}

	httpCode, usecaseErr := uc.userUsecase.SignUp(signUp)
	if usecaseErr != nil {
		err.ErrorHandler(ctx, &e.ServerError{Message: usecaseErr.Error()})
	}

	ctx.JSON(httpCode, gin.H{})
}

func (uc *UserController) Login(ctx *gin.Context) {
	var loginRequest request.Login
	if bindErr := ctx.ShouldBindJSON(&loginRequest); bindErr != nil {
		err.ErrorHandler(ctx, &e.ValidationError{Message: bindErr.Error()})
	}

	httpCode, usecaseErr, loginResponse := uc.userUsecase.Login(loginRequest)
	if usecaseErr != nil {
		err.ErrorHandler(ctx, &e.ServerError{Message: usecaseErr.Error()})
	}

	ctx.JSON(httpCode, loginResponse)
}
