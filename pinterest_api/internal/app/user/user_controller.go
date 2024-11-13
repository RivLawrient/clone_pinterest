package user

import (
	"pinterest_api/internal/model"
	"time"

	"github.com/gofiber/fiber/v2"
)

type UserController struct {
	UserUsecase *UserUsecase
}

func NewUserController(userUsecase *UserUsecase) *UserController {
	return &UserController{
		UserUsecase: userUsecase,
	}
}

func (c *UserController) RegisterByEmail(ctx *fiber.Ctx) error {
	request := new(RegisterUserByEmailRequest)

	err := ctx.BodyParser(request)
	if err != nil {
		error := fiber.ErrBadRequest
		return ctx.Status(error.Code).JSON(model.WebResponse[string]{
			StatusCode: error.Code,
			Errors:     "invalid request body",
		})
	}

	response, error := c.UserUsecase.RegisterByEmail(ctx.UserContext(), request)
	if error != nil {
		return ctx.Status(error.Code).JSON(model.WebResponse[string]{
			StatusCode: error.Code,
			Errors:     error.Message,
		})
	}

	cookie := new(fiber.Cookie)
	cookie.Name = "auth-token"
	cookie.Value = response.Token
	cookie.Expires = time.Now().Add(24 * time.Hour)
	cookie.HTTPOnly = true
	cookie.Secure = true

	ctx.Cookie(cookie)

	return ctx.JSON(model.WebResponse[*RegisterUserResponse]{
		StatusCode: ctx.Response().StatusCode(),
		Data:       response,
	})
}
