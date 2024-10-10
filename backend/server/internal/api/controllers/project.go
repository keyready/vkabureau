package controllers

import (
	"github.com/gin-gonic/gin"
	"server/internal/domain/types/e"
	"server/internal/domain/types/request"
	"server/internal/domain/usecase"
	"server/pkg/err"
)

type ProjectController struct {
	projectUsecase usecase.ProjectUsecase
}

func NewProjectController(projectUsecase usecase.ProjectUsecase) *ProjectController {
	return &ProjectController{projectUsecase: projectUsecase}
}

//TODO - круд на таски

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
	var createProject request.CreateProject
	createProject.Author = ctx.GetString("login")

	if bindErr := ctx.ShouldBindJSON(&createProject); bindErr != nil {
		err.ErrorHandler(ctx, &e.ValidationError{Message: bindErr.Error()})
	}

	httpCode, usecaseErr := pc.projectUsecase.CreateProject(createProject)
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
