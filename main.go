package main

import (
	"fmt"
	"net/http"
)

func main(){
	initDB()

	http.HandleFunc("/add", handleAdd)
	http.HandleFunc("/list", handleList)
	http.HandleFunc("/delete", handleDelete)

	fmt.Println("Server started at :8080")
	http.ListenAndServe(":8080", nil)
}