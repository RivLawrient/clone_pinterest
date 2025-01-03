package user

import (
	"fmt"
	"pinterest_api/internal/model"
	"strconv"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/spf13/viper"
)

type UserController struct {
	UserUsecase *UserUsecase
	Viper       *viper.Viper
}

func NewUserController(userUsecase *UserUsecase, viper *viper.Viper) *UserController {
	return &UserController{
		UserUsecase: userUsecase,
		Viper:       viper,
	}
}

func (c *UserController) HandleRegisterByEmail(ctx *fiber.Ctx) error {
	domain := c.Viper.GetString("frontend.domain")

	request := new(RegisterUserByEmailRequest)

	if err := ctx.BodyParser(request); err != nil {
		error := fiber.ErrBadRequest
		return ctx.Status(error.Code).JSON(model.WebResponse[string]{
			StatusCode: error.Code,
			Errors:     "invalid body request",
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
	cookie.Domain = strings.Split(domain, ":")[0]
	ctx.Cookie(cookie)

	return ctx.JSON(model.WebResponse[*RegisterUserResponse]{
		StatusCode: ctx.Response().StatusCode(),
		Data:       response,
	})
}

func (c *UserController) HandleLoginByEmail(ctx *fiber.Ctx) error {
	domain := c.Viper.GetString("frontend.domain")
	request := new(LoginUserByEmailRequest)

	if err := ctx.BodyParser(request); err != nil {
		error := fiber.ErrBadRequest
		return ctx.Status(error.Code).JSON(model.WebResponse[string]{
			StatusCode: error.Code,
			Errors:     "invalid body request",
		})
	}

	response, error := c.UserUsecase.LoginByEmail(ctx.UserContext(), request)
	if error != nil {
		return ctx.Status(error.Code).JSON(model.WebResponse[string]{
			StatusCode: error.Code,
			Errors:     error.Message,
		})
	}

	response.Id = ""

	cookie := new(fiber.Cookie)
	cookie.Name = "auth-token"
	cookie.Value = response.Token
	cookie.Expires = time.Now().Add(24 * time.Hour)
	cookie.HTTPOnly = true
	cookie.Domain = strings.Split(domain, ":")[0]
	ctx.Cookie(cookie)

	return ctx.JSON(model.WebResponse[*UserResponse]{
		StatusCode: ctx.Response().StatusCode(),
		Data:       response,
	})
}

func (c *UserController) HandleGoogleRedirect(ctx *fiber.Ctx) error {
	url := c.UserUsecase.GoogleRedirect()

	return ctx.Redirect(url)
}

func (c *UserController) HandleGoogleCallback(ctx *fiber.Ctx) error {
	domain := c.Viper.GetString("frontend.domain")
	protocol := c.Viper.GetString("frontend.protocol")
	code := ctx.FormValue("code")

	hasil, err := c.UserUsecase.GoogleCallback(ctx.UserContext(), code)
	if err != nil {
		return ctx.Redirect(fmt.Sprintf("%s://%s", protocol, domain))
	}

	cookie := new(fiber.Cookie)
	cookie.Name = "auth-token"
	cookie.Value = hasil.Token
	cookie.Expires = time.Now().Add(24 * time.Hour)
	cookie.HTTPOnly = true
	cookie.Domain = strings.Split(domain, ":")[0]
	ctx.Cookie(cookie)

	return ctx.Redirect(fmt.Sprintf("%s://%s", protocol, domain))
}

func (c *UserController) HandleGetUser(ctx *fiber.Ctx) error {
	auth := ctx.Cookies("auth-token")

	if auth == "" {
		error := fiber.ErrBadRequest
		return ctx.Status(error.Code).JSON(model.WebResponse[any]{
			StatusCode: error.Code,
			Data:       nil,
			Errors:     "auth-token cannot be empty",
		})
	}

	response, err := c.UserUsecase.GetUser(ctx.UserContext(), auth)
	if err != nil {
		error := err
		return ctx.Status(error.Code).JSON(model.WebResponse[any]{
			StatusCode: error.Code,
			Data:       nil,
			Errors:     error.Message,
		})
	}
	response.Id = ""

	return ctx.JSON(model.WebResponse[UserResponse]{
		StatusCode: ctx.Response().StatusCode(),
		Data:       *response,
	})
}

func (c *UserController) Logout(ctx *fiber.Ctx) error {

	domain := c.Viper.GetString("frontend.domain")
	cookie := new(fiber.Cookie)
	cookie.Name = "auth-token"
	cookie.Expires = time.Now().Add(-1 * time.Second)
	cookie.HTTPOnly = true
	cookie.Domain = strings.Split(domain, ":")[0]
	ctx.Cookie(cookie)

	return nil
}

func (c *UserController) HandleUpdateBirthDate(ctx *fiber.Ctx) error {
	auth := ctx.Cookies("auth-token")
	birthDate, err := strconv.ParseInt(ctx.Params("birth_date"), 10, 64)

	if err != nil {
		error := fiber.ErrBadRequest
		return ctx.Status(error.Code).JSON(model.WebResponse[string]{
			StatusCode: error.Code,
			Errors:     "invalid body request",
		})
	}

	response, error := c.UserUsecase.UpdateBirthDate(ctx.UserContext(), auth, birthDate)
	if error != nil {
		return ctx.Status(error.Code).JSON(model.WebResponse[any]{
			StatusCode: error.Code,
			Data:       nil,
			Errors:     error.Message,
		})
	}

	return ctx.JSON(model.WebResponse[*bool]{
		StatusCode: ctx.Response().StatusCode(),
		Data:       response,
	})
}

func (c *UserController) HandleUpdateUser(ctx *fiber.Ctx) error {
	auth := ctx.Cookies("auth-token")
	request := new(UpdateUserRequest)

	if err := ctx.BodyParser(request); err != nil {
		error := fiber.ErrBadRequest
		return ctx.Status(error.Code).JSON(model.WebResponse[string]{
			StatusCode: error.Code,
			Errors:     "invalid body request",
		})
	}
	protocol := c.Viper.GetString("backend.protocol")
	domain := c.Viper.GetString("backend.domain")

	if !strings.HasPrefix(request.ProfileImg, fmt.Sprintf("%s://%s/img/", protocol, domain)) && !strings.HasPrefix(request.ProfileImg, "https://lh3.googleusercontent.com") {
		error := fiber.ErrBadRequest
		return ctx.Status(error.Code).JSON(model.WebResponse[string]{
			StatusCode: error.Code,
			Errors:     "image is invalids",
		})
	}

	response, error := c.UserUsecase.UpdateUser(ctx.UserContext(), auth, *request)
	if error != nil {
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

func (c *UserController) HandleGetListByName(ctx *fiber.Ctx) error {
	name := ctx.Params("name")

	response, error := c.UserUsecase.GetListByName(ctx.UserContext(), name)
	if error != nil {
		return ctx.Status(error.Code).JSON(model.WebResponse[any]{
			StatusCode: error.Code,
			Data:       nil,
			Errors:     error.Message,
		})
	}

	return ctx.JSON(model.WebResponse[[]UserOtherResponse]{
		StatusCode: ctx.Response().StatusCode(),
		Data:       *response,
	})
}
