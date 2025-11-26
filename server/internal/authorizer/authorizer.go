package authorizer

import (
	"time"

	"github.com/golang-jwt/jwt/v5"
)

type JWT struct {
	config *Config
}

func New(cfg *Config) *Authorizer {
	jwtService := &JWT{
		config: cfg,
	}

	return &Authorizer{
		Authorizer: jwtService,
	}
}

func (j *JWT) GenerateToken(payload Payload) (string, error) {
	jwtClaims := &Claims{
		Payload: payload,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(1 * time.Hour)),
		},
	}

	accessToken, _ := jwt.NewWithClaims(
		jwt.SigningMethodHS256, jwtClaims,
	).SignedString(
		[]byte(j.config.AccessSecretKey),
	)

	return accessToken, nil
}

func (j *JWT) ValidateToken(tokenString string) (*Claims, error) {
	claims := &Claims{}
	token, jwtError := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte(j.config.AccessSecretKey), nil
	})

	if jwtError != nil {
		return nil, jwt.ErrTokenInvalidClaims
	}

	if !token.Valid || claims.ExpiresAt.Before(time.Now()) {
		return nil, jwt.ErrTokenExpired
	}

	return claims, nil
}
