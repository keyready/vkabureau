package controllers

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"server/internal/domain/types/e"
	"server/internal/domain/types/request"
	"server/internal/domain/usecase"
	"server/pkg/err"
	"strings"
	"time"
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
	}

	ctx.JSON(httpCode, messages)
}

func (f *ForumController) FetchOneForum(ctx *gin.Context) {
	forumId := ctx.Param("forumId")

	httpCode, usecaseErr, forum := f.forumUsecase.FetchOneForum(forumId)
	if usecaseErr != nil {
		err.ErrorHandler(ctx, &e.ServerError{Message: usecaseErr.Error()})
	}

	ctx.JSON(httpCode, forum)
}

func (f *ForumController) MyForums(ctx *gin.Context) {
	me := ctx.GetString("login")

	httpCode, usecaseErr, forums := f.forumUsecase.MyForums(me)
	if usecaseErr != nil {
		err.ErrorHandler(ctx, &e.ValidationError{Message: usecaseErr.Error()})
	}

	ctx.JSON(httpCode, forums)
}

func (f *ForumController) SendMessage(ctx *gin.Context) {
	var sendMessage request.SendMessage

	bindErr := ctx.ShouldBind(&sendMessage)
	if bindErr != nil {
		err.ErrorHandler(ctx, &e.ValidationError{Message: bindErr.Error()})
	}

	sendMessage.Author = ctx.GetString("login")
	sendMessage.CreatedAt = time.Now()

	for _, img := range sendMessage.Attachments {
		img.Filename = fmt.Sprintf(
			"%s.%s",
			uuid.NewString(),
			strings.Split(img.Filename, ".")[len(strings.Split(img.Filename, "."))-1],
		)
		sendMessage.AttachmentsName = append(sendMessage.AttachmentsName, img.Filename)
		savePath := fmt.Sprintf("/app/static/messages/%s", img.Filename)
		if uploadErr := ctx.SaveUploadedFile(img, savePath); uploadErr != nil {
			err.ErrorHandler(ctx, &e.ServerError{Message: uploadErr.Error()})
		}
	}

	httpCode, usecaseErr := f.forumUsecase.SendMessage(sendMessage)
	if usecaseErr != nil {
		err.ErrorHandler(ctx, &e.ServerError{Message: usecaseErr.Error()})
	}

	ctx.JSON(httpCode, gin.H{})
}
