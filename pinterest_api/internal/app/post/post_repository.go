package post

import (
	"gorm.io/gorm"
)

type PostRepository struct {
}

func NewPostRepository() *PostRepository {
	return &PostRepository{}
}

func (r *PostRepository) Create(db *gorm.DB, post *Post) error {
	return db.Create(post).Error
}

func (r *PostRepository) FindByImage(db *gorm.DB, post *Post, image string) error {
	return db.Where("image = ?", image).First(post).Error
}

func (r *PostRepository) FindById(db *gorm.DB, post *Post, id string) error {
	return db.First(post, "id = ? ", id).Error
}
