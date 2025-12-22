package main

import (
	"github.com/joho/godotenv"
	"github.com/rafaeldepontes/worker-pool-design/internal/tool"
	"github.com/rafaeldepontes/worker-pool-design/pkg/message-broker/rabbitmq"
)

func main() {
	envFile := ".env"
	tool.ChecksEnvFile(&envFile)
	godotenv.Load(envFile)

	// CHANGE THIS TO BE 100% ANONYMOUS, SO JUST USE A SERVICE INSTEAD OF THE REAL PACKAGE... NEED TO ADD A NEW LAYER
	// DEFERRING CLOSE CALLS...
	defer rabbitmq.Close() 

	// LOAD THE MESSAGE BROKER...

	// LOAD THE DATABASE...

	// RUN THE APPLICATION...
}
