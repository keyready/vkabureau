package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	"mime/multipart"
	"time"
)

type Message struct {
	Author      string                  `bson:"author" json:"author"`
	Body        string                  `bson:"body" json:"body"`
	Attachments []*multipart.FileHeader `bson:"attachments" json:"attachments"`
	CreatedAt   time.Time               `bson:"createdAt" json:"createdAt"`
}

type Forum struct {
	Id        primitive.ObjectID   `bson:"_id,omitempty" json:"id"`
	ProjectId primitive.ObjectID   `bson:"projectId,omitempty" json:"projectId"`
	MembersId []primitive.ObjectID `bson:"membersId" json:"membersId"`
	Messages  []Message            `bson:"messages" json:"messages"`
}
