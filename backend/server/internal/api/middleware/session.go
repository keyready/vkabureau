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
		authHeader := ctx.GetHeader("Authorization")
		if authHeader == "" {
			err.ErrorHandler(ctx, fmt.Errorf("Auth token not found"))
		}

		authToken := strings.Split(authHeader, " ")[1]

		claims, jwtErr := helpers.ValidateToken(authToken)
		if jwtErr != nil {
			err.ErrorHandler(ctx, jwtErr)
		}

		ctx.Set("login", claims.Payload.Login)
		ctx.Next()
	}
}
