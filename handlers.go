package main

import (
	"fmt"
	"net/http"
	"encoding/json"
)

func handleAdd(w http.ResponseWriter, r *http.Request) {
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
}

func handleList(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	rows, _ := db.Query("SELECT id, name, amount, created_at FROM expenses ORDER BY amount DESC")
	defer rows.Close()

	list := []Expense{}
	for rows.Next(){
		var e Expense
		if err := rows.Scan(&e.ID, &e.Name, &e.Amount, &e.CreatedAt); err != nil {
			continue
		}
		list = append(list, e)
	}

	json.NewEncoder(w).Encode(list)
}

func handleDelete(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")

		id := r.URL.Query().Get("id")
		if id == "" {
			http.Error(w, "IDが指定されていません", 400)
			return
		}

		_, err := db.Exec("DELETE FROM expenses WHERE id = ?", id)
		if err != nil {
			http.Error(w, "削除に失敗しました", 500)
			return
		}

		fmt.Printf("ID:%s を削除しました", id)
		fmt.Fprintf(w, "削除成功")
}