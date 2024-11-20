package post

type Post struct {
	ID          string `gorm:"column:id;primaryKey"`
	Title       string `gorm:"column:title"`
	Description string `gorm:"column:description"`
	Image       string `gorm:"column:image;unique"`
	CreatedAt   int64  `gorm:"column:created_at;autoCreateTime:milli"`
}

func (u *Post) TableName() string {
	return "post"
}
