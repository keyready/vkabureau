package v1

import (
	"github.com/gin-gonic/gin"
	"server/internal/api/controllers"
	"server/internal/api/middleware"
)

func NewForumRoutes(r *gin.Engine, fc *controllers.ForumController) {
	forumRoutes := r.Group("/api/forums")

	forumRoutes.Use(middleware.SessionValidate())

	forumRoutes.GET("", fc.MyForums)
	forumRoutes.GET("/:forumId", fc.FetchOneForum)
	forumRoutes.POST("/message/send", fc.SendMessage)
	forumRoutes.GET("/messenger/:forumId", fc.FetchAllMessages)

}
