package models

import "time"

type CommitModel struct {
	ID int64 `gorm:"primaryKey" json:"id"`

	ProjectID  int64  `json:"projectId"`
	CommitLink string `json:"commitLink"`
	Author     string `json:"author"`
	Message    string `json:"message"`

	CreatedAt time.Time `gorm:"autoCreateTime:default" json:"createdAt"`
}
