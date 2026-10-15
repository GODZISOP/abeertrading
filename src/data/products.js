export const categories = [
  {
    id: 'daily-essentials',
    name: 'Daily Essentials',
    description: 'Everyday essentials curated for quality, longevity, and modern routines.',
    buttonText: 'Shop',
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80',
    itemCount: 1
  },
  {
    id: 'fashion-finds',
    name: 'Fashion Finds',
    description: 'Timeless apparel and accessories crafted for functional daily wear.',
    buttonText: 'Browse',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    itemCount: 1
  },
  {
    id: 'home-living',
    name: 'Home Living',
    description: 'Thoughtfully designed home accents and lighting for calm interiors.',
    buttonText: 'View',
    image: 'https://images.unsplash.com/photo-1517404215738-15263e9f9178?auto=format&fit=crop&w=800&q=80',
    itemCount: 1
  },
  {
    id: 'top-picks',
    name: 'Top Picks',
    description: 'Our most sought-after products curated for discerning wholesale partners.',
    buttonText: 'Shop',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    itemCount: 1
  }
];

export const products = [
  {
    id: 1,
    name: 'Minimalist Everyday Watch',
    category: 'top-picks',
    categoryName: 'Top Picks',
    sku: 'HF-WAT-001',
    price: '$60',
    priceNumeric: 60,
    packSize: 'Standard Retail Box (Protective Case)',
    availability: 'In Stock (Ready to Ship)',
    stockUnits: 1250,
    minOrder: '10 Units',
    rating: 5.0,
    reviewCount: 48,
    priceNote: 'Wholesale Tiered Pricing Available',
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
    description: 'An elegant minimalist timepiece featuring a brushed stainless steel case, clean white dial, and a supple genuine leather strap designed for all-day comfort.',
    longDescription: 'Curated by HASSAN FARID LLC, this Minimalist Everyday Watch combines contemporary aesthetics with reliable Japanese quartz movement. Finished with a scratch-resistant mineral crystal lens and water-resistant casing, each piece arrives individually packaged in export-ready retail presentation boxes.',
    features: [
      'High-precision Japanese quartz movement',
      'Ultra-slim minimalist dial with scratch-resistant lens',
      'Supple genuine leather strap with stainless steel buckle',
      'Water resistant 3 ATM suitable for daily splash resistance',
      'Export master carton packaging with barcode labels'
    ],
    tiers: [
      { range: '10 - 49 Units', price: '$60', discount: 'Base MOQ' },
      { range: '50 - 199 Units', price: '$52', discount: '13% OFF' },
      { range: '200+ Units', price: '$45', discount: '25% Volume Tier' }
    ],
    specs: [
      { label: 'Case Diameter', value: '40 mm' },
      { label: 'Case Thickness', value: '7.5 mm' },
      { label: 'Strap Width', value: '20 mm' },
      { label: 'Movement', value: 'Quartz Movement' },
      { label: 'Warranty', value: '1 Year Manufacturer Guarantee' }
    ]
  },
  {
    id: 2,
    name: 'Insulated Steel Bottle',
    category: 'daily-essentials',
    categoryName: 'Daily Essentials',
    sku: 'HF-BOT-002',
    price: '$25',
    priceNumeric: 25,
    packSize: 'Master Carton (24 Units)',
    availability: 'In Stock (Ready to Ship)',
    stockUnits: 2800,
    minOrder: '24 Units (1 Master Carton)',
    rating: 5.0,
    reviewCount: 64,
    priceNote: 'Wholesale Bulk Tier Available',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
    description: 'Double-walled vacuum insulated stainless steel water bottle. Keeps beverages icy cold for up to 24 hours or piping hot for up to 12 hours.',
    longDescription: 'Engineered for durability and performance, this professional-grade insulated steel bottle is manufactured from 18/8 food-grade stainless steel with a sweat-proof matte powder coat finish. Complete with a leak-proof flex cap and wide mouth opening suited for ice cubes.',
    features: [
      'TempShield double-wall vacuum insulation',
      '18/8 pro-grade stainless steel construction',
      'BPA-Free, Phthalate-Free, and toxin-free materials',
      'Durable textured powder coat finish with non-slip grip',
      'Leak-proof seal with ergonomic carry loop'
    ],
    tiers: [
      { range: '24 - 96 Units', price: '$25', discount: 'Base Wholesale' },
      { range: '97 - 240 Units', price: '$21', discount: '16% OFF' },
      { range: '240+ Units', price: '$18', discount: '28% Pallet Rate' }
    ],
    specs: [
      { label: 'Capacity', value: '750 ml (25 oz)' },
      { label: 'Material', value: '18/8 Food Grade Stainless Steel' },
      { label: 'Thermal Retention', value: '24h Cold / 12h Hot' },
      { label: 'Finish', value: 'Matte Powder Coated' }
    ]
  },
  {
    id: 3,
    name: 'Warm Glow Table Lamp',
    category: 'home-living',
    categoryName: 'Home Living',
    sku: 'HF-LMP-003',
    price: '$35',
    priceNumeric: 35,
    packSize: 'Protective Foam Carton (Individual)',
    availability: 'In Stock (Ready to Ship)',
    stockUnits: 940,
    minOrder: '12 Units',
    rating: 4.9,
    reviewCount: 39,
    priceNote: 'Commercial Lighting Grade',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    description: 'Ambient warm glow bedside and accent lamp with brass accents and frosted diffuse globe. Creates an inviting, soothing atmosphere in any room.',
    longDescription: 'Designed for residential living, boutique hospitality, and modern workspaces, this Warm Glow Table Lamp blends timeless antique brass hardware with an energy-efficient warm LED bulb. Features a solid weighted anti-slip base and woven fabric-braided power cord.',
    features: [
      'Warm 2700K ambient illumination comfortable for eyes',
      'Solid brass-finish metal hardware with weighted base',
      'Energy efficient low-heat LED technology included',
      'Woven braided cable with in-line rotary switch',
      'Drop-tested protective packaging for safe transit'
    ],
    tiers: [
      { range: '12 - 48 Units', price: '$35', discount: 'Base MOQ' },
      { range: '49 - 144 Units', price: '$30', discount: '14% OFF' },
      { range: '145+ Units', price: '$26', discount: '25% Contractor Tier' }
    ],
    specs: [
      { label: 'Height', value: '38 cm' },
      { label: 'Bulb Base', value: 'E27 Warm LED (Included)' },
      { label: 'Voltage', value: '110V - 240V Universal' },
      { label: 'Cord Length', value: '1.8m Braided Fabric Cord' }
    ]
  },
  {
    id: 4,
    name: 'Canvas Laptop Backpack',
    category: 'fashion-finds',
    categoryName: 'Fashion Finds',
    sku: 'HF-BPK-004',
    price: '$45',
    priceNumeric: 45,
    packSize: 'Polybagged Master Carton (15 Units)',
    availability: 'In Stock (Ready to Ship)',
    stockUnits: 1600,
    minOrder: '15 Units',
    rating: 5.0,
    reviewCount: 52,
    priceNote: 'Wholesale Tiered Pricing Available',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    description: 'Heavy-duty vintage canvas backpack with padded laptop sleeve, reinforced stitching, and water-repellent wax coating built for daily commuters and travelers.',
    longDescription: 'Constructed from high-density washed cotton canvas and reinforced genuine leather trims, this multi-compartment laptop backpack fits up to 15.6-inch laptops. Features padded ergonomic shoulder straps, antique brass zippers, and expandable side pockets.',
    features: [
      'High-density 16oz water-repellent washed cotton canvas',
      'Dedicated padded sleeve fits laptops up to 15.6 inches',
      'Reinforced leather buckle straps with quick magnetic closures',
      'Ergonomic breathable mesh padded shoulder straps',
      'Multiple utility organizer pockets for pens, cables, and passports'
    ],
    tiers: [
      { range: '15 - 45 Units', price: '$45', discount: 'Base Wholesale' },
      { range: '46 - 150 Units', price: '$38', discount: '15% OFF' },
      { range: '151+ Units', price: '$33', discount: '26% Bulk Tier' }
    ],
    specs: [
      { label: 'Dimensions', value: '44 x 31 x 16 cm' },
      { label: 'Capacity', value: '25 Liters' },
      { label: 'Weight', value: '0.88 kg' },
      { label: 'Laptop Sleeve', value: 'Padded up to 15.6 inch' }
    ]
  }
];
