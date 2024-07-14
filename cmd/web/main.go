package main

import (
	"database/sql"
	"fmt"
	"net/http"
	"sportsfolio/Handlers"
	"sportsfolio/drivers"
)

const portnumber = ":8000"

func main() {
	// THIS IS MAIN FILE FOR SportsFolio Backend
	fmt.Println("Connecting to Database")
	db, err := drivers.ConnectSQL("host=localhost port=5432 dbname=sportsFolio user=yash password=123")
	if err != nil {
		fmt.Println(err)
		return
	}
	defer func(SQL *sql.DB) {
		err := SQL.Close()
		if err != nil {
			fmt.Println("Error closing SQL", err)
			return
		}
	}(db.SQL)
	err = db.SQL.Ping()
	if err != nil {
		fmt.Println("Error in Pinging database", err)
		return
	}
	fmt.Println("Connected to Database in main.go")

	repo := Handlers.NewRepository(db)
	Handlers.NewHandler(repo)

	srv := http.Server{
		Addr:    portnumber,
		Handler: routes(),
	}

	err = srv.ListenAndServe()
	if err != nil {
		fmt.Println(err)
		return
	}
}
