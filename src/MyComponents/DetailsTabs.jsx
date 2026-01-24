import React from 'react';

export const DetailsTabs = ({ product, activeTab, setActiveTab }) => {
  return (
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
  );
};
