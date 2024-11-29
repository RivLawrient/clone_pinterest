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
	Id          string                  `json:"id"`
	Title       string                  `json:"title"`
	User        *user.UserOtherResponse `json:"user,omitempty"`
	Description string                  `json:"description"`
	Image       string                  `json:"image"`
	SaveStatus  bool                    `json:"save_status"`
	CreatedAt   time.Time               `json:"created_at"`
}

type ShowPostRequest struct {
	Id string `json:"id" validate:"required"`
}

type ShowProfileResponse struct {
	Username   string          `json:"username"`
	FirstName  string          `json:"first_name"`
	LastName   string          `json:"last_name"`
	ProfileImg string          `json:"profile_img"`
	Post       *[]PostResponse `json:"post"`
}

type ProfileResponse struct {
	Username     string          `json:"username"`
	FirstName    string          `json:"first_name"`
	LastName     string          `json:"last_name"`
	ProfileImg   string          `json:"profile_img"`
	Follower     int             `json:"follower"`
	Following    int             `json:"following"`
	FollowStatus bool            `json:"follow_status"`
	Post         *[]PostResponse `json:"post"`
}
