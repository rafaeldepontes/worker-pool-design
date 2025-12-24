package service

import (
	"database/sql"
	"fmt"
	"time"

	messagebroker "github.com/rafaeldepontes/worker-pool-design/internal/message-broker"
	"github.com/rafaeldepontes/worker-pool-design/pkg/database/postgres"
)

const BrazilianDateTimeFormat = "02/01/2006 15:04:05"

type messageService struct {
	db     *sql.DB
	rmqSvc *rabbitMQService
}

func NewService() messagebroker.Service {
	return &messageService{
		db:     postgres.GetDb(),
		rmqSvc: newRabbitMQService(),
	}
}

// worker implements [messagebroker.Service].
func (msgSvc *messageService) Worker(id int) {
	fmt.Printf("Worker %d started\n", id)
	var s *string
	for data := range *msgSvc.rmqSvc.consumer {
		s = strPtr(time.Now().Local().Format(BrazilianDateTimeFormat))
		fmt.Printf("%s: Worker %d processing: %s\n", *s, id, string(data.Body))
	}
}

func strPtr(s string) *string {
	return &s
}
