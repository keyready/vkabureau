DC_PATH=./backend/d-c.dev.yml

lint-run:
	cd ./backend/server && golangci-lint run

dev-build:
	docker-compose -f $(DC_PATH) up --build

dev-start:
	docker-compose -f $(DC_PATH) up

dev-stop:
	docker-compose -f $(DC_PATH) stop