package helpers

import (
	"github.com/golang-jwt/jwt/v5"
	"os"
	"server/internal/domain/types/dto"
	"time"
)

func GenerateAccessToken(jwtPayload dto.JwtPayload) (accessToken string) {
	jwtClaims := dto.JwtClaims{
		Payload: jwtPayload,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(1 * time.Hour)),
		},
	}

	accessToken, _ = jwt.NewWithClaims(jwt.SigningMethodHS256, jwtClaims).SignedString([]byte(os.Getenv("JWT_SECRET_KEY")))
	return accessToken
}

func ValidateToken(accessToken string) (claims *dto.JwtClaims, jwtError error) {
	token, jwtError := jwt.ParseWithClaims(accessToken, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("JWT_SECRET_KEY")), nil
	})

	if jwtError != nil {
		return nil, jwt.ErrTokenInvalidClaims
	}

	if !token.Valid || claims.ExpiresAt.Before(time.Now()) {
		return nil, jwt.ErrTokenExpired
	}

	return claims, nil
}
