package middleware

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"server/pkg/err"
	"server/pkg/helpers"
	"strings"
)

func SessionValidate() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		authHeader := ctx.Request.Header.Get("Authorization")
		if authHeader == "" {
			err.ErrorHandler(ctx, fmt.Errorf("Auth token not found"))
		}

		authToken := strings.Split(authHeader, " ")[1]

		claims, _ := helpers.ValidateToken(authToken)

		ctx.Set("login", claims.Payload.Login)
		ctx.Next()
	}
}
