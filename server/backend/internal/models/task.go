package models

import "time"

type TaskModel struct {
	ID int64 `gorm:"primaryKey" json:"id"`

	Title       string    `json:"title"`
	Description string    `json:"description"`
	Status      string    `gorm:"default:'new'" json:"status"`
	Deadline    time.Time `json:"deadline"`
	Priority    string    `json:"priority"`
	ProjectId   int64     `json:"projectId"`
	CreatedAt   time.Time `gorm:"autoCreateTime:false" json:"createdAt"`
}
