package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"

	_ "modernc.org/sqlite"
)

type Expense struct {
	Name   string `json:"name"`
	Amount int    `json:"amount"`
}


// データを保存するリスト
var db *sql.DB

func main(){
	var err error
	db, err = sql.Open("sqlite", "./item.db")
	if err != nil {
		panic(err)
	}

	query := `CREATE TABLE IF NOT EXISTS expenses (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT,
			amount INTEGER
	);`
	db.Exec(query)

	http.HandleFunc("/add", func(w http.ResponseWriter, r *http.Request){
		w.Header().Set("Access-Control-Allow-Origin", "*")
		name := r.URL.Query().Get("name")
		amount := r.URL.Query().Get("amount")

		_, err := db.Exec("INSERT INTO expenses (name, amount) VALUES (?, ?)", name, amount)
		if err != nil{
			fmt.Fprintf(w, "保存に失敗しました")
			return
		}
		fmt.Printf("追加されました: %s (%s円)\n", name, amount)
		fmt.Fprintf(w, "保存成功")
	})

	http.HandleFunc("/list", func(w http.ResponseWriter, r *http.Request){
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Content-Type", "application/json")

		rows, _ := db.Query("SELECT name, amount FROM expenses")
		defer rows.Close()

		// fmt.Fprintln(w, "--- 家計簿一覧 ---")

		list := []Expense{}
		for rows.Next(){
			var e Expense
			rows.Scan(&e.Name, &e.Amount)
			list = append(list, e)
		}

		json.NewEncoder(w).Encode(list)
	})

	fmt.Println("Server started at :8080")
	http.ListenAndServe(":8080", nil)
}