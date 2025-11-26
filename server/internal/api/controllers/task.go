package controllers

import (
	"server/internal/domain/types/e"
	"server/internal/domain/types/request"
	"server/internal/domain/usecase"
	"server/pkg/err"

	"github.com/gin-gonic/gin"
)

type TaskController struct {
	taskUsecase usecase.TaskUsecase
}

func NewTaskController(taskUsecase usecase.TaskUsecase) *TaskController {
	return &TaskController{taskUsecase: taskUsecase}
}

func (tc *TaskController) JoinToTask(ctx *gin.Context) {
	var joinToTask request.JoinToTask

	bindErr := ctx.ShouldBindJSON(&joinToTask)
	if bindErr != nil {
		err.ErrorHandler(ctx, &e.ValidationError{Message: bindErr.Error()})

		return
	}

	httpCode, usecaseErr := tc.taskUsecase.JoinToTask(joinToTask)
	if usecaseErr != nil {
		err.ErrorHandler(ctx, &e.ServerError{Message: usecaseErr.Error()})

		return
	}

	ctx.JSON(httpCode, gin.H{})
}

func (tc *TaskController) FetchTaskForProjects(ctx *gin.Context) {
	projectId := ctx.Param("projectId")

	httpCode, usecaseErr, tasks := tc.taskUsecase.FetchTaskForProject(projectId)
	if usecaseErr != nil {
		err.ErrorHandler(ctx, &e.ServerError{Message: usecaseErr.Error()})

		return
	}

	ctx.JSON(httpCode, tasks)
}

func (tc *TaskController) CreateTask(ctx *gin.Context) {
	var addTask request.AddTask

	if bindErr := ctx.ShouldBindJSON(&addTask); bindErr != nil {
		err.ErrorHandler(ctx, &e.ValidationError{Message: bindErr.Error()})

		return
	}

	httpCode, usecaseErr := tc.taskUsecase.AddTask(addTask)
	if usecaseErr != nil {
		err.ErrorHandler(ctx, &e.ServerError{Message: usecaseErr.Error()})

		return
	}

	ctx.JSON(httpCode, gin.H{})
}

func (tc *TaskController) UpdateTask(ctx *gin.Context) {
	var updateTask request.UpdateTask

	if bindErr := ctx.ShouldBindJSON(&updateTask); bindErr != nil {
		err.ErrorHandler(ctx, &e.ValidationError{Message: bindErr.Error()})

		return
	}

	httpCode, usecaseErr := tc.taskUsecase.UpdateTask(updateTask)
	if usecaseErr != nil {
		err.ErrorHandler(ctx, &e.ServerError{Message: usecaseErr.Error()})

		return
	}

	ctx.JSON(httpCode, gin.H{})
}

func (tc *TaskController) DeleteTask(gCtx *gin.Context) {
	taskID := gCtx.Param("taskID")

	httpCode, usecaseErr := tc.taskUsecase.DeleteTask(taskID)
	if usecaseErr != nil {
		err.ErrorHandler(gCtx, &e.ServerError{Message: usecaseErr.Error()})

		return
	}

	gCtx.JSON(httpCode, gin.H{})
}
