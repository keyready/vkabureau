package config

import (
	"fmt"
	"server/internal/authorizer"
	"server/internal/mongoose"

	"github.com/spf13/viper"
)

type BureauConfig struct {
	Server struct {
		Address string `mapstructure:"address"`
	} `mapstructure:"server"`
	Database   mongoose.Config          `mapstructure:"database"`
	Authorizer authorizer.Config        `mapstructure:"authorizer"`
	Migrations mongoose.MigrationConfig `mapstructure:"migrations"`
}

func FromFile(filePath string) (*BureauConfig, error) {
	bureauConfig := &BureauConfig{}

	viperInstance := viper.New()
	viperInstance.AutomaticEnv()
	viperInstance.SetConfigFile(filePath)

	viperInstance.SetDefault("server.address", ":2869")

	viperInstance.SetDefault("database.connUri", "mongodb://admin:admin@mongodb:27017/")
	viperInstance.SetDefault("database.databaseName", "vkabureau")

	viperInstance.SetDefault("authorizer.accessSecretKey", "access-secret-key")

	viperInstance.SetDefault("migrations.enable", true)
	viperInstance.SetDefault("migrations.dirUrl", "file:///app/migrations")

	if err := viperInstance.ReadInConfig(); err != nil {
		return nil, fmt.Errorf("failed to read config file %s: %v", filePath, err)
	}

	if err := viperInstance.Unmarshal(bureauConfig); err != nil {
		return nil, fmt.Errorf("failed to unmarshaling config file %s: %v", filePath, err)
	}

	return bureauConfig, nil
}
