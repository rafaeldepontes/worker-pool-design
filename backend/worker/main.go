package main

import (
	"runtime"

	"github.com/joho/godotenv"
	mbSvc "github.com/rafaeldepontes/worker-pool-design/internal/message-broker/service"
	"github.com/rafaeldepontes/worker-pool-design/internal/tool"
	"github.com/rafaeldepontes/worker-pool-design/pkg/database/postgres"
	"github.com/rafaeldepontes/worker-pool-design/pkg/message-broker/rabbitmq"
)

var qtdJob = runtime.NumCPU() - 1

func main() {
	envFile := ".env"
	tool.ChecksEnvFile(&envFile)
	godotenv.Load(envFile)

	runtime.GOMAXPROCS(runtime.NumCPU())

	defer rabbitmq.Close()
	defer postgres.Close()

	// LOAD THE MESSAGE BROKER...
	messageBroker := mbSvc.NewService()

	// RUN THE APPLICATION...
	for id := range qtdJob {
		go messageBroker.Worker(id + 1)
	}

	select {}
}
