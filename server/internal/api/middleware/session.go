package middleware

import (
	"fmt"
	"server/internal/authorizer"
	"server/internal/domain/types/e"
	"server/pkg/err"
	"strings"

	"github.com/gin-gonic/gin"
)

func SessionValidate(authorizer *authorizer.Authorizer) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		authHeader := ctx.Request.Header.Get("Authorization")
		if authHeader == "" {
			err.ErrorHandler(
				ctx,
				&e.ValidationError{
					Message: "Auth header not set",
				},
			)
		}

		token := strings.Split(authHeader, " ")[1]
		if token == "" {
			err.ErrorHandler(
				ctx,
				&e.ValidationError{
					Message: "Auth token not found",
				},
			)
		}

		claims, validErr := authorizer.Authorizer.ValidateToken(token)
		if validErr != nil {
			err.ErrorHandler(
				ctx,
				&e.ValidationError{
					Message: fmt.Sprintf("Valid token error: %v", validErr),
				},
			)
		}

		ctx.Set("login", claims.Payload.Login)

		ctx.Next()
	}
}
