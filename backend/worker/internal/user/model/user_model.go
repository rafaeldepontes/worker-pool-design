package model

import "time"

type User struct {
	ID         int64     `json:"id"`
	Username   string    `json:"username"`
	Age        int       `json:"age"`
	Created_at time.Time `json:"created_at"`
}
