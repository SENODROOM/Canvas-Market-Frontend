// components/PaintingCard.jsx

export function PaintingCard({ painting, index, onExplore }) {
  return (
    <div
      className="painting-card"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Stock Badge */}
      {!painting.inStock && (
        <div className="stock-badge out-of-stock">Out of Stock</div>
      )}

      {/* Image Container */}
      <div className="card-image-container">
        <img
          src={painting.image}
          alt={painting.name}
          className="card-image"
          loading="lazy"
        />
        <div className="image-overlay"></div>
      </div>

      {/* Card Content */}
      <div className="card-content">
        {/* Title & Artist */}
        <div className="card-header">
          <h3 className="card-name">{painting.name}</h3>
          <p className="card-artist">by {painting.artist}</p>
        </div>

        {/* Rating */}
        <div className="card-rating">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <span 
                key={i} 
                className={i < Math.floor(painting.rating || 0) ? 'star filled' : 'star'}
              >
                ★
              </span>
            ))}
          </div>
          <span className="rating-text">
            {painting.rating || 0} ({painting.reviewCount || 0} reviews)
          </span>
        </div>

        {/* Description */}
        <p className="card-description">
          {painting.description && painting.description.length > 100
            ? `${painting.description.substring(0, 100)}...`
            : painting.description || 'No description available'}
        </p>

        {/* Tags */}
        <div className="card-tags">
          {painting.tech?.slice(0, 3).map((tech, idx) => (
            <span key={idx} className="tag">
              {tech}
            </span>
          ))}
        </div>

        {/* Price & Action */}
        <div className="card-footer">
          <div className="price-section">
            <span className="price-label">Price</span>
            <span className="price">${painting.price?.toFixed(2) || '0.00'}</span>
          </div>
          <button
            className="explore-button"
            onClick={() => onExplore(painting)}
            disabled={!painting.inStock}
          >
            {painting.inStock ? 'Explore' : 'Unavailable'}
            {painting.inStock && (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
