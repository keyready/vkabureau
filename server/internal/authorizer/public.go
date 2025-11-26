package authorizer

type Authorizer struct {
	Authorizer IAuthorizer
}

type IAuthorizer interface {
	GenerateToken(payload Payload) (string, error)
	ValidateToken(tokenString string) (*Claims, error)
}
