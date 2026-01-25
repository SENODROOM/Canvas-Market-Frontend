import React, { useState } from 'react';
import { ArtworkDisplay } from '../MyComponents/ArtworkDisplay';
import { ProductInfo } from '../MyComponents/ProductInfo';
import { DetailsTabs } from '../MyComponents/DetailsTabs';
import { ReviewsSection } from '../MyComponents/ReviewsSection';
import { CosmicBackground } from '../MyComponents/CosmicBackground';
import { useLocation, useNavigate } from 'react-router-dom';

const ProductPage = () => {
  const [activeTab, setActiveTab] = useState('description');
  const [imageLoaded, setImageLoaded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.painting;

  // Safety check (important)
  if (!product) {
    navigate("/");
    return null;
  }

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

  return (
    <div className="product-page">
      <CosmicBackground />

      {/* Main Content Container */}
      <div className="content-wrapper">
        <ArtworkDisplay
          product={product}
          imageLoaded={imageLoaded}
          setImageLoaded={setImageLoaded}
        />

        <ProductInfo
          product={product}
          handleBuyNow={handleBuyNow}
        />

        <DetailsTabs
          product={product}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <ReviewsSection
          product={product}
          reviews={reviews}
        />
      </div>
    </div>
  );
};

export default ProductPage;