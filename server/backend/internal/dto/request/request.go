package request

type Authorize struct {
	Code         string `json:"code"`
	ClientId     string
	RedirectUri  string
	ClientSecret string
}

type Refresh struct {
}

type ImportProjectRequest struct {
	Url   string `json:"name"`
	Type  string `json:"type"`
	Token string
}

type AddTaskRequest struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	Priority    string `json:"priority"`
	Deadline    string `json:"deadline"`
	ProjectId   int64  `json:"projectId"`
}

type UpdateTaskRequest struct {
	Status   string `json:"status"`
	Priority string `json:"priority"`
	TaskId   int64  `json:"taskId"`
}
