package user

import "github.com/rafaeldepontes/worker-pool-design/internal/user/model"

type Repository interface {
	Create(user *model.User) error
	Update(newUser *model.User) error
	Delete(id int64) error
}
