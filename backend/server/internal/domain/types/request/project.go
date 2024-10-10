package request

import (
	"time"
)

type CreateProject struct {
	Title       string    `json:"title"`
	Description string    `json:"description"`
	Author      string    `json:"author"`
	Status      string    `json:"status"`
	CreatedAt   time.Time `json:"createdAt"`
	StartedAt   time.Time `json:"startedAt"`
	FinishedAt  time.Time `json:"finishedAt"`
}

type UpdateProject struct {
	ProjectID string    `json:"projectId"`
	Author    string    `json:"author"`
	NewStatus string    `json:"status"`
	UpdatedAt time.Time `json:"updatedAt"`
}

type AddTask struct {
	ProjectID   string    `json:"projectId"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	Priority    string    `json:"priority"`
	CreatedAt   time.Time `json:"createdAt" bson:"createdAt"`
}

type UpdateTask struct {
	ProjectID   string    `json:"projectId"`
	TaskTitle   string    `json:"taskTitle"`
	NewStatus   string    `json:"status"`
	NewPriority string    `json:"priority"`
	UpdatedAt   time.Time `json:"updateAt"`
}
