package post

import (
	"pinterest_api/internal/app/comment"
	"time"
)

type UploadPostRequest struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	Image       string `json:"image" validate:"required"`
}

type PostResponse struct {
	Id          string    `json:"id"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	Image       string    `json:"image"`
	CreatedAt   time.Time `json:"created_at"`
}

type ListPost struct {
	Id         string `json:"id"`
	Image      string `json:"image"`
	SaveStatus bool   `json:"save_status"`
}

type DetailPostResult struct {
	Id          string `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Image       string `json:"image"`
	Username    string `json:"username"`
	ProfileImg  string `json:"profile_img"`
	SaveStatus  bool   `json:"save_status"`
	LikeStatus  bool   `json:"like_status"`
	TotalLike   int    `json:"total_like"`
}

type DetailPost struct {
	Id          string                `json:"id"`
	Title       string                `json:"title"`
	Description string                `json:"description"`
	Image       string                `json:"image"`
	SaveStatus  bool                  `json:"save_status"`
	LikeStatus  bool                  `json:"like_status"`
	TotalLike   int                   `json:"total_like"`
	User        DetailPostUser        `json:"user"`
	Comment     []comment.ListComment `json:"comment"`
}
type DetailPostUser struct {
	Username   string `json:"username"`
	ProfileImg string `json:"profile_img"`
}

// type PostResponse struct {
// 	Id          string                  `json:"id"`
// 	Title       string                  `json:"title"`
// 	Description string                  `json:"description"`
// 	User        *user.UserOtherResponse `json:"user,omitempty"`
// 	Image       string                  `json:"image"`
// 	SaveStatus  *bool                   `json:"save_status"`
// 	LikeStatus  *bool                   `json:"like_status"`
// 	TotalLike   *int                    `json:"total_like"`
// 	// Comment     *[]comment.CommentResponse `json:"comment"`
// 	CreatedAt time.Time `json:"created_at"`
// }

// type ListPostandSaved struct {
// 	Posted []PostResponse `json:"posted"`
// 	Saved  []PostResponse `json:"saved"`
// }

// type ShowProfileResponse struct {
// 	Username   string          `json:"username"`
// 	FirstName  string          `json:"first_name"`
// 	LastName   string          `json:"last_name"`
// 	ProfileImg string          `json:"profile_img"`
// 	Post       *[]PostResponse `json:"post"`
// 	Saved      *[]PostResponse `json:"saved"`
// }

// type ProfileResponse struct {
// 	Username   string `json:"username"`
// 	FirstName  string `json:"first_name"`
// 	LastName   string `json:"last_name"`
// 	ProfileImg string `json:"profile_img"`

// 	Post  *[]PostResponse `json:"post"`
// 	Saved *[]PostResponse `json:"saved"`
// }
