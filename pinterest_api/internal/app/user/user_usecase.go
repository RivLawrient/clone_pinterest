package user

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"pinterest_api/internal/config"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/spf13/viper"
	"golang.org/x/crypto/bcrypt"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"gorm.io/gorm"
)

type UserUsecase struct {
	DB             *gorm.DB
	Validate       *config.Validator
	UserRepository *UserRepository
	Viper          *viper.Viper
}

func NewUserUsecase(db *gorm.DB, validate *config.Validator, userRepository *UserRepository, viper *viper.Viper) *UserUsecase {
	return &UserUsecase{
		DB:             db,
		Validate:       validate,
		UserRepository: userRepository,
		Viper:          viper,
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

func (u *UserUsecase) LoginByEmail(ctx context.Context, request *LoginUserByEmailRequest) (*LoginUserResponse, *fiber.Error) {
	tx := u.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	err := u.Validate.ValidateStruct(request)
	if err != nil {
		return nil, fiber.NewError(fiber.ErrBadRequest.Code, err[0])
	}

	user := new(User)
	if err := u.UserRepository.FindByEmail(tx, user, request.Email); err != nil {
		return nil, fiber.NewError(fiber.ErrBadRequest.Code, "Email is Password is invalid")
	}

	if err := bcrypt.CompareHashAndPassword([]byte(*user.Password), []byte(request.Password)); err != nil {
		return nil, fiber.NewError(fiber.ErrBadRequest.Code, "Email or Password is invalid")
	}

	user.Token = uuid.New().String()

	if err := u.UserRepository.Update(tx, user); err != nil {
		return nil, fiber.NewError(fiber.ErrBadRequest.Code, strings.Split(err.Error(), ": ")[1])
	}

	if err := tx.Commit().Error; err != nil {
		return nil, fiber.NewError(fiber.ErrInternalServerError.Code, "Something wrong")
	}

	return &LoginUserResponse{
		Email: user.Email,
		Token: *user.Password,
	}, nil
}

var (
	googleOauthConfig = &oauth2.Config{
		RedirectURL:  "http://127.0.0.1:4000/auth/google/callback",
		ClientID:     "",
		ClientSecret: "",
		Scopes: []string{"https://www.googleapis.com/auth/userinfo.email",
			"https://www.googleapis.com/auth/userinfo.profile"},
		Endpoint: google.Endpoint,
	}
)

func (u *UserUsecase) RegisterGoogleHandle() string {
	googleOauthConfig.ClientID = u.Viper.GetString("google.clientId")
	googleOauthConfig.ClientSecret = u.Viper.GetString("google.clientSecret")
	return googleOauthConfig.AuthCodeURL("state")
}

func (u *UserUsecase) RegisterGoogleCallback(code string) (any, *fiber.Error) {
	token, err := googleOauthConfig.Exchange(context.Background(), code)
	if err != nil {
		return nil, fiber.NewError(fiber.ErrBadRequest.Code, "")
	}

	response, err := http.Get("https://www.googleapis.com/oauth2/v2/userinfo?access_token=" + token.AccessToken)
	if err != nil {
		return nil, fiber.NewError(fiber.ErrBadRequest.Code, err.Error())
	}

	body, err := io.ReadAll(response.Body)
	if err != nil {
		return nil, fiber.NewError(fiber.ErrInternalServerError.Code, "Failed to read response body: "+err.Error())
	}
	var apiResponse GoogleUser
	json.Unmarshal(body, &apiResponse)

	return apiResponse, nil
}
