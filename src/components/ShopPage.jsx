import React from 'react';
import { useState } from 'react';
import FlowerCard from './FlowerCard';
import { flowers } from '../data/flowers';
import { ChevronDown } from 'lucide-react';
import './ShopPage.css';

const ShopPage = () => {
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const sortedFlowers = [...flowers].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'price':
        comparison = a.price - b.price;
        break;
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      default:
        comparison = 0;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  return (
    <main className="shop-page">
      <div className="container">
        <div className="header-section">
          <h2>Fresh Flowers & Bouquets</h2>
          <p>Choose from our beautiful collection of fresh flowers, carefully selected and arranged for every occasion</p>
        </div>

        <div className="sort-controls">
          <span>Sort by:</span>
          
          <div className="select-wrapper">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Name</option>
              <option value="price">Price</option>
            </select>
            <ChevronDown className="chevron-icon" />
          </div>
          
          <div className="select-wrapper">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="asc">{sortBy === 'price' ? 'Low to High' : 'A to Z'}</option>
              <option value="desc">{sortBy === 'price' ? 'High to Low' : 'Z to A'}</option>
            </select>
            <ChevronDown className="chevron-icon" />
          </div>
        </div>

        <div className="grid grid-4">
          {sortedFlowers.map(flower => (
            <FlowerCard key={flower.id} flower={flower} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default ShopPage;