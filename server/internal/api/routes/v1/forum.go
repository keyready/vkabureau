package v1

import (
	"server/internal/api/controllers"
	"server/internal/api/middleware"
	"server/internal/authorizer"

	"github.com/gin-gonic/gin"
)

func NewForumRoutes(
	r *gin.Engine,
	authorizer *authorizer.Authorizer,
	fc *controllers.ForumController,
) {
	forumRoutes := r.Group("/api/forums")
	forumRoutes.Use(middleware.SessionValidate(authorizer))
	{
		forumRoutes.GET("", fc.MyForums)
		forumRoutes.GET("/:forumId", fc.FetchOneForum)
		forumRoutes.POST("/message/send", fc.SendMessage)
		forumRoutes.GET("/messenger/:forumId", fc.FetchAllMessages)
	}
}
