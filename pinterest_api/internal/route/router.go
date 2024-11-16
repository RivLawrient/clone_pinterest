package route

import (
	"pinterest_api/internal/app/user"
	"pinterest_api/internal/model"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

type RouteConfig struct {
	App            *fiber.App
	UserController *user.UserController
}

func (c *RouteConfig) Setup() {
	c.App.Use(cors.New(cors.Config{
		AllowOrigins:     "http://127.0.0.1:3000, http://127.0.0.1:4000",
		AllowMethods:     "GET,POST,PUT,DELETE,OPTIONS",
		AllowHeaders:     "Content-Type, Authorization, Origin, Accept",
		AllowCredentials: true,
	}))
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
	c.App.Post("/auth/register", c.UserController.HandleRegisterByEmail)
	c.App.Post("/auth/login", c.UserController.HandleLoginByEmail)
	c.App.Get("/auth/google", c.UserController.HandleGoogleRedirect)
	c.App.Get("/auth/google/callback", c.UserController.HandleGoogleCallback)
	c.App.Get("/bye", c.UserController.Logout)

	c.App.Get("/user", c.UserController.GetUser)
}

func (c *RouteConfig) SetupAuthRoute() {
}
