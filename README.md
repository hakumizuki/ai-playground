# AI Playground

TypeScript + React フロントエンドと Node.js・Python バックエンドを持つモダンな開発環境です。

## 🚀 技術スタック

### フロントエンド
- **TypeScript** - 型安全なJavaScript
- **React 18** - モダンなUIライブラリ
- **Vite** - 高速なビルドツール
- **Tailwind CSS** - ユーティリティファーストCSS
- **Axios** - HTTPクライアント

### バックエンド
- **Node.js 22** - Express.js + TypeScript サーバー
- **Python 3.13** - FastAPI サーバー

### 開発環境
- **DevContainer** - 一貫した開発環境
- **Docker** - コンテナ化された環境
- **VS Code** - 統合開発環境

## 📁 プロジェクト構造

```
ai-playground/
├── .devcontainer/          # DevContainer設定
│   ├── devcontainer.json
│   ├── docker-compose.yml
│   └── Dockerfile
├── frontend/               # TypeScript + React
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
├── backend/
│   ├── nodejs/            # Node.js 22 + Express + TypeScript
│   │   ├── src/
│   │   │   └── server.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   └── python/            # Python + FastAPI
│       ├── app.py
│       └── requirements.txt
├── package.json           # ルート設定
└── README.md
```

## 🛠️ セットアップ

### 前提条件
- Docker Desktop
- VS Code
- VS Code Dev Containers 拡張機能

### 1. リポジトリのクローン
```bash
git clone <repository-url>
cd ai-playground
```

### 2. DevContainerでの開発環境起動
1. VS Codeでプロジェクトを開く
2. `Ctrl+Shift+P` (または `Cmd+Shift+P`) でコマンドパレットを開く
3. "Dev Containers: Reopen in Container" を選択
4. コンテナのビルドと起動を待つ

### 3. 依存関係のインストール
コンテナ内で自動的に実行されますが、手動で実行する場合：

```bash
# ルート依存関係
npm install

# フロントエンド依存関係
cd frontend && npm install

# Node.jsバックエンド依存関係
cd backend/nodejs && npm install

# Pythonバックエンド依存関係
cd backend/python && pip install -r requirements.txt
```

## 🚀 開発サーバーの起動

### 全サービスを同時起動
```bash
npm run dev
```

### 個別起動
```bash
# フロントエンド (ポート 3000)
npm run dev:frontend

# Node.jsバックエンド (ポート 8000)
npm run dev:nodejs

# Pythonバックエンド (ポート 8888)
npm run dev:python
```

## 🌐 アクセスURL

- **フロントエンド**: http://localhost:3000
- **Node.js API**: http://localhost:8000
- **Python API**: http://localhost:8888
- **Python API Docs**: http://localhost:8888/docs

## 📡 API エンドポイント

### Node.js Backend (ポート 8000)
- `GET /health` - ヘルスチェック
- `GET /api/hello` - 挨拶メッセージ
- `POST /api/calculate` - 計算機能
- `GET /api/nodejs-info` - Node.js環境情報

### Python Backend (ポート 8888)
- `GET /health` - ヘルスチェック
- `GET /api/hello` - 挨拶メッセージ
- `POST /api/calculate` - 計算機能
- `GET /api/python-info` - Python環境情報
- `GET /docs` - API ドキュメント (Swagger UI)

## 🎯 機能

### フロントエンド
- モダンなReact UI
- TypeScriptによる型安全
- Tailwind CSSによるスタイリング
- Node.js・Pythonバックエンドとの通信

### バックエンド
- **Node.js 22**: Express.js + TypeScriptによる型安全なRESTful API
- **Python 3.13**: FastAPIによる高性能API
- CORS設定済み
- エラーハンドリング
- ヘルスチェックエンドポイント

## 🔧 開発

### コードフォーマット
- **TypeScript/JavaScript**: Prettier + ESLint
- **Python**: Black + Flake8

### ホットリロード
- フロントエンド: Viteによる高速HMR
- Node.js: Nodemonによる自動再起動
- Python: Uvicornによる自動再起動

## �� ライセンス

MIT License 