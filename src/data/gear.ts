import type { GearItem, GearCategory } from '../types/gear';

export const gearCategories: GearCategory[] = [
  {
    id: 'keyboards',
    name: 'Keyboards',
    description: 'Mechanical and wireless keyboards for coding and productivity',
    icon: '⌨️'
  },
  {
    id: 'mice',
    name: 'Mice',
    description: 'High-precision mice for development and design work',
    icon: '🖱️'
  },
  {
    id: 'monitors',
    name: 'Monitors',
    description: 'High-resolution displays for enhanced productivity',
    icon: '🖥️'
  },
  {
    id: 'audio',
    name: 'Audio',
    description: 'Headphones, speakers, and microphones for meetings and focus',
    icon: '🎧'
  },
  {
    id: 'accessories',
    name: 'Accessories',
    description: 'Desk accessories, cables, and productivity tools',
    icon: '🔧'
  }
];

export const gearItems: GearItem[] = [
  {
    id: 'mx-keys-s',
    name: 'Logitech MX Keys S',
    description: 'High-performance wireless keyboard engineered for comfortable, fast, fluid typing with smart illumination and programmable keys. Perfect for coding and productivity work.',
    category: 'keyboards',
    price: '$144.99',
    affiliateUrl: 'https://amzn.to/44yDWCO',
    productUrl: 'https://www.amazon.com/dp/B0DXZ97PCG?ref=ppx_yo2ov_dt_b_fed_asin_title&th=1',
    image: 'https://m.media-amazon.com/images/I/71cPvrmX14L._AC_SL1500_.jpg',
    features: [
      'Fast fluid precise typing with spherically-dished keys',
      'Smart illumination that adjusts to your environment',
      'Multi-device connectivity (up to 3 devices)',
      'USB-C quick charging with 10-day battery life',
      'Programmable keys with Logi Options+ software',
      'Low-profile ergonomic design',
      'Bluetooth Low Energy and Logi Bolt USB receiver',
      'Compatible with Windows, macOS, Linux, ChromeOS, iPadOS',
      'Made with recycled plastic materials'
    ],
    specifications: {
      'Connectivity': 'Bluetooth Low Energy, Logi Bolt USB Receiver',
      'Battery Life': '10 days (with backlighting), 5 months (without)',
      'Dimensions': '16.94" × 5.18" × 0.80" (430.2 × 131.63 × 20.5 mm)',
      'Weight': '28.57 oz (810 g)',
      'Wireless Range': '33 ft (10 meters)',
      'Charging': 'USB-C rechargeable',
      'Compatibility': 'Windows 10/11, macOS 10.15+, Linux, ChromeOS, iPadOS 14+, Android 8.0+'
    },
    pros: [
      'Exceptional typing experience with precise key feel',
      'Smart backlighting adapts to environment automatically',
      'Long battery life with quick USB-C charging',
      'Seamless multi-device switching',
      'Customizable keys and Smart Actions',
      'Sustainable design with recycled materials',
      'Professional aesthetic that matches any setup'
    ],
    cons: [
      'Premium price point',
      'Full-size form factor may not suit minimalist setups',
      'Requires Logi Options+ software for full functionality'
    ],
    rating: 5.0,
    dateAdded: '2025-01-10',
    tags: ['wireless', 'bluetooth', 'programmable', 'ergonomic', 'productivity', 'coding', 'multi-device'],
    inStock: true,
    discontinued: false
  },
  {
    id: 'stream-deck-mk2',
    name: 'Elgato Stream Deck MK.2',
    description: 'Professional 15-key customizable LCD control pad that revolutionizes your workflow. Perfect for streamers, content creators, and productivity enthusiasts who want instant control over apps, tools, and automation.',
    category: 'accessories',
    price: '$149.99',
    affiliateUrl: 'https://amzn.to/44VXNwf',
    productUrl: 'https://www.amazon.com/Elgato-Stream-Deck-MK-2-Controller/dp/B09738CV2G',
    image: 'https://m.media-amazon.com/images/I/61gtdFnK+UL._AC_SL1500_.jpg',
    features: [
      '15 fully customizable LCD keys with vibrant displays',
      'Drag-and-drop setup with Stream Deck software',
      'Unlimited actions and multi-action sequences',
      'Smart profiles that auto-switch based on active apps',
      'Folder organization for endless key combinations',
      'Plugin marketplace with 200+ integrations',
      'Tactile membrane keys for reliable performance',
      'USB-C connectivity with included cable',
      'Compatible with Windows, macOS, and popular streaming platforms'
    ],
    specifications: {
      'Connectivity': 'USB-C (cable included)',
      'Keys': '15 customizable LCD keys',
      'Key Resolution': '72x72 pixels per key',
      'Dimensions': '4.6" × 3.3" × 0.8" (118 × 84 × 21 mm)',
      'Weight': '6.2 oz (175 g)',
      'Compatibility': 'Windows 10/11 (64-bit), macOS 10.14+',
      'Software': 'Stream Deck software (free download)',
      'Power': 'USB-powered (no external adapter needed)'
    },
    pros: [
      'Intuitive drag-and-drop setup requires no technical knowledge',
      'Massive plugin ecosystem for virtually any app or workflow',
      'Reliable membrane keys tested for millions of presses',
      'Smart profiles automatically adapt to your current workflow',
      'Unlimited customization with folders and multi-actions',
      'Professional build quality with premium materials',
      'Excellent software support and regular updates'
    ],
    cons: [
      'Learning curve to discover all advanced features',
      'Some plugins require additional software setup',
      'Limited to USB connectivity (no wireless option)'
    ],
    rating: 4.7,
    dateAdded: '2025-01-10',
    tags: ['workflow', 'automation', 'streaming', 'productivity', 'customizable', 'content-creation', 'hotkeys'],
    inStock: true,
    discontinued: false
  },
  {
    id: 'logitech-pebble-m350',
    name: 'Logitech Pebble M350 Wireless Mouse',
    description: 'Modern, slim, and silent portable mouse with dual connectivity options. Perfect for travel and quiet work environments with 90% less click noise and 18-month battery life.',
    category: 'mice',
    price: '$29.99',
    affiliateUrl: 'https://amzn.to/3GphOD6',
    productUrl: 'https://www.amazon.com/dp/B084SX7HKB',
    image: 'https://m.media-amazon.com/images/I/51lMCZGIAiL._AC_SL1500_.jpg',
    features: [
      'Silent clicks and scrolling (90% less noise)',
      'Dual connectivity: Bluetooth + USB receiver',
      'Ultra-slim portable design (26.5mm thin)',
      '18-month battery life with single AA battery',
      '1000 DPI high-precision optical tracking',
      'Works on most surfaces including bed covers',
      'Magnetic USB receiver storage in mouse'
    ],
    specifications: {
      'Connectivity': 'Bluetooth Low Energy + 2.4 GHz USB receiver',
      'DPI': '1000 DPI optical sensor',
      'Buttons': '3 buttons (left, right, scroll wheel)',
      'Dimensions': '107 × 59 × 26.5 mm',
      'Weight': '77g (with battery)',
      'Battery': '18 months with 1 AA battery',
      'Range': 'Up to 10 meters (33 feet)',
      'Compatibility': 'Windows, Mac, iPad, Chrome OS, Linux'
    },
    pros: [
      'Exceptionally quiet operation for libraries/offices',
      'Incredibly long 18-month battery life',
      'Dual connectivity options for flexibility',
      'Ultra-portable and travel-friendly',
      'Works on virtually any surface',
      'Ambidextrous design for all users',
      'Made with 30% recycled plastic materials'
    ],
    cons: [
      'Fixed 1000 DPI (not adjustable)',
      'Only 3 buttons (no side buttons)',
      'Requires AA battery (not rechargeable)'
    ],
    tags: ['portable', 'travel', 'bluetooth', 'silent', 'mobile', 'productivity', 'logitech', 'wireless'],
    rating: 4.5,
    dateAdded: '2025-01-05',
    inStock: true,
    discontinued: false
  },
  {
    id: 'lg-34wr55qk-b-ultrawide',
    name: 'LG 34WR55QK-B 34-inch UltraWide WQHD Curved Monitor',
    description: 'Immersive 34-inch UltraWide curved monitor with WQHD resolution, 100Hz refresh rate, HDR10, and USB-C connectivity. Perfect for multitasking, productivity, and entertainment.',
    category: 'monitors',
    price: '$369.99',
    affiliateUrl: 'https://amzn.to/4kq31FY',
    productUrl: 'https://www.amazon.com/LG-34WR55QK-B-UltraWide-DisplayPort-Adjustable/dp/B0DQF8LRGZ/',
    image: 'https://m.media-amazon.com/images/I/61uVbiZ6UhL._AC_SL1200_.jpg',
    features: [
      '34-inch UltraWide WQHD (3440 x 1440) curved display',
      '100Hz refresh rate, 5ms response time',
      'HDR10 support, Reader Mode',
      'HDMI, DisplayPort, USB Type-C connectivity',
      'Tilt/height adjustable ergonomic stand',
      'sRGB 99% color gamut',
      'VESA mount compatible (100x100mm)'
    ],
    specifications: {
      'Panel Type': 'VA',
      'Aspect Ratio': '21:9',
      'Brightness': '300 nits (typical)',
      'Color Gamut': 'sRGB 99%',
      'Ports': '2x HDMI, 1x DisplayPort, 1x USB Type-C, 1x Headphone Out',
      'VESA Mount': '100x100mm',
      'Stand': 'Tilt/Height Adjustable',
      'HDR': 'HDR10',
      'Response Time': '5ms',
      'Refresh Rate': '100Hz',
      'Curvature': 'Curved',
      'Dimensions': '32.1 x 9.8 x 22.4 inches (with stand)'
    },
    pros: [
      'Immersive ultra-wide curved screen for multitasking',
      'Modern connectivity (USB-C, HDMI, DP)',
      'Adjustable ergonomic stand',
      'Great color and clarity for work and entertainment',
      'VESA mount support'
    ],
    cons: [
      'No built-in speakers',
      '100Hz is good but not top-tier for gaming',
      'Large footprint on desk'
    ],
    tags: ['monitor', 'ultrawide', 'curved', 'LG', 'WQHD', 'USB-C', 'productivity', 'HDR'],
    rating: 4.6,
    dateAdded: '2025-01-05',
    inStock: true,
    discontinued: false
  }
];

// Helper function to get gear by category
export function getGearByCategory(categoryId: string): GearItem[] {
  return gearItems.filter(item => item.category === categoryId);
}

// Helper function to get gear by tags
export function getGearByTags(tags: string[]): GearItem[] {
  return gearItems.filter(item => 
    item.tags?.some(tag => tags.includes(tag))
  );
}

// Helper function to get featured gear (highly rated items)
export function getFeaturedGear(): GearItem[] {
  return gearItems.filter(item => item.rating && item.rating >= 4.5);
} 