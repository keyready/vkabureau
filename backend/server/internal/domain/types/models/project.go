package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	"server/internal/domain/types/enum"
	"time"
)

type Project struct {
	ID          primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Title       string             `bson:"title" json:"title"`
	Description string             `bson:"description" json:"description"`
	Status      enum.Status        `bson:"status" json:"status"`

	Author primitive.ObjectID `json:"author" bson:"author"`
	Tasks  []Task             `bson:"tasks" json:"tasks"`

	CreatedAt time.Time `bson:"createdAt" json:"createdAt"`
	UpdatedAt time.Time `bson:"updatedAt" json:"updatedAt"`

	StartedAt  time.Time `bson:"startedAt" json:"startedAt"`
	FinishedAt time.Time `bson:"finishedAt" json:"finishedAt"`
}

type Task struct {
	Title       string        `json:"title" bson:"title"`
	Description string        `json:"description" bson:"description"`
	Status      enum.Status   `json:"status" bson:"status"`
	Priority    enum.Priority `json:"priority" bson:"priority"`

	Contributors []primitive.ObjectID `bson:"contributors" json:"contributors"`

	CreatedAt time.Time `json:"createdAt" bson:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt" bson:"updatedAt"`
}
