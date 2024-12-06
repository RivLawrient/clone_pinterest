package post

import (
	"context"
	"pinterest_api/internal/app/comment"
	likePost "pinterest_api/internal/app/like_post"
	"pinterest_api/internal/app/save"
	"pinterest_api/internal/app/user"
	"pinterest_api/internal/config"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/spf13/viper"
	"gorm.io/gorm"
)

type PostUsecase struct {
	DB              *gorm.DB
	Validate        *config.Validator
	PostRepository  *PostRepository
	UserUsecase     *user.UserUsecase
	UserRepository  *user.UserRepository
	SaveUsecase     *save.SaveUsecase
	LikePostUsecase *likePost.LikePostUsecase
	CommentUsecase  *comment.CommentUsecase
	Viper           *viper.Viper
}

func NewPostUsecase(db *gorm.DB, validate *config.Validator, postRepository *PostRepository,
	userUsecase *user.UserUsecase, userRepository *user.UserRepository, viper *viper.Viper,
	saveUsecase *save.SaveUsecase, likePostUsecase *likePost.LikePostUsecase, commentUsecase *comment.CommentUsecase) *PostUsecase {
	return &PostUsecase{
		DB:              db,
		Validate:        validate,
		PostRepository:  postRepository,
		UserUsecase:     userUsecase,
		UserRepository:  userRepository,
		SaveUsecase:     saveUsecase,
		LikePostUsecase: likePostUsecase,
		CommentUsecase:  commentUsecase,
		Viper:           viper,
	}
}

