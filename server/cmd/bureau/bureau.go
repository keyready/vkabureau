package main

import (
	"context"
	"log"
	"net/http"
	"os/signal"
	"server/cmd"
	"server/internal/api/routes"
	"server/internal/authorizer"
	"server/internal/mongoose"
	"syscall"
	"time"
)

func main() {

	ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGTERM, syscall.SIGINT)
	defer stop()

	serviceConfig := cmd.Execute()

	mongodb, err := mongoose.MongoConnect(
		ctx,
		&serviceConfig.Database,
		&serviceConfig.Migrations,
	)
	if err != nil {
		log.Fatalln(err)
	}

	authorizer := authorizer.New(&serviceConfig.Authorizer)

	appHandlers := routes.InitRoutes(mongodb, authorizer)

	httpServer := &http.Server{
		Addr:    serviceConfig.Server.Address,
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
