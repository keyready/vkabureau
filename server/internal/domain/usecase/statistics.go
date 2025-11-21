package usecase

import (
	"server/internal/domain/repository"
	"server/internal/domain/types/response"
)

type StatisticsUsecase interface {
	Overview() (httpCode int, err error, overviewStat response.OverviewStatistics)
	Tasks() (httpCode int, err error, tasksStat response.TasksStatistics)
}

type StatisticsUsecaseImpl struct {
	statisticsRepo repository.StatisticsRepository
}

func NewStatisticsUsecaseImpl(statisticsRepo repository.StatisticsRepository) StatisticsUsecaseImpl {
	return StatisticsUsecaseImpl{statisticsRepo: statisticsRepo}
}

func (s StatisticsUsecaseImpl) Overview() (httpCode int, err error, overviewStat response.OverviewStatistics) {
	httpCode, err, overviewStat = s.statisticsRepo.Overview()
	return httpCode, err, overviewStat
}

func (s StatisticsUsecaseImpl) Tasks() (httpCode int, err error, tasksStat response.TasksStatistics) {
	httpCode, err, tasksStat = s.statisticsRepo.Tasks()
	return httpCode, err, tasksStat
}
