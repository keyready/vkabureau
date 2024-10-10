package request

import (
	"mime/multipart"
	"time"
)

type NewMessage struct {
	Author      string                  `bson:"author" json:"author"`
	Body        string                  `bson:"body" json:"body"`
	Attachments []*multipart.FileHeader `bson:"attachments" json:"attachments"`
	CreatedAt   time.Time               `bson:"createdAt" json:"createdAt"`
}
