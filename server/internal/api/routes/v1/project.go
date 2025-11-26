package v1

import (
	"server/internal/api/controllers"
	"server/internal/api/middleware"
	"server/internal/authorizer"

	"github.com/gin-gonic/gin"
)

func NewProjectRoutes(
	r *gin.Engine,
	authorizer *authorizer.Authorizer,
	pc *controllers.ProjectController,
) {
	projectRoutes := r.Group("/api/projects")
	projectRoutes.Use(middleware.SessionValidate(authorizer))
	{
		projectRoutes.GET("/project/:projectId", pc.FetchProject)
		projectRoutes.DELETE("/:projectId/delete", pc.DeleteProject)
		projectRoutes.PUT("/:projectId/change", pc.ChangeProject)
		projectRoutes.GET("", pc.FetchAllProjects)
		projectRoutes.POST("/create", pc.CreateProject)
		projectRoutes.PUT("/:projectId/change", pc.ChangeProject)
		projectRoutes.GET("/own", pc.OwnProject)
		projectRoutes.POST("/like", pc.LikeProject)
	}
}
