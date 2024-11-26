package follow

type FollowResponse struct {
	FollowerId  string `json:"follower_id"`
	FollowingId string `json:"following_id"`
}

type FollowerCountResponse struct {
	Username      string `json:"username"`
	FollowerCount int    `json:"follower_count"`
}
