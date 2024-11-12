package main

import (
	"fmt"
	"pinterest_api/internal"
	"pinterest_api/internal/config"
)

func main() {
	viperConfig := config.NewViper()
	db := config.NewDatabase(viperConfig)
	validate := config.NewValidator(viperConfig)
	app := config.NewFiber(viperConfig)

	internal.Bootstrap(&internal.BootstrapConfig{
		DB:       db,
		App:      app,
		Validate: validate,
		Config:   viperConfig,
	})

	webPort := viperConfig.GetInt("web.port")
	err := app.Listen(fmt.Sprintf(":%d", webPort))
	if err != nil {
		fmt.Printf("Failed to start server: %v", err)
	}
}
