import React, { useState } from 'react';

const ProductPage = () => {
  const [activeTab, setActiveTab] = useState('description');
  const [imageLoaded, setImageLoaded] = useState(false);

  // Single artwork data
  const product = {
    id: 1,
    name: 'Celestial Dreams',
    artist: 'Ethereal Art Studio',
    price: 299.99,
  
    rating: 4.8,
    reviewCount: 156,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1200&q=80',
    description: 'An exquisite masterpiece that captures the essence of cosmic wonder and artistic brilliance. This original canvas print features museum-quality materials and archival inks that preserve its vibrant colors for generations. Each piece is individually crafted and authenticated, making it a unique addition to any art collection.',
    features: [
      'Museum-Quality Canvas',
      'Archival Fade-Resistant Inks',
      'Hand-Assembled Frame',
      'Certificate of Authenticity',
      'Ready to Hang',
      'UV Protection Coating'
    ],
    specifications: {
      'Medium': 'Premium Cotton Canvas',
      'Frame Material': 'Solid Pine Wood',
      'Print Technique': 'Giclée Printing',
      'Dimensions': '24" × 36" (60cm × 90cm)',
      'Edition': 'Limited Edition of 100',
      'Signed': 'Hand-signed by Artist'
    }
  };

  const reviews = [
    {
      id: 1,
      author: 'Sarah Mitchell',
      rating: 5,
      date: 'January 15, 2026',
      title: 'A True Masterpiece!',
      comment: 'This artwork exceeded all my expectations. The colors are incredibly vibrant in person, and the quality of the canvas and frame is exceptional. It\'s become the centerpiece of my living room.',
      verified: true
    },
    {
      id: 2,
      author: 'James Rodriguez',
      rating: 5,
      date: 'January 10, 2026',
      title: 'Museum Quality',
      comment: 'As an art collector, I\'m extremely particular about prints. This piece rivals works I\'ve purchased from galleries. The certificate of authenticity is a nice touch.',
      verified: true
    },
    {
      id: 3,
      author: 'Emily Chen',
      rating: 5,
      date: 'January 5, 2026',
      title: 'Perfect Gift',
      comment: 'Bought this for my mother\'s birthday and she was absolutely thrilled. The packaging was secure and professional. Highly recommend!',
      verified: true
    },
    {
      id: 4,
      author: 'David Kumar',
      rating: 4,
      date: 'December 28, 2025',
      title: 'Stunning Piece',
      comment: 'Beautiful artwork that adds elegance to any space. The only minor issue was shipping took slightly longer than expected, but the quality made it worth the wait.',
      verified: true
    }
  ];

  const handleBuyNow = () => {
    console.log('Purchase initiated');
    alert('Proceeding to checkout...');
  };

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
    <div className="product-page">
      {/* Animated Cosmic Background */}
      <div className="cosmic-background">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
        <div className="particle-field">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}></div>
          ))}
        </div>
      </div>

      {/* Main Content Container */}
      <div className="content-wrapper">
        
        {/* Centered Artwork Display */}
        <div className="artwork-section">
          <div className="artwork-container">
            
            {/* Ornate Frame System */}
            <div className="frame-ornaments">
              <div className="ornament corner-tl">
                <div className="ornament-inner"></div>
                <div className="ornament-glow"></div>
              </div>
              <div className="ornament corner-tr">
                <div className="ornament-inner"></div>
                <div className="ornament-glow"></div>
              </div>
              <div className="ornament corner-bl">
                <div className="ornament-inner"></div>
                <div className="ornament-glow"></div>
              </div>
              <div className="ornament corner-br">
                <div className="ornament-inner"></div>
                <div className="ornament-glow"></div>
              </div>
            </div>

            {/* Main Frame */}
            <div className="artwork-frame">
            
              
              
              <div className="frame-inner">
                <div className="artwork-mat"></div>
                
                <div className="artwork-image-container">
                 
                  
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className={`artwork-image ${imageLoaded ? 'loaded' : ''}`}
                    onLoad={() => setImageLoaded(true)}
                  />
                  
                  {/* Discount Badge */}
               
                </div>
              </div>
            </div>

            {/* Frame Labels */}
            <div className="frame-label label-top">LIMITED EDITION</div>
            <div className="frame-label label-bottom">ORIGINAL ARTWORK</div>
          </div>
        </div>

        {/* Product Information Section */}
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
                {product.originalPrice }
              </div>
              <div className="price-accent-line"></div>
            </div>

            {/* Stock Status */}
        

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

        {/* Details Tabs Section */}
        <div className="tabs-section">
          <div className="tabs-header">
            {['description', 'specifications', 'shipping'].map((tab) => (
              <button
                key={tab}
                className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                <span className="tab-label">
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </span>
                <div className="tab-indicator"></div>
              </button>
            ))}
          </div>

          <div className="tabs-content">
            {activeTab === 'description' && (
              <div className="tab-panel fade-in">
                <h3>About This Artwork</h3>
                <p>{product.description}</p>
                <p>
                  This exceptional piece is created using state-of-the-art giclée printing technology on premium cotton canvas. 
                  The result is a stunning reproduction that captures every nuance of color and detail from the original artwork. 
                  Each print is carefully inspected for quality and comes with a certificate of authenticity.
                </p>
                <p>
                  The solid pine wood frame is hand-assembled and features gallery-wrapped edges for a clean, professional appearance. 
                  UV protective coating ensures that your investment will maintain its vibrant colors for decades to come.
                </p>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="tab-panel fade-in">
                <h3>Technical Details</h3>
                <table className="specs-table">
                  <tbody>
                    {Object.entries(product.specifications).map(([key, value], index) => (
                      <tr key={key} style={{ animationDelay: `${index * 0.08}s` }}>
                        <td className="spec-key">{key}</td>
                        <td className="spec-value">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="tab-panel fade-in">
                <h3>Shipping & Returns</h3>
                <div className="shipping-info">
                  <div className="info-block">
                    <h4>Shipping Options</h4>
                    <ul>
                      <li><strong>Standard Shipping:</strong> 5-7 business days (Free on orders over $200)</li>
                      <li><strong>Express Shipping:</strong> 2-3 business days ($29.99)</li>
                      <li><strong>Next Day Delivery:</strong> Available in select areas ($49.99)</li>
                    </ul>
                  </div>
                  <div className="info-block">
                    <h4>Returns & Exchanges</h4>
                    <p>
                      We want you to love your artwork! If you're not completely satisfied, we accept returns within 30 days 
                      of delivery. Items must be in original condition with all packaging materials. A full refund will be 
                      processed within 5-7 business days of receiving the return.
                    </p>
                  </div>
                  <div className="info-block">
                    <h4>Packaging</h4>
                    <p>
                      Each artwork is carefully packaged in custom-designed protective materials to ensure it arrives in 
                      perfect condition. We use reinforced corners, bubble wrap, and rigid cardboard backing for maximum protection.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="reviews-section">
          <div className="reviews-header">
            <h2 className="reviews-title">Customer Reviews</h2>
            <div className="reviews-summary">
              <div className="summary-rating">
                {renderStars(product.rating)}
                <span className="summary-text">
                  <strong>{product.rating}</strong> out of 5
                </span>
              </div>
              <span className="summary-count">Based on {product.reviewCount} verified reviews</span>
            </div>
          </div>

          <div className="reviews-list">
            {reviews.map((review, index) => (
              <div 
                key={review.id} 
                className="review-card"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="review-header">
                  <div className="reviewer-info">
                    <div className="reviewer-avatar">
                      <span>{review.author.charAt(0)}</span>
                      <div className="avatar-ring"></div>
                    </div>
                    <div className="reviewer-details">
                      <h4 className="reviewer-name">
                        {review.author}
                       
                      </h4>
                      <span className="review-date">{review.date}</span>
                    </div>
                  </div>
                  <div className="review-rating">
                    {renderStars(review.rating)}
                  </div>
                </div>
                <h3 className="review-title">{review.title}</h3>
                <p className="review-text">{review.comment}</p>
              
              </div>
            ))}
          </div>

          <button className="load-more-button">
            <span>View All Reviews</span>
            <span className="button-arrow">→</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductPage;