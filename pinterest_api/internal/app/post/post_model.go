package post

import (
	"pinterest_api/internal/app/user"
	"time"
)

type UploadPostRequest struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	Image       string `json:"image" validate:"required"`
}

type PostResponse struct {
	Id          string            `json:"id"`
	Title       string            `json:"title"`
	User        user.UserResponse `json:"user"`
	Description string            `json:"description"`
	Image       string            `json:"image"`
	CreatedAt   time.Time         `json:"created_at"`
}

type ShowPostRequest struct {
	Id string `json:"id" validate:"required"`
}
