package follow

type Follow struct {
	ID          string `gorm:"column:id;primaryKey"`
	FollowerId  string `gorm:"column:follower_id"`
	FollowingId string `gorm:"column:following_id"`
	CreatedAt   int64  `gorm:"column:created_at;autoCreateTime:milli"`
}

func (u *Follow) TableName() string {
	return "follow"
}
