import { useState, useEffect } from "react";
// import "./App.css";
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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
        <div className="max-w-xl mx-auto py-10 px-4">
            {/* ヘッダー */}
            <header className="mb-8 text-center">
                <h1 className="text-4xl font-black text-indigo-600 tracking-tight">
                    家計簿
                </h1>
                <p className="text-slate-500 text-sm mt-2">日々の支出をシンプルに管理</p>
            </header>

            {/* 合計金額カード */}
            <div className="bg-indigo-600 rounded-2xl p-6 shadow-xl shadow-indigo-200 mb-8 text-white">
                <p className="text-indigo-100 text-sm font-medium">現在の合計支出</p>
                <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-4xl font-bold">{total.toLocaleString()}</span>
                    <span className="text-lg">円</span>
                </div>
            </div>

            {/* 入力エリア */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mb-8">
                <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">新規追加</h2>
                <ExpenseForm onAdd={AddItem} />
            </section>

            {/* 一覧エリア */}
            <section>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-slate-700">最近の履歴</h2>
                    <button 
                        onClick={fetchItems}
                        className="text-indigo-600 text-sm font-semibold hover:text-indigo-800"
                    >
                        更新
                    </button>
                </div>
                <ul className="space-y-3">
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
            </section>
        </div>
    </div>
);
}

export default App;
