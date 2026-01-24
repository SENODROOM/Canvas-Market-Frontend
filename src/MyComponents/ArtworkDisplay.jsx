import React from 'react';

export const ArtworkDisplay = ({ product, imageLoaded, setImageLoaded }) => {
  return (
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
            </div>
          </div>
        </div>

        {/* Frame Labels */}
        <div className="frame-label label-top">LIMITED EDITION</div>
        <div className="frame-label label-bottom">ORIGINAL ARTWORK</div>
      </div>
    </div>
  );
};
