import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './CartItem.css';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="cart-item">
      <div
        className="cart-item__image"
        style={{
          background: `linear-gradient(135deg, ${item.color}20 0%, ${item.color}40 100%)`
        }}
      >
        {item.emoji}
      </div>
      
      <div className="cart-item__info">
        <h4 className="cart-item__name">{item.name}</h4>
        <p className="cart-item__desc">${item.price} each</p>
      </div>
      
      <div className="cart-item__controls">
        <div className="cart-item__quantity-group">
          <button
            className="cart-item__quantity-btn"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
          >
            <Minus size={16} color="#718096" />
          </button>
          <span className="cart-item__quantity">{item.quantity}</span>
          <button
            className="cart-item__quantity-btn"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
          >
            <Plus size={16} color="#718096" />
          </button>
        </div>
        <span className="cart-item__total">
          ${(item.price * item.quantity).toFixed(2)}
        </span>
        <button
          className="cart-item__remove-btn"
          onClick={() => removeFromCart(item.id)}
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;