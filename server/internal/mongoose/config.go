package mongoose

type Config struct {
	ConnUri      string `mapstructure:"connUri"`
	DatabaseName string `mapstructure:"databaseName"`
}

type MigrationConfig struct {
	DirUrl string `mapstructure:"dirUrl"`
	Enable bool   `mapstructure:"enable"`
}
