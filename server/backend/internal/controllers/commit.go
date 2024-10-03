package controllers

import (
	"backend/internal/services"
	"backend/pkg/app"
	"github.com/gin-gonic/gin"
	"net/http"
)

type CommitController struct {
	commitService services.CommitService
}

func NewCommitController(commitService services.CommitService) *CommitController {
	return &CommitController{commitService: commitService}
}

func (cc *CommitController) FetchAllCommitsWithProjects(ctx *gin.Context) {
	appGin := app.Gin{Ctx: ctx}
	projectName := appGin.Ctx.Param("projectName")

	httpCode, err, commits := cc.commitService.FetchAllCommitsWithProjects(projectName)
	if err != nil {
		appGin.ErrorResponse(httpCode, err)
		return
	}

	appGin.SuccessResponse(http.StatusOK, commits)
}
