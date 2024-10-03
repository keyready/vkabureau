package repositories

import (
	"backend/internal/dto/other"
	"backend/internal/dto/request"
	"backend/internal/dto/response"
	"backend/internal/models"
	"bytes"
	"encoding/json"
	"fmt"
	"gorm.io/gorm"
	"io/ioutil"
	"log"
	"net/http"
	"strings"
	"time"
)

type ProjectRepository interface {
	FetchAllProjects() (httpCode int, err error, data []response.AllProjectsResponse)
	ImportProjectWithGit(importPrj request.ImportProjectRequest) (httpCode int, err error)
	FetchProjectById(projectId int64) (httpCode int, err error, project response.AllProjectsResponse)
}

type ProjectRepositoryImpl struct {
	DB *gorm.DB
}

func NewProjectsRepositoryImpl(db *gorm.DB) ProjectRepository {
	return &ProjectRepositoryImpl{DB: db}
}

func (p ProjectRepositoryImpl) FetchProjectById(projectId int64) (httpCode int, err error, project response.AllProjectsResponse) {
	var oneProject models.ProjectModel
	p.DB.Where("id = ?", projectId).First(&oneProject)

	project.ID = oneProject.ID
	project.Name = oneProject.Name
	project.Description = oneProject.Description
	project.Url = oneProject.Url
	project.CommitsId = oneProject.CommitsId
	project.Author.AvatarUrl = oneProject.AvatarUrl
	project.Author.Name = oneProject.Author
	project.CreatedAt = oneProject.CreatedAt.String()
	project.Private = oneProject.Private

	return http.StatusOK, nil, project
}

