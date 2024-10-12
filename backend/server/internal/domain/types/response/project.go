package response

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	"server/internal/domain/types/dto"
	"server/internal/domain/types/enum"
	"server/internal/domain/types/models"
	"time"
)

type ProjectData struct {
	ID          primitive.ObjectID `bson:"_id" json:"id"`
	Title       string             `bson:"title" json:"title"`
	Description string             `bson:"description" json:"description"`

	Status enum.Status  `bson:"status" json:"status"`
	Likes  dto.LikeData `bson:"likes" json:"likes"`

	Author dto.MemberData `json:"author" bson:"author"`
	Tasks  []models.Task  `bson:"tasks" json:"tasks"`

	CreatedAt time.Time `bson:"createdAt" json:"createdAt"`

	StartedAt  time.Time `bson:"startedAt" json:"startedAt"`
	FinishedAt time.Time `bson:"finishedAt" json:"finishedAt"`
}
