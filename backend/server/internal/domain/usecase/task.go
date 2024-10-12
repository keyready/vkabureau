package usecase

import (
	"net/http"
	"server/internal/domain/repository"
	"server/internal/domain/types/models"
	"server/internal/domain/types/request"
	"time"
)

type TaskUsecase interface {
	AddTask(addTask request.AddTask) (httpCode int, err error)
	UpdateTask(updateTask request.UpdateTask) (httpCode int, err error)
	FetchTaskForProject(projectId string) (httpCode int, err error, tasks []models.Task)
}

type TaskUsecaseImpl struct {
	taskRepo repository.TaskRepository
}

func NewTaskRepository(taskRepo repository.TaskRepository) TaskUsecase {
	return TaskUsecaseImpl{taskRepo: taskRepo}
}

func (t TaskUsecaseImpl) FetchTaskForProject(projectId string) (httpCode int, err error, tasks []models.Task) {
	httpCode, err, tasks = t.taskRepo.FetchTaskForProjects(projectId)
	if err != nil {
		return http.StatusInternalServerError, err, tasks
	}
	return httpCode, nil, tasks
}

func (t TaskUsecaseImpl) AddTask(addTask request.AddTask) (httpCode int, err error) {
	addTask.CreatedAt = time.Now()

	httpCode, err = t.taskRepo.AddTask(addTask)
	if err != nil {
		return httpCode, err
	}

	return httpCode, nil
}

func (t TaskUsecaseImpl) UpdateTask(updateTask request.UpdateTask) (httpCode int, err error) {
	httpCode, err = t.taskRepo.UpdateTask(updateTask)
	if err != nil {
		return httpCode, err
	}

	return http.StatusOK, nil
}
