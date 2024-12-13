package post

import (
	"fmt"
	"net/http"
	"pinterest_api/internal/app/follow"
	"pinterest_api/internal/app/user"
	"pinterest_api/internal/model"
	"strings"

	"github.com/gofiber/fiber/v2"
)

type PostController struct {
	PostUsecase   *PostUsecase
	FollowUsecase *follow.FollowUsecase
	UserUsecase   *user.UserUsecase
}

func NewPostController(postUsecase *PostUsecase, followUsecase *follow.FollowUsecase, userUsecase *user.UserUsecase) *PostController {
	return &PostController{
		FollowUsecase: followUsecase,
		PostUsecase:   postUsecase,
		UserUsecase:   userUsecase,
	}
}

func (c *PostController) HandleUpload(ctx *fiber.Ctx) error {
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

	response, error := c.PostUsecase.Upload(ctx.UserContext(), auth, *request)
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

func (c *PostController) HandleShowRandomList(ctx *fiber.Ctx) error {
	auth := ctx.Cookies("auth-token")

	response, err := c.PostUsecase.ShowRandomList(ctx.UserContext(), auth)
	if err != nil {
		return ctx.Status(err.Code).JSON(model.WebResponse[any]{
			StatusCode: err.Code,
			Data:       nil,
			Errors:     err.Message,
		})
	}

	return ctx.JSON(model.WebResponse[[]ListPost]{
		StatusCode: ctx.Response().StatusCode(),
		Data:       *response,
	})
}

func (c *PostController) HandleShowDetail(ctx *fiber.Ctx) error {
	auth := ctx.Cookies("auth-token")
	postId := ctx.Params("postId")

	response, err := c.PostUsecase.ShowDetail(ctx.UserContext(), postId, auth)
	if err != nil {
		return ctx.Status(err.Code).JSON(model.WebResponse[any]{
			StatusCode: err.Code,
			Data:       nil,
			Errors:     err.Message,
		})
	}

	return ctx.JSON(model.WebResponse[DetailPost]{
		StatusCode: ctx.Response().StatusCode(),
		Data:       *response,
	})
}

func (c *PostController) HandleListByUsername(ctx *fiber.Ctx) error {
	// auth := ctx.Cookies("auth-token")
	// username := ctx.Params("username")

	// post, err := c.PostUsecase.ShowListPostByUsername(ctx.UserContext(), username, auth)
	// if err != nil {
	// 	return ctx.Status(err.Code).JSON(model.WebResponse[any]{
	// 		StatusCode: err.Code,
	// 		Data:       nil,
	// 		Errors:     err.Message,
	// 	})
	// }

	// saved, err := c.PostUsecase.ShowListSavedByUsername(ctx.UserContext(), username, auth)
	// if err != nil {
	// 	return ctx.Status(err.Code).JSON(model.WebResponse[any]{
	// 		StatusCode: err.Code,
	// 		Data:       nil,
	// 		Errors:     err.Message,
	// 	})
	// }

	// return ctx.JSON(model.WebResponse[ListPostandSaved]{
	// 	StatusCode: ctx.Response().StatusCode(),
	// 	Data: ListPostandSaved{
	// 		Posted: *post,
	// 		Saved:  *saved,
	// 	},
	// })
	return fiber.ErrBadRequest
}
