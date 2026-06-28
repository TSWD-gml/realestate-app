import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import PropertyCard from '../components/PropertyCard'
import PropertyForm from '../components/PropertyForm'

function PropertiesPage({ session }) {
  const navigate = useNavigate()

  // 物件一覧の状態管理
  const [properties, setProperties] = useState([])
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState('')

  // フォームの表示状態管理
  // formVisible: モーダルの表示/非表示
  // editTarget: null = 新規登録、object = 編集対象の物件データ
  const [formVisible, setFormVisible] = useState(false)
  const [editTarget, setEditTarget]   = useState(null)

  // =============================================
  // SELECT: Supabase から物件一覧を取得する
  // =============================================
  const fetchProperties = useCallback(async () => {
    setLoading(true)
    setError('')

    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      setError('物件の取得に失敗しました: ' + error.message)
    } else {
      setProperties(data)
    }
    setLoading(false)
  }, [])

  // 画面初期表示時に物件一覧を取得する
  useEffect(() => {
    fetchProperties()
  }, [fetchProperties])

  // =============================================
  // INSERT: 物件を新規登録する
  // =============================================
  async function handleAdd(formData) {
    const { error } = await supabase.from('properties').insert({
      ...formData,
      user_id: session.user.id, // ログイン中のユーザーIDを自動でセットする
    })
    if (error) throw new Error(error.message)
    await fetchProperties()
    closeForm()
  }

  // =============================================
  // UPDATE: 物件情報を更新する
  // =============================================
  async function handleUpdate(formData) {
    const { error } = await supabase
      .from('properties')
      .update(formData)
      .eq('id', editTarget.id)
    if (error) throw new Error(error.message)
    await fetchProperties()
    closeForm()
  }

  // =============================================
  // DELETE: 物件を削除する
  // =============================================
  async function handleDelete(property) {
    if (!window.confirm(`「${property.name}」を削除しますか？\nこの操作は元に戻せません。`)) return

    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', property.id)

    if (error) {
      setError('削除に失敗しました: ' + error.message)
    } else {
      await fetchProperties()
    }
  }

  // =============================================
  // フォームの開閉
  // =============================================
  function openAddForm() {
    setEditTarget(null)
    setFormVisible(true)
  }

  function openEditForm(property) {
    setEditTarget(property)
    setFormVisible(true)
  }

  function closeForm() {
    setFormVisible(false)
    setEditTarget(null)
  }

  // ログアウト処理
  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <div className="properties-container">
      {/* ヘッダー */}
      <header className="properties-header">
        <div className="header-left">
          <span className="header-logo">🏠</span>
          <h1 className="header-title">物件一覧</h1>
        </div>
        <div className="header-right">
          <span className="user-email">{session.user.email}</span>
          <button onClick={handleLogout} className="btn-logout">
            ログアウト
          </button>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="properties-main">
        {/* ツールバー：件数表示 ＋ 新規登録ボタン */}
        <div className="properties-toolbar">
          <p className="properties-count">
            {loading ? '読み込み中...' : `全 ${properties.length} 件`}
          </p>
          <button onClick={openAddForm} className="btn-add">
            ＋ 物件を登録
          </button>
        </div>

        {/* エラーメッセージ */}
        {error && <p className="error-message">{error}</p>}

        {/* 物件が0件のときのメッセージ */}
        {!loading && properties.length === 0 && !error && (
          <p className="empty-message">
            まだ物件が登録されていません。「＋ 物件を登録」ボタンから追加してください。
          </p>
        )}

        {/* 物件カード一覧 */}
        <div className="properties-grid">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onEdit={() => openEditForm(property)}
              onDelete={() => handleDelete(property)}
            />
          ))}
        </div>
      </main>

      {/* 新規登録・編集モーダル */}
      {formVisible && (
        <PropertyForm
          initialData={editTarget}
          onSubmit={editTarget ? handleUpdate : handleAdd}
          onCancel={closeForm}
        />
      )}
    </div>
  )
}

export default PropertiesPage
