package v1

import (
	"github.com/gin-gonic/gin"
	"server/internal/api/controllers"
	"server/internal/api/middleware"
)

func NewUserRoutes(r *gin.Engine, uc *controllers.UserController) {
	userRoutes := r.Group("/api/user")

	userRoutes.POST("/sign-up", uc.SignUp)
	userRoutes.POST("/login", uc.Login)
	userRoutes.GET("/profile/:login", middleware.SessionValidate(), uc.Profile)
	userRoutes.GET("/userData", middleware.SessionValidate(), uc.UserData)
	userRoutes.PATCH("/change", middleware.SessionValidate(), uc.ChangeProfile)
}
