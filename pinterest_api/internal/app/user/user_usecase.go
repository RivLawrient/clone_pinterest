package user

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"pinterest_api/internal/config"
	"regexp"
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

	err := u.Validate.Validate.Struct(request)
	if err != nil {
		return nil, fiber.NewError(fiber.ErrBadRequest.Code, u.Validate.TranslateErrors(err))
	}

	if err := u.UserRepository.FindByEmail(tx, new(User), request.Email); err == nil {
		return nil, fiber.NewError(fiber.ErrBadRequest.Code, "email is already used")
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

	birth := time.UnixMilli(request.BirthDate)

	user := &User{
		ID:         uuid.New().String(),
		Username:   username,
		FirstName:  strings.Split(request.Email, "@")[0],
		LastName:   new(string),
		Email:      request.Email,
		Password:   password,
		IsGoogle:   false,
		IsFacebook: false,
		BirthDate:  &birth,
		ProfileImg: new(string),
		Token:      uuid.New().String(),
	}

	if err := u.UserRepository.Create(tx, user); err != nil {
		return nil, fiber.NewError(fiber.ErrBadRequest.Code, "something wrong when create data")
	}

	if err := tx.Commit().Error; err != nil {
		return nil, fiber.NewError(fiber.ErrInternalServerError.Code, "something wrong")
	}

	return UserToRegisterUserResponse(user), nil
}

func (u *UserUsecase) LoginByEmail(ctx context.Context, request *LoginUserByEmailRequest) (*UserResponse, *fiber.Error) {
	tx := u.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	err := u.Validate.Validate.Struct(request)
	if err != nil {
		return nil, fiber.NewError(fiber.ErrBadRequest.Code, u.Validate.TranslateErrors(err))
	}

	user := new(User)
	if err := u.UserRepository.FindByEmail(tx, user, request.Email); err != nil {
		return nil, fiber.NewError(fiber.ErrBadRequest.Code, "email or password is invalid")
	}

	if user.IsGoogle {
		return nil, fiber.NewError(fiber.ErrBadRequest.Code, "your email was linked with google")
	}

	if err := bcrypt.CompareHashAndPassword([]byte(*user.Password), []byte(request.Password)); err != nil {
		return nil, fiber.NewError(fiber.ErrBadRequest.Code, "email or password is invalid")
	}

	user.Token = uuid.New().String()

	if err := u.UserRepository.Update(tx, user); err != nil {
		return nil, fiber.NewError(fiber.ErrBadRequest.Code, "something wrong when update data")
	}

	if err := tx.Commit().Error; err != nil {
		return nil, fiber.NewError(fiber.ErrInternalServerError.Code, "Something wrong")
	}

	return UserToUserResponse(user), nil
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

func (u *UserUsecase) GoogleRedirect() string {
	googleOauthConfig.ClientID = u.Viper.GetString("google.clientId")
	googleOauthConfig.ClientSecret = u.Viper.GetString("google.clientSecret")
	return googleOauthConfig.AuthCodeURL("state")
}

func (u *UserUsecase) GoogleCallback(ctx context.Context, code string) (*UserResponse, *fiber.Error) {
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
		return nil, fiber.NewError(fiber.ErrInternalServerError.Code, "failed to read response body: "+err.Error())
	}

	// fmt.Println(string(body))
	var googleUser GoogleUser
	json.Unmarshal(body, &googleUser)

	tx := u.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	user := new(User)
	if err := u.UserRepository.FindByEmail(tx, user, googleUser.Email); err != nil { //kalau gada di db

		baseUsername := strings.Split(googleUser.Email, "@")[0]
		re := regexp.MustCompile(`[^a-zA-Z0-9]+`)
		username := re.ReplaceAllString(baseUsername, "")
		counter := 1

		for u.UserRepository.FindByUsername(tx, new(User), username) == nil {
			username = fmt.Sprintf("%s%d", baseUsername, counter)
			counter++
		}

		user.ID = uuid.New().String()
		user.Username = username
		user.FirstName = googleUser.GivenName
		user.LastName = &googleUser.FamilyName
		user.Email = googleUser.Email
		user.IsGoogle = true
		user.IsFacebook = false
		user.ProfileImg = &googleUser.Picture
		user.Token = uuid.New().String()

		if err := u.UserRepository.Create(tx, user); err != nil {
			return nil, fiber.NewError(fiber.ErrBadRequest.Code, strings.Split(err.Error(), ": ")[1])
		}

		if err := tx.Commit().Error; err != nil {
			return nil, fiber.NewError(fiber.ErrInternalServerError.Code, "something wrong")
		}

		return UserToUserResponse(user), nil
	}

	user.Token = uuid.New().String()

	if err := u.UserRepository.Update(tx, user); err != nil {
		return nil, fiber.NewError(fiber.ErrBadRequest.Code, strings.Split(err.Error(), ": ")[1])
	}

	if err := tx.Commit().Error; err != nil {
		return nil, fiber.NewError(fiber.ErrInternalServerError.Code, "something wrong")
	}

	return UserToUserResponse(user), nil
}

