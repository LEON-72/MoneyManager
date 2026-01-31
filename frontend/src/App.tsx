import { useState, useEffect } from "react";
import "./App.css";
import { ExpenseItem } from "./components/ExpenseItem";
import { ExpenseForm } from "./components/ExpenseForm";

interface Item {
    id: number;
    name: string;
    amount: number;
    created_at: string;
}

function App() {
const [items, setItems] = useState<Item[]>([]);

const fetchItems = async () => {
    try {
    const res = await fetch("http://localhost:8080/list");
    const data = await res.json();
    setItems(data);
    } catch (err) {
    console.error("エラー", err);
    }
};

useEffect(() => {
    const loadData = async () => {
    await fetchItems();
    };
    loadData();
}, []);

const AddItem = async (name: string, amount: number) => {
    await fetch(`http://localhost:8080/add?name=${name}&amount=${amount}`);
    await fetchItems(); // 追加したらリストを更新
};

const deleteItem = async (id: number) => {
    if (!window.confirm("本当に削除しますか？")) return;

    await fetch(`http://localhost:8080/delete?id=${id}`);
    fetchItems(); // 削除後にリストを再読み込み
    };

    const total = items.reduce((sum, item) => sum + item.amount, 0);

    return (
    <div className="container">
    <h1>家計簿アプリ</h1>

    <ExpenseForm onAdd={AddItem} />

    <button onClick={fetchItems}>最新に更新</button>

    <h2>一覧</h2>
    <ul>
        {items.map((item) => (
        <ExpenseItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            created_at={item.created_at}
            onDelete={() => deleteItem(item.id)}
        />
        ))}
    </ul>

    <hr />
    <h3 style={{ color: "red" }}>合計: {total.toLocaleString()}円</h3>
    </div>
);
}

export default App;
