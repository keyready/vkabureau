package request

import "time"

type AddTask struct {
	ProjectID   string    `json:"projectId"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	Priority    string    `json:"priority"`
	CreatedAt   time.Time `json:"createdAt" bson:"createdAt"`
	Deadline    string    `json:"deadline" bson:"deadline"`
}

type UpdateTask struct {
	TaskID      string `json:"taskId"`
	NewStatus   string `json:"status"`
	NewPriority string `json:"priority"`
}

type JoinToTask struct {
	UserID string `json:"userId"`
	TaskID string `json:"taskId"`
}
