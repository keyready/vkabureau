package mongoose

import (
	"context"
	"server/internal/domain/types/e"
	"server/pkg/err"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func MongoConnect() (mongoDB *mongo.Database) {
	var ctx *gin.Context
	connUri := "mongodb://admin:admin@mongodb:27017/"
	clientOptions := options.Client().ApplyURI(connUri)

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

	recoveryQuestions := []string{
		"Как зовут вашего лучшего друга/подругу детства?",
		"В каком городе вы впервые встретили своего супруга/супругу?",
		"Как называлась ваша первая школа?",
		"Какой была ваша первая работа?",
		"Какой у вас был первый мобильный телефон?",
		"Какое имя вы дали своему первому питомцу?",
		"Какую книгу вы прочитали первой в детстве?",
		"Какое прозвище вам дали в школе?",
		"Какую песню вы слушали чаще всего в подростковом возрасте?",
		"Как назывался ваш любимый ресторан/кафе, когда вы были подростком?",
	}

	for _, question := range recoveryQuestions {
		mongoClient.Database("vkalance").
			Collection("recovery_questions").
			UpdateOne(
				context.TODO(),
				bson.M{"question": question},
				bson.M{
					"$setOnInsert": bson.M{
						"question": question,
					},
				},
				options.Update().SetUpsert(true),
			)
	}
	return mongoClient.Database("vkalance")
}
