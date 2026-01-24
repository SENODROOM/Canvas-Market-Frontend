import React from 'react';

export const ProductInfo = ({ product, handleBuyNow }) => {
  const renderStars = (rating) => {
    return (
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= rating ? 'filled' : star - rating < 1 ? 'half' : ''}`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="product-info-section">
      <div className="info-container">
        {/* Header */}
        <div className="product-header">
          <p className="artist-credit">{product.artist}</p>
          <h1 className="product-title">
            <span className="title-main">{product.name}</span>
            <div className="title-underline"></div>
          </h1>
          
          <div className="rating-container">
            {renderStars(product.rating)}
            <span className="rating-info">
              <strong>{product.rating}</strong> · {product.reviewCount} Reviews
            </span>
          </div>
        </div>

        {/* Price Display */}
        <div className="price-container">
          <div className="price-wrapper">
            <span className="price-current">${product.price}</span>
          </div>
          <div className="price-accent-line"></div>
        </div>

        {/* Description */}
        <div className="description-section">
          <p className="description-text">{product.description}</p>
        </div>

        {/* Call to Action */}
        <div className="action-section">
          <button className="btn-buy-now" onClick={handleBuyNow}>
            <span className="btn-bg-layer"></span>
            <span className="btn-text-content">
              <span>Buy Now</span>
            </span>
            <span className="btn-glow-effect"></span>
          </button>
        </div>

        {/* Features Grid */}
        <div className="features-section">
          <h3 className="features-heading">Premium Features</h3>
          <div className="features-grid">
            {product.features.map((feature, index) => (
              <div 
                key={index} 
                className="feature-item"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <span className="feature-text">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
