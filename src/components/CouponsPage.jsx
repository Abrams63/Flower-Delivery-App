import React, { useState } from 'react';
import { coupons } from '../data/coupons';
import { Copy, Check, Tag, Calendar, DollarSign, Percent } from 'lucide-react';
import './CouponsPage.css'; // добавьте импорт CSS

const CouponsPage = () => {
  const [copiedCode, setCopiedCode] = useState(null);
  const [filter, setFilter] = useState('all');

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const filteredCoupons = filter === 'all' 
    ? coupons 
    : coupons.filter(coupon => coupon.category === filter);

  const categories = ['all', 'seasonal', 'welcome', 'roses', 'bulk', 'weekend', 'loyalty'];

  const isExpired = (validUntil) => {
    return new Date(validUntil) < new Date();
  };

  return (
    <main className="coupons-main">
      <div className="container">
        <div className="coupons-header">
          <h2 className="coupons-title">
            Available Coupons & Discounts
          </h2>
          <p className="coupons-subtitle">
            Save money on your flower orders with our exclusive discount codes
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="coupons-tabs">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`coupons-tab${filter === category ? ' active' : ''}`}
            >
              {category === 'all' ? 'All Coupons' : category}
            </button>
          ))}
        </div>

        {/* Coupons Grid */}
        <div className="grid grid-3">
          {filteredCoupons.map(coupon => (
            <div key={coupon.id} className={`card coupon-card${isExpired(coupon.validUntil) ? ' expired' : ''}`}>
              {isExpired(coupon.validUntil) && (
                <div className="coupon-expired-label">
                  EXPIRED
                </div>
              )}
              
              <div className="coupon-card-inner">
                <div className="coupon-card-header">
                  <div className="coupon-emoji">
                    {coupon.emoji}
                  </div>
                  <div>
                    <h3 className="coupon-card-title">
                      {coupon.title}
                    </h3>
                    <div className="coupon-discount">
                      {coupon.type === 'percentage' ? <Percent size={14} /> : <DollarSign size={14} />}
                      {coupon.discount}{coupon.type === 'percentage' ? '% OFF' : ' OFF'}
                    </div>
                  </div>
                </div>

                <p className="coupon-description">
                  {coupon.description}
                </p>

                <div className="coupon-code-block">
                  <div className="coupon-code-row">
                    <span className="coupon-code">
                      {coupon.code}
                    </span>
                    <button
                      onClick={() => copyToClipboard(coupon.code)}
                      disabled={isExpired(coupon.validUntil)}
                      className={`coupon-copy-btn${copiedCode === coupon.code ? ' copied' : ''}`}
                    >
                      {copiedCode === coupon.code ? (
                        <>
                          <Check size={12} />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="coupon-meta">
                  <div className="coupon-meta-row">
                    <DollarSign size={12} />
                    Min. order: ${coupon.minOrder}
                  </div>
                  <div className="coupon-meta-row">
                    <Calendar size={12} />
                    Valid until: {new Date(coupon.validUntil).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCoupons.length === 0 && (
          <div className="coupons-empty">
            <Tag size={48} className="coupons-empty-icon" />
            <h3 className="coupons-empty-title">No coupons found</h3>
            <p>Try selecting a different category</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default CouponsPage;