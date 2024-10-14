package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	"server/internal/domain/types/dto"
	"server/internal/domain/types/enum"
	"time"
)

type Project struct {
	ID          primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Title       string             `bson:"title" json:"title"`
	Description string             `bson:"description" json:"description"`
	Status      enum.Status        `bson:"status" json:"status"`

	Likes dto.LikeData `bson:"likes" json:"likes"`

	Documents []string             `bson:"documents" json:"documents"`
	Author    primitive.ObjectID   `json:"author" bson:"author"`
	Tasks     []primitive.ObjectID `bson:"tasks" json:"tasks"`

	CreatedAt time.Time `bson:"createdAt" json:"createdAt"`
	UpdatedAt time.Time `bson:"updatedAt" json:"updatedAt"`

	StartedAt  time.Time `bson:"startedAt" json:"startedAt"`
	FinishedAt time.Time `bson:"finishedAt" json:"finishedAt"`
}
