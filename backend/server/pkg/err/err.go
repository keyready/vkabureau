package err

import (
	"github.com/fatih/color"
	"github.com/gin-gonic/gin"
	"net/http"
	"server/internal/domain/types/e"
)

func ErrorHandler(c *gin.Context, currentError error) {
	switch err := currentError.(type) {

	case *e.ValidationError:
		color.New(color.FgYellow).Println("Validation Error:", err.Error())
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"Validation Error": err.Error()})

	case *e.DatabaseError:
		color.New(color.FgRed).Println("Database Error:", err.Error())
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"Database Error": err.Error()})

	case *e.ServerError:
		color.New(color.FgMagenta).Println("Server Error:", err.Error())
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"Server Error": err.Error()})

	default:
		color.New(color.FgCyan).Println("Unknown Error:", err.Error())
		c.AbortWithStatusJSON(http.StatusBadGateway, gin.H{"Unknown Error": err.Error()})
	}
}
