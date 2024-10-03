package repositories

import (
	"backend/internal/dto/request"
	"backend/internal/dto/response"
	"backend/pkg/settings"
	"gorm.io/gorm"
	"io/ioutil"
	"net/http"
	"net/url"
	"strings"
)

type AuthRepository interface {
	Authorize(authRequest request.Authorize) (httpCode int, err error, tokens response.TokenProvider)
	Refresh(refreshRequest request.Refresh) (httpCode int, err error, tokens response.TokenProvider)
}

type AuthRepositoryImpl struct {
	DB *gorm.DB
}

func NewAuthRepositoryImpl(DB *gorm.DB) AuthRepository {
	return &AuthRepositoryImpl{DB: DB}
}

func (a AuthRepositoryImpl) Authorize(authRequest request.Authorize) (httpCode int, err error, token response.TokenProvider) {

	gitHubTokenReq, httpErr := http.PostForm(settings.AppSettings.GitHubTokenUrl, url.Values{
		"client_id":     {authRequest.ClientId},
		"client_secret": {authRequest.ClientSecret},
		"redirect_uri":  {authRequest.RedirectUri},
		"code":          {authRequest.Code},
	})
	if httpErr != nil {
		return http.StatusInternalServerError, httpErr, token
	}
	gitHubTokenReq.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	body, err := ioutil.ReadAll(gitHubTokenReq.Body)
	if err != nil {
		return http.StatusInternalServerError, err, token
	}

	tokenValue := strings.Split(strings.Split(string(body), "&")[0], "=")[1]
	token.Token = tokenValue

	return http.StatusCreated, nil, token
}

func (a AuthRepositoryImpl) Refresh(refreshRequest request.Refresh) (httpCode int, err error, tokens response.TokenProvider) {
	return http.StatusOK, nil, tokens
}
