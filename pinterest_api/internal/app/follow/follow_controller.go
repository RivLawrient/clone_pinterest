package follow

import (
	"pinterest_api/internal/model"

	"github.com/gofiber/fiber/v2"
)

type FollowController struct {
	FollowUsecase *FollowUsecase
}

func NewFollowController(followUsecase *FollowUsecase) *FollowController {
	return &FollowController{
		FollowUsecase: followUsecase,
	}
}

func (c *FollowController) HandleFollowUser(ctx *fiber.Ctx) error {
	auth := ctx.Cookies("auth-token")
	username := ctx.Params("username")

	response, err := c.FollowUsecase.FollowUser(ctx.UserContext(), auth, username)
	if err != nil {
		return ctx.Status(err.Code).JSON(model.WebResponse[any]{
			StatusCode: err.Code,
			Data:       nil,
			Errors:     err.Message,
		})
	}

	return ctx.JSON(model.WebResponse[FollowResponse]{
		StatusCode: ctx.Response().StatusCode(),
		Data:       *response,
	})
}

func (c *FollowController) HandleCountController(ctx *fiber.Ctx) error {
	auth := ctx.Cookies("auth-token")

	response, err := c.FollowUsecase.CountFollower(ctx.UserContext(), auth)
	if err != nil {
		return ctx.Status(err.Code).JSON(model.WebResponse[any]{
			StatusCode: err.Code,
			Data:       nil,
			Errors:     err.Message,
		})
	}

	return ctx.JSON(model.WebResponse[FollowerCountResponse]{
		StatusCode: ctx.Response().StatusCode(),
		Data:       *response,
	})
}

func (c *FollowController) HandleCountFollowerByUsername(ctx *fiber.Ctx) error {
	auth := ctx.Cookies("auth-token")
	username := ctx.Params("username")

	response, err := c.FollowUsecase.CountFollowerByUsername(ctx.UserContext(), auth, username)
	if err != nil {
		return ctx.Status(err.Code).JSON(model.WebResponse[any]{
			StatusCode: err.Code,
			Data:       nil,
			Errors:     err.Message,
		})
	}

	return ctx.JSON(model.WebResponse[FollowerCountResponse]{
		StatusCode: ctx.Response().StatusCode(),
		Data:       *response,
	})
}
