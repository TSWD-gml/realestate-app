import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import PropertyCard from '../components/PropertyCard'

// ダミーの物件データ（実際はデータベースから取得する）
const DUMMY_PROPERTIES = [
  { id: 1, name: 'グランドメゾン渋谷', rent: 180000, area: '東京都渋谷区', rooms: '2LDK', size: 55 },
  { id: 2, name: 'パークハイツ新宿', rent: 120000, area: '東京都新宿区', rooms: '1LDK', size: 42 },
  { id: 3, name: 'サンライズ品川', rent: 95000, area: '東京都品川区', rooms: '1K', size: 28 },
  { id: 4, name: 'ビュータワー横浜', rent: 200000, area: '神奈川県横浜市', rooms: '3LDK', size: 75 },
  { id: 5, name: 'リバーサイド梅田', rent: 150000, area: '大阪府大阪市北区', rooms: '2LDK', size: 60 },
  { id: 6, name: 'コスモスクエア難波', rent: 85000, area: '大阪府大阪市浪速区', rooms: '1K', size: 25 },
]

function PropertiesPage({ session }) {
  const navigate = useNavigate()

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

      {/* 物件カード一覧 */}
      <main className="properties-main">
        <p className="properties-count">全 {DUMMY_PROPERTIES.length} 件</p>
        <div className="properties-grid">
          {DUMMY_PROPERTIES.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </main>
    </div>
  )
}

export default PropertiesPage
