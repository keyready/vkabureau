package enum

type Status string
type Priority string

const (
	CREATED   Status = "CREATED"
	PROGRESS         = "PROGRESS"
	REVIEW           = "REVIEW"
	COMPLETED        = "COMPLETED"
)

const (
	CRITICAL Priority = "CRITICAL"
	FEATURE           = "FEATURE"
	MEDIUM            = "MEDIUM"
)
