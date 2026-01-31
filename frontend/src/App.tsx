import { useState, useEffect } from "react"

interface Item {
  id: number;
  name: string;
  amount: number;
}

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

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
    }
    loadData();
  }, []);

  const deleteItem = async (id: number) => {
    if (!window.confirm("本当に削除しますか？")) return;

    await fetch(`http://localhost:8080/delete?id=${id}`);
    fetchItems(); // 削除後にリストを再読み込み
  };

  const total = items.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>家計簿アプリ</h1>

      <div style={{ marginBottom: '20px' }}>
        <input placeholder="品名" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="金額" type="number" value={amount} onChange={e => setAmount(e.target.value)} />
        <button onClick={async () => {
          await fetch(`http://localhost:8080/add?name=${name}&amount=${amount}`);
          setName("");
          setAmount("");
          fetchItems(); // 追加したらリストを更新
        }}>追加</button>
      </div>

      <button onClick={fetchItems}>最新に更新</button>

      <h2>一覧</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id} style={{ marginBottom: `10px`, borderBottom: `1px solid #eee` }}>
            {item.name || "無名"} : {item.amount.toLocaleString()}円
            <button
              onClick={() => deleteItem(item.id)}
              style={{ marginLeft: `10px`, color: `red`, cursor: `pointer` }}
            >
              削除
            </button>
          </li>
        ))}
      </ul>

      <hr />
      <h3 style={{ color: 'red' }}>合計: {total.toLocaleString()}円</h3>
    </div>
  )
}

export default App