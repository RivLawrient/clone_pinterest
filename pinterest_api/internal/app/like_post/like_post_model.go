package likePost

type LikeaPostResponse struct {
	ID        string `json:"id,omitempty"`
	PostId    string `json:"post_id"`
	CreatedAt string `json:"created_at,omitempty"`
}
