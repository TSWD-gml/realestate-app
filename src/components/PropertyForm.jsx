import { useState } from 'react'

// 間取りの選択肢
const LAYOUT_OPTIONS = [
  'ワンルーム', '1K', '1DK', '1LDK',
  '2K', '2DK', '2LDK',
  '3DK', '3LDK', '4LDK以上',
]

// 物件の新規登録・編集に使うモーダルフォームコンポーネント
// initialData が null のとき新規登録、object のとき編集モードになる
function PropertyForm({ initialData, onSubmit, onCancel }) {
  const isEditing = initialData !== null

  const [form, setForm] = useState({
    name:   initialData?.name   ?? '',
    rent:   initialData?.rent   ?? '',
    area:   initialData?.area   ?? '',
    layout: initialData?.layout ?? '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  // 各フィールドの入力値を state に反映する
  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  // フォームを送信して親コンポーネントのコールバックを呼ぶ
  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await onSubmit({
        name:   form.name.trim(),
        rent:   parseInt(form.rent, 10),
        area:   form.area.trim(),
        layout: form.layout,
      })
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  // オーバーレイ背景クリックで閉じる
  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onCancel()
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-card">
        <h2 className="modal-title">
          {isEditing ? '物件情報を編集' : '物件を新規登録'}
        </h2>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="fm-name">物件名</label>
            <input
              id="fm-name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="例：グランドメゾン渋谷"
            />
          </div>

          <div className="form-group">
            <label htmlFor="fm-rent">家賃（円）</label>
            <input
              id="fm-rent"
              name="rent"
              type="number"
              value={form.rent}
              onChange={handleChange}
              required
              min={0}
              step={1000}
              placeholder="例：120000"
            />
          </div>

          <div className="form-group">
            <label htmlFor="fm-area">エリア</label>
            <input
              id="fm-area"
              name="area"
              type="text"
              value={form.area}
              onChange={handleChange}
              required
              placeholder="例：東京都渋谷区"
            />
          </div>

          <div className="form-group">
            <label htmlFor="fm-layout">間取り</label>
            <select
              id="fm-layout"
              name="layout"
              value={form.layout}
              onChange={handleChange}
              required
            >
              <option value="">選択してください</option>
              {LAYOUT_OPTIONS.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {error && <p className="error-message">{error}</p>}

          <div className="modal-buttons">
            <button type="button" onClick={onCancel} className="btn-cancel">
              キャンセル
            </button>
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? '送信中...' : isEditing ? '更新する' : '登録する'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PropertyForm
