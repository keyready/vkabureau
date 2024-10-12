package v1

import (
	"github.com/gin-gonic/gin"
	"server/internal/api/controllers"
	"server/internal/api/middleware"
)

func NewTaskRoutes(tc *controllers.TaskController, r *gin.Engine) {
	taskRoutes := r.Group("/api/tasks")

	taskRoutes.Use(middleware.SessionValidate())

	taskRoutes.POST("/create", tc.CreateTask)
	taskRoutes.POST("/update", tc.UpdateTask)
	taskRoutes.GET("/:projectId", tc.FetchTaskForProjects)
}
