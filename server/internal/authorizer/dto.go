package authorizer

import "github.com/golang-jwt/jwt/v5"

type Payload struct {
	Login string
}

type Claims struct {
	Payload Payload
	jwt.RegisteredClaims
}
