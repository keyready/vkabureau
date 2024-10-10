package usecase

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	"server/internal/domain/repository"
	"server/internal/domain/types/request"
	"server/internal/domain/types/response"
	"time"
)

type ProjectUsecase interface {
	CreateProject(createProject request.CreateProject) (httpCode int, err error)
	UpdateProject(updateProject request.UpdateProject) (httpCode int, err error)
	AddTask(addTask request.AddTask) (httpCode int, err error)
	UpdateTask(updateTask request.UpdateTask) (httpCode int, err error)
	FetchProject(projectId string) (httpCode int, err error, project *response.ProjectData)
	FetchAllProjects() (httpCode int, err error, projects []*response.ProjectData)
}

type ProjectUsecaseImpl struct {
	projectRepo repository.ProjectRepository
}

func NewProjectUsecaseImpl(projectRepo repository.ProjectRepository) *ProjectUsecaseImpl {
	return &ProjectUsecaseImpl{projectRepo: projectRepo}
}

func (p ProjectUsecaseImpl) FetchAllProjects() (httpCode int, err error, projects []*response.ProjectData) {
	httpCode, err, projects = p.projectRepo.FetchAllProjects()
	if err != nil {
		return httpCode, err, projects
	}

	return httpCode, err, nil
}

func (p ProjectUsecaseImpl) FetchProject(projectId string) (httpCode int, err error, project *response.ProjectData) {
	projectIdPrimitive, _ := primitive.ObjectIDFromHex(projectId)

	httpCode, err, project = p.projectRepo.FetchProject(projectIdPrimitive)
	if err != nil {
		return httpCode, err, nil
	}

	return httpCode, nil, project
}

func (p ProjectUsecaseImpl) UpdateTask(updateTask request.UpdateTask) (httpCode int, err error) {
	currenTime, _ := time.Parse(time.RFC3339, time.Now().String())
	updateTask.UpdatedAt = currenTime

	httpCode, usecaseErr := p.projectRepo.UpdateTask(updateTask)
	if usecaseErr != nil {
		return httpCode, usecaseErr
	}

	return httpCode, nil
}

func (p ProjectUsecaseImpl) AddTask(addTask request.AddTask) (httpCode int, err error) {
	currentTime, _ := time.Parse(time.RFC3339, time.Now().String())
	addTask.CreatedAt = currentTime

	httpCode, usecaseErr := p.projectRepo.AddTask(addTask)
	if usecaseErr != nil {
		return httpCode, usecaseErr
	}

	return httpCode, nil
}

func (p ProjectUsecaseImpl) UpdateProject(updateProject request.UpdateProject) (httpCode int, err error) {
	currentTime, _ := time.Parse(time.RFC3339, time.Now().String())
	updateProject.UpdatedAt = currentTime

	httpCode, usecaseErr := p.projectRepo.UpdateProject(updateProject)
	if usecaseErr != nil {
		return httpCode, usecaseErr
	}

	return httpCode, nil
}

func (p ProjectUsecaseImpl) CreateProject(createProject request.CreateProject) (httpCode int, err error) {
	createdAt, _ := time.Parse(time.RFC3339, time.Now().String())
	createProject.CreatedAt = createdAt

	httpCode, err = p.projectRepo.CreateProject(createProject)
	if err != nil {
		return httpCode, err
	}

	return httpCode, nil
}
