package repositories

import (
	"backend/internal/dto/request"
	"backend/internal/models"
	"gorm.io/gorm"
	"net/http"
	"time"
)

type TaskRepository interface {
	AddTask(addTask request.AddTaskRequest) (httpCode int, err error)
	FetchAllTasksByProject(projectId int64) (httpCode int, err error, tasks []models.TaskModel)
	UpdateStatusTask(updateTask request.UpdateTaskRequest) (httpCode int, err error)
}

type TaskRepositoryImpl struct {
	DB *gorm.DB
}

func NewTaskRepository(DB *gorm.DB) TaskRepository {
	return &TaskRepositoryImpl{DB: DB}
}

func (t TaskRepositoryImpl) UpdateStatusTask(updateTask request.UpdateTaskRequest) (httpCode int, err error) {
	var task models.TaskModel
	t.DB.Where("id = ?", updateTask.TaskId).First(&task)
	task.Status = updateTask.Status
	task.Priority = updateTask.Priority
	t.DB.Save(&task)
	return http.StatusOK, nil
}

func (t TaskRepositoryImpl) FetchAllTasksByProject(projectId int64) (httpCode int, err error, tasks []models.TaskModel) {
	t.DB.Where("project_id = ?", projectId).Find(&tasks)
	return http.StatusOK, nil, tasks
}

func (t TaskRepositoryImpl) AddTask(addTask request.AddTaskRequest) (httpCode int, err error) {
	deadLine, _ := time.Parse(addTask.Deadline, time.RFC3339)
	createdAt, _ := time.Parse(time.Now().String(), time.RFC3339)

	t.DB.Create(&models.TaskModel{
		Title:       addTask.Title,
		Description: addTask.Description,
		Deadline:    deadLine,
		ProjectId:   addTask.ProjectId,
		Priority:    addTask.Priority,
		CreatedAt:   createdAt,
	})

	var project models.ProjectModel
	t.DB.Where("id = ?", addTask.ProjectId).First(&project)

	project.TasksId = append(project.TasksId, addTask.ProjectId)
	t.DB.Save(&project)

	return http.StatusCreated, nil
}
