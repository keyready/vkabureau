package request

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	"time"
)

type SignUp struct {
	Login    string `json:"login" binding:"required" bson:"login"`
	Password string `json:"password" binding:"required" bson:"password"`

	Firstname  string `json:"firstname" bson:"firstname"`
	Middlename string `json:"middlename" bson:"middlename"`
	Lastname   string `json:"lastname" bson:"lastname"`

	Avatar string `json:"avatar" bson:"avatar"`

	Rank     string `json:"rank" bson:"rank"`
	Division string `json:"division" bson:"division"`

	CreatedAt time.Time `json:"createdAt" bson:"createdAt"`
}

type Login struct {
	UserLogin string `json:"login" binding:"required" bson:"login"`
	Password  string `json:"password" binding:"required" bson:"password"`
}

type ChangeProfile struct {
	ID    primitive.ObjectID `json:"id" bson:"_id"`
	Login string             `json:"login" binding:"required" bson:"login"`

	Firstname  string `json:"firstname" bson:"firstname"`
	Middlename string `json:"middlename" bson:"middlename"`
	Lastname   string `json:"lastname" bson:"lastname"`

	Avatar string `json:"avatar" bson:"avatar"`

	Rank     string `json:"rank" bson:"rank"`
	Division string `json:"division" bson:"division"`
}
