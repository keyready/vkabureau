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
	DOCUMENTS_STORAGE = "/app/static/documents"
)

type ProjectController struct {
	projectUsecase usecase.ProjectUsecase
}

func NewProjectController(projectUsecase usecase.ProjectUsecase) *ProjectController {
	return &ProjectController{projectUsecase: projectUsecase}
}

func (pc *ProjectController) LikeProject(ctx *gin.Context) {
	var likeProject request.LikeProject

	bindErr := ctx.ShouldBindJSON(&likeProject)
	if bindErr != nil {
		err.ErrorHandler(ctx, &e.ValidationError{Message: bindErr.Error()})
	}

	httpCode, usecaseErr := pc.projectUsecase.LikeProject(likeProject)
	if usecaseErr != nil {
		err.ErrorHandler(ctx, &e.ServerError{Message: usecaseErr.Error()})
	}

	ctx.JSON(httpCode, gin.H{})
}

func (pc *ProjectController) OwnProject(ctx *gin.Context) {
	login := ctx.GetString("login")

	httpCode, usecaseErr, projects := pc.projectUsecase.OwnProjects(login)
	if usecaseErr != nil {
		err.ErrorHandler(ctx, &e.ServerError{Message: usecaseErr.Error()})
	}

	ctx.JSON(httpCode, projects)
}

func (pc *ProjectController) FetchProject(ctx *gin.Context) {
	projectId := ctx.Param("projectId")

	httpCode, usecaseErr, project := pc.projectUsecase.FetchProject(projectId)
	if usecaseErr != nil {
		err.ErrorHandler(ctx, usecaseErr)
	}

	ctx.JSON(httpCode, project)
}

func (pc *ProjectController) FetchAllProjects(ctx *gin.Context) {
	httpCode, usecaseErr, projects := pc.projectUsecase.FetchAllProjects()
	if usecaseErr != nil {
		err.ErrorHandler(ctx, &e.ServerError{Message: usecaseErr.Error()})
	}

	ctx.JSON(httpCode, projects)
}

func (pc *ProjectController) CreateProject(ctx *gin.Context) {
	formData := request.CreateProject{}

	multipartForm, mpfdErr := ctx.MultipartForm()
	if mpfdErr != nil {
		err.ErrorHandler(
			ctx,
			&e.ValidationError{
				Message: mpfdErr.Error(),
			},
		)
	}

	if bindErr := ctx.ShouldBind(&formData); bindErr != nil {
		err.ErrorHandler(
			ctx,
			&e.ValidationError{Message: bindErr.Error()},
		)
	}

	documentNames := []string{}
	for _, doc := range multipartForm.File["documents"] {
		doc.Filename = fmt.Sprintf("%s%s", uuid.NewString(), filepath.Ext(doc.Filename))
		if uploadErr := ctx.SaveUploadedFile(
			doc,
			fmt.Sprintf("%s/%s", DOCUMENTS_STORAGE, doc.Filename),
		); uploadErr != nil {
			err.ErrorHandler(ctx, &e.ServerError{Message: uploadErr.Error()})
		}

		documentNames = append(documentNames, doc.Filename)
	}

	formData.Author = ctx.GetString("login")

	httpCode, usecaseErr := pc.projectUsecase.CreateProject(formData, documentNames)
	if usecaseErr != nil {
		err.ErrorHandler(ctx, &e.ServerError{Message: usecaseErr.Error()})
	}

	ctx.JSON(httpCode, gin.H{})
}

func (pc *ProjectController) UpdateProject(ctx *gin.Context) {
	var updateProject request.UpdateProject
	updateProject.Author = ctx.GetString("login")

	if bindErr := ctx.ShouldBindJSON(&updateProject); bindErr != nil {
		err.ErrorHandler(ctx, &e.ValidationError{Message: bindErr.Error()})
	}

	httpCode, usecaseErr := pc.projectUsecase.UpdateProject(updateProject)
	if usecaseErr != nil {
		err.ErrorHandler(ctx, &e.ServerError{Message: usecaseErr.Error()})
	}

	ctx.JSON(httpCode, gin.H{})
}
