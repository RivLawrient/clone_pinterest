package comment

import (
	"context"
	"pinterest_api/internal/app/user"
	"pinterest_api/internal/config"

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

func (c *CommentUsecase) AddComment(ctx context.Context, token string, request *CommentRequest) (*CommentResponse, *fiber.Error) {
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
		PostId:  request.PostId,
	}

	if err := c.CommentRepository.Create(tx, comment); err != nil {
		return nil, fiber.NewError(fiber.ErrBadRequest.Code, "something wrong")
	}

	if err := tx.Commit().Error; err != nil {
		return nil, fiber.NewError(fiber.ErrInternalServerError.Code, "something wrong")
	}

	return &CommentResponse{
		Id:         comment.ID,
		Comment:    comment.Comment,
		Username:   me.Username,
		ProfileImg: *me.ProfileImg,
		CreatedAt:  comment.CreatedAt,
	}, nil
}

func (c *CommentUsecase) ListCommentByPost(ctx context.Context, postId string) *[]ListComment {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	comment := []ListComment{}
	c.CommentRepository.FindByPostId(tx, &comment, postId)

	tx.Commit()

	return &comment
}
