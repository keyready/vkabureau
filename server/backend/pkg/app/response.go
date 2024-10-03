package app

import "github.com/gin-gonic/gin"

type Gin struct {
	Ctx *gin.Context
}

func (g *Gin) SuccessResponse(httpCode int, data interface{}) {
	g.Ctx.JSON(httpCode, data)
	return
}

func (g *Gin) ErrorResponse(httpCode int, err error) {
	g.Ctx.JSON(httpCode, gin.H{"error": err.Error()})
	return
}
