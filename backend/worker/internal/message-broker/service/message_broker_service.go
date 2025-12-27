package service

import (
	"encoding/json"
	"fmt"
	"time"

	messagebroker "github.com/rafaeldepontes/worker-pool-design/internal/message-broker"
	"github.com/rafaeldepontes/worker-pool-design/internal/process"
	"github.com/rafaeldepontes/worker-pool-design/internal/user"
	"github.com/rafaeldepontes/worker-pool-design/internal/user/model"
	uSvc "github.com/rafaeldepontes/worker-pool-design/internal/user/service"
)

const BrazilianDateTimeFormat = "02/01/2006 15:04:05"

type messageService struct {
	userSvc user.Service
	rmqSvc  *rabbitMQService
}

func NewService() messagebroker.Service {
	return &messageService{
		userSvc: uSvc.NewService(),
		rmqSvc:  newRabbitMQService(),
	}
}

// worker implements [messagebroker.Service].
func (msgSvc *messageService) Worker(id int) {
	fmt.Printf("Worker %d started\n", id)
	var s *string

	for data := range *msgSvc.rmqSvc.consumer {
		var processModel process.Process[model.User]
		if err := json.Unmarshal(data.Body, &processModel); err != nil {
			fmt.Println("[ERROR] unexpected behaviour while unmarshalling the data\n", err)
			// RETRY MECHANISM
			continue
		}

		s = strPtr(time.Now().Local().Format(BrazilianDateTimeFormat))
		fmt.Printf("%s: Worker %d processing: %s\n", *s, id, processModel.Type)

		if err := msgSvc.userSvc.ProcessData(processModel); err != nil {
			fmt.Println("[ERROR]", err)
		}
	}
}

func strPtr(s string) *string {
	return &s
}
