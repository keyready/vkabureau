package v1

import (
	"github.com/gin-gonic/gin"
	"server/internal/api/controllers"
	"server/internal/api/middleware"
)

func NewProjectRoutes(r *gin.Engine, pc *controllers.ProjectController) {
	projectRoutes := r.Group("/api/projects")

	projectRoutes.Use(middleware.SessionValidate())

	projectRoutes.GET("/project/:projectId", pc.FetchProject)
	projectRoutes.GET("", pc.FetchAllProjects)
	projectRoutes.POST("/create", pc.CreateProject)
	projectRoutes.POST("/update", pc.UpdateProject)
	projectRoutes.GET("/own", pc.OwnProject)
	projectRoutes.POST("/like", pc.LikeProject)
}
