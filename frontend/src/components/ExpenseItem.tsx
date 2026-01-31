interface Props {
    name: string;
    amount: number;
    created_at: string;
    onDelete: () => void;
}

export function ExpenseItem({ name, amount, created_at, onDelete }: Props) {
    const date = new Date(created_at).toLocaleDateString('ja-JP', {
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <li className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 shadow-sm mb-3">
            <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400">{date}</span>
                <span className="text-slate-700 font-semibold">{name || "名称未設定"}</span>
            </div>
            <div className="flex items-center gap-4">
                <span className="text-lg font-bold text-slate-900">
                    <span className="text-sm font-normal text-slate-400 mr-1">¥</span>
                    {amount.toLocaleString()}
                </span>
                {/* 削除ボタンを分かりやすく修正 */}
                <button 
                    onClick={onDelete}
                    className="bg-red-50 text-red-600 px-3 py-1 rounded-md border border-red-200 hover:bg-red-500 hover:text-white transition-all text-sm font-bold"
                >
                    削除
                </button>
            </div>
        </li>
    );
}

