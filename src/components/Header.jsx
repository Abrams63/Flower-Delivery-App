import React from 'react';
import { ShoppingCart, Flower2, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Header.css'; // Import the stylesheet

const Header = ({ currentPage, setCurrentPage }) => {
  const { getCartItemCount } = useCart();
  const itemCount = getCartItemCount();

  const getButtonClass = (pageName) => {
    return `nav-button ${currentPage === pageName ? 'active' : ''}`;
  };

  return (
    <header className="app-header">
      <div className="container">
        <div className="header-container">
          <div className="logo-container">
            <Flower2 size={32} />
            <h1 className="header-title">
              Bloom Delivery
            </h1>
          </div>
          
          <nav className="header-nav">
            <button
              onClick={() => setCurrentPage('shop')}
              className={getButtonClass('shop')}
            >
              Shop
            </button>
            
            <button
              onClick={() => setCurrentPage('coupons')}
              className={getButtonClass('coupons')}
            >
              <Tag size={20} />
              Coupons
            </button>
            
            <button
              onClick={() => setCurrentPage('cart')}
              className={`${getButtonClass('cart')} cart-button`}
            >
              <ShoppingCart size={20} />
              Shopping Cart
              {itemCount > 0 && (
                <span className="cart-item-badge">
                  {itemCount}
                </span>
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;