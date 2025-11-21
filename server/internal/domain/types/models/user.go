package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID       primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Login    string             `json:"login" bson:"login"`
	Password string             `json:"password" bson:"password"`

	Firstname  string `json:"firstname" bson:"firstname"`
	Middlename string `json:"middlename" bson:"middlename"`
	Lastname   string `json:"lastname" bson:"lastname"`

	Avatar string `json:"avatar" bson:"avatar"`

	Rank     string `json:"rank" bson:"rank"`
	Division string `json:"division" bson:"division"`

	ControlAnswer   string `json:"controlAnwser" bson:"controlAnswer"`
	ControlQuestion string `json:"controlQuestion" bson:"controlQuestion"`

	CreatedAt time.Time `json:"createdAt" bson:"createdAt"`
}

type RecoveryQuestion struct {
	ID       primitive.ObjectID `json:"id" bson:"_id"`
	Question string             `json:"question" bson:"question"`
}
