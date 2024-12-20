package likePost

import (
	"context"
	"pinterest_api/internal/app/user"
	"pinterest_api/internal/config"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type LikePostUsecase struct {
	DB                 *gorm.DB
	Validate           *config.Validator
	LikePostRepository *LikePostRepository
	UserUsecase        *user.UserUsecase
}

func NewLikePostUsecase(db *gorm.DB, validate *config.Validator, likePostRepository *LikePostRepository, userUsecase *user.UserUsecase) *LikePostUsecase {
	return &LikePostUsecase{
		DB:                 db,
		Validate:           validate,
		LikePostRepository: likePostRepository,
		UserUsecase:        userUsecase,
	}
}

func (l *LikePostUsecase) LikeaPost(ctx context.Context, token string, postId string) (*LikeaPostResponse, *fiber.Error) {
	tx := l.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	me, err := l.UserUsecase.VerifyToken(ctx, token)
	if err != nil {
		return nil, err
	}

	if err := l.Validate.Validate.Var(postId, "required,uuid"); err != nil {
		return nil, fiber.NewError(fiber.ErrBadRequest.Code, l.Validate.TranslateErrors(err))
	}

	if err := l.LikePostRepository.FindByUserIdAndPostId(tx, new(LikePost), me.Id, postId); err == nil {
		return nil, fiber.NewError(fiber.ErrBadRequest.Code, "post already liked")
	}

	likePost := &LikePost{
		ID:     uuid.New().String(),
		UserId: me.Id,
		PostId: postId,
	}

	if err := l.LikePostRepository.Create(tx, likePost); err != nil {
		return nil, fiber.NewError(fiber.ErrBadRequest.Code, "something wrong")
	}

	if err := tx.Commit().Error; err != nil {
		return nil, fiber.NewError(fiber.ErrInternalServerError.Code, "something wrong")
	}

	return &LikeaPostResponse{
		ID:        likePost.ID,
		PostId:    likePost.PostId,
		CreatedAt: time.UnixMilli(likePost.CreatedAt),
	}, nil
}

func (l *LikePostUsecase) UnLikeaPost(ctx context.Context, token string, postId string) (*LikeaPostResponse, *fiber.Error) {
	tx := l.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	me, err := l.UserUsecase.VerifyToken(ctx, token)
	if err != nil {
		return nil, err
	}

	if err := l.Validate.Validate.Var(postId, "required,uuid"); err != nil {
		return nil, fiber.NewError(fiber.ErrBadRequest.Code, l.Validate.TranslateErrors(err))
	}

	likePost := new(LikePost)
	if err := l.LikePostRepository.FindByUserIdAndPostId(tx, likePost, me.Id, postId); err != nil {
		return nil, fiber.NewError(fiber.ErrBadRequest.Code, "post is not liked")
	}

	if err := l.LikePostRepository.Remove(tx, likePost); err != nil {
		return nil, fiber.NewError(fiber.ErrBadRequest.Code, "something wrong")
	}

	if err := tx.Commit().Error; err != nil {
		return nil, fiber.NewError(fiber.ErrInternalServerError.Code, "something wrong")
	}

	return &LikeaPostResponse{
		ID:        likePost.ID,
		PostId:    likePost.PostId,
		CreatedAt: time.UnixMilli(likePost.CreatedAt),
	}, nil
}

func (l *LikePostUsecase) StatusLike(ctx context.Context, token string, postId string) bool {
	tx := l.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	me, err := l.UserUsecase.VerifyToken(ctx, token)
	if err != nil {
		return false
	}

	if err := l.Validate.Validate.Var(postId, "required,uuid"); err != nil {
		return false
	}

	likePost := new(LikePost)
	if err := l.LikePostRepository.FindByUserIdAndPostId(tx, likePost, me.Id, postId); err != nil {
		return false
	}

	if err := tx.Commit().Error; err != nil {
		return false
	}

	return true
}

func (l *LikePostUsecase) TotalLike(ctx context.Context, token string, postId string) int {
	tx := l.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	_, err := l.UserUsecase.VerifyToken(ctx, token)
	if err != nil {
		return 0
	}

	likePost := new([]LikePost)
	if err := l.LikePostRepository.FindByPostId(tx, new(LikePost), likePost, postId); err != nil {
		return 0
	}

	if err := tx.Commit().Error; err != nil {
		return 0
	}

	return len(*likePost)
}
