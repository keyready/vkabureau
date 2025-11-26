package controllers

import (
	"fmt"
	"path/filepath"
	"server/internal/domain/types/e"
	"server/internal/domain/types/request"
	"server/internal/domain/usecase"
	"server/pkg/err"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

const (
	ATTACH_STORAGE = "/app/static/messages"
)

type ForumController struct {
	forumUsecase usecase.ForumUsecase
}

func NewForumControllers(forumUsecase usecase.ForumUsecase) *ForumController {
	return &ForumController{forumUsecase: forumUsecase}
}

func (f *ForumController) FetchAllMessages(ctx *gin.Context) {
	forumId := ctx.Param("forumId")

	httpCode, usecaseErr, messages := f.forumUsecase.FetchAllMessages(forumId)
	if usecaseErr != nil {
		err.ErrorHandler(ctx, &e.ServerError{Message: usecaseErr.Error()})

		return
	}

	ctx.JSON(httpCode, messages)
}

func (f *ForumController) FetchOneForum(ctx *gin.Context) {
	forumId := ctx.Param("forumId")

	httpCode, usecaseErr, forum := f.forumUsecase.FetchOneForum(forumId)
	if usecaseErr != nil {
		err.ErrorHandler(ctx, &e.ServerError{Message: usecaseErr.Error()})

		return
	}

	ctx.JSON(httpCode, forum)
}

func (f *ForumController) MyForums(ctx *gin.Context) {
	me := ctx.GetString("login")

	httpCode, usecaseErr, forums := f.forumUsecase.MyForums(me)
	if usecaseErr != nil {
		err.ErrorHandler(ctx, &e.ValidationError{Message: usecaseErr.Error()})

		return
	}

	ctx.JSON(httpCode, forums)
}

func (f *ForumController) SendMessage(ctx *gin.Context) {
	formData := request.SendMessage{}

	if bindErr := ctx.ShouldBind(&formData); bindErr != nil {
		err.ErrorHandler(ctx, &e.ValidationError{Message: bindErr.Error()})

		return
	}

	multipartForm, mpfdErr := ctx.MultipartForm()
	if mpfdErr != nil {
		err.ErrorHandler(
			ctx,
			&e.ValidationError{
				Message: mpfdErr.Error(),
			},
		)

		return
	}

	formData.Author = ctx.GetString("login")

	attachNames := []string{}
	for _, img := range multipartForm.File["attachments"] {
		fileName := fmt.Sprintf(
			"%s%s",
			uuid.NewString(),
			filepath.Ext(img.Filename),
		)
		img.Filename = fileName

		savePath := fmt.Sprintf("%s/%s", ATTACH_STORAGE, img.Filename)
		if uploadErr := ctx.SaveUploadedFile(img, savePath); uploadErr != nil {
			err.ErrorHandler(ctx, &e.ServerError{Message: uploadErr.Error()})

			return
		}

		attachNames = append(attachNames, fileName)
	}

	httpCode, usecaseErr := f.forumUsecase.SendMessage(formData, attachNames)
	if usecaseErr != nil {
		err.ErrorHandler(ctx, &e.ServerError{Message: usecaseErr.Error()})

		return
	}

	ctx.JSON(httpCode, gin.H{})
}
