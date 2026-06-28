// 物件情報を1件分表示するカードコンポーネント
// onEdit / onDelete は親コンポーネント（PropertiesPage）から受け取るコールバック
function PropertyCard({ property, onEdit, onDelete }) {
  return (
    <div className="property-card">
      <div className="property-card-header">
        <h2 className="property-name">{property.name}</h2>
        <span className="property-rooms">{property.layout}</span>
      </div>

      <div className="property-card-body">
        <p className="property-rent">
          <span className="rent-amount">¥{property.rent.toLocaleString()}</span>
          <span className="rent-unit"> / 月</span>
        </p>
        <p className="property-info">📍 {property.area}</p>
      </div>

      {/* 編集・削除ボタン */}
      <div className="property-card-actions">
        <button onClick={onEdit} className="btn-edit">編集</button>
        <button onClick={onDelete} className="btn-delete">削除</button>
      </div>
    </div>
  )
}

export default PropertyCard
