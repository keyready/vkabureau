package settings

import (
	"gopkg.in/ini.v1"
	"log"
)

type App struct {
	JwtAccessSecretKey  string
	JwtRefreshSecretKey string
	JwtMailSecretKey    string

	SmtpAddr     string
	SmtpPort     int
	SmtpUser     string
	SmtpPassword string

	GitHubClientId      string
	GitHubClientSecret  string
	GitHubTokenUrl      string
	GitHubAuthUrl       string
	GitHubDeviceAuthUrl string
	RedirectUri         string

	GitHubPrivateRepos string
	GitHubPublicRepos  string
	GitHubAllRepos     string

	BaseUrl string
}

type Database struct {
	User     string
	Password string
	Host     string
	Port     string
	Dbname   string
}

type Server struct {
	Port    string
	RunMode string
}

var DatabaseSettings = &Database{}
var ServerSettings = &Server{}

var AppSettings = &App{}

func Setup() {
	var err error
	cfg, err := ini.Load("./app.ini")
	if err != nil {
		log.Fatalf("package: settings; func: setup; err: %v", err)
	}

	mapTo(cfg, "database", DatabaseSettings)
	mapTo(cfg, "server", ServerSettings)
	mapTo(cfg, "app", AppSettings)
}

func mapTo(cfg *ini.File, section string, v interface{}) {
	err := cfg.Section(section).MapTo(v)
	if err != nil {
		log.Fatalf("Cfg.MapTo %s err: %v", section, err)
	}
}
