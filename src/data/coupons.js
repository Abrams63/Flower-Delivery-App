export const coupons = [
  {
    id: 1,
    code: 'SPRING20',
    title: 'Spring Special',
    description: 'Get 20% off on all spring flowers',
    discount: 20,
    type: 'percentage',
    minOrder: 30,
    validUntil: '2024-05-31',
    category: 'seasonal',
    emoji: '🌸'
  },
  {
    id: 2,
    code: 'NEWCUSTOMER',
    title: 'Welcome Discount',
    description: 'First-time customers get $10 off',
    discount: 10,
    type: 'fixed',
    minOrder: 25,
    validUntil: '2024-12-31',
    category: 'welcome',
    emoji: '🎉'
  },
  {
    id: 3,
    code: 'ROSES15',
    title: 'Rose Lovers',
    description: '15% off on all rose bouquets',
    discount: 15,
    type: 'percentage',
    minOrder: 40,
    validUntil: '2024-06-14',
    category: 'roses',
    emoji: '🌹'
  },
  {
    id: 4,
    code: 'BULK25',
    title: 'Bulk Order Discount',
    description: '$25 off orders over $100',
    discount: 25,
    type: 'fixed',
    minOrder: 100,
    validUntil: '2024-12-31',
    category: 'bulk',
    emoji: '💰'
  },
  {
    id: 5,
    code: 'WEEKEND10',
    title: 'Weekend Special',
    description: '10% off weekend deliveries',
    discount: 10,
    type: 'percentage',
    minOrder: 20,
    validUntil: '2024-12-31',
    category: 'weekend',
    emoji: '🎊'
  },
  {
    id: 6,
    code: 'LOYALTY30',
    title: 'Loyalty Reward',
    description: '$30 off for returning customers',
    discount: 30,
    type: 'fixed',
    minOrder: 80,
    validUntil: '2024-12-31',
    category: 'loyalty',
    emoji: '⭐'
  }
];