package save

type Save struct {
	ID        string `gorm:"column:id;primaryKey"`
	UserId    string `gorm:"column:user_id"`
	PostId    string `gorm:"column:post_id"`
	CreatedAt int64  `gorm:"column:created_at;autoCreateTime:milli"`
}

func (s *Save) TableName() string {
	return "save"
}
