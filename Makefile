#lint:  go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest
D-C.DEV_PATH=./backend/d-c.dev.yml

lint-run:
	cd ./backend/server && golangci-lint run

dev-build:
	docker-compose -f $(D-C.DEV_PATH) up --build

dev-start:
	docker-compose -f $(D-C.DEV_PATH) up

dev-stop:
	docker-compose -f $(D-C.DEV_PATH) stop