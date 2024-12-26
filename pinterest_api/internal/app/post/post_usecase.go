package post

import (
	"context"
	"fmt"
	"log"
	"pinterest_api/internal/app/comment"
	likePost "pinterest_api/internal/app/like_post"
	"pinterest_api/internal/app/save"
	"pinterest_api/internal/app/user"
	"pinterest_api/internal/config"

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
	SaveRepository  *save.SaveRepository
	LikePostUsecase *likePost.LikePostUsecase
	CommentUsecase  *comment.CommentUsecase
	Viper           *viper.Viper
}

func NewPostUsecase(db *gorm.DB, validate *config.Validator, postRepository *PostRepository,
	userUsecase *user.UserUsecase, userRepository *user.UserRepository, viper *viper.Viper,
	saveUsecase *save.SaveUsecase, saveRepository *save.SaveRepository, likePostUsecase *likePost.LikePostUsecase, commentUsecase *comment.CommentUsecase) *PostUsecase {
	return &PostUsecase{
		DB:              db,
		Validate:        validate,
		PostRepository:  postRepository,
		UserUsecase:     userUsecase,
		UserRepository:  userRepository,
		SaveUsecase:     saveUsecase,
		SaveRepository:  saveRepository,
		LikePostUsecase: likePostUsecase,
		CommentUsecase:  commentUsecase,
		Viper:           viper,
	}
}

func (p *PostUsecase) Upload(ctx context.Context, token string, request UploadPostRequest) (*PostResponse, *fiber.Error) {
	tx := p.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	me, err := p.UserUsecase.VerifyToken(ctx, token)
	if err != nil {
		return nil, err
	}

	if err := p.Validate.Validate.Struct(request); err != nil {
		return nil, fiber.NewError(fiber.ErrBadRequest.Code, p.Validate.TranslateErrors(err))
	}

	errs := p.PostRepository.CheckByImage(tx, new(Post), request.Image)
	if errs == nil {
		// return nil, fiber.NewError(fiber.ErrBadRequest.Code, "image already used")
		fmt.Println("if nil", errs)
	}
	fmt.Println("done", errs)
	post := &Post{
		ID:          uuid.New().String(),
		UserId:      me.Id,
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
		CreatedAt:   post.CreatedAt,
	}, nil
}

func (p *PostUsecase) ShowDetail(ctx context.Context, postId string, token string) (*DetailPost, *fiber.Error) {
	tx := p.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	me, err := p.UserUsecase.VerifyToken(ctx, token)
	if err != nil {
		return nil, err
	}

	if err := p.Validate.Validate.Var(postId, "required,uuid"); err != nil {
		return nil, fiber.NewError(fiber.ErrBadRequest.Code, p.Validate.TranslateErrors(err))
	}

	post := DetailPostResult{}
	if query := p.PostRepository.FindDetail(tx, &post, me.Id, postId); query.RowsAffected == 0 {
		return nil, fiber.NewError(fiber.StatusBadRequest, "something wrong, when getting data")
	}
	comment := []comment.ListComment{}
	p.CommentUsecase.CommentRepository.FindByPostId(tx, &comment, postId)

	if err := tx.Commit().Error; err != nil {
		return nil, fiber.NewError(fiber.ErrInternalServerError.Code, "something wrong")
	}

	return &DetailPost{
		Id:          post.Id,
		Title:       post.Title,
		Description: post.Description,
		Image:       post.Image,
		SaveStatus:  post.SaveStatus,
		LikeStatus:  post.LikeStatus,
		TotalLike:   post.TotalLike,
		User: DetailPostUser{
			Username:   post.Username,
			ProfileImg: post.ProfileImg,
		},
		Comment: comment,
	}, nil
}

func (p *PostUsecase) ShowRandomList(ctx context.Context, token string) (*[]ListPost, *fiber.Error) {
	tx := p.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	me, err := p.UserUsecase.VerifyToken(ctx, token)
	if err != nil {
		return nil, err
	}
	post := []ListPost{}
	if err := p.PostRepository.FindListRandom(tx, &post, me.Id); err != nil {
		return &[]ListPost{}, nil
	}

	if err := tx.Commit().Error; err != nil {
		return nil, fiber.NewError(fiber.ErrInternalServerError.Code, "something wrong")
	}

	return &post, nil
}

func (p *PostUsecase) Delete(ctx context.Context, token string, postId string) (*PostResponse, *fiber.Error) {
	tx := p.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	me, err := p.UserUsecase.VerifyToken(ctx, token)
	if err != nil {
		return nil, err
	}

	query := p.PostRepository.RemoveById(tx, me.Id, postId)

	if query.RowsAffected == 0 {
		return nil, fiber.NewError(fiber.ErrInternalServerError.Code, "something wrong")
	}

	if err := tx.Commit().Error; err != nil {
		return nil, fiber.NewError(fiber.ErrInternalServerError.Code, "something wrong")
	}

	return &PostResponse{
		Id: postId,
	}, nil
}

func (p *PostUsecase) ShowListPostByUsername(ctx context.Context, username string, token string) (*[]ListPost, *fiber.Error) {
	tx := p.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	me, err := p.UserUsecase.VerifyToken(ctx, token)
	if err != nil {
		return nil, err
	}

	user := new(user.User)
	if err := p.UserRepository.FindByUsername(tx, user, username); err != nil {
		log.Println(err)
		return nil, fiber.NewError(fiber.ErrBadRequest.Code, "user is not found")
	}

	log.Println(user.ID)
	listPost := []ListPost{}
	query := p.PostRepository.FindListByUser(tx, &listPost, user.ID, me.Id)
	if query.RowsAffected == 0 {
		return &[]ListPost{}, nil
	}

	if err := tx.Commit().Error; err != nil {
		return nil, fiber.NewError(fiber.ErrInternalServerError.Code, "something wrong")
	}

	return &listPost, nil
}

func (p *PostUsecase) ShowListSavedByUsername(ctx context.Context, username string, token string) (*[]ListPost, *fiber.Error) {
	tx := p.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	_, err := p.UserUsecase.VerifyToken(ctx, token)
	if err != nil {
		return nil, err
	}

	listSaved := []save.ListPostSavedResult{}
	if qSaved := p.SaveRepository.ListPostByUsername(tx, &listSaved, username); qSaved.RowsAffected == 0 {
		return &[]ListPost{}, nil
	}

	responses := []ListPost{}
	for _, data := range listSaved {
		response := ListPost{
			Id:         data.Id,
			Image:      data.Image,
			SaveStatus: data.SaveStatus,
		}
		responses = append(responses, response)
	}

	if err := tx.Commit().Error; err != nil {
		return nil, fiber.NewError(fiber.ErrInternalServerError.Code, "something wrong")
	}

	return &responses, nil
}
