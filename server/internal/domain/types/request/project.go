package request

type CreateProject struct {
	Title       string `form:"title"`
	Description string `form:"description"`
	Author      string
}

type UpdateProject struct {
	Title       string `bson:"title" json:"title"`
	Description string `bson:"description" json:"description"`
	ProjectID   string
	Author      string
}

type LikeProject struct {
	FollowerId string `json:"followerId"`
	ProjectId  string `json:"projectId"`
}
