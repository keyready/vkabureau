package dto

import "go.mongodb.org/mongo-driver/bson/primitive"

type MemberData struct {
	ID         string `bson:"_id" json:"id"`
	Firstname  string `json:"firstname" bson:"firstname"`
	Middlename string `json:"middlename" bson:"middlename"`
	Lastname   string `json:"lastname" bson:"lastname"`

	Avatar string `json:"avatar" bson:"avatar"`

	Rank     string `json:"rank" bson:"rank"`
	Division string `json:"division" bson:"division"`
}

type LikeData struct {
	Value       int                  `bson:"value" json:"value"`
	FollowersId []primitive.ObjectID `bson:"followersId" json:"followersId"`
}
