package dto

import (
	"mime/multipart"
	"time"
)

type MessageData struct {
	Author          string                  `bson:"author"`
	Body            string                  `json:"body" bson:"body"`
	Attachments     []*multipart.FileHeader `json:"attachments"`
	AttachmentsName []string                `bson:"attachmentsName" json:"attachmentsName"`
	CreatedAt       time.Time               `bson:"createdAt"`
}
