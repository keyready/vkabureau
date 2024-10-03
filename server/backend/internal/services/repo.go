package services

import (
	"backend/internal/dto/response"
	"backend/internal/repositories"
)

type RepoService interface {
	FetchPrivateRepos(token string) (httpCode int, err error, repos response.ReposResponse)
	FetchPublicRepos(token string) (httpCode int, err error, repos response.ReposResponse)
}

type RepoServiceImpl struct {
	repoRepository repositories.RepoRepository
}

func NewRepoServiceImpl(repoRepository repositories.RepoRepository) RepoService {
	return &RepoServiceImpl{repoRepository: repoRepository}
}

func (r RepoServiceImpl) FetchPrivateRepos(token string) (httpCode int, err error, repos response.ReposResponse) {
	httpCode, err, repos = r.repoRepository.FetchPrivateRepos(token)
	return httpCode, err, repos
}

func (r RepoServiceImpl) FetchPublicRepos(token string) (httpCode int, err error, repos response.ReposResponse) {
	httpCode, err, repos = r.repoRepository.FetchPublicRepos(token)
	return httpCode, err, repos
}
