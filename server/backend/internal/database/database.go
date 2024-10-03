package database

import (
	"backend/internal/models"
	"backend/pkg/settings"
	"fmt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func ConnectDatabase() *gorm.DB {
	dsn := fmt.Sprintf("host = %s port = %s user = %s password = %s dbname = %s sslmode=disable",
		settings.DatabaseSettings.Host,
		settings.DatabaseSettings.Port,
		settings.DatabaseSettings.User,
		settings.DatabaseSettings.Password,
		settings.DatabaseSettings.Dbname,
	)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	db.AutoMigrate(&models.UserModel{})
	db.AutoMigrate(&models.ProjectModel{})
	db.AutoMigrate(&models.CommitModel{})
	db.AutoMigrate(&models.TaskModel{})

	return db
}
