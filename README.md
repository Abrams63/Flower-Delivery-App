# Bloom Delivery 🌸

A modern, responsive React-based flower delivery application with shopping cart functionality, coupon system, and interactive Google Maps integration.

## Features

### 🛍️ Shopping Experience
- **Product Catalog**: Browse a beautiful collection of flowers with sorting options (by name/price, ascending/descending)
- **Shopping Cart**: Add/remove items, update quantities with persistent storage
- **Wishlist**: Like/unlike flowers with heart icons
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 🎫 Coupon System
- **Multiple Coupon Types**: Percentage-based and fixed amount discounts
- **Category Filtering**: Filter coupons by seasonal, welcome, bulk, weekend, loyalty, and roses categories
- **Validation**: Real-time coupon validation with expiration date checks
- **Copy to Clipboard**: Easy coupon code copying with visual feedback

### 📍 Advanced Ordering
- **Multi-Shop Selection**: Choose from multiple flower shop locations
- **Google Maps Integration**: Interactive map for address selection and route visualization
- **Form Validation**: Comprehensive client-side validation for all form fields
- **reCAPTCHA Protection**: Bot protection for order submissions
- **Order Summary**: Real-time calculation of totals including discounts

### 💾 Data Persistence
- **Local Storage**: Cart items and orders persist across browser sessions
- **Order History**: Complete order tracking with timestamps and details

## Technology Stack

- **Frontend**: React 18 with Hooks
- **Styling**: CSS3 with CSS Grid and Flexbox
- **Icons**: Lucide React
- **Maps**: Google Maps JavaScript API with Places library
- **State Management**: React Context API
- **Form Security**: Google reCAPTCHA v2
- **Build Tool**: Vite

## Project Structure

```
src/
├── components/
│   ├── CartItem.jsx           # Individual cart item component
│   ├── CartPage.jsx           # Shopping cart page
│   ├── CouponsPage.jsx        # Coupon management page
│   ├── FlowerCard.jsx         # Product card component
│   ├── GoogleMap.jsx          # Interactive map component
│   ├── Header.jsx             # Navigation header
│   ├── OrderForm.jsx          # Checkout form component
│   └── ShopPage.jsx           # Main product catalog
├── context/
│   └── CartContext.jsx        # Shopping cart state management
├── data/
│   ├── coupons.js            # Coupon definitions
│   ├── flowers.js            # Product catalog data
│   └── shops.js              # Flower shop locations
├── App.jsx                   # Main application component
├── main.jsx                  # Application entry point
└── index.css                 # Global styles
```

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/bloom-delivery.git
   cd bloom-delivery
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Get a Google Maps API key from [Google Cloud Console](https://console.cloud.google.com/)
   - Enable the following APIs:
     - Maps JavaScript API
     - Places API
     - Geocoding API
     - Directions API
   
4. **Configure API Keys**
   - Replace `'YOUR_GOOGLE_MAPS_API_KEY'` in `src/components/GoogleMap.jsx` with your actual Google Maps API key
   - For production, use environment variables:
     ```javascript
     apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
     ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Build for production**
   ```bash
   npm run build
   ```

## Component Overview

### Core Components

#### `FlowerCard`
- Displays individual flower products with image, price, and description
- Handles add-to-cart functionality with loading states
- Includes wishlist (like) functionality

#### `CartPage`
- Manages shopping cart display and interactions
- Shows empty cart state and order success state
- Integrates with OrderForm for checkout process

#### `OrderForm`
- Comprehensive checkout form with validation
- Shop selection with radio buttons
- Google Maps integration for address selection
- Coupon application system
- reCAPTCHA integration
- Real-time order summary calculations

#### `CouponsPage`
- Displays available coupons with filtering
- Shows coupon details including expiration status
- Copy-to-clipboard functionality
- Responsive grid layout

#### `GoogleMap`
- Interactive map with click-to-select addresses
- Shop location markers with info windows
- Route visualization between shop and delivery address
- Route information display (distance, duration)

### Context & State Management

#### `CartContext`
- Centralized cart state management
- Persistent storage using localStorage
- Functions: add, remove, update quantity, clear cart
- Cart totals and item count calculations

## Available Coupons

The application comes with pre-configured coupons:

- **SPRING20**: 20% off spring flowers (min. $30)
- **NEWCUSTOMER**: $10 off for first-time customers (min. $25)
- **ROSES15**: 15% off rose bouquets (min. $40)
- **BULK25**: $25 off orders over $100
- **WEEKEND10**: 10% off weekend deliveries (min. $20)
- **LOYALTY30**: $30 off for returning customers (min. $80)

## Flower Shop Locations

Three pre-configured shops:
- **Bloom Central**: Downtown location
- **Petals & More**: Midtown location  
- **Garden Paradise**: Uptown location

Each shop includes ratings, hours, and contact information.

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Performance Features

- **Code Splitting**: Components are optimally bundled
- **Lazy Loading**: Images and maps load on demand
- **Local Storage**: Efficient client-side data persistence
- **Optimized Rendering**: React.memo and useCallback where appropriate

## Security Features

- **Form Validation**: Client-side validation with error handling
- **reCAPTCHA**: Bot protection on order submission
- **Input Sanitization**: Safe handling of user inputs
- **HTTPS Ready**: Secure deployment configuration

## Customization

### Adding New Flowers
Edit `src/data/flowers.js` to add new products:

```javascript
{
  id: 13,
  name: 'Your Flower',
  price: 29.99,
  description: 'Beautiful flower description',
  emoji: '🌺',
  color: '#ff6b9d',
  category: 'category-name'
}
```

### Adding New Coupons
Edit `src/data/coupons.js`:

```javascript
{
  id: 7,
  code: 'NEWCODE',
  title: 'Special Offer',
  description: 'Description of the offer',
  discount: 15,
  type: 'percentage', // or 'fixed'
  minOrder: 50,
  validUntil: '2024-12-31',
  category: 'special',
  emoji: '🎁'
}
```

## Deployment

### Vercel
```bash
npm run build
npx vercel --prod
```

### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### Environment Variables for Production
```
VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
VITE_RECAPTCHA_site_key=your_recaptcha_key_here
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Icons provided by [Lucide React](https://lucide.dev/)
- Maps integration via [Google Maps Platform](https://developers.google.com/maps)
- Gradient inspiration from [UI Gradients](https://uigradients.com/)

## Support

For support, email support@bloomdelivery.com or create an issue in the GitHub repository.

---

**Bloom Delivery** - Bringing fresh flowers to your doorstep with modern technology 🌻