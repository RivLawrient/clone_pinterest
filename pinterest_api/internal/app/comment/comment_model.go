package comment

import (
	"time"
)

type CommentRequest struct {
	PostId  string `json:"post_id" validate:"required"`
	Comment string `json:"comment" validate:"required,max=100"`
}

type CommentResponse struct {
	Id         string    `json:"id"`
	Comment    string    `json:"comment"`
	Username   string    `json:"username"`
	ProfileImg string    `json:"profile_img"`
	CreatedAt  time.Time `json:"created_at"`
}

type ListComment struct {
	Comment    string    `json:"comment"`
	Username   string    `json:"username"`
	ProfileImg string    `json:"profile_img"`
	CreatedAt  time.Time `json:"created_at"`
}
