package main

import (
	"fmt"
	"log"
	"net/http"
	"server/internal/api/routes"
	"server/internal/mongoose"

	"github.com/joho/godotenv"
)

func main() {
	_ = godotenv.Load()

	mongodb := mongoose.MongoConnect()

	appHandlers := routes.InitRoutes(mongodb)

	serverPort := fmt.Sprintf(":%d", 2869)
	server := &http.Server{
		Addr:    serverPort,
		Handler: appHandlers,
	}

	log.Fatal(server.ListenAndServe().Error())
}
