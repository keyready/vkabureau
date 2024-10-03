package v1

import (
	"backend/internal/controllers"
	"backend/internal/middleware"
	"github.com/gin-gonic/gin"
)

func NewProjectRoutes(r *gin.Engine, prjc *controllers.ProjectController) {
	prjRoutes := r.Group("/api/projects")

	prjRoutes.Use(middleware.AccessTokenMiddleware())

	prjRoutes.GET("", prjc.FetchAllProjects)
	prjRoutes.GET("/project/:projectId", prjc.FetchProjectById)
	prjRoutes.POST("/import", prjc.ImportProjectWithGit)
}
