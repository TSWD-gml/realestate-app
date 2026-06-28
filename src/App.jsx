import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import PropertiesPage from './pages/PropertiesPage'

// 認証済みユーザーのみアクセスできる保護ルート
function ProtectedRoute({ children, session }) {
  if (!session) {
    return <Navigate to="/login" replace />
  }
  return children
}

function App() {
  // undefined = 読み込み中、null = 未ログイン、object = ログイン済み
  const [session, setSession] = useState(undefined)

  useEffect(() => {
    // 現在のセッションを取得する
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    // ログイン・ログアウトなど認証状態の変化を監視する
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  // セッション読み込み中はローディング画面を表示する
  if (session === undefined) {
    return (
      <div className="loading-screen">
        <p>読み込み中...</p>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* ログイン画面 */}
        <Route path="/login" element={<LoginPage session={session} />} />
        {/* 会員登録画面 */}
        <Route path="/register" element={<RegisterPage session={session} />} />
        {/* 物件一覧画面（要ログイン） */}
        <Route
          path="/"
          element={
            <ProtectedRoute session={session}>
              <PropertiesPage session={session} />
            </ProtectedRoute>
          }
        />
        {/* 未定義パスはトップにリダイレクト */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
