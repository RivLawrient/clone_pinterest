package likePost

import "time"

type LikeaPostResponse struct {
	ID        string    `json:"id,omitempty"`
	PostId    string    `json:"post_id"`
	CreatedAt time.Time `json:"created_at,omitempty"`
}
