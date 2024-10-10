package e

type ValidationError struct {
	Message string
}

func (e *ValidationError) Error() string {
	return e.Message
}

type DatabaseError struct {
	Message string
}

func (e *DatabaseError) Error() string {
	return e.Message
}

type ServerError struct {
	Message string
}

func (e *ServerError) Error() string {
	return e.Message
}
