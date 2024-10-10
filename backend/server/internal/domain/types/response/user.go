package response

import "time"

type UserData struct {
	Login string `json:"login" bson:"login"`

	Firstname  string `json:"firstname" bson:"firstname"`
	Middlename string `json:"middlename" bson:"middlename"`
	Lastname   string `json:"lastname" bson:"lastname"`

	Rank     string `json:"rank" bson:"rank"`
	Division string `json:"division" bson:"division"`

	CreatedAt time.Time `json:"created_at" bson:"created_at"`
}

type ProfileData struct {
	Firstname  string `json:"firstname" bson:"firstname"`
	Middlename string `json:"middlename" bson:"middlename"`
	Lastname   string `json:"lastname" bson:"lastname"`

	Rank     string `json:"rank" bson:"rank"`
	Division string `json:"division" bson:"division"`
}

type LoginResponse struct {
	AccessToken string `json:"accessToken"`
}
