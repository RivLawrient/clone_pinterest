package user

import (
	"context"
	"pinterest_api/internal/config"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

type UserUsecase struct {
	DB             *gorm.DB
	Validate       *config.Validator
	UserRepository *UserRepository
}

func NewUserUsecase(db *gorm.DB, validate *config.Validator, userRepository *UserRepository) *UserUsecase {
	return &UserUsecase{
		DB:             db,
		Validate:       validate,
		UserRepository: userRepository,
	}
}

func (u *UserUsecase) RegisterByEmail(ctx context.Context, request *RegisterUserByEmailRequest) (*RegisterUserResponse, *fiber.Error) {
	tx := u.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	err := u.Validate.ValidateStruct(request)
	if err != nil {
		return nil, fiber.NewError(fiber.ErrBadRequest.Code, err[0])
	}

}
