package comment

import (
	"pinterest_api/internal/model"

	"github.com/gofiber/fiber/v2"
)

type CommentController struct {
	CommentUsecase *CommentUsecase
}

func NewCommentController(commentUsecase *CommentUsecase) *CommentController {
	return &CommentController{
		CommentUsecase: commentUsecase,
	}
}

func (c *CommentController) HandleAddComment(ctx *fiber.Ctx) error {
	auth := ctx.Cookies("auth-token")
	postId := ctx.Params("postid")

	request := new(CommentRequest)

	err := ctx.BodyParser(request)
	if err != nil {
		error := fiber.ErrBadRequest
		return ctx.Status(error.Code).JSON(model.WebResponse[string]{
			StatusCode: error.Code,
			Errors:     "invalid request body",
		})
	}

	response, error := c.CommentUsecase.AddComment(ctx.UserContext(), auth, postId, request)
	if error != nil {
		return ctx.Status(error.Code).JSON(model.WebResponse[string]{
			StatusCode: error.Code,
			Errors:     error.Message,
		})
	}

	return ctx.JSON(model.WebResponse[CommentResponse]{
		StatusCode: ctx.Response().StatusCode(),
		Data:       *response,
	})
}
