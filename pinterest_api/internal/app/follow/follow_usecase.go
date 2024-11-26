package follow

import (
	"context"
	"pinterest_api/internal/app/user"
	"pinterest_api/internal/config"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/spf13/viper"
	"gorm.io/gorm"
)

type FollowUsecase struct {
	DB               *gorm.DB
	Validate         *config.Validator
	FollowRepository *FollowRepository
	UserUsecase      *user.UserUsecase
	UserRepository   *user.UserRepository
	Viper            *viper.Viper
}

func NewFollowUsecase(db *gorm.DB, validate *config.Validator, followRepository *FollowRepository, userUsecase *user.UserUsecase, userRepository *user.UserRepository, viper *viper.Viper) *FollowUsecase {
	return &FollowUsecase{
		DB:               db,
		Validate:         validate,
		FollowRepository: followRepository,
		UserUsecase:      userUsecase,
		UserRepository:   userRepository,
		Viper:            viper,
	}
}

func (f *FollowUsecase) FollowUser(ctx context.Context, token string, username string) (*FollowResponse, *fiber.Error) {
	tx := f.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	me, err := f.UserUsecase.Verify(ctx, token)
	if err != nil {
		return nil, err
	}

	user := new(user.User)
	if err := f.UserRepository.FindByUsername(tx, user, username); err != nil {
		return nil, fiber.NewError(fiber.ErrInternalServerError.Code, "something wrong")
	}

	if err := f.FollowRepository.FindFollow(tx, &Follow{}, user.ID, me.Id); err == nil {
		return nil, fiber.NewError(fiber.ErrBadRequest.Code, "user already follow")
	}

	follow := new(Follow)
	follow.ID = uuid.New().String()
	follow.FollowerId = user.ID // yang difollow
	follow.FollowingId = me.Id  // yang ngefollow

	if err := f.FollowRepository.Create(tx, follow); err != nil {
		return nil, fiber.NewError(fiber.ErrBadRequest.Code, "something error")
	}

	if err := tx.Commit().Error; err != nil {
		return nil, fiber.NewError(fiber.ErrInternalServerError.Code, "something wrong")
	}

	return &FollowResponse{
		FollowerId:  follow.FollowerId,
		FollowingId: follow.FollowingId,
	}, nil
}

func (f *FollowUsecase) CountFollower(ctx context.Context, token string) (*FollowerCountResponse, *fiber.Error) {
	tx := f.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	me, err := f.UserUsecase.Verify(ctx, token)
	if err != nil {
		return nil, err
	}

	follows := new([]Follow)
	if err := f.FollowRepository.FindFollower(tx, new(Follow), follows, me.Id); err != nil {
		return nil, fiber.NewError(fiber.ErrNotFound.Code, "user not have follower")
	}

	if err := tx.Commit().Error; err != nil {
		return nil, fiber.NewError(fiber.ErrInternalServerError.Code, "something wrong")
	}
	length := len(*follows)
	return &FollowerCountResponse{
		Username:      me.Username,
		FollowerCount: length,
	}, nil
}

func (f *FollowUsecase) CountFollowerByUsername(ctx context.Context, token string, username string) (*FollowerCountResponse, *fiber.Error) {
	tx := f.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	_, err := f.UserUsecase.Verify(ctx, token)
	if err != nil {
		return nil, err
	}

	user := new(user.User)
	if err := f.UserRepository.FindByUsername(tx, user, username); err != nil {
		return nil, fiber.NewError(fiber.ErrInternalServerError.Code, "something wrong")
	}

	follows := new([]Follow)
	if err := f.FollowRepository.FindFollower(tx, new(Follow), follows, user.ID); err != nil {
		return nil, fiber.NewError(fiber.ErrNotFound.Code, "user not have follower")
	}

	if err := tx.Commit().Error; err != nil {
		return nil, fiber.NewError(fiber.ErrInternalServerError.Code, "something wrong")
	}
	length := len(*follows)
	return &FollowerCountResponse{
		Username:      user.Username,
		FollowerCount: length,
	}, nil
}
