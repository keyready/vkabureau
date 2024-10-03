package services

import (
	"backend/internal/dto/request"
	"backend/internal/dto/response"
	"backend/internal/repositories"
	"net/http"
)

type AuthService interface {
	Authorize(authReq request.Authorize) (httpCode int, err error, tokens response.TokenProvider)
	Refresh(refreshReq request.Refresh) (httpCode int, err error, tokens response.TokenProvider)
}

type AuthServiceImpl struct {
	authRep repositories.AuthRepository
}

func NewAuthServiceImpl(authRep repositories.AuthRepository) AuthService {
	return &AuthServiceImpl{authRep: authRep}
}

func (a AuthServiceImpl) Authorize(authReq request.Authorize) (httpCode int, err error, tokens response.TokenProvider) {
	httpCode, err, tokens = a.authRep.Authorize(authReq)
	return http.StatusOK, err, tokens
}

func (a AuthServiceImpl) Refresh(refreshReq request.Refresh) (httpCode int, err error, tokens response.TokenProvider) {
	httpCode, err, tokens = a.authRep.Refresh(refreshReq)
	return httpCode, err, tokens
}
