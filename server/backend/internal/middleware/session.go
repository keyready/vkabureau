package middleware

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"strings"
)

func AccessTokenMiddleware() gin.HandlerFunc {
	return func(ctx *gin.Context) {

		authHeader := ctx.GetHeader("authorization")
		if authHeader == "" {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "authorization header is empty"})
			return
		}

		token := strings.Split(authHeader, " ")[1]

		fmt.Sprintf("Auth header %s", token)

		ctx.Set("token", token)
		ctx.Next()
	}
}
