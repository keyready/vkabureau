package v1

import (
	"github.com/gin-gonic/gin"
	"server/internal/api/controllers"
	"server/internal/api/middleware"
)

func NewUserRoutes(r *gin.Engine, uc *controllers.UserController) {
	userRoutes := r.Group("/user")

	userRoutes.POST("/signup", uc.SignUp)
	userRoutes.POST("/login", uc.Login)
	userRoutes.GET("/profile/:login", middleware.SessionValidate(), uc.Profile)
	userRoutes.GET("/userData", middleware.SessionValidate(), uc.UserData)
}
