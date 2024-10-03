package models

import "time"

type UserModel struct {
	ID          int64  `json:"id"`
	Login       string `json:"login"`
	Avatar      string `json:"avatar"`
	Bio         string `json:"bio"`
	Name        string `json:"name"`
	PublicRepos int    `json:"publicRepos"`

	CreatedAt time.Time `gorm:"autoCreateTime:false" json:"createdAt"`
	UpdateAt  time.Time `gorm:"autoCreateTime:false" json:"updatedAt"`
}
