package save

import "gorm.io/gorm"

type SaveRepository struct {
}

func NewSaveRepository() *SaveRepository {
	return &SaveRepository{}
}

func (s *SaveRepository) Create(db *gorm.DB, save *Save) error {
	return db.Create(save).Error
}

func (s *SaveRepository) Remove(db *gorm.DB, save *Save) error {
	return db.Delete(save).Error
}

func (s *SaveRepository) FindByUserIdAndPostId(db *gorm.DB, save *Save, userId string, postId string) error {
	return db.Where("user_id = ? AND post_id = ?", userId, postId).First(save).Error
}
