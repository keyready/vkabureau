package response

type OverviewStatistics struct {
	TotalTasks       int64 `json:"totalTasks"`
	ProgressTasks    int64 `json:"progressTasks"`
	CompletedTasks   int64 `json:"completedTasks"`
	TotalProjects    int64 `json:"totalProjects"`
	ProgressProjects int64 `json:"progressProjects"`
}

type TasksStatistics struct {
	CriticalTasks int64 `json:"criticalTasks"`
	MediumTasks   int64 `json:"mediumTasks"`
	FeatureTasks  int64 `json:"featureTasks"`
}
