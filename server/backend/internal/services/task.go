package services

import (
	"backend/internal/dto/request"
	"backend/internal/models"
	"backend/internal/repositories"
)

type TaskService interface {
	AddTask(addTask request.AddTaskRequest) (httpCode int, err error)
	FetchAllTasksByProject(projectId int64) (httpCode int, err error, tasks []models.TaskModel)
	UpdateStatusTask(updateTask request.UpdateTaskRequest) (httpCode int, err error)
}

type TaskServiceImpl struct {
	taskRep repositories.TaskRepository
}

func NewTaskServiceImpl(taskRep repositories.TaskRepository) TaskService {
	return &TaskServiceImpl{taskRep: taskRep}
}

func (t TaskServiceImpl) AddTask(addTask request.AddTaskRequest) (httpCode int, err error) {
	httpCode, err = t.taskRep.AddTask(addTask)
	return httpCode, err
}

func (t TaskServiceImpl) FetchAllTasksByProject(projectId int64) (httpCode int, err error, tasks []models.TaskModel) {
	httpCode, err, tasks = t.taskRep.FetchAllTasksByProject(projectId)
	return httpCode, err, tasks
}

func (t TaskServiceImpl) UpdateStatusTask(updateTask request.UpdateTaskRequest) (httpCode int, err error) {
	httpCode, err = t.taskRep.UpdateStatusTask(updateTask)
	return httpCode, err
}
