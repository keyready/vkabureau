package v1

import (
	"server/internal/api/controllers"

	"github.com/gin-gonic/gin"
)

func NewStatisticsRoutes(r *gin.Engine, sc *controllers.StatisticsController) {
	statRoutes := r.Group("/api/statistics")
	{
		statRoutes.GET("/overview", sc.Overview)
		statRoutes.GET("/tasks", sc.Tasks)
	}
}
