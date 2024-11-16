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

func (c *UserController) HandleRegisterByEmail(ctx *fiber.Ctx) error {
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

func (c *UserController) HandleLoginByEmail(ctx *fiber.Ctx) error {
	request := new(LoginUserByEmailRequest)

	err := ctx.BodyParser(request)
	if err != nil {
		error := fiber.ErrBadRequest
		return ctx.Status(error.Code).JSON(model.WebResponse[string]{
			StatusCode: error.Code,
			Errors:     "invalid request body",
		})
	}

	response, error := c.UserUsecase.LoginByEmail(ctx.UserContext(), request)
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

	return ctx.JSON(model.WebResponse[*LoginUserResponse]{
		StatusCode: ctx.Response().StatusCode(),
		Data:       response,
	})
}

func (c *UserController) HandleGoogleRedirect(ctx *fiber.Ctx) error {
	url := c.UserUsecase.GoogleHandle()

	return ctx.Redirect(url)
}

func (c *UserController) HandleGoogleCallback(ctx *fiber.Ctx) error {
	code := ctx.FormValue("code")

	hasil, err := c.UserUsecase.GoogleCallback(ctx.UserContext(), code)
	if err != nil {
		return ctx.Redirect("http://127.0.0.1:3000")
	}

	cookie := new(fiber.Cookie)
	cookie.Name = "auth-token"
	cookie.Value = hasil.Token
	cookie.Expires = time.Now().Add(24 * time.Hour)
	cookie.HTTPOnly = true
	cookie.Secure = true
	ctx.Cookie(cookie)

	return ctx.Redirect("http://127.0.0.1:3000")
}

func (c *UserController) GetUser(ctx *fiber.Ctx) error {
	auth := ctx.Cookies("auth-token")

	response, err := c.UserUsecase.Verify(ctx.UserContext(), auth)
	if err != nil {
		error := err
		return ctx.Status(error.Code).JSON(model.WebResponse[any]{
			StatusCode: error.Code,
			Data:       nil,
			Errors:     error.Message,
		})
	}

	return ctx.JSON(model.WebResponse[UserResponse]{
		StatusCode: ctx.Response().StatusCode(),
		Data:       *response,
	})
}

func (c *UserController) Logout(ctx *fiber.Ctx) error {
	ctx.ClearCookie("auth-token")

	return nil
}
