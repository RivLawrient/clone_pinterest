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

func (s *SaveRepository) FindByUserId(db *gorm.DB, save *Save, listSave *[]Save, userId string) error {
	return db.Where("user_id = ? ", userId).Model(save).Find(listSave).Error
}

func (s *SaveRepository) ListPostByUsername(db *gorm.DB, list *[]ListPostSavedResult, username string) *gorm.DB {
	return db.Raw(`
SELECT
	save.post_id AS id,
	post.image AS image,
	TRUE AS save_status
FROM
	save
	JOIN users ON save.user_id = users.id
	AND users.username = ?
	JOIN post ON save.post_id = post.id;
	`, username).Scan(list)
}