func (p *PostUsecase) Upload(ctx context.Context, token string, request UploadPostRequest) (*PostResponse, *fiber.Error) {
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

func (p *PostUsecase) ShowDetail(ctx context.Context, postId string, token string) (*PostResponse, *fiber.Error) {
	tx := p.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	post := new(Post)
	if err := p.PostRepository.FindById(tx, post, postId); err != nil {
		return nil, fiber.NewError(fiber.StatusNotFound, "post is not found")
	}

	userOther := new(user.User)
	if err := p.UserRepository.FindById(tx, userOther, post.UserId); err != nil {
		return nil, fiber.NewError(fiber.ErrInternalServerError.Code, "something wrong")
	}
	postUser := user.UserOtherResponse{
		Username:   userOther.Username,
		FirstName:  userOther.FirstName,
		LastName:   *userOther.LastName,
		ProfileImg: *userOther.ProfileImg,
	}

	save := p.SaveUsecase.StatusSave(ctx, token, post.ID)
	like := p.LikePostUsecase.StatusLike(ctx, token, post.ID)
	totalLike := p.LikePostUsecase.TotalLike(ctx, token, post.ID)

	listComments := []comment.CommentResponse{}
	for _, com := range *p.CommentUsecase.FindListByPost(ctx, postId) {
		commentUser := new(user.User)
		if err := p.UserRepository.FindById(tx, commentUser, *com.UserId); err != nil {
			return nil, fiber.NewError(fiber.ErrInternalServerError.Code, "something wrong")
		}

		listComment := comment.CommentResponse{
			Id:      com.Id,
			Comment: com.Comment,
			User: &user.UserOtherResponse{
				Username:   commentUser.Username,
				FirstName:  commentUser.FirstName,
				LastName:   *commentUser.LastName,
				ProfileImg: *commentUser.ProfileImg,
			},
			PostId:    com.PostId,
			CreatedAt: com.CreatedAt,
		}

		listComments = append(listComments, listComment)
	}

	if err := tx.Commit().Error; err != nil {
		return nil, fiber.NewError(fiber.ErrInternalServerError.Code, "something wrong")
	}

	return &PostResponse{
		Id:          post.ID,
		Title:       post.Title,
		User:        postUser,
		Description: post.Description,
		Image:       post.Image,
		SaveStatus:  &save,
		LikeStatus:  &like,
		TotalLike:   &totalLike,
		Comment:     &listComments,
		CreatedAt:   time.UnixMilli(post.CreatedAt),
	}, nil
}

func (p *PostUsecase) ShowRandomList(ctx context.Context, token string) (*[]PostResponse, *fiber.Error) {
	tx := p.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	me, err := p.UserUsecase.Verify(ctx, token)
	if err != nil {
		return nil, err
	}
	post := []Post{}
	if err := p.PostRepository.ListRandomExcept(tx, new(Post), &post, me.Id); err != nil {
		return &[]PostResponse{}, nil
	}

	postResponses := []PostResponse{}
	for _, posts := range post {

		userOther := new(user.User)
		if err := p.UserRepository.FindById(tx, userOther, posts.UserId); err != nil {
			return nil, fiber.NewError(fiber.ErrInternalServerError.Code, "something wrong")
		}

		postUser := user.UserOtherResponse{
			Username:   userOther.Username,
			FirstName:  userOther.FirstName,
			LastName:   *userOther.LastName,
			ProfileImg: *userOther.ProfileImg,
		}
		save := p.SaveUsecase.StatusSave(ctx, token, posts.ID)
		like := p.LikePostUsecase.StatusLike(ctx, token, posts.ID)
		postResponse := PostResponse{
			Id:          posts.ID,
			Title:       posts.Title,
			Description: posts.Description,
			Image:       posts.Image,
			SaveStatus:  &save,
			LikeStatus:  &like,
			User:        postUser,
			CreatedAt:   time.UnixMilli(posts.CreatedAt),
		}
		postResponses = append(postResponses, postResponse)
	}

	if err := tx.Commit().Error; err != nil {
		return nil, fiber.NewError(fiber.ErrInternalServerError.Code, "something wrong")
	}

	return &postResponses, nil
}

func (p *PostUsecase) ShowListPostByUsername(ctx context.Context, username string, token string) (*[]PostResponse, *fiber.Error) {
	tx := p.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	_, err := p.UserUsecase.Verify(ctx, token)
	if err != nil {
		return nil, err
	}

	user := new(user.User)
	if err := p.UserRepository.FindByUsername(tx, user, username); err != nil {
		return nil, fiber.NewError(fiber.ErrBadRequest.Code, "user is not found")
	}

	post := []Post{}
	if err := p.PostRepository.ListByUser(tx, new(Post), &post, user.ID); err != nil {
		return &[]PostResponse{}, nil
	}

	postResponses := []PostResponse{}
	for _, posts := range post {

		save := p.SaveUsecase.StatusSave(ctx, token, posts.ID)
		like := p.LikePostUsecase.StatusLike(ctx, token, posts.ID)

		postResponse := PostResponse{
			Id:          posts.ID,
			Title:       posts.Title,
			Description: posts.Description,
			SaveStatus:  &save,
			LikeStatus:  &like,
			Image:       posts.Image,
			CreatedAt:   time.UnixMilli(posts.CreatedAt),
		}
		postResponses = append(postResponses, postResponse)
	}

	if err := tx.Commit().Error; err != nil {
		return nil, fiber.NewError(fiber.ErrInternalServerError.Code, "something wrong")
	}

	return &postResponses, nil
}

func (p *PostUsecase) ShowListSavedByUsername(ctx context.Context, username string, token string) (*[]PostResponse, *fiber.Error) {
	tx := p.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	_, err := p.UserUsecase.Verify(ctx, token)
	if err != nil {
		return nil, err
	}

	user := new(user.User)
	if err := p.UserRepository.FindByUsername(tx, user, username); err != nil {
		return nil, fiber.NewError(fiber.ErrBadRequest.Code, "user is not found")
	}

	post := []Post{}
	if err := p.PostRepository.ListByUser(tx, new(Post), &post, user.ID); err != nil {
		return &[]PostResponse{}, nil
	}

	saveList := p.SaveUsecase.ShowSaveByUser(ctx, user.ID)

	saveResponses := []PostResponse{}
	for _, save := range *saveList {
		postSave := new(Post)
		p.PostRepository.FindById(tx, postSave, save.PostId)

		saveStatus := p.SaveUsecase.StatusSave(ctx, token, save.PostId)

		saveResponse := PostResponse{
			Id:          save.PostId,
			Title:       postSave.Title,
			Description: postSave.Description,
			Image:       postSave.Image,
			SaveStatus:  &saveStatus,
			CreatedAt:   time.UnixMilli(postSave.CreatedAt),
		}
		saveResponses = append(saveResponses, saveResponse)
	}

	if err := tx.Commit().Error; err != nil {
		return nil, fiber.NewError(fiber.ErrInternalServerError.Code, "something wrong")
	}

	return &saveResponses, nil
}
