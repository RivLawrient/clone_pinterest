package internal

import (
	"pinterest_api/internal/app/follow"
	"pinterest_api/internal/app/post"
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

	postRepository := post.NewPostRepository()
	postUsecase := post.NewPostUsecase(config.DB, config.Validate, postRepository, userUsecase, userRepository, config.Config)
	postController := post.NewPostController(postUsecase)

	followRepository := follow.NewFollowRepository()
	followUsecase := follow.NewFollowUsecase(config.DB, config.Validate, followRepository, userUsecase, userRepository, config.Config)
	followController := follow.NewFollowController(followUsecase)

	routeConfig := route.RouteConfig{
		App:              config.App,
		UserController:   userController,
		PostController:   postController,
		FollowController: followController,
	}

	routeConfig.Setup()
}
