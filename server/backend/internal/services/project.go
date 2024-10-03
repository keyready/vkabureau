package services

import (
	"backend/internal/dto/request"
	"backend/internal/dto/response"
	"backend/internal/repositories"
)

type ProjectService interface {
	FetchAllProjects() (httpCode int, err error, data []response.AllProjectsResponse)
	ImportProjectWithGit(importPrj request.ImportProjectRequest) (httpCode int, err error) //Переход репозитория в проект
	FetchProjectById(projectId int64) (httpCode int, err error, project response.AllProjectsResponse)
}

type ProjectServiceImpl struct {
	prjRepository repositories.ProjectRepository
}

func NewProjectServiceImpl(prjRepository repositories.ProjectRepository) ProjectService {
	return &ProjectServiceImpl{prjRepository: prjRepository}
}

func (p ProjectServiceImpl) FetchProjectById(projectId int64) (httpCode int, err error, project response.AllProjectsResponse) {
	httpCode, err, project = p.prjRepository.FetchProjectById(projectId)
	return httpCode, err, project
}

func (p ProjectServiceImpl) FetchAllProjects() (httpCode int, err error, data []response.AllProjectsResponse) {
	httpCode, err, data = p.prjRepository.FetchAllProjects()
	return httpCode, err, data
}

func (p ProjectServiceImpl) ImportProjectWithGit(importPrj request.ImportProjectRequest) (httpCode int, err error) {
	httpCode, err = p.prjRepository.ImportProjectWithGit(importPrj)
	return httpCode, err
}
