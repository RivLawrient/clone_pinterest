package user

import (
	"context"
	"fmt"
	"pinterest_api/internal/config"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
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

	if err := u.UserRepository.FindByEmail(tx, new(User), request.Email); err == nil {
		return nil, fiber.NewError(fiber.ErrBadRequest.Code, "Email is already used")
	}

	password := new(string)
	hash, errBc := bcrypt.GenerateFromPassword([]byte(request.Password), bcrypt.DefaultCost)
	if errBc != nil {
		return nil, fiber.NewError(fiber.ErrBadRequest.Code, errBc.Error())
	}
	*password = string(hash)

	baseUsername := strings.Split(request.Email, "@")[0]
	username := baseUsername
	counter := 1

	// Loop sampai menemukan username yang belum ada
	for u.UserRepository.FindByUsername(tx, new(User), username) == nil {
		username = fmt.Sprintf("%s%d", baseUsername, counter)
		counter++
	}

	user := &User{
		ID:         uuid.New().String(),
		Username:   username,
		FirstName:  string(request.Email[0]),
		LastName:   new(string),
		Email:      request.Email,
		Password:   password,
		IsGoogle:   false,
		IsFacebook: false,
		BirthDate:  0,
		ProfileImg: "",
		Token:      uuid.New().String(),
	}

	if err := u.UserRepository.Create(tx, user); err != nil {
		return nil, fiber.NewError(fiber.ErrBadRequest.Code, strings.Split(err.Error(), ": ")[1])
	}

	if err := tx.Commit().Error; err != nil {
		fmt.Printf("Failed commit transaction : %+v", err)
		return nil, fiber.NewError(fiber.ErrInternalServerError.Code, "Something wrong")
	}

	return &RegisterUserResponse{
		Id:         user.ID,
		Username:   user.Username,
		FirstName:  user.FirstName,
		LastName:   *user.LastName,
		Email:      user.Email,
		IsGoogle:   user.IsGoogle,
		IsFacebook: user.IsFacebook,
		BirthDate:  time.UnixMilli(user.BirthDate),
		ProfileImg: user.ProfileImg,
		Token:      user.Token,
		CreatedAt:  time.UnixMilli(user.CreatedAt),
	}, nil
}
