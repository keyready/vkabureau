package request

type CreateProject struct {
	Title       string `form:"title"`
	Description string `form:"description"`
	Author      string
}

type UpdateProject struct {
	ProjectID string `json:"projectId"`
	Author    string `json:"author"`
	NewStatus string `json:"status"`
}

type LikeProject struct {
	FollowerId string `json:"followerId"`
	ProjectId  string `json:"projectId"`
}
