package follow

import "gorm.io/gorm"

type FollowRepository struct {
}

func NewFollowRepository() *FollowRepository {
	return &FollowRepository{}
}

func (f *FollowRepository) Create(db *gorm.DB, follow *Follow) error {
	return db.Create(follow).Error
}

func (f *FollowRepository) FindFollow(db *gorm.DB, follow *Follow, follower string, following string) error {
	return db.Where("follower_id = ? AND following_id = ?", follower, following).First(follow).Error
}

func (f *FollowRepository) FindFollower(db *gorm.DB, follow *Follow, follows *[]Follow, follower string) error {
	return db.Where("follower_id = ? ", follower).Model(follow).Find(follows).Error
}
