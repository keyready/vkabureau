package v1

import (
	"backend/internal/controllers"
	"backend/internal/middleware"
	"github.com/gin-gonic/gin"
)

func NewCommitRoutes(r *gin.Engine, cc *controllers.CommitController) {
	commitRoutes := r.Group("/api/commits")

	commitRoutes.Use(middleware.AccessTokenMiddleware())

	commitRoutes.GET("", cc.FetchAllCommitsWithProjects)
}
