package usecase

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	"server/internal/domain/repository"
	"server/internal/domain/types/request"
	"server/internal/domain/types/response"
)

type ProjectUsecase interface {
	CreateProject(createProject request.CreateProject) (httpCode int, err error)
	UpdateProject(updateProject request.UpdateProject) (httpCode int, err error)
	FetchProject(projectId string) (httpCode int, err error, project response.ProjectData)
	FetchAllProjects() (httpCode int, err error, projects []response.ProjectData)
	OwnProjects(login string) (httpCode int, err error, projects []response.ProjectData)
	LikeProject(likeProject request.LikeProject) (httpCode int, err error)
}

type ProjectUsecaseImpl struct {
	projectRepo repository.ProjectRepository
}

func NewProjectUsecaseImpl(projectRepo repository.ProjectRepository) *ProjectUsecaseImpl {
	return &ProjectUsecaseImpl{projectRepo: projectRepo}
}

func (p ProjectUsecaseImpl) LikeProject(likeProject request.LikeProject) (httpCode int, err error) {
	httpCode, err = p.projectRepo.LikeProject(likeProject)
	if err != nil {
		return httpCode, err
	}
	return httpCode, nil
}

func (p ProjectUsecaseImpl) OwnProjects(login string) (httpCode int, err error, projects []response.ProjectData) {
	httpCode, err, projects = p.projectRepo.OwnProjects(login)
	if err != nil {
		return httpCode, err, projects
	}
	return httpCode, nil, projects
}

func (p ProjectUsecaseImpl) FetchAllProjects() (httpCode int, err error, projects []response.ProjectData) {
	httpCode, err, projects = p.projectRepo.FetchAllProjects()
	if err != nil {
		return httpCode, err, projects
	}

	return httpCode, err, projects
}

func (p ProjectUsecaseImpl) FetchProject(projectId string) (httpCode int, err error, project response.ProjectData) {
	projectIdPrimitive, _ := primitive.ObjectIDFromHex(projectId)

	httpCode, err, project = p.projectRepo.FetchProject(projectIdPrimitive)
	if err != nil {
		return httpCode, err, project
	}

	return httpCode, nil, project
}

func (p ProjectUsecaseImpl) UpdateProject(updateProject request.UpdateProject) (httpCode int, err error) {
	httpCode, usecaseErr := p.projectRepo.UpdateProject(updateProject)
	if usecaseErr != nil {
		return httpCode, usecaseErr
	}

	return httpCode, nil
}

func (p ProjectUsecaseImpl) CreateProject(createProject request.CreateProject) (httpCode int, err error) {
	httpCode, err = p.projectRepo.CreateProject(createProject)
	if err != nil {
		return httpCode, err
	}

	return httpCode, nil
}
