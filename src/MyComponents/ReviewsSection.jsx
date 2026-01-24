import React from 'react';

export const ReviewsSection = ({ product, reviews }) => {
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
  );
};
