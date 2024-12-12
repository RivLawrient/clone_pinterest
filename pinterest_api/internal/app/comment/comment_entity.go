package comment

import "time"

type Comment struct {
	ID        string
	Comment   string
	UserId    string
	PostId    string
	CreatedAt time.Time
}

func (c *Comment) TableName() string {
	return "comment"
}
