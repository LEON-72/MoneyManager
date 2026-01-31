package main

import (
	"database/sql"
	_ "modernc.org/sqlite"
)

var db *sql.DB

func initDB() {
var err error
	db, err = sql.Open("sqlite", "./item.db")
	if err != nil {
		panic(err)
	}

	query := `CREATE TABLE IF NOT EXISTS expenses (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT,
			amount INTEGER,
			created_at DATETIME DEFAULT (DATETIME('now','localtime'))
	);`
	db.Exec(query)
}