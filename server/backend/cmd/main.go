package main

import (
	"backend/internal/database"
	"backend/internal/routes"
	"backend/pkg/settings"
	"fmt"
	"log"
	"net/http"
)

func init() {
	settings.Setup()
}

func main() {
	db := database.ConnectDatabase()

	router := routes.InitRouter(db)

	addr := fmt.Sprintf(":%s", settings.ServerSettings.Port)
	server := &http.Server{
		Addr:    addr,
		Handler: router,
	}

	log.Fatal(server.ListenAndServe().Error())
}
