// 物件情報を1件分表示するカードコンポーネント
function PropertyCard({ property }) {
  return (
    <div className="property-card">
      <div className="property-card-header">
        <h2 className="property-name">{property.name}</h2>
        <span className="property-rooms">{property.rooms}</span>
      </div>
      <div className="property-card-body">
        <p className="property-rent">
          <span className="rent-amount">¥{property.rent.toLocaleString()}</span>
          <span className="rent-unit"> / 月</span>
        </p>
        <p className="property-info">📍 {property.area}</p>
        <p className="property-info">📐 {property.size} ㎡</p>
      </div>
    </div>
  )
}

export default PropertyCard
