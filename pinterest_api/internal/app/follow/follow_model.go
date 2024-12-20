package follow

type FollowResponse struct {
	Username    string `json:"username"`
	FollowingId string `json:"following_id"`
}

type UnFollowResponse struct {
	Username      string `json:"username"`
	UnFollowingId string `json:"unfollowing_id"`
}

type ShowFollowResponse struct {
	Username       string `json:"username"`
	FollowingCount int    `json:"following_count"`
	FollowerCount  int    `json:"follower_count"`
	FollowStatus   bool   `json:"follow_status"`
}
