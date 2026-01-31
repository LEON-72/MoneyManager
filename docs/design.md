## フォルダ構成
.
├── docs/                # 設計・仕様ドキュメント
├── frontend/            # フロントエンド (React)
│   └── src/
│       ├── components/  # UIコンポーネント
│       │   ├── ExpenseForm.tsx
│       │   └── ExpenseItem.tsx
│       ├── App.tsx      # メインコンポーネント
│       └── main.tsx     # エントリーポイント
├── database.go          # DB接続・初期化
├── handlers.go          # APIリクエスト処理 (ロジック)
├── models.go            # データの構造体定義 (Schema)
├── main.go              # サーバー起動エントリーポイント
└── item.db              # データベース本体 (SQLite)