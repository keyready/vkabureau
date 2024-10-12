package routes

import (
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
	"server/internal/api/controllers"
	v1 "server/internal/api/routes/v1"
	"server/internal/domain/repository"
	"server/internal/domain/usecase"
)

func InitRoutes(mongodb *mongo.Database) *gin.Engine {
	r := gin.New()

	ur := repository.NewUserRepositoryImpl(mongodb)
	uu := usecase.NewUserUsecaseImpl(ur)
	uc := controllers.NewUserControllers(uu)
	v1.NewUserRoutes(r, uc)

	pr := repository.NewProjectRepositoryImpl(mongodb)
	pu := usecase.NewProjectUsecaseImpl(pr)
	pc := controllers.NewProjectController(pu)
	v1.NewProjectRoutes(r, pc)

	tr := repository.NewTaskRepository(mongodb)
	tu := usecase.NewTaskRepository(tr)
	tc := controllers.NewTaskController(tu)
	v1.NewTaskRoutes(tc, r)

	fr := repository.NewForum(mongodb)
	fu := usecase.NewForumUsecase(fr)
	fc := controllers.NewForumControllers(fu)
	v1.NewForumRoutes(r, fc)

	return r
}
