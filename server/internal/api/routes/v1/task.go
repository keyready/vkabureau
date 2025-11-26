package v1

import (
	"server/internal/api/controllers"
	"server/internal/api/middleware"
	"server/internal/authorizer"

	"github.com/gin-gonic/gin"
)

func NewTaskRoutes(
	tc *controllers.TaskController,
	authorizer *authorizer.Authorizer,
	r *gin.Engine,
) {
	taskRoutes := r.Group("/api/tasks")
	taskRoutes.Use(middleware.SessionValidate(authorizer))
	{
		taskRoutes.POST("/create", tc.CreateTask)
		taskRoutes.PUT("/update", tc.UpdateTask)
		taskRoutes.GET("/:projectId", tc.FetchTaskForProjects)
		taskRoutes.POST("/join", tc.JoinToTask)
		taskRoutes.DELETE("/:taskId/delete", tc.DeleteTask)
	}
}
