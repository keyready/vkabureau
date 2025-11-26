package mongoose

import (
	"context"
	"fmt"

	_ "github.com/golang-migrate/migrate/v4/database/mongodb"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func MongoConnect(
	ctx context.Context,
	config *Config,
	migrationsCfg *MigrationConfig,
) (*mongo.Database, error) {
	clientOptions := options.Client().
		ApplyURI(config.ConnUri)

	mongoClient, mongoErr := mongo.Connect(ctx, clientOptions)
	if mongoErr != nil {
		return nil, fmt.Errorf("failed to connect mongo: %v", mongoErr)
	}

	mongoErr = mongoClient.Ping(ctx, nil)
	if mongoErr != nil {
		return nil, fmt.Errorf("failed to ping mongo: %v", mongoErr)
	}

	mongoClient.Database(config.DatabaseName).
		Collection("users").
		Indexes().
		CreateOne(context.Background(), mongo.IndexModel{
			Keys:    bson.D{{Key: "login"}},
			Options: options.Index().SetUnique(true),
		})

	// m, err := migrate.New(
	// 	migrationsCfg.DirUrl,
	// 	config.ConnUri,
	// )
	// if err != nil {
	// 	log.Fatalln("failed to init migrations: ", err.Error())
	// }

	// if migrationsCfg.Enable {
	// 	if err := m.Up(); err != nil && !errors.Is(err, migrate.ErrNoChange) {
	// 		log.Fatalln("failed to up migrations: ", err.Error())
	// 	}
	// } else {
	// 	if err := m.Down(); err != nil {
	// 		log.Fatalln("failed to down migrations: ", err.Error())
	// 	}
	// }

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
		mongoClient.Database(config.DatabaseName).
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

	return mongoClient.Database(config.DatabaseName), nil
}
