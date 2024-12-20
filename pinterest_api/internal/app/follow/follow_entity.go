package follow

import "time"

type Follow struct {
	ID          string
	FollowerId  string
	FollowingId string
	CreatedAt   time.Time
}

func (u *Follow) TableName() string {
	return "follow"
}
