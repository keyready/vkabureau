package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"server/internal/domain/types/e"
	"server/internal/domain/types/request"
	"server/internal/domain/usecase"
	"server/pkg/err"
	"strings"
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
	var createProject request.CreateProject
	createProject.Author = ctx.GetString("login")

	if bindErr := ctx.ShouldBind(&createProject); bindErr != nil {
		err.ErrorHandler(ctx, &e.ValidationError{Message: bindErr.Error()})
	}

	for _, doc := range createProject.Documents {
		extFile := strings.Split(doc.Filename, ".")[len(strings.Split(doc.Filename, "."))-1]
		doc.Filename = uuid.New().String() + "." + extFile
		createProject.DocumentsNames = append(createProject.DocumentsNames, doc.Filename)
		//savePath := fmt.Sprintf("/app/static/documents/%s", doc.Filename)
		//uploadErr := ctx.SaveUploadedFile(doc, savePath)
		//if uploadErr != nil {
		//	err.ErrorHandler(ctx, &e.ServerError{Message: uploadErr.Error()})
		//}
	}

	createProject.Author = ctx.GetString("login")

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
