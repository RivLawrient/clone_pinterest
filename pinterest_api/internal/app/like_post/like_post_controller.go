package likePost

import (
	"pinterest_api/internal/model"

	"github.com/gofiber/fiber/v2"
)

type LikePostController struct {
	LikePostUsecase *LikePostUsecase
}

func NewLikePostController(likePostUsecase *LikePostUsecase) *LikePostController {
	return &LikePostController{
		LikePostUsecase: likePostUsecase,
	}
}

func (l *LikePostController) HandleLikeaPost(ctx *fiber.Ctx) error {
	auth := ctx.Cookies("auth-token")
	postId := ctx.Params("postid")

	response, err := l.LikePostUsecase.LikeaPost(ctx.UserContext(), auth, postId)
	if err != nil {
		return ctx.Status(err.Code).JSON(model.WebResponse[any]{
			StatusCode: err.Code,
			Data:       nil,
			Errors:     err.Message,
		})
	}

	return ctx.JSON(model.WebResponse[LikeaPostResponse]{
		StatusCode: ctx.Response().StatusCode(),
		Data:       *response,
	})
}

func (l *LikePostController) HandleUnLikeaPost(ctx *fiber.Ctx) error {
	auth := ctx.Cookies("auth-token")
	postId := ctx.Params("postid")

	response, err := l.LikePostUsecase.UnLikeaPost(ctx.UserContext(), auth, postId)
	if err != nil {
		return ctx.Status(err.Code).JSON(model.WebResponse[any]{
			StatusCode: err.Code,
			Data:       nil,
			Errors:     err.Message,
		})
	}

	return ctx.JSON(model.WebResponse[LikeaPostResponse]{
		StatusCode: ctx.Response().StatusCode(),
		Data:       *response,
	})
}
