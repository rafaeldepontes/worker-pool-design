package service

import (
	"github.com/rafaeldepontes/worker-pool-design/internal/process"
	"github.com/rafaeldepontes/worker-pool-design/internal/user"
	"github.com/rafaeldepontes/worker-pool-design/internal/user/model"
	userRepo "github.com/rafaeldepontes/worker-pool-design/internal/user/repository"
)

type userService struct {
	repo user.Repository
}

func NewService() user.Service {
	return &userService{
		repo: userRepo.NewRepository(),
	}
}

func (us *userService) ProcessData(d process.Process[model.User]) error {
	switch d.Type {
	case "create":
		println("creating users")
		if err := us.repo.Create(&d.Data); err != nil {
			return err
		}
	case "update":
		println("updatings users")
		if err := us.repo.Update(d.IDs, &d.Data); err != nil {
			return err
		}
	case "delete":
		println("deleting users")
		if err := us.repo.Delete(d.IDs); err != nil {
			return err
		}
	}
	return nil
}
