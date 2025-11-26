package controllers

import (
	"server/internal/domain/types/e"
	"server/internal/domain/types/request"
	"server/internal/domain/usecase"
	"server/pkg/err"

	"github.com/gin-gonic/gin"
)

type UserController struct {
	userUsecase usecase.UserUsecase
}

func NewUserControllers(userUsecase usecase.UserUsecase) *UserController {
	return &UserController{userUsecase: userUsecase}
}

func (uc UserController) ChangeProfile(ctx *gin.Context) {

	var changeProfile request.ChangeProfile
	if bindErr := ctx.ShouldBindJSON(&changeProfile); bindErr != nil {
		err.ErrorHandler(ctx, &e.ValidationError{Message: bindErr.Error()})

		return
	}

	httpCode, usecaseErr, updateProfile := uc.userUsecase.ChangeProfile(changeProfile)
	if usecaseErr != nil {
		err.ErrorHandler(ctx, &e.ServerError{Message: usecaseErr.Error()})

		return
	}

	ctx.JSON(httpCode, updateProfile)
}

func (uc *UserController) UserData(ctx *gin.Context) {
	login := ctx.GetString("login")

	httpCode, usecaseErr, userData := uc.userUsecase.UserData(login)
	if usecaseErr != nil {
		err.ErrorHandler(ctx, &e.ServerError{Message: usecaseErr.Error()})

		return
	}

	ctx.JSON(httpCode, userData)
}

func (uc *UserController) Profile(ctx *gin.Context) {
	login := ctx.Param("login")

	httpCode, usecaseErr, profile := uc.userUsecase.Profile(login)
	if usecaseErr != nil {
		err.ErrorHandler(ctx, &e.ServerError{Message: usecaseErr.Error()})

		return
	}

	ctx.JSON(httpCode, profile)
}

func (uc *UserController) SignUp(ctx *gin.Context) {
	jsonForm := request.SignUp{}
	if bindErr := ctx.ShouldBindJSON(&jsonForm); bindErr != nil {
		err.ErrorHandler(ctx, &e.ValidationError{Message: bindErr.Error()})

		return
	}

	httpCode, usecaseErr := uc.userUsecase.SignUp(jsonForm)
	if usecaseErr != nil {
		err.ErrorHandler(ctx, &e.ServerError{Message: usecaseErr.Error()})

		return
	}

	ctx.JSON(httpCode, gin.H{})
}

func (uc *UserController) Login(ctx *gin.Context) {
	var loginRequest request.Login
	if bindErr := ctx.ShouldBindJSON(&loginRequest); bindErr != nil {
		err.ErrorHandler(ctx, &e.ValidationError{Message: bindErr.Error()})

		return
	}

	httpCode, usecaseErr, loginResponse := uc.userUsecase.Login(loginRequest)
	if usecaseErr != nil {
		err.ErrorHandler(ctx, &e.ServerError{Message: usecaseErr.Error()})

		return
	}

	ctx.JSON(httpCode, loginResponse)
}

func (uc *UserController) GetRecoveryQuestions(gCtx *gin.Context) {
	httpCode, _, questions := uc.userUsecase.FetchAllQuestions()
	gCtx.JSON(httpCode, questions)
}
