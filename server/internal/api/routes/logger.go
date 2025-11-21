package routes

import (
	"fmt"
	"time"

	"github.com/gin-gonic/gin"
)

func LocalLogger(params gin.LogFormatterParams) string {
	errorMsg := "-"
	if params.ErrorMessage != "" {
		errorMsg = params.ErrorMessage
	}

	return fmt.Sprintf("\nIP: %s \nTime: [%s] \nCode|Method|Path: %d %s %s \n[ERROR]: %s \n",
		params.ClientIP,
		params.TimeStamp.Format(time.RFC1123),
		params.StatusCode,
		params.Method,
		params.Path,
		errorMsg,
	)
}
