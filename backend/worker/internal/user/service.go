package user

import (
	"github.com/rafaeldepontes/worker-pool-design/internal/process"
	"github.com/rafaeldepontes/worker-pool-design/internal/user/model"
)

type Service interface {
	ProcessData(data process.Process[model.User]) error
}
