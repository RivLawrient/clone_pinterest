package post

import "pinterest_api/internal/app/user"

type Post struct {
	ID          string `gorm:"column:id;primaryKey"`
	UserId      string `gorm:"column:user_id"`
	User        user.User
	Title       string `gorm:"column:title"`
	Description string `gorm:"column:description"`
	Image       string `gorm:"column:image;unique"`
	CreatedAt   int64  `gorm:"column:created_at;autoCreateTime:milli"`
}

func (u *Post) TableName() string {
	return "post"
}
