package request

import (
	"mime/multipart"
	"time"
)

type SendMessage struct {
	ForumId         string                  `form:"forumId"`
	Author          string                  `bson:"author" form:"author"`
	Body            string                  `form:"body" bson:"body"`
	Attachments     []*multipart.FileHeader `form:"attachments"`
	AttachmentsName []string                `bson:"attachmentsName"`
	CreatedAt       time.Time               `bson:"createdAt" form:"createdAt"`
}
