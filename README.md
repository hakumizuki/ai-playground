# AI Playground

[![Open in Dev Containers](https://img.shields.io/badge/Open%20in-Dev%20Containers-blue?logo=visualstudiocode)](https://vscode.dev/redirect?url=vscode://ms-vscode-remote.remote-containers/cloneInVolume?url=https://github.com/your-username/ai-playground)

TypeScript + React フロントエンドと Node.js・Python バックエンドを持つモダンな開発環境です。

## 🚀 技術スタック

### フロントエンド

- **TypeScript** - 型安全な JavaScript
- **React 18** - モダンな UI ライブラリ
- **Vite** - 高速なビルドツール
- **Tailwind CSS** - ユーティリティファースト CSS
- **Axios** - HTTP クライアント

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
│   │   ├── src/
│   │   │   └── server.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   └── python/            # Python + FastAPI
│       ├── app.py
│       └── requirements.txt
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

### 2. DevContainer での開発環境起動

1. VS Code でプロジェクトを開く
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

### Warp を使う

```bash
# docker container に接続し、Warpify される
npm run warp
```

## 🌐 アクセス URL

- **フロントエンド**: http://localhost:3000
- **Node.js API**: http://localhost:8000
- **Python API**: http://localhost:8888
- **Python API Docs**: http://localhost:8888/docs

## 🎯 機能

### フロントエンド

- モダンな React UI
- TypeScript による型安全
- Tailwind CSS によるスタイリング
- Node.js・Python バックエンドとの通信

### バックエンド

- **Node.js 22**: Express.js + TypeScript + Mastra
- **Python 3.13**: FastAPI による高性能 API
- CORS 設定済み
- エラーハンドリング
- ヘルスチェックエンドポイント

## 🤖 Mastra AI エージェント (Node.js バックエンド)

### セットアップ

1. **環境変数の設定**

```bash
# backend/nodejs/.env ファイルを作成
echo "OPENAI_API_KEY=<your-api-key>" > backend/nodejs/.env
```

2. **Node.js バックエンドの起動**

```bash
npm run dev:nodejs
```

### カスタムエージェントの作成

1. `backend/nodejs/src/mastra/tools/` にツールを作成
2. `backend/nodejs/src/mastra/agents/` にエージェントを作成
3. `backend/nodejs/src/mastra/index.ts` でエージェントを登録

詳細は [Mastra ドキュメント](https://mastra.ai/ja/docs) を参照してください。

## 🔧 開発

### コードフォーマット

- **TypeScript/JavaScript**: Prettier + ESLint
- **Python**: Black + Flake8

### ホットリロード

- フロントエンド: Vite による高速 HMR
- Node.js: Nodemon による自動再起動
- Python: Uvicorn による自動再起動

## ライセンス

MIT License
