package route

import (
	"pinterest_api/internal/app/user"
	"pinterest_api/internal/model"

	"github.com/gofiber/fiber/v2"
)

type RouteConfig struct {
	App            *fiber.App
	UserController *user.UserController
}

func (c *RouteConfig) Setup() {
	// c.App.Use(cors.New(cors.Config{
	// 	AllowOrigins:     "https://lawrients.my.id",
	// 	AllowMethods:     "GET,POST,PUT,DELETE,OPTIONS",
	// 	AllowHeaders:     "Content-Type, Authorization, Origin, Accept",
	// 	AllowCredentials: true,
	// }))
	c.SetupGuestRoute()
	c.SetupAuthRoute()
	c.App.Use(func(ctx *fiber.Ctx) error {
		return ctx.Status(fiber.StatusNotFound).JSON(model.WebResponse[string]{
			StatusCode: fiber.StatusNotFound,
			Errors:     "Route is not found",
		})
	})
}

func (c *RouteConfig) SetupGuestRoute() {
	c.App.Post("/auth/register", c.UserController.RegisterByEmail)
	c.App.Post("/auth/login", c.UserController.LoginByEmail)
}

func (c *RouteConfig) SetupAuthRoute() {
}
