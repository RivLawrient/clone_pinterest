package config

import (
	"github.com/gofiber/fiber/v2"
	"github.com/spf13/viper"
)

func NewFiber(config *viper.Viper) *fiber.App {
	var app = fiber.New(fiber.Config{
		AppName:   config.GetString("app.name"),
		Prefork:   config.GetBool("web.prefork"),
		BodyLimit: 20 * 1024 * 1024,
	})

	return app
}
