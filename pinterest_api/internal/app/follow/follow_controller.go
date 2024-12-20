package follow

import (
	"pinterest_api/internal/app/user"
	"pinterest_api/internal/model"

	"github.com/gofiber/fiber/v2"
)

type FollowController struct {
	FollowUsecase *FollowUsecase
	UserUsecase   *user.UserUsecase
}

func NewFollowController(followUsecase *FollowUsecase, userUsecase *user.UserUsecase) *FollowController {
	return &FollowController{
		FollowUsecase: followUsecase,
		UserUsecase:   userUsecase,
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

func (c *FollowController) HandleUnFollowUser(ctx *fiber.Ctx) error {
	auth := ctx.Cookies("auth-token")
	username := ctx.Params("username")

	response, err := c.FollowUsecase.UnFollowUser(ctx.UserContext(), auth, username)
	if err != nil {
		return ctx.Status(err.Code).JSON(model.WebResponse[any]{
			StatusCode: err.Code,
			Data:       nil,
			Errors:     err.Message,
		})
	}

	return ctx.JSON(model.WebResponse[UnFollowResponse]{
		StatusCode: ctx.Response().StatusCode(),
		Data:       *response,
	})
}

func (c *FollowController) HandleShowFollowByUsername(ctx *fiber.Ctx) error {
	auth := ctx.Cookies("auth-token")
	username := ctx.Params("username")

	response, err := c.FollowUsecase.ShowFollowByUsername(ctx.UserContext(), auth, username)
	if err != nil {
		return ctx.Status(err.Code).JSON(model.WebResponse[any]{
			StatusCode: err.Code,
			Data:       nil,
			Errors:     err.Message,
		})
	}

	return ctx.JSON(model.WebResponse[user.UserOtherResponse]{
		StatusCode: ctx.Response().StatusCode(),
		Data:       *response,
	})
}
