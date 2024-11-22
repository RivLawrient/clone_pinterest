package post

import (
	"fmt"
	"net/http"
	"pinterest_api/internal/model"
	"strings"

	"github.com/gofiber/fiber/v2"
)

type PostController struct {
	PostUsecase *PostUsecase
}

func NewPostController(postUsecase *PostUsecase) *PostController {
	return &PostController{
		PostUsecase: postUsecase,
	}
}

func (c *PostController) HandleUploadImage(ctx *fiber.Ctx) error {
	auth := ctx.Cookies("auth-token")
	request := new(UploadPostRequest)

	err := ctx.BodyParser(request)
	if err != nil {
		error := fiber.ErrBadRequest
		return ctx.Status(error.Code).JSON(model.WebResponse[string]{
			StatusCode: error.Code,
			Errors:     "invalid request body",
		})
	}

	if !strings.HasPrefix(request.Image, ctx.Protocol()+"://"+ctx.Hostname()+"/img/") {
		error := fiber.ErrBadRequest
		return ctx.Status(error.Code).JSON(model.WebResponse[string]{
			StatusCode: error.Code,
			Errors:     "image is invalids",
		})
	}

	link, errs := http.Get(request.Image)
	if errs != nil {
		fmt.Println("Error:", errs)
		error := fiber.ErrBadRequest
		return ctx.Status(error.Code).JSON(model.WebResponse[string]{
			StatusCode: error.Code,
			Errors:     "image is invalid",
		})
	}
	defer link.Body.Close()

	if link.StatusCode != http.StatusOK {
		fmt.Println("Status Code:", link.StatusCode)
		error := fiber.ErrBadGateway
		return ctx.Status(error.Code).JSON(model.WebResponse[string]{
			StatusCode: error.Code,
			Errors:     "image is invalid",
		})
	}

	response, error := c.PostUsecase.UploadImage(ctx.UserContext(), auth, *request)
	if error != nil {
		error := error
		return ctx.Status(error.Code).JSON(model.WebResponse[any]{
			StatusCode: error.Code,
			Data:       nil,
			Errors:     error.Message,
		})
	}

	return ctx.JSON(model.WebResponse[PostResponse]{
		StatusCode: ctx.Response().StatusCode(),
		Data:       *response,
	})
}

func (c *PostController) HandleShowImage(ctx *fiber.Ctx) error {
	auth := ctx.Cookies("auth-token")
	request := new(ShowPostRequest)

	if err := ctx.BodyParser(request); err != nil {
		error := fiber.ErrBadRequest
		return ctx.Status(error.Code).JSON(model.WebResponse[string]{
			StatusCode: error.Code,
			Errors:     "invalid request body",
		})
	}

	response, err := c.PostUsecase.ShowImage(ctx.UserContext(), request, auth)
	if err != nil {
		return ctx.Status(err.Code).JSON(model.WebResponse[any]{
			StatusCode: err.Code,
			Data:       nil,
			Errors:     err.Message,
		})
	}

	return ctx.JSON(model.WebResponse[PostResponse]{
		StatusCode: ctx.Response().StatusCode(),
		Data:       *response,
	})
}
