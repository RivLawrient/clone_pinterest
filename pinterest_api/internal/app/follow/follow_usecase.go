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
		Username:    username,
		FollowingId: follow.FollowingId,
	}, nil
}

func (f *FollowUsecase) UnFollowUser(ctx context.Context, token string, username string) (*UnFollowResponse, *fiber.Error) {
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

	follow := new(Follow)
	if err := f.FollowRepository.FindFollow(tx, follow, user.ID, me.Id); err != nil {
		return nil, fiber.NewError(fiber.ErrBadRequest.Code, "user not following")
	}

	if err := f.FollowRepository.Remove(tx, follow); err != nil {
		return nil, fiber.NewError(fiber.ErrBadRequest.Code, "something error")
	}

	if err := tx.Commit().Error; err != nil {
		return nil, fiber.NewError(fiber.ErrInternalServerError.Code, "something wrong")
	}

	return &UnFollowResponse{
		Username:      username,
		UnFollowingId: me.Id,
	}, nil
}

func (f *FollowUsecase) ShowFollowByUsername(ctx context.Context, token string, username string) (*ShowFollowResponse, *fiber.Error) {
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

	follower := new([]Follow)
	if err := f.FollowRepository.FindFollower(tx, new(Follow), follower, me.Id); err != nil {
		return nil, fiber.NewError(fiber.ErrNotFound.Code, "user not have follower")
	}

	following := new([]Follow)
	if err := f.FollowRepository.FindFollower(tx, new(Follow), following, user.ID); err != nil {
		return nil, fiber.NewError(fiber.ErrNotFound.Code, "user not have follower")
	}

	if err := f.FollowRepository.FindFollow(tx, new(Follow), user.ID, me.Id); err != nil {
		if err := tx.Commit().Error; err != nil {
			return nil, fiber.NewError(fiber.ErrInternalServerError.Code, "something wrong")
		}

		return &ShowFollowResponse{
			Username:       &username,
			FollowingCount: len(*following),
			FollowerCount:  len(*follower),
			FollowStatus:   false,
		}, nil
	}

	if err := tx.Commit().Error; err != nil {
		return nil, fiber.NewError(fiber.ErrInternalServerError.Code, "something wrong")
	}

	return &ShowFollowResponse{
		Username:       &username,
		FollowingCount: len(*following),
		FollowerCount:  len(*follower),
		FollowStatus:   true,
	}, nil
}
