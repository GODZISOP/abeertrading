export const categories = [
  {
    id: 'everyday-essentials',
    name: 'Everyday Essentials',
    description: 'Everyday essentials for personal care and household routines.',
    buttonText: 'View Products',
    image: 'https://images.unsplash.com/photo-1695561032749-846027360b0d?auto=format&fit=crop&w=900&q=80',
    itemCount: 2
  },
  {
    id: 'home-office',
    name: 'Home & Office',
    description: 'Straightforward office supplies for desks, workspaces, and organization.',
    buttonText: 'View Products',
    image: 'https://images.unsplash.com/photo-1471539665232-dac655dda134?auto=format&fit=crop&w=900&q=80',
    itemCount: 1
  },
  {
    id: 'cleaning-commercial',
    name: 'Cleaning & Commercial',
    description: 'Household cleaning essentials suited to everyday home-care shelves.',
    buttonText: 'View Products',
    image: 'https://images.unsplash.com/photo-1679104143774-d72d83a2a037?auto=format&fit=crop&w=900&q=80',
    itemCount: 1
  },
  {
    id: 'grocery-pantry',
    name: 'Grocery & Pantry',
    description: 'Versatile kitchen storage sets designed to keep pantry staples organized.',
    buttonText: 'View Products',
    image: 'https://images.unsplash.com/photo-1671108503276-1d3d5ab23a3a?auto=format&fit=crop&w=900&q=80',
    itemCount: 1
  }
];

