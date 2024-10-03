package v1

import (
	"backend/internal/controllers"
	"backend/internal/middleware"
	"github.com/gin-gonic/gin"
)

func NewTaskRoutes(r *gin.Engine, tc *controllers.TaskController) {
	taskRoutes := r.Group("/api/tasks")

	taskRoutes.Use(middleware.AccessTokenMiddleware())

	taskRoutes.POST("/create", tc.AddTask)
	taskRoutes.POST("/:taskId/change", tc.UpdateTask)
	taskRoutes.GET("/:projectId", tc.FetchAllTasksProject)
}
