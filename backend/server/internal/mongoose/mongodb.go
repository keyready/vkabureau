package mongoose

import (
	"context"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"os"
	"server/internal/domain/types/e"
	"server/pkg/err"
)

func MongoConnect() (mongoDB *mongo.Database) {
	var ctx *gin.Context
	clientOptions := options.Client().ApplyURI(os.Getenv("MONGO_URI"))

	mongoClient, mongoErr := mongo.Connect(context.TODO(), clientOptions)
	if mongoErr != nil {
		err.ErrorHandler(ctx, &e.DatabaseError{Message: mongoErr.Error()})
	}

	mongoErr = mongoClient.Ping(context.TODO(), nil)
	if mongoErr != nil {
		err.ErrorHandler(ctx, &e.DatabaseError{Message: mongoErr.Error()})
	}

	mongoClient.Database("vkalance").
		Collection("users").
		Indexes().
		CreateOne(context.Background(), mongo.IndexModel{
			Keys:    bson.D{{Key: "login"}},
			Options: options.Index().SetUnique(true),
		})

	return mongoClient.Database("vkalance")
}
