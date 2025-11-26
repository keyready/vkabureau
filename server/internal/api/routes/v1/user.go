package v1

import (
	"server/internal/api/controllers"
	"server/internal/api/middleware"
	"server/internal/authorizer"

	"github.com/gin-gonic/gin"
)

func NewUserRoutes(
	r *gin.Engine,
	authorizer *authorizer.Authorizer,
	uc *controllers.UserController,
) {
	userRoutes := r.Group("/api/user")
	{
		userRoutes.POST("/sign-up", uc.SignUp)
		userRoutes.POST("/login", uc.Login)
		userRoutes.GET("/recoveryQuestions", uc.GetRecoveryQuestions)
		userRoutes.GET("/profile/:login", middleware.SessionValidate(authorizer), uc.Profile)
		userRoutes.GET("/userData", middleware.SessionValidate(authorizer), uc.UserData)
		userRoutes.PUT("/change", middleware.SessionValidate(authorizer), uc.ChangeProfile)
	}
}
