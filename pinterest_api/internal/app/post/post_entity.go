package post

import "time"

type Post struct {
	ID          string `gorm:"column:id;primaryKey"`
	UserId      string `gorm:"column:user_id"`
	Title       string `gorm:"column:title"`
	Description string `gorm:"column:description"`
	Image       string
	CreatedAt   time.Time
}

func (u *Post) TableName() string {
	return "post"
}
