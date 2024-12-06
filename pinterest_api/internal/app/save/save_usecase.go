package save

import (
	"context"
	"pinterest_api/internal/app/user"
	"pinterest_api/internal/config"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/spf13/viper"
	"gorm.io/gorm"
)

type SaveUsecase struct {
	DB             *gorm.DB
	Validate       *config.Validator
	UserUsecase    *user.UserUsecase
	SaveRepository *SaveRepository
	Viper          *viper.Viper
}

func NewSaveUsecase(db *gorm.DB, validate *config.Validator, userUsecase *user.UserUsecase,
	saveRepository *SaveRepository, viper *viper.Viper) *SaveUsecase {
	return &SaveUsecase{
		DB:             db,
		Validate:       validate,
		UserUsecase:    userUsecase,
		SaveRepository: saveRepository,
		Viper:          viper,
	}
}

func (s *SaveUsecase) SavePost(ctx context.Context, token string, postId string) (*SaveResponse, *fiber.Error) {
	tx := s.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	me, err := s.UserUsecase.VerifyToken(ctx, token)
	if err != nil {
		return nil, err
	}

	if err := s.Validate.Validate.Var(postId, "required,uuid"); err != nil {
		return nil, fiber.NewError(fiber.ErrBadRequest.Code, s.Validate.TranslateErrors(err))
	}

	if err := s.SaveRepository.FindByUserIdAndPostId(tx, new(Save), me.ID, postId); err == nil {
		return nil, fiber.NewError(fiber.ErrBadRequest.Code, "user already save")
	}

	save := &Save{
		ID:     uuid.New().String(),
		UserId: me.ID,
		PostId: postId,
	}

	if err := s.SaveRepository.Create(tx, save); err != nil {
		return nil, fiber.NewError(fiber.ErrBadRequest.Code, "something wrong")
	}

	if err := tx.Commit().Error; err != nil {
		return nil, fiber.NewError(fiber.ErrInternalServerError.Code, "something wrong")
	}

	return &SaveResponse{
		ID:        save.ID,
		PostId:    postId,
		CreatedAt: time.UnixMilli(save.CreatedAt),
	}, nil
}

func (s *SaveUsecase) UnSavePost(ctx context.Context, token string, postId string) (*SaveResponse, *fiber.Error) {
	tx := s.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	me, err := s.UserUsecase.VerifyToken(ctx, token)
	if err != nil {
		return nil, err
	}

	if err := s.Validate.Validate.Var(postId, "required,uuid"); err != nil {
		return nil, fiber.NewError(fiber.ErrBadRequest.Code, s.Validate.TranslateErrors(err))
	}

	save := new(Save)
	if err := s.SaveRepository.FindByUserIdAndPostId(tx, save, me.ID, postId); err != nil {
		return nil, fiber.NewError(fiber.ErrBadRequest.Code, "save is not found")
	}

	if err := s.SaveRepository.Remove(tx, save); err != nil {
		return nil, fiber.NewError(fiber.ErrBadRequest.Code, "something wrong")
	}

	if err := tx.Commit().Error; err != nil {
		return nil, fiber.NewError(fiber.ErrInternalServerError.Code, "something wrong")
	}

	return &SaveResponse{
		ID:        save.ID,
		PostId:    postId,
		CreatedAt: time.UnixMilli(save.CreatedAt),
	}, nil
}

// tanpa handle/constroller
func (s *SaveUsecase) StatusSave(ctx context.Context, token string, postId string) bool {
	tx := s.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	me, err := s.UserUsecase.VerifyToken(ctx, token)
	if err != nil {
		return false
	}

	save := new(Save)
	if err := s.SaveRepository.FindByUserIdAndPostId(tx, save, me.ID, postId); err != nil {
		return false
	}

	if err := tx.Commit().Error; err != nil {
		return false
	}

	return true
}

// tanpa handle/constroller
func (s *SaveUsecase) ShowSaveByUser(ctx context.Context, userId string) *[]SaveResponse {
	tx := s.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	save := []Save{}
	if err := s.SaveRepository.FindByUserId(tx, new(Save), &save, userId); err != nil {
		return &[]SaveResponse{}
	}

	saveResponeses := []SaveResponse{}
	for _, saves := range save {
		saveResponse := SaveResponse{
			ID:        saves.ID,
			PostId:    saves.PostId,
			CreatedAt: time.UnixMilli(saves.CreatedAt),
		}
		saveResponeses = append(saveResponeses, saveResponse)
	}

	if err := tx.Commit().Error; err != nil {
		return &[]SaveResponse{}
	}

	return &saveResponeses
}
