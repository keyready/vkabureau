package controllers

import (
	"backend/internal/dto/request"
	"backend/internal/services"
	"backend/pkg/app"
	"backend/pkg/settings"
	"github.com/gin-gonic/gin"
	"net/http"
)

type AuthController struct {
	authService services.AuthService
}

func NewAuthController(authService services.AuthService) *AuthController {
	return &AuthController{authService: authService}
}

func (ac *AuthController) Authorize(ctx *gin.Context) {
	appGin := app.Gin{Ctx: ctx}
	var authReq request.Authorize

	bindErr := ctx.ShouldBindJSON(&authReq)
	if bindErr != nil {
		appGin.ErrorResponse(http.StatusBadRequest, bindErr)
		return
	}

	authReq.ClientSecret = settings.AppSettings.GitHubClientSecret
	authReq.ClientId = settings.AppSettings.GitHubClientId
	authReq.RedirectUri = settings.AppSettings.RedirectUri

	httpCode, serviceErr, tokens := ac.authService.Authorize(authReq)
	if serviceErr != nil {
		appGin.ErrorResponse(httpCode, serviceErr)
		return
	}

	appGin.SuccessResponse(http.StatusOK, tokens)
}
