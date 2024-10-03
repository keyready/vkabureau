package services

import (
	"backend/internal/models"
	"backend/internal/repositories"
)

type CommitService interface {
	FetchAllCommitsWithProjects(projectName string) (httpCode int, err error, commits []models.CommitModel)
}

type CommitServiceImpl struct {
	commitRep repositories.CommitRepository
}

func NewCommitServiceImpl(commitRep repositories.CommitRepository) CommitService {
	return &CommitServiceImpl{commitRep: commitRep}
}

func (c CommitServiceImpl) FetchAllCommitsWithProjects(projectName string) (httpCode int, err error, commits []models.CommitModel) {
	httpCode, err, commits = c.commitRep.FetchAllCommitsWithProjects(projectName)
	return httpCode, err, commits
}
