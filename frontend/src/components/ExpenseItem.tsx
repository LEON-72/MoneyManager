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
        <li className="item-list">
        <span className="create-at">{date}</span>
        <span>{name || "無名"} : {amount.toLocaleString()}円</span>
            <button className="delete-btn" onClick={onDelete}>削除</button>
        </li>
    );
}

