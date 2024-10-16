package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	"server/internal/domain/types/enum"
	"time"
)

type Task struct {
	ID          primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Title       string             `json:"title" bson:"title"`
	Description string             `json:"description" bson:"description"`
	Status      enum.Status        `json:"status" bson:"status"`
	Priority    enum.Priority      `json:"priority" bson:"priority"`

	Contributors []primitive.ObjectID `bson:"contributors" json:"contributors"`

	Deadline time.Time `json:"deadline" bson:"deadline"`

	CreatedAt time.Time `json:"createdAt" bson:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt" bson:"updatedAt"`
}
