package request

type SendMessage struct {
	ForumId string `form:"forumId"`
	Author  string `bson:"author" form:"author"`
	Body    string `form:"body" bson:"body"`
}
