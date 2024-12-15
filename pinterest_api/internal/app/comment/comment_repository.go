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

func (c *CommentRepository) FindByPostId(db *gorm.DB, listComment *[]ListComment, postId string) {
	db.Table("comment").
		Select(`
	comment.comment,
	users.username,
	users.profile_img,
	comment.created_at
	`).
		Joins("JOIN users ON users.id = comment.user_id").
		Where("comment.post_id = ? ", postId).
		Scan(listComment)
}