export const products = [
  {
    id: 1,
    name: 'Daily Moisturizer',
    category: 'everyday-essentials',
    categoryName: 'Everyday Essentials',
    sku: 'ATC-DM-012',
    price: '₨ 12',
    priceNumeric: 12,
    packSize: 'Standard Retail Pack (100ml / 3.4 oz)',
    availability: 'In Stock (Ready to Ship)',
    stockUnits: 1450,
    minOrder: '12 Units (Wholesale Minimum)',
    rating: 5.0,
    reviewCount: 38,
    priceNote: 'Wholesale Tiered Pricing Available',
    image: 'https://images.unsplash.com/photo-1695561032749-846027360b0d?q=85&w=900',
    description: 'A practical, deeply hydrating daily moisturizer formulated for beauty, skincare, and personal care retail shelves. Blended with lightweight non-greasy botanicals that lock in moisture and protect skin throughout the day.',
    longDescription: 'Engineered for high turnover in retail, pharmacy, and wellness chains, Abeer Trading Company LLC distributes this dermatologically-tested Daily Moisturizer in export-ready master cartons. Each unit is batch-tested for stability and skin tolerance, packaged with tamper-evident safety seals.',
    features: [
      'All-day lightweight hydration with non-greasy absorption',
      'Suitable for sensitive, dry, and combination skin types',
      'Paraben-free, cruelty-free, and dermatologically verified',
      'Export-ready packaging with multi-lingual label & barcode',
      'Custom pallet configurations & master-carton shrink-wrap'
    ],
    specs: [
      { label: 'Volume / Net Weight', value: '100 ml (3.4 fl oz) per unit' },
      { label: 'Packaging Type', value: 'Airless Pump Bottle with Cap' },
      { label: 'Case Pack', value: '48 units / Master Carton' },
      { label: 'Carton Dimensions', value: '38 x 28 x 22 cm' },
      { label: 'Gross Weight', value: '6.8 kg per carton' },
      { label: 'Quality Verification', value: 'ISO 22716 / GMP Certified Facility' },
      { label: 'Shelf Life', value: '36 Months from Production Date' }
    ],
    tiers: [
      { range: '12 - 47 units', price: '₨ 12', discount: 'Retail Wholesale Base' },
      { range: '48 - 239 units (1-4 Cases)', price: '₨ 11', discount: '8% Case Discount' },
      { range: '240+ units (Pallet Tier)', price: '₨ 9.50', discount: '20% Bulk Pallet' }
    ]
  },
  {
    id: 2,
    name: 'Everyday Office Supplies',
    category: 'home-office',
    categoryName: 'Home & Office',
    sku: 'ATC-EOS-006',
    price: '₨ 6',
    priceNumeric: 6,
    packSize: 'Standard Desk Multi-Pack',
    availability: 'In Stock (Ready to Ship)',
    stockUnits: 3200,
    minOrder: '24 Units (Wholesale Minimum)',
    rating: 5.0,
    reviewCount: 42,
    priceNote: 'Wholesale Tiered Pricing Available',
    image: 'https://images.unsplash.com/photo-1471539665232-dac655dda134?q=85&w=900',
    description: 'A straightforward, high-utility office supply set designed for corporate desks, educational institutions, stationery stores, and everyday workspace organization.',
    longDescription: 'Reliable office stationery built for corporate procurement, government supply contracts, and retail distribution. Includes essential desk tools engineered from durable polymer and rust-resistant steel alloys for dependable daily workflow performance.',
    features: [
      'Ergonomic, high-durability desktop utility components',
      'Engineered for long life in high-traffic administrative offices',
      'Clean retail shelf-ready hang-tag & barcode packaging',
      'Optimal price-to-performance ratio for mass distribution',
      'Consistent stock availability with direct factory batching'
    ],
    specs: [
      { label: 'Set Contents', value: 'Multi-Tool Desk Stationery Essentials' },
      { label: 'Primary Materials', value: 'Reinforced ABS Polymer & Stainless Steel' },
      { label: 'Case Pack', value: '72 packs / Master Carton' },
      { label: 'Carton Dimensions', value: '45 x 32 x 28 cm' },
      { label: 'Gross Weight', value: '8.4 kg per carton' },
      { label: 'Compliance', value: 'RoHS Non-Toxic Compliant' },
      { label: 'Barcode', value: 'GS1 Registered EAN-13' }
    ],
    tiers: [
      { range: '24 - 71 units', price: '₨ 6', discount: 'Base Trade Price' },
      { range: '72 - 287 units (1-3 Cases)', price: '₨ 5.25', discount: '12% Volume Tier' },
      { range: '288+ units (Master Pallet)', price: '₨ 4.50', discount: '25% Distributor' }
    ]
  },
  {
    id: 3,
    name: 'Home Cleaning Essentials',
    category: 'cleaning-commercial',
    categoryName: 'Cleaning & Commercial',
    sku: 'ATC-HCE-010',
    price: '₨ 10',
    priceNumeric: 10,
    packSize: 'Standard Cleaning Multi-Pack (750ml Conc.)',
    availability: 'In Stock (Ready to Ship)',
    stockUnits: 1900,
    minOrder: '18 Units (Wholesale Minimum)',
    rating: 5.0,
    reviewCount: 29,
    priceNote: 'Wholesale Tiered Pricing Available',
    image: 'https://images.unsplash.com/photo-1679104143774-d72d83a2a037?q=85&w=900',
    description: 'A professional-grade household cleaning essential suited to supermarkets, facilities management, commercial janitorial supply, and everyday home-care shelves.',
    longDescription: 'Formulated with fast-acting surface-active agents that dissolve grease, grime, and water marks without harsh abrasive residue. Safe for laminate, ceramic tile, polished marble, and stainless steel surfaces in residential and hospitality environments.',
    features: [
      'Multi-surface deep cleaning formula with fresh citrus aroma',
      'Concentrated action reduces water usage and plastic waste',
      'Biodegradable surfactants, phosphate-free and bleach-free',
      'Heavy-duty ergonomic trigger spray with dual mist/stream nozzle',
      'Certified for commercial housekeeping and home cleaning use'
    ],
    specs: [
      { label: 'Bottle Volume', value: '750 ml (25.4 fl oz) with spray trigger' },
      { label: 'Formula Type', value: 'Neutral pH Multi-Surface Concentrated Liquid' },
      { label: 'Case Pack', value: '24 bottles / Heavy-Duty Master Carton' },
      { label: 'Carton Dimensions', value: '42 x 30 x 32 cm' },
      { label: 'Gross Weight', value: '19.5 kg per carton' },
      { label: 'Safety Data', value: 'Full SDS Sheet & GHS Labeling Available' },
      { label: 'Origin Verification', value: 'Batch Sourced & Quality Tested' }
    ],
    tiers: [
      { range: '18 - 47 units', price: '₨ 10', discount: 'Standard Wholesale' },
      { range: '48 - 191 units (2-7 Cases)', price: '₨ 9', discount: '10% Case Savings' },
      { range: '192+ units (Full Pallet)', price: '₨ 7.80', discount: '22% Facility Rate' }
    ]
  },
  {
    id: 4,
    name: 'Pantry Storage Set',
    category: 'grocery-pantry',
    categoryName: 'Grocery & Pantry',
    sku: 'ATC-PSS-018',
    price: '₨ 18',
    priceNumeric: 18,
    packSize: 'Multi-Piece Modular Air-Tight Set',
    availability: 'In Stock (Ready to Ship)',
    stockUnits: 980,
    minOrder: '10 Sets (Wholesale Minimum)',
    rating: 5.0,
    reviewCount: 51,
    priceNote: 'Wholesale Tiered Pricing Available',
    image: 'https://images.unsplash.com/photo-1671108503276-1d3d5ab23a3a?q=85&w=900',
    description: 'A versatile, premium modular kitchen storage set designed to keep grains, spices, pasta, and dry pantry staples organized, air-tight, and moisture-protected.',
    longDescription: 'Crafted from crystal-clear, shatter-proof food-grade SAN polymer with silicone gasket hermetic locking lids. Stackable modular design maximizes kitchen and pantry shelf space while preserving food freshness 3x longer than ordinary open bags.',
    features: [
      '100% BPA-Free food-grade certified polymer construction',
      'Hermetic silicone perimeter seal locks in crisp freshness',
      'Space-saving stackable geometric form factor',
      'Dishwasher safe and stain-resistant scratch-free walls',
      'Ideal for retail housewares departments & online bundles'
    ],
    specs: [
      { label: 'Set Configuration', value: '4-Piece Stackable Graduated Volumes' },
      { label: 'Capacities Included', value: '0.5L, 0.8L, 1.2L, and 1.9L Containers' },
      { label: 'Lid Mechanism', value: 'Four-Side Snap Lock with Silicone Ring' },
      { label: 'Case Pack', value: '12 Boxed Sets / Master Carton' },
      { label: 'Carton Dimensions', value: '52 x 36 x 44 cm' },
      { label: 'Gross Weight', value: '14.2 kg per carton' },
      { label: 'Certification', value: 'FDA 21 CFR Food Contact Approved' }
    ],
    tiers: [
      { range: '10 - 23 sets', price: '₨ 18', discount: 'Wholesale Price' },
      { range: '24 - 71 sets (2-5 Cases)', price: '₨ 16.50', discount: '8.5% Volume Tier' },
      { range: '72+ sets (Pallet Tier)', price: '₨ 14.20', discount: '21% Bulk Rate' }
    ]
  },
  {
    id: 5,
    name: 'Stainless Pet Bowl',
    category: 'everyday-essentials',
    categoryName: 'Everyday Essentials',
    sku: 'ATC-SPB-009',
    price: '₨ 9',
    priceNumeric: 9,
    packSize: 'Stainless Steel Heavy-Base Unit',
    availability: 'In Stock (Ready to Ship)',
    stockUnits: 2150,
    minOrder: '20 Units (Wholesale Minimum)',
    rating: 5.0,
    reviewCount: 34,
    priceNote: 'Wholesale Tiered Pricing Available',
    image: 'https://images.unsplash.com/photo-1702571076867-809560e4678c?q=85&w=900',
    description: 'A durable, hygienic stainless steel feeding bowl with anti-slip rubberized base for daily domestic and kennel use, suitable for pets of all sizes.',
    longDescription: 'Heavy-gauge 304 food-grade stainless steel feeding bowl engineered with a mirror-polished interior for easy bacteria-free washing and a bonded non-slip rubber silicone bottom ring that prevents clatter and sliding on tile or hardwood floors.',
    features: [
      'Food-grade 304 stainless steel resists rust, scratches, and odors',
      'Permanently bonded non-skid rubber base prevents spills',
      'Dishwasher safe body with removable silicone base ring',
      'Stackable nesting design minimizes shipping volume and costs',
      'Top-rated SKU for pet specialty retailers and vet supply chains'
    ],
    specs: [
      { label: 'Diameter / Capacity', value: '22 cm Rim Diameter / 950 ml (32 oz)' },
      { label: 'Material Grade', value: 'SUS 304 Food-Contact Stainless Steel' },
      { label: 'Base Finish', value: 'Molded Non-Skid Silicone Rubber Ring' },
      { label: 'Case Pack', value: '48 units / Master Carton (Nesting Pack)' },
      { label: 'Carton Dimensions', value: '48 x 48 x 30 cm' },
      { label: 'Gross Weight', value: '11.8 kg per carton' },
      { label: 'Durability', value: 'Drop-Tested & Anti-Bite Structural Gauge' }
    ],
    tiers: [
      { range: '20 - 47 units', price: '₨ 9', discount: 'Base Wholesale' },
      { range: '48 - 143 units (1-2 Cases)', price: '₨ 8.10', discount: '10% Case Saving' },
      { range: '144+ units (Pallet Tier)', price: '₨ 7.00', discount: '22% Distributor' }
    ]
  }
];
