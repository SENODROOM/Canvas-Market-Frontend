import React, { useState } from 'react';
import { ArtworkDisplay } from '../MyComponents/ArtworkDisplay';
import { ProductInfo } from '../MyComponents/ProductInfo';
import { DetailsTabs } from '../MyComponents/DetailsTabs';
import { ReviewsSection } from '../MyComponents/ReviewsSection';
import { CosmicBackground } from '../MyComponents/CosmicBackground';

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