func (u *UserUsecase) VerifyToken(ctx context.Context, token string) (*User, *fiber.Error) {
	tx := u.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := u.Validate.Validate.Var(token, "required,uuid"); err != nil {
		return nil, fiber.NewError(fiber.ErrBadRequest.Code, u.Validate.TranslateErrors(err))
	}

	user := &User{}
	err := u.UserRepository.FindyByToken(tx, user, token)
	if err != nil {
		return nil, fiber.NewError(fiber.ErrInternalServerError.Code, "something wrong when getting data")
	}

	if err := tx.Commit().Error; err != nil {
		return nil, fiber.NewError(fiber.ErrInternalServerError.Code, "something wrong")
	}

	return user, nil

}

func (u *UserUsecase) GetUser(ctx context.Context, token string) (*UserResponse, *fiber.Error) {
	user, err := u.VerifyToken(ctx, token)
	if err != nil {
		return nil, err
	}

	return UserToUserResponse(user), nil
}

func (u *UserUsecase) ShowByUsername(ctx context.Context, token string, username string) (*UserOtherResponse, *fiber.Error) {
	tx := u.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := u.Validate.Validate.Var(username, "required"); err != nil {
		return nil, fiber.NewError(fiber.ErrBadRequest.Code, u.Validate.TranslateErrors(err))
	}

	_, err := u.VerifyToken(ctx, token)
	if err != nil {
		return nil, err
	}

	user := new(User)
	if err := u.UserRepository.FindByUsername(tx, user, username); err != nil {
		return nil, fiber.NewError(fiber.ErrBadRequest.Code, "user is not found")
	}

	if err := tx.Commit().Error; err != nil {
		return nil, fiber.NewError(fiber.ErrInternalServerError.Code, "something wrong show by username")
	}

	return &UserOtherResponse{
		Username:   user.Username,
		FirstName:  user.FirstName,
		LastName:   *user.LastName,
		ProfileImg: *user.ProfileImg,
	}, nil

}

func (u *UserUsecase) UpdateBirthDate(ctx context.Context, token string, birthDate int64) (*UserResponse, *fiber.Error) {
	tx := u.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := u.Validate.Validate.Var(birthDate, "required,numeric"); err != nil {
		return nil, fiber.NewError(fiber.ErrBadRequest.Code, u.Validate.TranslateErrors(err))
	}

	me, err := u.VerifyToken(ctx, token)
	if err != nil {
		return nil, err
	}

	birth := time.UnixMilli(birthDate)
	me.BirthDate = &birth

	if err := u.UserRepository.Update(tx, me); err != nil {
		return nil, fiber.NewError(fiber.ErrInternalServerError.Code, "something wrong when updating data")
	}

	if err := tx.Commit().Error; err != nil {
		return nil, fiber.NewError(fiber.ErrInternalServerError.Code, "something wrong")
	}

	return UserToUserResponse(me), nil
}
