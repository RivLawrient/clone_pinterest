package comment

import (
	"pinterest_api/internal/app/user"
	"time"
)

type CommentRequest struct {
	Comment string `json:"comment"`
}

type CommentResponse struct {
	Id        string                  `json:"id"`
	Comment   string                  `json:"comment"`
	UserId    *string                 `json:"user_id,omitempty"`
	PostId    string                  `json:"post_id,omitempty"`
	User      *user.UserOtherResponse `json:"user"`
	CreatedAt time.Time               `json:"created_at"`
}
