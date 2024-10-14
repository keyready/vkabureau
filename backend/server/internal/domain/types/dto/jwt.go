package dto

import (
	"github.com/golang-jwt/jwt/v5"
)

type JwtPayload struct {
	Login string `json:"login" bson:"login"`
}

type JwtClaims struct {
	Payload JwtPayload `json:"payload" bson:"payload"`
	jwt.RegisteredClaims
}
