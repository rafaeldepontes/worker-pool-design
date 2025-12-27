package repository

import (
	"database/sql"
	"fmt"

	"github.com/rafaeldepontes/worker-pool-design/internal/user"
	"github.com/rafaeldepontes/worker-pool-design/internal/user/model"
	"github.com/rafaeldepontes/worker-pool-design/pkg/database/postgres"
)

var (
	createStmt *sql.Stmt
	updateStmt *sql.Stmt
	deleteStmt *sql.Stmt
)

type userRepository struct {
	db *sql.DB
}

func NewRepository() user.Repository {
	ur := userRepository{
		db: postgres.GetDb(),
	}

	createStmt, _ = ur.preparedInsertStatement()
	updateStmt, _ = ur.preparedUpdateStatement()
	deleteStmt, _ = ur.preparedDeleteStatement()

	return &ur
}

func (ur userRepository) Create(user *model.User) error {
	_, err := createStmt.Exec(user.Username, user.Age)
	if err != nil {
		return err
	}

	return nil
}

func (ur userRepository) Update(ids []int64, newUser *model.User) error {
	_, err := updateStmt.Exec(ids, newUser.Username, newUser.Age)
	if err != nil {
		return err
	}

	return nil
}

func (ur userRepository) Delete(ids []int64) error {
	_, err := deleteStmt.Exec(ids)
	if err != nil {
		return err
	}

	return nil
}

func CloseStatements() error {
	if err := createStmt.Close(); err != nil {
		return err
	}

	if err := updateStmt.Close(); err != nil {
		return err
	}

	if err := deleteStmt.Close(); err != nil {
		return err
	}

	return nil
}

func (ur userRepository) preparedInsertStatement() (*sql.Stmt, error) {
	stmt, err := ur.db.Prepare(`insert into users (username, age) values ($1, $2)`)
	if err != nil {
		fmt.Println("[ERROR] something went wrong trying to prepare the insert sql\n", err)
		return nil, err
	}
	return stmt, nil
}

func (ur userRepository) preparedUpdateStatement() (*sql.Stmt, error) {
	stmt, err := ur.db.Prepare(`
		update users
		set username = $2,
		age = $3
		where id in (SELECT * FROM UNNEST($1::BIGINT[]))
	`)
	if err != nil {
		fmt.Println("[ERROR] something went wrong trying to prepare the update sql\n", err)
		return nil, err
	}
	return stmt, nil
}

func (ur userRepository) preparedDeleteStatement() (*sql.Stmt, error) {
	stmt, err := ur.db.Prepare(`delete from users where id in (SELECT * FROM UNNEST($1::BIGINT[]))`)
	if err != nil {
		fmt.Println("[ERROR] something went wrong trying to prepare the delete sql\n", err)
		return nil, err
	}
	return stmt, nil
}
