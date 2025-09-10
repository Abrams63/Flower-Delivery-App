import React, { useState } from 'react';
import CartItem from './CartItem';
import OrderForm from './OrderForm';
import { useCart } from '../context/CartContext';
import { ShoppingBag } from 'lucide-react';
import './CartPage.css'; // добавьте импорт стилей

const CartPage = () => {
  const { cartItems, getCartTotal } = useCart();
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  if (orderSubmitted) {
    return (
      <main className="cart-main">
        <div className="container">
          <div className="cart-success-card">
            <div className="cart-success-emoji">
              🌸
            </div>
            <h2 className="cart-success-title">
              Order Submitted Successfully!
            </h2>
            <p className="cart-success-text">
              Thank you for your order! We'll prepare your beautiful flowers and deliver them as soon as possible.
              You'll receive a confirmation email shortly.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (cartItems.length === 0) {
    return (
      <main className="cart-main">
        <div className="container">
          <div className="cart-empty-card">
            <ShoppingBag size={80} color="#cbd5e0" style={{ marginBottom: '24px' }} />
            <h2 className="cart-empty-title">
              Your Cart is Empty
            </h2>
            <p className="cart-empty-text">
              Start shopping to add beautiful flowers to your cart
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-main">
      <div className="container">
        <h2 className="cart-title">
          Shopping Cart
        </h2>

        <div className="grid grid-2" style={{ alignItems: 'start' }}>
          <div>
            <div className="card" style={{ marginBottom: '24px' }}>
              <div className="cart-card-content">
                <h3 className="cart-summary-title">
                  Order Summary
                </h3>
                
                <div className="cart-items-list">
                  {cartItems.map(item => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
                
                <div className="cart-total-section">
                  <div className="cart-total-row">
                    <span className="cart-total-label">
                      Total Price:
                    </span>
                    <span className="cart-total-value">
                      ${getCartTotal().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <OrderForm onOrderSubmitted={() => setOrderSubmitted(true)} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartPage;