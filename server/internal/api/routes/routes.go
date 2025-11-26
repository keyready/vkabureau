package routes

import (
	"server/internal/api/controllers"
	v1 "server/internal/api/routes/v1"
	"server/internal/authorizer"
	"server/internal/domain/repository"
	"server/internal/domain/usecase"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

func InitRoutes(
	mongodb *mongo.Database,
	authorizer *authorizer.Authorizer,
) *gin.Engine {
	r := gin.New()

	r.Use(gin.LoggerWithFormatter(LocalLogger))
	r.Use(gin.Recovery())

	ur := repository.NewUserRepositoryImpl(mongodb)
	uu := usecase.NewUserUsecaseImpl(ur, authorizer)
	uc := controllers.NewUserControllers(uu)
	v1.NewUserRoutes(r, authorizer, uc)

	pr := repository.NewProjectRepositoryImpl(mongodb)
	pu := usecase.NewProjectUsecaseImpl(pr)
	pc := controllers.NewProjectController(pu)
	v1.NewProjectRoutes(r, authorizer, pc)

	tr := repository.NewTaskRepository(mongodb)
	tu := usecase.NewTaskRepository(tr)
	tc := controllers.NewTaskController(tu)
	v1.NewTaskRoutes(tc, authorizer, r)

	fr := repository.NewForum(mongodb)
	fu := usecase.NewForumUsecase(fr)
	fc := controllers.NewForumControllers(fu)
	v1.NewForumRoutes(r, authorizer, fc)

	sr := repository.NewStatisticsRepositoryImpl(mongodb)
	su := usecase.NewStatisticsUsecaseImpl(sr)
	sc := controllers.NewStatisticsControllers(su)
	v1.NewStatisticsRoutes(r, sc)

	return r
}
