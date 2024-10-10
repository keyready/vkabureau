package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"server/internal/api/routes"
	"server/internal/mongoose"
)

func main() {

	mongodb := mongoose.MongoConnect()

	appHandlers := routes.InitRoutes(mongodb)

	serverPort := fmt.Sprintf(":%s", os.Getenv("SERVER_PORT"))
	server := &http.Server{
		Addr:    serverPort,
		Handler: appHandlers,
	}

	log.Fatal(server.ListenAndServe().Error())
}
