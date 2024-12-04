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

	user := &User{
		ID:         uuid.New().String(),
		Username:   username,
		FirstName:  string(request.Email[0]),
		LastName:   new(string),
		Email:      request.Email,
		Password:   password,
		IsGoogle:   false,
		IsFacebook: false,
		Token:      uuid.New().String(),
	}

	if err := u.UserRepository.Create(tx, user); err != nil {
		return nil, fiber.NewError(fiber.ErrBadRequest.Code, strings.Split(err.Error(), ": ")[1])
	}

	if err := tx.Commit().Error; err != nil {
		return nil, fiber.NewError(fiber.ErrInternalServerError.Code, "something wrong")
	}

	return &RegisterUserResponse{
		Id:         user.ID,
		Username:   user.Username,
		FirstName:  user.FirstName,
		LastName:   *user.LastName,
		Email:      user.Email,
		IsGoogle:   user.IsGoogle,
		IsFacebook: user.IsFacebook,
		// BirthDate:  time.UnixMilli(user.BirthDate),
		ProfileImg: user.ProfileImg,
		Token:      user.Token,
		CreatedAt:  user.CreatedAt,
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
		return nil, fiber.NewError(fiber.ErrBadRequest.Code, "email is password is invalid")
	}

	if err := bcrypt.CompareHashAndPassword([]byte(*user.Password), []byte(request.Password)); err != nil {
		return nil, fiber.NewError(fiber.ErrBadRequest.Code, "email or password is invalid")
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
		Token: user.Token,
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

func (u *UserUsecase) GoogleHandle() string {
	googleOauthConfig.ClientID = u.Viper.GetString("google.clientId")
	googleOauthConfig.ClientSecret = u.Viper.GetString("google.clientSecret")
	return googleOauthConfig.AuthCodeURL("state")
}

func (u *UserUsecase) GoogleCallback(ctx context.Context, code string) (*LoginUserResponse, *fiber.Error) {
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
		// user.BirthDate = 0
		user.ProfileImg = googleUser.Picture
		user.Token = uuid.New().String()

		if err := u.UserRepository.Create(tx, user); err != nil {
			return nil, fiber.NewError(fiber.ErrBadRequest.Code, strings.Split(err.Error(), ": ")[1])
		}

		if err := tx.Commit().Error; err != nil {
			return nil, fiber.NewError(fiber.ErrInternalServerError.Code, "something wrong")
		}

		return &LoginUserResponse{
			Email: user.Email,
			Token: user.Token,
		}, nil
	}

	user.Token = uuid.New().String()

	if err := u.UserRepository.Update(tx, user); err != nil {
		return nil, fiber.NewError(fiber.ErrBadRequest.Code, strings.Split(err.Error(), ": ")[1])
	}

	if err := tx.Commit().Error; err != nil {
		return nil, fiber.NewError(fiber.ErrInternalServerError.Code, "something wrong")
	}

	return &LoginUserResponse{
		Email: user.Email,
		Token: user.Token,
	}, nil
}

func (u *UserUsecase) Verify(ctx context.Context, token string) (*UserResponse, *fiber.Error) {
	tx := u.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	user := new(User)
	if err := u.UserRepository.FindyByToken(tx, user, token); err != nil {
		fmt.Println(user)
		return nil, fiber.NewError(fiber.ErrBadRequest.Code, "your token is invalid")
	}

	if err := tx.Commit().Error; err != nil {
		return nil, fiber.NewError(fiber.ErrInternalServerError.Code, "something wrong")
	}

	return &UserResponse{
		Id:         user.ID,
		Username:   user.Username,
		FirstName:  user.FirstName,
		LastName:   *user.LastName,
		Email:      user.Email,
		IsGoogle:   user.IsGoogle,
		IsFacebook: user.IsFacebook,
		// BirthDate:  time.UnixMilli(user.BirthDate),
		ProfileImg: user.ProfileImg,
		CreatedAt:  user.CreatedAt,
	}, nil

}

func (u *UserUsecase) ShowByUsername(ctx context.Context, token string, username string) (*UserOtherResponse, *fiber.Error) {
	tx := u.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	user := new(User)
	if err := u.UserRepository.FindByUsername(tx, user, username); err != nil {
		return nil, fiber.NewError(fiber.ErrBadRequest.Code, "user is not found")
	}

	if err := tx.Commit().Error; err != nil {
		return nil, fiber.NewError(fiber.ErrInternalServerError.Code, "something wrong")
	}

	return &UserOtherResponse{
		Username:   user.Username,
		FirstName:  user.FirstName,
		LastName:   *user.LastName,
		ProfileImg: user.ProfileImg,
	}, nil

}