func (p ProjectRepositoryImpl) ImportProjectWithGit(importPrj request.ImportProjectRequest) (httpCode int, err error) {

	switch importPrj.Type {
	case "public":
		httpClient := &http.Client{}

		req, _ := http.NewRequest(http.MethodGet, importPrj.Url, nil)

		resp, _ := httpClient.Do(req)
		defer resp.Body.Close()

		body, _ := ioutil.ReadAll(resp.Body)
		var project other.ProjectJson
		json.Unmarshal(body, &project)

		commitsUrl := strings.Split(project.CommitsUrl, "{")[0]

		commitsReq, _ := http.NewRequest(http.MethodGet, commitsUrl, nil)
		commitsResp, _ := httpClient.Do(commitsReq)

		defer commitsResp.Body.Close()

		commitsBody, _ := ioutil.ReadAll(commitsResp.Body)
		var commits []map[string]map[string]interface{}
		json.Unmarshal(commitsBody, &commits)
		createdAt, _ := time.Parse(project.CreatedAt, time.RFC3339)

		newProject := models.ProjectModel{
			Author:      project.Owner.Login,
			AvatarUrl:   project.Owner.AvatarURL,
			Name:        project.Name,
			Description: project.Description,
			Private:     project.Private,
			CreatedAt:   createdAt,
			Url:         project.Url,
		}

		p.DB.Create(&newProject)

		var commitJson other.CommitJson
		json.Unmarshal(commitsBody, &commitJson)
		createdAtCommit, _ := time.Parse(commitJson.Author.Date, time.RFC3339)

		for _, commit := range commits {
			newCommit := models.CommitModel{
				Author:     commit["author"]["login"].(string),
				CommitLink: commit["commit"]["url"].(string),
				Message:    commit["commit"]["message"].(string),
				CreatedAt:  createdAtCommit,
				ProjectID:  newProject.ID,
			}
			p.DB.Create(&newCommit)

			newProject.CommitsId = append(newProject.CommitsId, newCommit.ID)
			p.DB.Save(&newProject)
		}

	case "private":
		httpClient := &http.Client{}

		data := map[string]bool{
			"private": true,
		}
		jsonData, _ := json.Marshal(data)

		privateReq, _ := http.NewRequest(http.MethodPatch, importPrj.Url, bytes.NewBuffer(jsonData))
		privateReq.Header.Set("Authorization", fmt.Sprintf("Bearer %s", importPrj.Token))
		privateReq.Header.Set("Accept", "application/vnd.github.v3+json")
		privateReq.Header.Set("Content-Type", "application/json")

		privateResp, _ := httpClient.Do(privateReq)
		defer privateResp.Body.Close()

		time.Sleep(time.Second * 3)

		getPrivateRep, _ := http.NewRequest(http.MethodGet, importPrj.Url, nil)
		getPrivateRep.Header.Set("Authorization", fmt.Sprintf("Bearer %s", importPrj.Token))

		resp, _ := httpClient.Do(getPrivateRep)
		defer resp.Body.Close()

		body, _ := ioutil.ReadAll(resp.Body)
		var project other.ProjectJson
		json.Unmarshal(body, &project)

		commitsUrl := strings.Split(project.CommitsUrl, "{")[0]

		commitsReq, _ := http.NewRequest(http.MethodGet, commitsUrl, nil)
		commitsResp, _ := httpClient.Do(commitsReq)

		defer commitsResp.Body.Close()

		commitsBody, _ := ioutil.ReadAll(commitsResp.Body)
		var commits []map[string]map[string]interface{}
		json.Unmarshal(commitsBody, &commits)
		createdAt, _ := time.Parse(project.CreatedAt, time.RFC3339)

		newProject := models.ProjectModel{
			Author:      project.Owner.Login,
			AvatarUrl:   project.Owner.AvatarURL,
			Name:        project.Name,
			Description: project.Description,
			Private:     project.Private,
			CreatedAt:   createdAt,
			Url:         project.Url,
		}

		p.DB.Create(&newProject)

		var commitJson other.CommitJson
		json.Unmarshal(commitsBody, &commitJson)
		createdAtCommit, _ := time.Parse(commitJson.Author.Date, time.RFC3339)

		for _, commit := range commits {
			newCommit := models.CommitModel{
				Author:     commit["author"]["login"].(string),
				CommitLink: commit["commit"]["url"].(string),
				Message:    commit["commit"]["message"].(string),
				CreatedAt:  createdAtCommit,
				ProjectID:  newProject.ID,
			}
			p.DB.Create(&newCommit)

			newProject.CommitsId = append(newProject.CommitsId, newCommit.ID)
			p.DB.Save(&newProject)
		}

		time.Sleep(time.Second * 3)

		closedData := map[string]bool{
			"private": false,
		}
		closedJsonData, closedErr := json.Marshal(closedData)
		if closedErr != nil {
			log.Fatal(closedErr)
		}

		publicReq, publicErr := http.NewRequest(http.MethodPatch, importPrj.Url, bytes.NewBuffer(closedJsonData))
		if publicErr != nil {
			log.Fatal(publicErr)
		}
		publicReq.Header.Set("Authorization", fmt.Sprintf("Bearer %s", importPrj.Token))
		publicReq.Header.Set("Accept", "application/vnd.github.v3+json")
		publicReq.Header.Set("Content-Type", "application/json")

		publicResp, publicHttpErr := httpClient.Do(publicReq)
		if publicHttpErr != nil {
			log.Fatal(publicHttpErr)
		}
		defer publicResp.Body.Close()

		body, _ = ioutil.ReadAll(publicResp.Body)
		var respClosed map[string]interface{}
		json.Unmarshal(body, &respClosed)
		fmt.Print("response closed", respClosed)
	}

	return http.StatusOK, nil
}

func (p ProjectRepositoryImpl) FetchAllProjects() (httpCode int, err error, data []response.AllProjectsResponse) {
	var projects []models.ProjectModel
	p.DB.Find(&projects)

	for _, project := range projects {
		resp := response.AllProjectsResponse{}
		resp.ID = project.ID
		resp.Name = project.Name
		resp.Description = project.Description
		resp.Url = project.Url
		resp.Private = project.Private
		resp.CreatedAt = project.CreatedAt.String()
		resp.CommitsId = project.CommitsId
		resp.Author.Name = project.Author
		resp.Author.AvatarUrl = project.AvatarUrl

		data = append(data, resp)
	}

	return http.StatusOK, nil, data
}
