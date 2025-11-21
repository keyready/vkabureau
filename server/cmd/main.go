package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os/signal"
	"server/internal/api/routes"
	"server/internal/mongoose"
	"syscall"
	"time"

	"github.com/joho/godotenv"
)

func main() {
	_ = godotenv.Load()

	ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGTERM, syscall.SIGINT)
	defer stop()

	mongodb := mongoose.MongoConnect()

	appHandlers := routes.InitRoutes(mongodb)

	serverPort := fmt.Sprintf(":%d", 2869)
	httpServer := &http.Server{
		Addr:    serverPort,
		Handler: appHandlers,
	}

	go func() {
		if err := httpServer.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("listen: %v", err)
		}
	}()

	<-ctx.Done()

	stop()
	log.Println("shutting down gracefully, press Ctrl+C again to force")

	shutdownCtx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()
	if shutdownErr := httpServer.Shutdown(shutdownCtx); shutdownErr != nil {
		log.Fatal("Server forced shutdown: ", shutdownErr)
	}

	log.Println("Server existing")
}
