package routes

import (
	"backend/internal/controllers"
	"backend/internal/repositories"
	v1 "backend/internal/routes/api/v1"
	"backend/internal/services"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"net/http"
)

func InitRouter(db *gorm.DB) *gin.Engine {
	r := gin.New()
	r.Use(gin.Logger())
	r.Use(gin.Recovery())

	r.StaticFS("/swagger", http.Dir("docs/"))

	ar := repositories.NewAuthRepositoryImpl(db)
	as := services.NewAuthServiceImpl(ar)
	ac := controllers.NewAuthController(as)
	v1.NewAuthRoutes(r, ac)

	rr := repositories.NewRepoRepositoryImpl(db)
	rs := services.NewRepoServiceImpl(rr)
	rc := controllers.NewRepoController(rs)
	v1.NewRepoRoutes(r, rc)

	prj_r := repositories.NewProjectsRepositoryImpl(db)
	prj_s := services.NewProjectServiceImpl(prj_r)
	prj_c := controllers.NewProjectControllers(prj_s)
	v1.NewProjectRoutes(r, prj_c)

	cr := repositories.NewCommitRepositoryImpl(db)
	cs := services.NewCommitServiceImpl(cr)
	cc := controllers.NewCommitController(cs)
	v1.NewCommitRoutes(r, cc)

	tr := repositories.NewTaskRepository(db)
	ts := services.NewTaskServiceImpl(tr)
	tc := controllers.NewTaskController(ts)
	v1.NewTaskRoutes(r, tc)

	return r
}
