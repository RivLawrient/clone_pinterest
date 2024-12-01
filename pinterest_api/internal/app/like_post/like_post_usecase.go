package likePost

import (
	"pinterest_api/internal/config"

	"gorm.io/gorm"
)

type LikePostUsecase struct {
	DB                 *gorm.DB
	Validate           *config.Validator
	LikePostRepository *LikePostRepository
}

func NewLikePostUsecase(db *gorm.DB, validate *config.Validator, likePostRepository *LikePostRepository) *LikePostUsecase {
	return &LikePostUsecase{
		DB:                 db,
		Validate:           validate,
		LikePostRepository: likePostRepository,
	}
}
