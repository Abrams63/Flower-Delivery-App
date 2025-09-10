import React, { useState } from 'react';
import { MapPin, User, Mail, Phone, Tag, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import GoogleMap from './GoogleMap';
import ReCAPTCHA from 'react-google-recaptcha';
import { flowerShops } from '../data/shops';
import { coupons } from '../data/coupons';

const OrderForm = ({ onOrderSubmitted }) => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    coordinates: null
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedShop, setSelectedShop] = useState(flowerShops[0]);
  const [showMap, setShowMap] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Delivery address is required';
    }
    
    if (!captchaValue) {
      newErrors.captcha = 'Please complete the captcha verification';
    }
    
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleAddressSelect = ({ address, lat, lng }) => {
    setFormData(prev => ({
      ...prev,
      address,
      coordinates: { lat, lng }
    }));
    
    if (errors.address) {
      setErrors(prev => ({ ...prev, address: '' }));
    }
  };

  const applyCoupon = () => {
    setCouponError('');
    
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code');
      return;
    }
    
    const coupon = coupons.find(c => c.code.toLowerCase() === couponCode.toLowerCase());
    
    if (!coupon) {
      setCouponError('Invalid coupon code');
      return;
    }
    
    if (new Date(coupon.validUntil) < new Date()) {
      setCouponError('This coupon has expired');
      return;
    }
    
    if (getCartTotal() < coupon.minOrder) {
      setCouponError(`Minimum order amount is $${coupon.minOrder}`);
      return;
    }
    
    setAppliedCoupon(coupon);
    setCouponCode('');
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError('');
  };

  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;
    
    if (appliedCoupon.type === 'percentage') {
      return (getCartTotal() * appliedCoupon.discount) / 100;
    } else {
      return appliedCoupon.discount;
    }
  };

  const getFinalTotal = () => {
    return Math.max(0, getCartTotal() - calculateDiscount());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create order object with timezone-aware date
      const order = {
        id: `ORD-${Date.now()}`,
        customerInfo: formData,
        selectedShop,
        items: cartItems,
        subtotal: getCartTotal(),
        discount: calculateDiscount(),
        totalAmount: getFinalTotal(),
        appliedCoupon,
        orderDate: new Date().toISOString(),
        localOrderTime: new Date().toLocaleString(),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        status: 'pending'
      };
      
      // Save order to localStorage (in a real app, this would be sent to a server)
      const existingOrders = JSON.parse(localStorage.getItem('flowerOrders') || '[]');
      existingOrders.push(order);
      localStorage.setItem('flowerOrders', JSON.stringify(existingOrders));
      
      console.log('Order submitted:', order);
      
      // Clear cart and show success
      clearCart();
      onOrderSubmitted();
      
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('There was an error submitting your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card">
      <div className="order-form-container">
        {/* Shop Selection */}
        <div className="shop-selection">
          <h3 className="shop-selection__title">Select Flower Shop</h3>
          <div className="shop-selection__options">
            {flowerShops.map(shop => (
              <label key={shop.id} className={`shop-option ${selectedShop.id === shop.id ? 'shop-option--selected' : ''}`}>
                <input
                  type="radio"
                  name="shop"
                  value={shop.id}
                  checked={selectedShop.id === shop.id}
                  onChange={() => setSelectedShop(shop)}
                  className="shop-option__radio"
                />
                <div>
                  <div className="shop-option__name">{shop.name}</div>
                  <div className="shop-option__address">{shop.address}</div>
                  <div className="shop-option__details">⭐ {shop.rating} • {shop.hours}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <h3 className="form-section-title">
          <User size={20} />
          Customer Information
        </h3>
        
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label"><User size={16} className="icon-prefix" />Full Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} className={`form-input ${errors.name ? 'error' : ''}`} placeholder="Enter your full name" />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>

          <div className="form-group">
            <label className="form-label"><Mail size={16} className="icon-prefix" />Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} className={`form-input ${errors.email ? 'error' : ''}`} placeholder="Enter your email address" />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label className="form-label"><Phone size={16} className="icon-prefix" />Phone Number</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className={`form-input ${errors.phone ? 'error' : ''}`} placeholder="Enter your phone number" />
            {errors.phone && <div className="error-message">{errors.phone}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">
              <MapPin size={16} className="icon-prefix" />
              Delivery Address
              <button type="button" onClick={() => setShowMap(!showMap)} className="map-toggle-button">
                {showMap ? 'Hide Map' : 'Use Map'}
              </button>
            </label>
            <textarea name="address" value={formData.address} onChange={handleInputChange} className={`form-input ${errors.address ? 'error' : ''}`} placeholder="Enter your complete delivery address" rows="3" />
            {errors.address && <div className="error-message">{errors.address}</div>}
          </div>

          {showMap && (
            <div className="form-group">
              <GoogleMap onAddressSelect={handleAddressSelect} selectedAddress={formData.coordinates ? { address: formData.address, lat: formData.coordinates.lat, lng: formData.coordinates.lng } : null} selectedShop={selectedShop} showRoute={formData.coordinates !== null} height="300px" />
            </div>
          )}

          {/* Coupon Section */}
          <div className="form-group">
            <label className="form-label"><Tag size={16} className="icon-prefix" />Coupon Code (Optional)</label>
            {!appliedCoupon ? (
              <div className="coupon-input-group">
                <input type="text" value={couponCode} onChange={(e) => setCouponCode(e.target.value.toUpperCase())} className="form-input coupon-input-group__input" placeholder="Enter coupon code" />
                <button type="button" onClick={applyCoupon} className="btn btn-secondary coupon-input-group__button">Apply</button>
              </div>
            ) : (
              <div className="applied-coupon-badge">
                <div>
                  <strong>{appliedCoupon.code}</strong> - {appliedCoupon.title}
                  <div className="applied-coupon-badge__savings">Save ${calculateDiscount().toFixed(2)}</div>
                </div>
                <button type="button" onClick={removeCoupon} className="applied-coupon-badge__remove-btn">
                  <X size={16} />
                </button>
              </div>
            )}
            {couponError && <div className="error-message">{couponError}</div>}
          </div>

          <div className="order-summary">
            <h4 className="order-summary__title">Order Summary</h4>
            {cartItems.map(item => (
              <div key={item.id} className="order-summary__item">
                <span>{item.name} × {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="order-summary__total">
              <span>Total</span>
              <span>
                {appliedCoupon && (
                  <div className="order-summary__discount-details">
                    Subtotal: ${getCartTotal().toFixed(2)}<br/>
                    Discount: -${calculateDiscount().toFixed(2)}
                  </div>
                )}
                <span className="order-summary__final-price">${getFinalTotal().toFixed(2)}</span>
              </span>
            </div>
          </div>

          <div className="form-group">
            <ReCAPTCHA sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" onChange={setCaptchaValue} onExpired={() => setCaptchaValue(null)} />
            {errors.captcha && <div className="error-message">{errors.captcha}</div>}
          </div>

          <button type="submit" disabled={isSubmitting} className="btn btn-primary submit-order-button">
            {isSubmitting ? (
              <div className="submit-order-button__loading-content">
                <div className="spinner" />
                Processing Order...
              </div>
            ) : 'Submit Order'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;