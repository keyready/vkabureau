package response

type TokenProvider struct {
	Token string `json:"accessToken"`
}

type AuthorProject struct {
	Name      string `json:"name"`
	AvatarUrl string `json:"avatar"`
}

type ReposResponse struct {
	TotalCount int `json:"totalCount"`
	Data       []map[string]interface{}
}

type AllProjectsResponse struct {
	ID          int64  `json:"id"`
	CreatedAt   string `json:"created_at"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Url         string `json:"url"`
	Private     bool   `json:"private"`

	CommitsId []int64       `json:"commitsId"`
	Author    AuthorProject `json:"author"`
}
