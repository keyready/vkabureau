package v1

import (
	"server/internal/api/controllers"
	"server/internal/api/middleware"

	"github.com/gin-gonic/gin"
)

func NewTaskRoutes(tc *controllers.TaskController, r *gin.Engine) {
	taskRoutes := r.Group("/api/tasks")
	taskRoutes.Use(middleware.SessionValidate())
	{
		taskRoutes.POST("/create", tc.CreateTask)
		taskRoutes.POST("/update", tc.UpdateTask)
		taskRoutes.GET("/:projectId", tc.FetchTaskForProjects)
		taskRoutes.POST("/join", tc.JoinToTask)
	}
}
