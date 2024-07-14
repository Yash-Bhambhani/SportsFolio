package dbrepo

import (
	"database/sql"
	"sportsfolio/database"
)

type PostgresDBRepo struct {
	DB *sql.DB
}

func NewPostgresRepo(conn *sql.DB) database.DatabaseRepo {
	return &PostgresDBRepo{
		DB: conn,
	}
}
