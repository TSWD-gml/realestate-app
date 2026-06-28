# realestate-app プロジェクト

## プロジェクト概要

不動産物件情報を管理・表示するWebアプリケーションの開発プロジェクトです。

## 技術スタック

| カテゴリ | ツール・バージョン |
|---------|-----------------|
| フレームワーク | React 19 |
| ビルドツール | Vite 6 |
| 言語 | JavaScript (JSX) |
| 認証・バックエンド | Supabase |
| ルーティング | React Router v7 |
| デプロイ | Vercel |

### 主要な依存関係

```json
"dependencies":    { "react": "^19", "react-dom": "^19", "react-router-dom": "^7", "@supabase/supabase-js": "^2" }
"devDependencies": { "vite": "^6", "@vitejs/plugin-react": "^4" }
```

### ディレクトリ構成

```
src/
├── components/   # 再利用可能なUIコンポーネント（PropertyCard など）
├── pages/        # 画面単位のコンポーネント（LoginPage, PropertiesPage など）
├── lib/          # 外部サービス連携（supabase.js）
├── App.jsx       # ルーティング設定
├── main.jsx      # エントリーポイント
└── index.css     # グローバルスタイル
```

## 環境変数

`.env` ファイルに以下を設定する（`.gitignore` で管理対象外）。
`.env.example` を参考に各自で作成すること。

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## 開発コマンド

```bash
npm install      # 依存関係のインストール
npm run dev      # 開発サーバー起動 (http://localhost:5173)
npm run build    # 本番ビルド
npm run preview  # ビルド結果のプレビュー
```

## Git 運用ルール

### 基本方針

- **コードを変更するたびに、必ず GitHub にプッシュすること**
- コミットは変更の単位ごとに細かく行い、意味のあるメッセージをつけること
- `main` ブランチへの直接プッシュは避け、機能ブランチ経由でマージすること

### コミットメッセージ規則

```
<種別>: <変更内容の要約>

例:
feat: 物件一覧ページを実装
fix: 物件詳細の価格表示バグを修正
refactor: 検索フィルターコンポーネントをリファクタリング
docs: READMEにセットアップ手順を追加
```

| 種別 | 用途 |
|------|------|
| `feat` | 新機能の追加 |
| `fix` | バグ修正 |
| `refactor` | リファクタリング（機能変更なし） |
| `docs` | ドキュメント変更 |
| `style` | フォーマット・スタイル修正 |
| `test` | テストの追加・修正 |
| `chore` | ビルド設定・依存関係の更新 |

### 作業フロー

1. 機能ブランチを作成する（例: `feature/property-list`）
2. 実装・変更を行う
3. `git add` → `git commit` でコミット
4. **`git push origin <ブランチ名>` で即座に GitHub へプッシュ**
5. 実装完了後、GitHub 上でプルリクエストを作成してレビュー・マージ

### ブランチ命名規則

| プレフィックス | 用途 |
|--------------|------|
| `feature/` | 新機能開発 |
| `fix/` | バグ修正 |
| `refactor/` | リファクタリング |
| `docs/` | ドキュメント修正 |

## デプロイ情報

- **本番URL**：https://realestate-app-cyan.vercel.app/
- **Supabase プロジェクト名**：realestate-app

## ファイル・フォルダ命名規則

- フォルダ名・ファイル名の日付は `YYYYMMDD` 形式にすること
- ファイルの削除・上書き前には必ず確認を求めること

## Claudeへの指示

- コードを変更・追加したら、必ず GitHub へのプッシュまで実施すること
- コミット前に `git status` と `git diff` で変更内容を確認すること
- ファイルを新規作成・削除する場合は、事前にユーザーへ確認を取ること
- 出力ファイルを作成する場合は、作業内容に応じた適切なフォルダに保存すること
