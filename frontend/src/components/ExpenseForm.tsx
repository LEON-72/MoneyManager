import { useState } from "react";

interface Props {
    onAdd: (name: string, amount: number) => Promise<void>;
}

export function ExpenseForm({ onAdd }: Props) {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");

    const handleSubmit = async () => {
        // 入力チェック
        if (!name.trim()) {
            alert("品名を入力してください");
            return;
        }

        // 金額チェック
        const numAmount = Number(amount);
        if (isNaN(numAmount) || numAmount <= 0) {
            alert("1円以上の金額正しい金額を入力してください");
            return;
        }

        // アイテムを追加
        await onAdd(name, Number(amount));

        // 入力欄をリセット
        setName("");
        setAmount("");
    };

    return (
        <div className="flex flex-col md:flex-row gap-4">
            <input
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                placeholder="品名"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <input 
                className="w-full md:w-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                placeholder="金額"
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                onKeyDown={(e) => {if (e.key === 'Enter') handleSubmit();}} // Enterで実行
            />
            <button 
                onClick={handleSubmit}
                className="bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 active:scale-95 transition-all shadow-md"
            >
                追加
            </button>
        </div>
    );
}
