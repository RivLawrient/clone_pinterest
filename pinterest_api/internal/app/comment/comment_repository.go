package comment

import "gorm.io/gorm"

type CommentRepository struct {
}

func NewCommentRepository() *CommentRepository {
	return &CommentRepository{}
}

func (c *CommentRepository) Create(db *gorm.DB, comment *Comment) error {
	return db.Create(comment).Error
}

func (c *CommentRepository) FindByPostId(db *gorm.DB, comment *Comment, listComment *[]Comment, postId string) error {
	return db.Where("post_id = ?", postId).Model(comment).Find(listComment).Error
}
