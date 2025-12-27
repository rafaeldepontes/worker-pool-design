package user

import "github.com/rafaeldepontes/worker-pool-design/internal/user/model"

type Repository interface {
	Create(user *model.User) error
	Update(ids []int64, newUser *model.User) error
	Delete(ids []int64) error
}
