package save

import (
	"pinterest_api/internal/model"

	"github.com/gofiber/fiber/v2"
)

type SaveController struct {
	SaveUsecase *SaveUsecase
}

func NewSaveController(saveUsecase *SaveUsecase) *SaveController {
	return &SaveController{
		SaveUsecase: saveUsecase,
	}
}

func (s *SaveController) HandleSavePost(ctx *fiber.Ctx) error {
	auth := ctx.Cookies("auth-token")
	postId := ctx.Params("postid")

	response, err := s.SaveUsecase.SavePost(ctx.UserContext(), auth, postId)
	if err != nil {
		return ctx.Status(err.Code).JSON(model.WebResponse[any]{
			StatusCode: err.Code,
			Data:       nil,
			Errors:     err.Message,
		})
	}

	return ctx.JSON(model.WebResponse[SaveResponse]{
		StatusCode: ctx.Response().StatusCode(),
		Data:       *response,
	})
}

func (s *SaveController) HandleUnSavePost(ctx *fiber.Ctx) error {
	auth := ctx.Cookies("auth-token")
	postId := ctx.Params("postid")

	response, err := s.SaveUsecase.UnSavePost(ctx.UserContext(), auth, postId)
	if err != nil {
		return ctx.Status(err.Code).JSON(model.WebResponse[any]{
			StatusCode: err.Code,
			Data:       nil,
			Errors:     err.Message,
		})
	}

	return ctx.JSON(model.WebResponse[SaveResponse]{
		StatusCode: ctx.Response().StatusCode(),
		Data:       *response,
	})
}
