package repository

import (
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"net/http"
	"server/internal/domain/types/enum"
	"server/internal/domain/types/response"
)

type StatisticsRepository interface {
	Overview() (httpCode int, err error, overviewStat response.OverviewStatistics)
	Tasks() (httpCode int, err error, tasksStat response.TasksStatistics)
}

type StatisticsRepositoryImpl struct {
	mongodb *mongo.Database
}

func NewStatisticsRepositoryImpl(mongodb *mongo.Database) *StatisticsRepositoryImpl {
	return &StatisticsRepositoryImpl{mongodb: mongodb}
}

func (s StatisticsRepositoryImpl) Overview() (httpCode int, err error, overviewStat response.OverviewStatistics) {
	projectsCollection := s.mongodb.Collection("projects")
	tasksCollection := s.mongodb.Collection("tasks")

	totalTasks, _ := tasksCollection.CountDocuments(context.TODO(), bson.D{}, options.Count().SetHint("_id_"))
	totalProjects, _ := projectsCollection.CountDocuments(context.TODO(), bson.D{}, options.Count().SetHint("_id_"))

	progressTasks, _ := tasksCollection.CountDocuments(context.TODO(), bson.M{"status": enum.PROGRESS})
	progressProjects, _ := projectsCollection.CountDocuments(context.TODO(), bson.M{"status": enum.PROGRESS})
	completedTasks, _ := tasksCollection.CountDocuments(context.TODO(), bson.M{"status": enum.COMPLETED})

	overviewStat.TotalProjects = totalProjects
	overviewStat.TotalTasks = totalTasks
	overviewStat.ProgressProjects = progressProjects
	overviewStat.CompletedTasks = completedTasks
	overviewStat.ProgressTasks = progressTasks

	return http.StatusOK, nil, overviewStat
}

func (s StatisticsRepositoryImpl) Tasks() (httpCode int, err error, tasksStat response.TasksStatistics) {
	tasksCollection := s.mongodb.Collection("tasks")

	mediumTasks, _ := tasksCollection.CountDocuments(context.TODO(), bson.M{"priority": enum.MEDIUM})
	criticalTasks, _ := tasksCollection.CountDocuments(context.TODO(), bson.M{"priority": enum.CRITICAL})
	featureTasks, _ := tasksCollection.CountDocuments(context.TODO(), bson.M{"priority": enum.FEATURE})

	tasksStat.CriticalTasks = criticalTasks
	tasksStat.MediumTasks = mediumTasks
	tasksStat.FeatureTasks = featureTasks

	return http.StatusOK, nil, tasksStat
}
