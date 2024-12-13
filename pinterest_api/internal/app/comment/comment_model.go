package comment

import (
	"time"
)

type CommentRequest struct {
	Comment string `json:"comment"`
}

type CommentResponse struct {
	Id        string               `json:"id"`
	Comment   string               `json:"comment"`
	User      *CommentResponseUser `json:"user"`
	CreatedAt time.Time            `json:"created_at"`
}
type CommentResponseUser struct {
	Username   string `json:"username"`
	ProfileImg string `json:"profile_img"`
}

type ListComment struct {
	Comment    string    `json:"comment"`
	Username   string    `json:"username"`
	ProfileImg string    `json:"profile_img"`
	CreatedAt  time.Time `json:"created_at"`
}
