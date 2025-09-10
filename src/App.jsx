import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ShopPage from './components/ShopPage';
import CartPage from './components/CartPage';
import CouponsPage from './components/CouponsPage';
import { CartProvider } from './context/CartContext';

function App() {
  const [currentPage, setCurrentPage] = useState('shop');

  return (
    <CartProvider>
      <div className="App">
        <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
        {currentPage === 'shop' && (
          <ShopPage />
        )}
        {currentPage === 'cart' && (
          <CartPage />
        )}
        {currentPage === 'coupons' && (
          <CouponsPage />
        )}
      </div>
    </CartProvider>
  );
}

export default App;