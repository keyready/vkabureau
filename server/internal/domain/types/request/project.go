package request

import (
	"time"
)

type CreateProject struct {
	Title       string `form:"title"`
	Description string `form:"description"`
	Author      string
}

type UpdateProject struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	Status      string `json:"status"`

	ProjectID string
	Author    string

	FinishedAt time.Time `bson:"finishedAt" json:"finishedAt"`
}

type LikeProject struct {
	FollowerId string `json:"followerId"`
	ProjectId  string `json:"projectId"`
}
