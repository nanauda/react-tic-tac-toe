# React Tic-Tac-Toe

React と Redux Toolkit を使ったシンプルな三目並べ（Tic-Tac-Toe）ゲームです。
状態管理に Redux Toolkit を採用し、タイムトラベル機能を実装しています。

## デモ

https://nanauda.github.io/react-tic-tac-toe

## 機能

- 2人対戦の三目並べ（X・O 交互にプレイ）
- 勝者の自動判定
- 全手数の履歴表示
- 任意の手へジャンプするタイムトラベル機能

## 技術スタック

| カテゴリ | ライブラリ |
|---|---|
| UI フレームワーク | React 19 |
| 状態管理 | Redux Toolkit + React-Redux |
| ビルドツール | Create React App (react-scripts) |
| デプロイ | GitHub Pages (gh-pages) |
| スタイリング | CSS |

## プロジェクト構成

```
src/
├── App.js          # ゲームコンポーネント（Square / Board / MoveHistory / Game）
├── index.js        # エントリーポイント（Redux Provider 設定）
├── styles.css      # スタイル
└── store/
    ├── index.js    # Redux ストア設定
    └── gameSlice.js # ゲームの状態・アクション定義
```

## 状態管理

Redux ストアでゲーム全体の状態を一元管理しています。

```js
// 初期状態
{
  history: [Array(9)],  // 各手のボード状態を配列で保持
  currentMove: 0        // 現在表示中の手番インデックス
}
```

**アクション:**
- `playMove(newBoard)` — 手を打ち、履歴に追加
- `jumpTo(moveIndex)` — 指定した手番の状態に移動（タイムトラベル）

## セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npm start

# プロダクションビルド
npm run build

# GitHub Pages へデプロイ
npm run deploy
```
