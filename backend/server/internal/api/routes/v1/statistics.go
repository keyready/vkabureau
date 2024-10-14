package v1

import (
	"github.com/gin-gonic/gin"
	"server/internal/api/controllers"
	"server/internal/api/middleware"
)

func NewStatisticsRoutes(r *gin.Engine, sc *controllers.StatisticsController) {
	statRoutes := r.Group("/api/statistics")

	statRoutes.Use(middleware.SessionValidate())

	statRoutes.GET("/overview", sc.Overview)
	statRoutes.GET("/tasks", sc.Tasks)
}
