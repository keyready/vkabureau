package cmd

import (
	"log"
	"os"
	"server/internal/config"

	"github.com/spf13/cobra"
)

var serviceConfig *config.BureauConfig

var rootCmd = &cobra.Command{
	Use:     "./bureau",
	Short:   "",
	Long:    "",
	Version: "1.0.0",
	Run: func(cmd *cobra.Command, _ []string) {
		var parseErr error
		filePath, _ := cmd.Flags().GetString("config-path")
		serviceConfig, parseErr = config.FromFile(filePath)

		if parseErr != nil {
			log.Fatalln(parseErr)
		}
	},
}

func Execute() *config.BureauConfig {
	err := rootCmd.Execute()
	if err != nil {
		os.Exit(1)
	}
	return serviceConfig
}

func init() {
	flags := rootCmd.Flags()
	flags.StringP("config-path", "c", "configs/production.yaml", "Parse options from configuration file.")
}
