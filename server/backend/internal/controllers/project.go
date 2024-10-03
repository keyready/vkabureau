package controllers

import (
	"backend/internal/dto/request"
	"backend/internal/services"
	"backend/pkg/app"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

type ProjectController struct {
	prjService services.ProjectService
}

func NewProjectControllers(prjService services.ProjectService) *ProjectController {
	return &ProjectController{prjService: prjService}
}

func (prjc *ProjectController) FetchProjectById(ctx *gin.Context) {
	appGin := app.Gin{Ctx: ctx}

	projectId, _ := strconv.ParseInt(appGin.Ctx.Param("projectId"), 10, 64)

	fmt.Print(projectId)

	httpCode, err, project := prjc.prjService.FetchProjectById(projectId)
	if err != nil {
		appGin.ErrorResponse(httpCode, err)
		return
	}

	appGin.SuccessResponse(http.StatusOK, project)
}

func (prjc *ProjectController) ImportProjectWithGit(ctx *gin.Context) {
	appGin := app.Gin{Ctx: ctx}

	var importPrj request.ImportProjectRequest
	bindErr := appGin.Ctx.ShouldBindJSON(&importPrj)
	if bindErr != nil {
		appGin.ErrorResponse(http.StatusBadRequest, bindErr)
		return
	}

	importPrj.Token = ctx.GetString("token")

	httpCode, err := prjc.prjService.ImportProjectWithGit(importPrj)
	if err != nil {
		appGin.ErrorResponse(httpCode, err)
		return
	}

	appGin.SuccessResponse(httpCode, gin.H{})
}

func (prjc *ProjectController) FetchAllProjects(ctx *gin.Context) {
	appGin := app.Gin{Ctx: ctx}

	httpCode, err, data := prjc.prjService.FetchAllProjects()
	if err != nil {
		appGin.ErrorResponse(httpCode, err)
		return
	}

	appGin.SuccessResponse(httpCode, data)
}
