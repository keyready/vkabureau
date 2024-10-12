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

func (f *ForumController) MyForums(ctx *gin.Context) {
	me := ctx.GetString("login")

	httpCode, usecaseErr, forums := f.forumUsecase.MyForums(me)
	if usecaseErr != nil {
		err.ErrorHandler(ctx, &e.ValidationError{Message: usecaseErr.Error()})
	}

	ctx.JSON(httpCode, forums)
}

func (f *ForumController) FetchAllMessageForForum(ctx *gin.Context) {

}

func (f *ForumController) SendMessage(ctx *gin.Context) {
	var sendMessage request.SendMessage

	bindErr := ctx.ShouldBindJSON(&sendMessage)
	if bindErr != nil {
		err.ErrorHandler(ctx, &e.ValidationError{Message: bindErr.Error()})
	}

	sendMessage.Message.Author = ctx.GetString("login")
	sendMessage.Message.CreatedAt = time.Now()

	for _, img := range sendMessage.Message.Attachments {
		img.Filename = fmt.Sprintf(
			"%s.%s",
			uuid.NewString(),
			strings.Split(img.Filename, ".")[len(strings.Split(img.Filename, "."))-1],
		)
		sendMessage.Message.AttachmentsName = append(sendMessage.Message.AttachmentsName, img.Filename)
		//TODO - загрука файла на сервер
	}

	httpCode, usecaseErr := f.forumUsecase.SendMessage(sendMessage)
	if usecaseErr != nil {
		err.ErrorHandler(ctx, &e.ServerError{Message: usecaseErr.Error()})
	}

	ctx.JSON(httpCode, gin.H{})
}
