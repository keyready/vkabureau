package controllers

import (
	"github.com/gin-gonic/gin"
	"server/internal/domain/usecase"
)

type StatisticsController struct {
	statUsecase usecase.StatisticsUsecase
}

func NewStatisticsControllers(statUsecase usecase.StatisticsUsecase) *StatisticsController {
	return &StatisticsController{statUsecase: statUsecase}
}

func (sc *StatisticsController) Overview(ctx *gin.Context) {
	httpCode, _, overview := sc.statUsecase.Overview()
	ctx.JSON(httpCode, overview)
}

func (sc *StatisticsController) Tasks(ctx *gin.Context) {
	httpCode, _, tasks := sc.statUsecase.Tasks()
	ctx.JSON(httpCode, tasks)
}
