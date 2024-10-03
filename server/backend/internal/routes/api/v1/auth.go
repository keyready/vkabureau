package v1

import (
	"backend/internal/controllers"
	"github.com/gin-gonic/gin"
)

func NewAuthRoutes(r *gin.Engine, ar *controllers.AuthController) {
	authRoutes := r.Group("/api")

	authRoutes.POST("/login", ar.Authorize)
}
