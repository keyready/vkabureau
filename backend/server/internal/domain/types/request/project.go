package request

import (
	"mime/multipart"
)

type CreateProject struct {
	Title          string                  `form:"title"`
	Description    string                  `form:"description"`
	Documents      []*multipart.FileHeader `form:"documents"`
	DocumentsNames []string
	Author         string
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
