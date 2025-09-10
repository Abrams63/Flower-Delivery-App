import React, { useState } from 'react';
import { Heart, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './FlowerCard.css'; // Import the CSS file

const FlowerCard = ({ flower }) => {
  const { addToCart } = useCart();
  const [isLiked, setIsLiked] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    addToCart(flower);
    
    // Brief loading state for better UX
    setTimeout(() => {
      setIsAdding(false);
    }, 300);
  };

  return (
    <div className="card">
      <div 
        className="card-image-container"
        style={{
          // Dynamic styles remain inline
          background: `linear-gradient(135deg, ${flower.color}20 0%, ${flower.color}40 100%)`,
          color: flower.color,
        }}
      >
        {flower.emoji}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="like-button"
        >
          <Heart 
            size={20} 
            fill={isLiked ? '#ff6b6b' : 'none'} 
            color={isLiked ? '#ff6b6b' : '#718096'} 
          />
        </button>
      </div>
      
      <div className="card-content">
        <h3 className="card-title">
          {flower.name}
        </h3>
        
        <p className="card-description">
          {flower.description}
        </p>
        
        <div className="card-footer">
          <span className="card-price">
            ${flower.price}
          </span>
          
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="add-to-cart-btn"
            style={{
              // Conditional styles based on state remain inline
              opacity: isAdding ? 0.7 : 1,
              transform: isAdding ? 'scale(0.95)' : 'scale(1)'
            }}
          >
            {isAdding ? (
              <div className="spinner" />
            ) : (
              <>
                <Plus size={16} />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlowerCard;