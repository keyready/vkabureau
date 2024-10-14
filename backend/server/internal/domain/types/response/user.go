package response

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	"time"
)

type UserData struct {
	ID    primitive.ObjectID `bson:"_id" json:"id"`
	Login string             `json:"login" bson:"login"`

	Firstname  string `json:"firstname" bson:"firstname"`
	Middlename string `json:"middlename" bson:"middlename"`
	Lastname   string `json:"lastname" bson:"lastname"`

	Avatar string `json:"avatar" bson:"avatar"`

	Rank     string `json:"rank" bson:"rank"`
	Division string `json:"division" bson:"division"`

	CreatedAt time.Time `json:"createdAt" bson:"createdAt"`
}

type ProfileData struct {
	Firstname  string `json:"firstname" bson:"firstname"`
	Middlename string `json:"middlename" bson:"middlename"`
	Lastname   string `json:"lastname" bson:"lastname"`

	Avatar string `json:"avatar" bson:"avatar"`

	Rank     string `json:"rank" bson:"rank"`
	Division string `json:"division" bson:"division"`
}

type LoginResponse struct {
	AccessToken string `json:"accessToken"`
}
