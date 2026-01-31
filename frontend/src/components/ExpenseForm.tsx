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
        <div className="item-add">
            <input
                placeholder="品名"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <input 
                placeholder="金額"
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                onKeyDown={(e) => {if (e.key === 'Enter') handleSubmit();}} // Enterで実行
            />
            <button onClick={handleSubmit}>追加</button>
        </div>
    );
}
