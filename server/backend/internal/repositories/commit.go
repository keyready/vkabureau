package repositories

import (
	"backend/internal/models"
	"gorm.io/gorm"
	"net/http"
)

type CommitRepository interface {
	FetchAllCommitsWithProjects(projectName string) (httpCode int, err error, commits []models.CommitModel)
}

type CommitRepositoryImpl struct {
	DB *gorm.DB
}

func NewCommitRepositoryImpl(DB *gorm.DB) CommitRepository {
	return &CommitRepositoryImpl{DB: DB}
}

func (c CommitRepositoryImpl) FetchAllCommitsWithProjects(projectName string) (httpCode int, err error, commits []models.CommitModel) {
	var project models.ProjectModel
	c.DB.Where("name = ?", projectName).First(&project)

	for _, commitId := range project.CommitsId {
		var commit models.CommitModel
		c.DB.Where("id = ?", commitId).First(&commit)
		commits = append(commits, commit)
	}
	return http.StatusOK, nil, commits
}
