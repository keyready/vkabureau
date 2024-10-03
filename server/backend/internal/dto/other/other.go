package other

type RepositoryUpdateRequest struct {
	Private bool "json:private"
}

type OwnerProject struct {
	Login     string `json:"login"`
	AvatarURL string `json:"avatar_url"`
}

type ProjectJson struct {
	Url         string       `json:"url"`
	CommitsUrl  string       `json:"commits_url"`
	CreatedAt   string       `json:"created_at"`
	Name        string       `json:"name"`
	Description string       `json:"description"`
	Private     bool         `json:"private"`
	Owner       OwnerProject `json:"owner"`
}

type AuthorJson struct {
	Date string `json:"date"`
}

type CommitJson struct {
	Author AuthorJson `json:"author"`
}
