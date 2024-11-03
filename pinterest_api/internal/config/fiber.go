package config

import "github.com/gofiber/fiber/v2"

func NewFiber() *fiber.App {
	var app = fiber.New()

	return app
}
