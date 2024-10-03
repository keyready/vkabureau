package v1

import (
	"backend/internal/controllers"
	"backend/internal/middleware"
	"github.com/gin-gonic/gin"
)

func NewRepoRoutes(r *gin.Engine, rc *controllers.RepoController) {
	repoRoutes := r.Group("/api/repos")

	repoRoutes.Use(middleware.AccessTokenMiddleware())

	repoRoutes.GET("/public", rc.FetchPublicRepos)
	repoRoutes.GET("/private", rc.FetchPrivateRepos)

}
