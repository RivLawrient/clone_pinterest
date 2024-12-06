package comment

import (
	"context"
	"pinterest_api/internal/app/user"
	"pinterest_api/internal/config"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type CommentUsecase struct {
	DB                *gorm.DB
	Validate          *config.Validator
	CommentRepository *CommentRepository
	UserUsecase       *user.UserUsecase
}

func NewCommentUsecase(db *gorm.DB, validate *config.Validator, commentRepository *CommentRepository,
	userUsecase *user.UserUsecase) *CommentUsecase {
	return &CommentUsecase{
		DB:                db,
		Validate:          validate,
		CommentRepository: commentRepository,
		UserUsecase:       userUsecase,
	}
}

func (c *CommentUsecase) AddComment(ctx context.Context, token string, postId string, request *CommentRequest) (*CommentResponse, *fiber.Error) {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := c.Validate.Validate.Struct(request); err != nil {
		return nil, fiber.NewError(fiber.ErrBadRequest.Code, c.Validate.TranslateErrors(err))
	}

	me, err := c.UserUsecase.VerifyToken(ctx, token)
	if err != nil {
		return nil, err
	}

	comment := &Comment{
		ID:      uuid.New().String(),
		Comment: request.Comment,
		UserId:  me.ID,
		PostId:  postId,
	}

	if err := c.CommentRepository.Create(tx, comment); err != nil {
		return nil, fiber.NewError(fiber.ErrBadRequest.Code, "something wrong")
	}

	if err := tx.Commit().Error; err != nil {
		return nil, fiber.NewError(fiber.ErrInternalServerError.Code, "something wrong")
	}

	return &CommentResponse{
		Id:        comment.ID,
		Comment:   comment.Comment,
		PostId:    comment.PostId,
		CreatedAt: time.UnixMilli(comment.CreatedAt),
	}, nil
}

func (c *CommentUsecase) FindListByPost(ctx context.Context, postId string) *[]CommentResponse {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	listComment := []Comment{}
	if err := c.CommentRepository.FindByPostId(tx, new(Comment), &listComment, postId); err != nil {
		return &[]CommentResponse{}
	}

	commentResponses := []CommentResponse{}
	for _, comments := range listComment {

		commentResponse := CommentResponse{
			Id:        comments.ID,
			Comment:   comments.Comment,
			UserId:    &comments.UserId,
			PostId:    comments.PostId,
			CreatedAt: time.UnixMilli(comments.CreatedAt),
		}
		commentResponses = append(commentResponses, commentResponse)
	}

	if err := tx.Commit().Error; err != nil {
		return &[]CommentResponse{}
	}

	return &commentResponses
}
