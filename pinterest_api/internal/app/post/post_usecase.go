package post

import (
	"context"
	"fmt"
	"pinterest_api/internal/app/comment"
	likePost "pinterest_api/internal/app/like_post"
	"pinterest_api/internal/app/save"
	"pinterest_api/internal/app/user"
	"pinterest_api/internal/config"

	"github.com/gofiber/fiber/v2"
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
	// tx := p.DB.WithContext(ctx).Begin()
	// defer tx.Rollback()

	// users, err := p.UserUsecase.VerifyToken(ctx, token)
	// if err != nil {
	// 	return nil, err
	// }

	// if err := p.Validate.Validate.Struct(request); err != nil {
	// 	return nil, fiber.NewError(fiber.ErrBadRequest.Code, p.Validate.TranslateErrors(err))
	// }

	// if request.Image == "" {
	// 	return nil, fiber.NewError(fiber.ErrBadRequest.Code, "image cannot be empty string")
	// }

	// if err := p.PostRepository.FindByImage(tx, new(Post), request.Image); err == nil {
	// 	return nil, fiber.NewError(fiber.ErrBadRequest.Code, "image already used")
	// }

	// post := &Post{
	// 	ID:          uuid.New().String(),
	// 	UserId:      users.ID,
	// 	Title:       request.Title,
	// 	Description: request.Description,
	// 	Image:       request.Image,
	// }

	// if err := p.PostRepository.Create(tx, post); err != nil {
	// 	return nil, fiber.NewError(fiber.ErrBadGateway.Code)
	// }

	// if err := tx.Commit().Error; err != nil {
	// 	return nil, fiber.NewError(fiber.ErrInternalServerError.Code, "something wrong")
	// }
	// return &PostResponse{
	// 	Id:          post.ID,
	// 	Title:       post.Title,
	// 	Description: post.Description,
	// 	Image:       post.Image,
	// 	CreatedAt:   post.CreatedAt,
	// }, nil
	return nil, nil
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
	if err := p.PostRepository.FindDetail(tx, &post, me.ID, postId); err != nil {
		return nil, fiber.NewError(fiber.ErrInternalServerError.Code, "something wrong, when getting data")
	}
	comment := []comment.ListComment{}
	if err := p.CommentUsecase.CommentRepository.FindByPostId(tx, &comment, postId); err != nil {
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
	if err := p.PostRepository.FindListRandom(tx, &post, me.ID); err != nil {
		return &[]ListPost{}, nil
	}
	fmt.Println(post)

	if err := tx.Commit().Error; err != nil {
		return nil, fiber.NewError(fiber.ErrInternalServerError.Code, "something wrong")
	}

	return &post, nil
}

func (p *PostUsecase) ShowListPostByUsername(ctx context.Context, username string, token string) (*[]PostResponse, *fiber.Error) {
	// tx := p.DB.WithContext(ctx).Begin()
	// defer tx.Rollback()

	// _, err := p.UserUsecase.VerifyToken(ctx, token)
	// if err != nil {
	// 	return nil, err
	// }

	// if err := p.Validate.Validate.Var(username, "required"); err != nil {
	// 	return nil, fiber.NewError(fiber.ErrBadRequest.Code, p.Validate.TranslateErrors(err))
	// }

	// user := new(user.User)
	// if err := p.UserRepository.FindByUsername(tx, user, username); err != nil {
	// 	return nil, fiber.NewError(fiber.ErrBadRequest.Code, "user is not found")
	// }

	// post := []Post{}
	// if err := p.PostRepository.ListByUser(tx, new(Post), &post, user.ID); err != nil {
	// 	return &[]PostResponse{}, nil
	// }

	// postResponses := []PostResponse{}
	// for _, posts := range post {

	// 	save := p.SaveUsecase.StatusSave(ctx, token, posts.ID)
	// 	like := p.LikePostUsecase.StatusLike(ctx, token, posts.ID)

	// 	postResponse := PostResponse{
	// 		Id:          posts.ID,
	// 		Title:       posts.Title,
	// 		Description: posts.Description,
	// 		SaveStatus:  &save,
	// 		LikeStatus:  &like,
	// 		Image:       posts.Image,
	// 		CreatedAt:   posts.CreatedAt,
	// 	}
	// 	postResponses = append(postResponses, postResponse)
	// }

	// if err := tx.Commit().Error; err != nil {
	// 	return nil, fiber.NewError(fiber.ErrInternalServerError.Code, "something wrong")
	// }

	// return &postResponses, nil
	return nil, nil
}

func (p *PostUsecase) ShowListSavedByUsername(ctx context.Context, username string, token string) (*[]PostResponse, *fiber.Error) {
	// tx := p.DB.WithContext(ctx).Begin()
	// defer tx.Rollback()

	// _, err := p.UserUsecase.VerifyToken(ctx, token)
	// if err != nil {
	// 	return nil, err
	// }

	// if err := p.Validate.Validate.Var(username, "required"); err != nil {
	// 	return nil, fiber.NewError(fiber.ErrBadRequest.Code, p.Validate.TranslateErrors(err))
	// }

	// user := new(user.User)
	// if err := p.UserRepository.FindByUsername(tx, user, username); err != nil {
	// 	return nil, fiber.NewError(fiber.ErrBadRequest.Code, "user is not found")
	// }

	// post := []Post{}
	// if err := p.PostRepository.ListByUser(tx, new(Post), &post, user.ID); err != nil {
	// 	return &[]PostResponse{}, nil
	// }

	// saveList := p.SaveUsecase.ShowSaveByUser(ctx, user.ID)

	// saveResponses := []PostResponse{}
	// for _, save := range *saveList {
	// 	postSave := new(Post)
	// 	p.PostRepository.FindById(tx, postSave, save.PostId)

	// 	saveStatus := p.SaveUsecase.StatusSave(ctx, token, save.PostId)

	// 	saveResponse := PostResponse{
	// 		Id:          save.PostId,
	// 		Title:       postSave.Title,
	// 		Description: postSave.Description,
	// 		Image:       postSave.Image,
	// 		SaveStatus:  &saveStatus,
	// 		CreatedAt:   postSave.CreatedAt,
	// 	}
	// 	saveResponses = append(saveResponses, saveResponse)
	// }

	// if err := tx.Commit().Error; err != nil {
	// 	return nil, fiber.NewError(fiber.ErrInternalServerError.Code, "something wrong")
	// }

	return &[]PostResponse{}, nil
	// return nil, nil
}

// func (p *PostUsecase) PList(ctx context.Context) []PostResult {
// 	tx := p.DB.WithContext(ctx).Begin()
// 	defer tx.Rollback()

// 	list := &[]PostResult{}
// 	if err := p.PostRepository.FindList(tx, list); err != nil {
// 		return []PostResult{}
// 	}

// 	if err := tx.Commit().Error; err != nil {
// 		return []PostResult{}
// 	}

// 	return *list
// }
