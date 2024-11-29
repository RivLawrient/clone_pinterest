package follow

type FollowResponse struct {
	Username    string `json:"username"`
	FollowingId string `json:"following_id"`
}

type UnFollowResponse struct {
	Username      string `json:"username"`
	UnFollowingId string `json:"unfollowing_id"`
}

type FollowerCountResponse struct {
	Username      string `json:"username"`
	FollowerCount int    `json:"follower_count"`
}

type FollowingCountResponse struct {
	Username       string `json:"username"`
	FollowingCount int    `json:"following_count"`
}

type FollowStatusResponse struct {
	Username     string `json:"username"`
	FollowStatus bool   `json:"follow_status"`
}
