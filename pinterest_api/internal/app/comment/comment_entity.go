package comment

type Comment struct {
	ID        string `gorm:"id;primaryKey"`
	Comment   string `gorm:"comment"`
	UserId    string `gorm:"user_id"`
	PostId    string `gorm:"post_id"`
	CreatedAt int64  `gorm:"column:created_at;autoCreateTime:milli"`
}

func (c *Comment) TableName() string {
	return "comment"
}
