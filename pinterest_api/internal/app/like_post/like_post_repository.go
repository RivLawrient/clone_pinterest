package likePost

import "gorm.io/gorm"

type LikePostRepository struct {
}

func NewLikePostRespository() *LikePostRepository {
	return &LikePostRepository{}
}

func (l *LikePostRepository) Create(db *gorm.DB, post *LikePost) error {
	return db.Create(post).Error
}
func (l *LikePostRepository) Remove(db *gorm.DB, post *LikePost) error {
	return db.Delete(post).Error
}

func (l *LikePostRepository) FindByUserIdAndPostId(db *gorm.DB, likePost *LikePost, userId string, postId string) error {
	return db.Where("user_id = ? AND post_id = ?", userId, postId).First(likePost).Error
}

func (l *LikePostRepository) FindByPostId(db *gorm.DB, likePost *LikePost, listLike *[]LikePost, postId string) error {
	return db.Where("post_id = ? ", postId).Model(likePost).Find(listLike).Error
}
