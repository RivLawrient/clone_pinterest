package post

import (
	"context"
	"fmt"
	"pinterest_api/internal/app/user"
	"pinterest_api/internal/config"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/spf13/viper"
	"gorm.io/gorm"
)

type PostUsecase struct {
	DB             *gorm.DB
	Validate       *config.Validator
	PostRepository *PostRepository
	UserUsecase    *user.UserUsecase
	UserRepository *user.UserRepository
	Viper          *viper.Viper
}

func NewPostUsecase(db *gorm.DB, validate *config.Validator, postRepository *PostRepository, userUsecase *user.UserUsecase, userRepository *user.UserRepository, viper *viper.Viper) *PostUsecase {
	return &PostUsecase{
		DB:             db,
		Validate:       validate,
		PostRepository: postRepository,
		UserUsecase:    userUsecase,
		UserRepository: userRepository,
		Viper:          viper,
	}
}

func (p *PostUsecase) UploadImage(ctx context.Context, token string, request UploadPostRequest) (*PostResponse, *fiber.Error) {
	tx := p.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	users, err := p.UserUsecase.Verify(ctx, token)
	if err != nil {
		return nil, err
	}

	if err := p.Validate.ValidateStruct(request); err != nil {
		return nil, fiber.NewError(fiber.ErrBadRequest.Code, err[0])
	}

	if request.Image == "" {
		return nil, fiber.NewError(fiber.ErrBadRequest.Code, "image cannot be empty string")
	}

	if err := p.PostRepository.FindByImage(tx, new(Post), request.Image); err == nil {
		return nil, fiber.NewError(fiber.ErrBadRequest.Code, "image already used")
	}

	post := &Post{
		ID:          uuid.New().String(),
		UserId:      users.Id,
		Title:       request.Title,
		Description: request.Description,
		Image:       request.Image,
	}

	if err := p.PostRepository.Create(tx, post); err != nil {
		return nil, fiber.NewError(fiber.ErrBadGateway.Code)
	}

	if err := tx.Commit().Error; err != nil {
		return nil, fiber.NewError(fiber.ErrInternalServerError.Code, "something wrong")
	}
	return &PostResponse{
		Id:          post.ID,
		Title:       post.Title,
		Description: post.Description,
		Image:       post.Image,
		CreatedAt:   time.UnixMilli(post.CreatedAt),
	}, nil
}

func (p *PostUsecase) ShowImage(ctx context.Context, request *ShowPostRequest, token string) (*PostResponse, *fiber.Error) {
	tx := p.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := p.Validate.ValidateStruct(request); err != nil {
		return nil, fiber.NewError(fiber.ErrBadRequest.Code, err[0])
	}

	_, err := p.UserUsecase.Verify(ctx, token)
	if err != nil {
		return nil, err
	}

	post := new(Post)
	if err := p.PostRepository.FindById(tx, post, request.Id); err != nil {
		return nil, fiber.NewError(fiber.StatusNotFound, "post is not found")
	}

	userOther := new(user.User)
	if err := p.UserRepository.FindById(tx, userOther, post.UserId); err != nil {
		return nil, fiber.NewError(fiber.ErrInternalServerError.Code, "something wrong")
	}

	if err := tx.Commit().Error; err != nil {
		return nil, fiber.NewError(fiber.ErrInternalServerError.Code, "something wrong")
	}

	return &PostResponse{
		Id:    post.ID,
		Title: post.Title,
		User: user.UserOtherResponse{
			Username:   userOther.Username,
			FirstName:  userOther.FirstName,
			LastName:   *userOther.LastName,
			ProfileImg: userOther.ProfileImg,
		},
		Description: post.Description,
		Image:       post.Image,
		CreatedAt:   time.UnixMilli(post.CreatedAt),
	}, nil
}

func (p *PostUsecase) ShowList(ctx context.Context, token string) (*[]PostResponse, *fiber.Error) {
	tx := p.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	me, err := p.UserUsecase.Verify(ctx, token)
	if err != nil {
		return nil, err
	}
	post := []Post{}
	if err := p.PostRepository.ListRandomExcept(tx, new(Post), &post, me.Id); err != nil {
		return nil, fiber.NewError(fiber.StatusNotFound, "post is not found")
	}
	fmt.Println(post)

	postResponses := []PostResponse{}
	for _, posts := range post {

		userOther := new(user.User)
		if err := p.UserRepository.FindById(tx, userOther, posts.UserId); err != nil {
			return nil, fiber.NewError(fiber.ErrInternalServerError.Code, "something wrong")
		}

		postResponse := PostResponse{
			Id:          posts.ID,
			Title:       posts.Title,
			Description: posts.Description,
			Image:       posts.Image,
			User: user.UserOtherResponse{
				Username:   userOther.Username,
				FirstName:  userOther.FirstName,
				LastName:   *userOther.LastName,
				ProfileImg: userOther.ProfileImg,
			},
			CreatedAt: time.UnixMilli(posts.CreatedAt),
		}
		postResponses = append(postResponses, postResponse)
	}

	if err := tx.Commit().Error; err != nil {
		return nil, fiber.NewError(fiber.ErrInternalServerError.Code, "something wrong")
	}

	return &postResponses, nil
}
