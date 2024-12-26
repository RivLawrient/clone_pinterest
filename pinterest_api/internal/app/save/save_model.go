package save

import "time"

type SaveResponse struct {
	ID        string    `json:"id,omitempty"`
	PostId    string    `json:"post_id"`
	CreatedAt time.Time `json:"created_at,omitempty"`
}

type ListPostSavedResult struct {
	Id         string `json:"id"`
	Image      string `json:"image"`
	SaveStatus bool   `json:"save_status"`
}
