package internal

import (
	"pinterest_api/internal/app/comment"
	"pinterest_api/internal/app/follow"
	likePost "pinterest_api/internal/app/like_post"
	"pinterest_api/internal/app/post"
	"pinterest_api/internal/app/save"
	"pinterest_api/internal/app/user"
	"pinterest_api/internal/config"
	"pinterest_api/internal/route"

	"github.com/gofiber/fiber/v2"
	"github.com/spf13/viper"
	"gorm.io/gorm"
)

type BootstrapConfig struct {
	DB       *gorm.DB
	App      *fiber.App
	Validate *config.Validator
	Config   *viper.Viper
}

func Bootstrap(config *BootstrapConfig) {
	userRepository := user.NewUserRepository()
	userUsecase := user.NewUserUsecase(config.DB, config.Validate, userRepository, config.Config)
	userController := user.NewUserController(userUsecase)

	followRepository := follow.NewFollowRepository()
	followUsecase := follow.NewFollowUsecase(config.DB, config.Validate, followRepository, userUsecase, userRepository, config.Config)
	followController := follow.NewFollowController(followUsecase, userUsecase)

	saveRepository := save.NewSaveRepository()
	saveUsecase := save.NewSaveUsecase(config.DB, config.Validate, userUsecase, saveRepository, config.Config)
	saveController := save.NewSaveController(saveUsecase)

	likePostRepository := likePost.NewLikePostRespository()
	likePosttUsecase := likePost.NewLikePostUsecase(config.DB, config.Validate, likePostRepository, userUsecase)
	likePostController := likePost.NewLikePostController(likePosttUsecase)

	commentRepository := comment.NewCommentRepository()
	commentUsecase := comment.NewCommentUsecase(config.DB, config.Validate, commentRepository, userUsecase)
	commentController := comment.NewCommentController(commentUsecase)

	postRepository := post.NewPostRepository()
	postUsecase := post.NewPostUsecase(config.DB, config.Validate, postRepository, userUsecase, userRepository, config.Config, saveUsecase, likePosttUsecase, commentUsecase)
	postController := post.NewPostController(postUsecase, followUsecase, userUsecase)

	routeConfig := route.RouteConfig{
		App:                config.App,
		UserController:     userController,
		PostController:     postController,
		FollowController:   followController,
		SaveController:     saveController,
		LikePostController: likePostController,
		CommentController:  commentController,
	}

	routeConfig.Setup()
}
