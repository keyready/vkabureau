package models

import (
	"github.com/lib/pq"
	"time"
)

type ProjectModel struct {
	ID          int64         `gorm:"primaryKey" json:"id"`
	Name        string        `json:"name"`
	Description string        `json:"description"`
	CommitsId   pq.Int64Array `gorm:"type:integer[]" json:"commits_id"`
	Private     bool          `json:"private"`

	Url string `json:"url"`

	Author    string `json:"author"`
	AvatarUrl string `json:"avatar_url"`

	TasksId pq.Int64Array `gorm:"type:integer[]" json:"tasks_id"`

	CreatedAt time.Time `gorm:"autoCreateTime:default" json:"created_at"`
}
