package controllers

import (
	"backend/internal/dto/request"
	"backend/internal/services"
	"backend/pkg/app"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

type TaskController struct {
	taskService services.TaskService
}

func NewTaskController(taskService services.TaskService) *TaskController {
	return &TaskController{taskService: taskService}
}

func (tc *TaskController) AddTask(ctx *gin.Context) {
	appGin := app.Gin{Ctx: ctx}
	var addTask request.AddTaskRequest

	bindErr := ctx.ShouldBindJSON(&addTask)
	if bindErr != nil {
		appGin.ErrorResponse(http.StatusBadRequest, bindErr)
		return
	}

	httpCode, err := tc.taskService.AddTask(addTask)
	if err != nil {
		appGin.ErrorResponse(httpCode, err)
		return
	}

	appGin.SuccessResponse(http.StatusCreated, gin.H{})
}

func (tc *TaskController) UpdateTask(ctx *gin.Context) {
	appGin := app.Gin{Ctx: ctx}
	var updateTask request.UpdateTaskRequest

	taskId, _ := strconv.ParseInt(ctx.Param("taskId"), 10, 64)

	bindErr := ctx.ShouldBindJSON(&updateTask)
	if bindErr != nil {
		appGin.ErrorResponse(http.StatusBadRequest, bindErr)
		return
	}

	updateTask.TaskId = taskId

	httpCode, err := tc.taskService.UpdateStatusTask(updateTask)
	if err != nil {
		appGin.ErrorResponse(httpCode, err)
		return
	}

	appGin.SuccessResponse(http.StatusOK, gin.H{})
}

func (tc *TaskController) FetchAllTasksProject(ctx *gin.Context) {
	appGin := app.Gin{Ctx: ctx}
	projectId, _ := strconv.ParseInt(ctx.Param("projectId"), 10, 64)

	httpCode, err, tasks := tc.taskService.FetchAllTasksByProject(projectId)
	if err != nil {
		appGin.ErrorResponse(httpCode, err)
		return
	}

	appGin.SuccessResponse(http.StatusOK, tasks)
}
