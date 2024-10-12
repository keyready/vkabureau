package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	"server/internal/domain/types/dto"
)

type Forum struct {
	ID        primitive.ObjectID   `bson:"_id" json:"id"`
	Title     string               `bson:"title" json:"title"`
	EntityID  primitive.ObjectID   `bson:"entityId" json:"entityId"` // проект или задача
	MembersID []primitive.ObjectID `bson:"membersId" json:"membersId"`
	Messages  []dto.MessageData    `bson:"messages" json:"messages"`
}
