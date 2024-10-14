DC_DEV_PATH=./backend/d-c.dev.yml
DC_PROD_PATH=./d-c.prod.yml

ROOT_USERNAME=admin
ROOT_PASSWORD=admin
MONGO_URL=mongodb://admin:admin@mongodb:27017/

dev-build:
	docker-compose -f $(DC_DEV_PATH) up --build

dev-start:
	docker-compose -f $(DC_DEV_PATH) up

dev-stop:
	docker-compose -f $(DC_DEV_PATH) stop

prod-build:
	docker-compose -f $(DC_PROD_PATH) --build-arg MONGO_INITDB_ROOT_USERNAME=$(ROOT_USERNAME) \
 									  --build-arg MONGO_INITDB_ROOT_PASSWORD=$(ROOT_PASSWORD) \
 									  --build-arg ME_CONFIG_MONGODB_ADMINUSERNAME=$(ROOT_USERNAME) \
 									  --build-arg ME_CONFIG_MONGODB_ADMINPASSWORD=$(ROOT_PASSWORD) \
 									  --build-arg ME_CONFIG_BASICAUTH=false \
 									  --build-arg ME_CONFIG_MONGODB_URL=$(MONGO_URL) up --build

prod-start:
	docker-compose -f $(DC_PROD_PATH) up

prod-stop:
	docker-compose -f $(DC_PROD_PATH) stop

