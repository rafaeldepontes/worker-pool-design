package service

import (
	amqp "github.com/rabbitmq/amqp091-go"
	"github.com/rafaeldepontes/worker-pool-design/pkg/message-broker/rabbitmq"
)

type rabbitMQService struct {
	connection *amqp.Connection
	channel    *amqp.Channel
	queue      *amqp.Queue
	consumer   *<-chan amqp.Delivery
}

func newRabbitMQService() *rabbitMQService {
	pointer := rabbitmq.GetConnection()
	if pointer == nil {
		return nil
	}
	return &rabbitMQService{
		connection: rabbitmq.GetConnection(),
		channel:    rabbitmq.GetChannel(),
		queue:      rabbitmq.GetQueue(),
		consumer:   rabbitmq.GetConsumer(),
	}
}
