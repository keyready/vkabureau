package dto

import (
	"time"
)

type MessageData struct {
	Author          string    `bson:"author" json:"author"`
	Body            string    `json:"body" bson:"body"`
	AttachmentsName []string  `json:"attachments" bson:"attachmentsName"`
	CreatedAt       time.Time `bson:"createdAt" json:"createdAt"`
}
