package request

import "server/internal/domain/types/dto"

type SendMessage struct {
	ForumId string          `json:"forumId"`
	Message dto.MessageData `json:"message"`
}
