package repositories

import (
	"backend/internal/dto/response"
	"backend/pkg/settings"
	"encoding/json"
	"fmt"
	"gorm.io/gorm"
	"io/ioutil"
	"net/http"
)

type RepoRepository interface {
	FetchPrivateRepos(token string) (httpCode int, err error, repos response.ReposResponse)
	FetchPublicRepos(token string) (httpCode int, err error, repos response.ReposResponse)
}

type RepoRepositoryImpl struct {
	DB *gorm.DB
}

func NewRepoRepositoryImpl(db *gorm.DB) RepoRepository {
	return &RepoRepositoryImpl{DB: db}
}

func (r RepoRepositoryImpl) FetchPrivateRepos(token string) (httpCode int, err error, repos response.ReposResponse) {
	url := fmt.Sprintf("%s&per_page=100", settings.AppSettings.GitHubPrivateRepos)

	request, err := http.NewRequest(
		http.MethodGet,
		url,
		nil,
	)
	if err != nil {
		return http.StatusInternalServerError, err, repos
	}

	request.Header.Set("Authorization", fmt.Sprintf("Bearer %s", token))

	httpClient := &http.Client{}
	response, err := httpClient.Do(request)
	if err != nil {
		return http.StatusInternalServerError, err, repos
	}

	defer response.Body.Close()

	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		return http.StatusInternalServerError, err, repos

	}

	json.Unmarshal(body, &repos.Data)
	repos.TotalCount = len(repos.Data)

	return response.StatusCode, nil, repos
}

func (r RepoRepositoryImpl) FetchPublicRepos(token string) (httpCode int, err error, repos response.ReposResponse) {
	url := fmt.Sprintf("%s?per_page=100", settings.AppSettings.GitHubPublicRepos)
	request, err := http.NewRequest(
		http.MethodGet,
		url,
		nil,
	)
	if err != nil {
		return http.StatusInternalServerError, err, repos
	}

	request.Header.Set("Authorization", fmt.Sprintf("Bearer %s", token))

	httpClient := &http.Client{}
	response, err := httpClient.Do(request)
	if err != nil {
		return http.StatusInternalServerError, err, repos
	}

	defer response.Body.Close()
	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		return http.StatusInternalServerError, err, repos
	}

	json.Unmarshal(body, &repos.Data)
	repos.TotalCount = len(repos.Data)

	return http.StatusOK, nil, repos
}
