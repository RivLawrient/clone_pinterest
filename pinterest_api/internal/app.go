package internal

import (
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

	routeConfig := route.RouteConfig{
		App:            config.App,
		UserController: userController,
		PostController: postController,
	}

	routeConfig.Setup()
}
