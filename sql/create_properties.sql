-- =============================================
-- 不動産管理アプリ: properties テーブルの作成
-- Supabase ダッシュボードの「SQL Editor」で実行してください
-- =============================================

-- properties テーブルを作成する
CREATE TABLE IF NOT EXISTS properties (
  id         UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  name       TEXT        NOT NULL,           -- 物件名
  rent       INTEGER     NOT NULL,           -- 家賃（円）
  area       TEXT        NOT NULL,           -- エリア名
  layout     TEXT        NOT NULL,           -- 間取り（例：1LDK）
  user_id    UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE, -- 登録ユーザー
  created_at TIMESTAMPTZ DEFAULT NOW()       -- 登録日時
);

-- =============================================
-- RLS（行レベルセキュリティ）の設定
-- 「自分が登録した物件のみ操作できる」ルールを定義する
-- =============================================

-- RLS を有効化する
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- SELECT: 自分が登録した物件のみ取得できる
CREATE POLICY "自分の物件のみ表示" ON properties
  FOR SELECT
  USING (auth.uid() = user_id);

-- INSERT: ログイン中のユーザーが自分のIDで登録できる
CREATE POLICY "自分の物件のみ登録" ON properties
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- UPDATE: 自分が登録した物件のみ更新できる
CREATE POLICY "自分の物件のみ更新" ON properties
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- DELETE: 自分が登録した物件のみ削除できる
CREATE POLICY "自分の物件のみ削除" ON properties
  FOR DELETE
  USING (auth.uid() = user_id);
