import React, { useState, useEffect } from 'react';
import { 
  Phone, Mail, MapPin, Search, ArrowRight, CheckCircle2, 
  Send, ExternalLink, ShieldCheck, Truck, Award,
  X, MessageSquare, Layers, Building2, ShoppingCart, Menu as MenuIcon,
  Plus, Minus, Trash2, ShoppingBag, Eye, ArrowLeft, Check,
  LayoutGrid, Sparkles, ChevronDown, Package, User, Store, Globe
} from 'lucide-react';
import { categories, products } from './data/products';
import { siteConfig as defaultSiteConfig } from './data/siteConfig';
import { AdminPanel, useActiveSiteConfig } from './admin';
import logoImg from './images/image.png';

function isAdminHostname() {
  if (typeof window === 'undefined') return false;
  const host = window.location.hostname.toLowerCase();
  return (
    host.startsWith('admin.') ||
    host.includes('-admin.') ||
    host.includes('admin-') ||
    import.meta.env.VITE_ADMIN_ONLY === 'true'
  );
}

function checkIsAdminRoute() {
  if (typeof window === 'undefined') return false;
  const params = new URLSearchParams(window.location.search);
  const cleanPath = window.location.pathname.replace(/\/+$/, '').toLowerCase();
  const cleanHash = window.location.hash.toLowerCase();
  if (
    cleanPath.endsWith('/admin') ||
    cleanHash.startsWith('#admin') ||
    cleanHash.startsWith('#/admin') ||
    params.has('admin')
  ) {
    return true;
  }
  if (isAdminHostname() && !params.has('preview')) {
    return true;
  }
  return false;
}

export default function App() {
  const { config: dynamicConfig, refresh: refreshActiveSite } = useActiveSiteConfig();
  const siteConfig = dynamicConfig || defaultSiteConfig;
  const [isAdminMode, setIsAdminMode] = useState(checkIsAdminRoute);

  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [modalType, setModalType] = useState(null); // 'partner', 'quote', 'supplier', 'checkout', null
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Cart & Product Detail state
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('atc_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(products[0]);
  const [detailQuantity, setDetailQuantity] = useState(1);
  const [activeDetailTab, setActiveDetailTab] = useState('description');
  const [toastMessage, setToastMessage] = useState(null);

  // Sync Admin route on hash/popstate
  useEffect(() => {
    const onRouteChange = () => setIsAdminMode(checkIsAdminRoute());
    window.addEventListener('hashchange', onRouteChange);
    window.addEventListener('popstate', onRouteChange);
    return () => {
      window.removeEventListener('hashchange', onRouteChange);
      window.removeEventListener('popstate', onRouteChange);
    };
  }, []);

  const exitAdmin = (targetSlug = null) => {
    const params = new URLSearchParams();
    if (targetSlug) params.set('site', targetSlug);
    if (isAdminHostname()) params.set('preview', '1');
    const qs = params.toString();
    const nextUrl = qs ? `/?${qs}` : '/';
    window.history.pushState({}, '', nextUrl);
    setIsAdminMode(false);
    refreshActiveSite();
    window.scrollTo({ top: 0 });
  };

  // Apply theme & document title & browser favicon from siteConfig
  useEffect(() => {
    if (isAdminMode) {
      document.title = 'Control Panel | Multi-Website Admin';
      return;
    }
    if (siteConfig.theme) {
      const root = document.documentElement;
      if (siteConfig.theme.primaryNavy) root.style.setProperty('--primary-navy', siteConfig.theme.primaryNavy);
      if (siteConfig.theme.secondaryTeal) root.style.setProperty('--secondary-teal', siteConfig.theme.secondaryTeal);
      const accent = siteConfig.theme.accentTeal || siteConfig.theme.accentGold;
      if (accent) {
        root.style.setProperty('--accent-teal', accent);
      }
      if (siteConfig.theme.accentHover) {
        root.style.setProperty('--accent-teal-hover', siteConfig.theme.accentHover);
      }
      if (siteConfig.theme.bgLight) {
        root.style.setProperty('--bg-light', siteConfig.theme.bgLight);
      }
    }
    if (siteConfig.companyName) {
      document.title = siteConfig.companyName + (siteConfig.tagline ? ' | ' + siteConfig.tagline : '');
    }
    const faviconLink = document.querySelector("link[rel*='icon']");
    if (faviconLink && siteConfig.logo) {
      faviconLink.href = siteConfig.logo;
    }
  }, [siteConfig, isAdminMode]);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('atc_cart', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  // Lock body scroll and allow Escape key when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setMobileMenuOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  // Filter & sort products
  const filteredProducts = products.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.priceNumeric - b.priceNumeric;
    if (sortBy === 'price-high') return b.priceNumeric - a.priceNumeric;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'latest') return b.id - a.id;
    return 0;
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const addToCart = (product, qty = 1, openDrawer = true) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { product, quantity: qty }];
    });
    showToast(`Added ${qty}x ${product.name} to cart!`);
    if (openDrawer) {
      setCartOpen(true);
    }
  };

  const updateCartQuantity = (productId, delta) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.product.priceNumeric * item.quantity), 0);

  const viewProductDetail = (product) => {
    setActiveProduct(product);
    setDetailQuantity(1);
    setActiveDetailTab('description');
    setActiveTab('product-detail');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenQuote = (product) => {
    setSelectedProduct(product);
    setModalType('quote');
    setFormSubmitted(false);
  };

  const handleOpenPartner = (type = 'partner') => {
    setModalType(type);
    setFormSubmitted(false);
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedProduct(null);
    setFormSubmitted(false);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSuccess(true);
      setTimeout(() => setNewsletterSuccess(false), 4000);
      setNewsletterEmail('');
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const navigateTo = (tabName, categoryId = null) => {
    setActiveTab(tabName);
    if (categoryId) {
      setSelectedCategory(categoryId);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId);
    if (activeTab !== 'home') {
      setActiveTab('home');
    }
    setMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById('featured-products-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  if (isAdminMode) {
    return <AdminPanel onExitAdmin={exitAdmin} />;
  }

  return (
    <div className="min-h-screen bg-[#f5f7f9] text-[#1e293b]">
      {/* 2-TIER MODERN STICKY HEADER */}
      <header className="site-header">
        {/* UPPER TIER: MAIN NAVIGATION */}
        <div className="main-nav">
          <div className="nav-brand" onClick={() => navigateTo('home')} style={{ cursor: 'pointer' }}>
            <img src={siteConfig.logo || logoImg} alt={`${siteConfig.companyName} Logo`} className="brand-logo-img" />
            <div>
              <div className="brand-title">{siteConfig.shortName || siteConfig.companyName}</div>
              <div className="brand-subtitle">{siteConfig.tagline}</div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav">
            <ul className="nav-links">
              <li>
                <button 
                  className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
                  onClick={() => navigateTo('home')}
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  className={`nav-link ${activeTab === 'about' ? 'active' : ''}`}
                  onClick={() => navigateTo('about')}
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  className={`nav-link ${activeTab === 'business' ? 'active' : ''}`}
                  onClick={() => navigateTo('business')}
                >
                  Our Services
                </button>
              </li>
              <li>
                <button 
                  className={`nav-link ${activeTab === 'partnerships' ? 'active' : ''}`}
                  onClick={() => navigateTo('partnerships')}
                >
                  Wholesale Partnerships
                </button>
              </li>
              <li>
                <button 
                  className={`nav-link ${activeTab === 'supplier' ? 'active' : ''}`}
                  onClick={() => navigateTo('supplier')}
                >
                  Supplier Inquiries
                </button>
              </li>
              <li>
                <button 
                  className={`nav-link ${activeTab === 'contact' ? 'active' : ''}`}
                  onClick={() => navigateTo('contact')}
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </nav>

          {/* Header Action Buttons */}
          <div className="nav-actions">
            <button 
              className="btn-nav-cart"
              onClick={() => setCartOpen(true)}
              aria-label="Open Shopping Cart"
            >
              <ShoppingCart size={18} />
              <span className="nav-cart-text">Cart</span>
              {totalCartItems > 0 && (
                <span className="nav-cart-badge">{totalCartItems}</span>
              )}
            </button>

            <button 
              className="btn-nav-partner"
              onClick={() => handleOpenPartner('partner')}
            >
              <span className="btn-partner-text">Partner Today</span>
              <ArrowRight size={15} className="btn-partner-icon" />
            </button>

            <button 
              className={`mobile-toggle-btn ${mobileMenuOpen ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} /> : <MenuIcon size={20} />}
            </button>
          </div>
        </div>

        {/* LOWER TIER: THE BLUE LINE (PRODUCTS & CATEGORIES BAR) */}
        <div className="products-blue-bar">
          <div className="blue-bar-content">
            {/* All Products master pill */}
            <div className="blue-bar-categories">
              <button 
                className={`blue-cat-btn all-cat-btn ${selectedCategory === 'all' && activeTab === 'home' ? 'active' : ''}`}
                onClick={() => handleCategoryClick('all')}
              >
                <LayoutGrid size={15} />
                <span>All Products</span>
                <span className="blue-count-pill">{products.length}</span>
              </button>

              <div className="blue-bar-divider"></div>

              {/* Individual Product Categories in the Blue Line */}
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id && activeTab === 'home';
                return (
                  <button
                    key={cat.id}
                    className={`blue-cat-btn ${isActive ? 'active' : ''}`}
                    onClick={() => handleCategoryClick(cat.id)}
                  >
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Right side quick contact & direct trading desk info */}
            <div className="blue-bar-perks">
              <span className="blue-perk-item">
                <Truck size={14} />
                <span>Fast Global Dispatch</span>
              </span>
              <span className="blue-perk-divider">•</span>
              <a href={`tel:${siteConfig.phonePrimaryTel}`} className="blue-perk-phone">
                <Phone size={13} />
                <span>{siteConfig.phonePrimary}</span>
              </a>
            </div>
          </div>
        </div>

        {/* MOBILE MENU ACCORDION / DRAWER INSIDE HEADER FOR ACCURATE POSITIONING */}
        {mobileMenuOpen && (
          <>
            <div 
              className="mobile-nav-backdrop" 
              onClick={() => setMobileMenuOpen(false)} 
              aria-hidden="true"
            />
            <div className="mobile-nav-drawer" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
              {/* Quick actions top bar inside drawer */}
              <div className="mobile-drawer-quick-row">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setCartOpen(true);
                  }}
                  className="mobile-cart-btn"
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ShoppingCart size={18} />
                    <span>Wholesale Cart</span>
                  </span>
                  <span className="nav-cart-badge">{totalCartItems}</span>
                </button>

                <a href={`tel:${siteConfig.phonePrimaryTel}`} className="mobile-quick-call-btn">
                  <Phone size={16} />
                  <span>Call Desk</span>
                </a>
              </div>

              <div className="mobile-drawer-section">
                <div className="mobile-section-label">Main Navigation</div>
                {[
                  { key: 'home', label: 'Home' },
                  { key: 'about', label: 'About Us' },
                  { key: 'business', label: 'Our Services' },
                  { key: 'partnerships', label: 'Wholesale Partnerships' },
                  { key: 'supplier', label: 'Supplier Inquiries' },
                  { key: 'contact', label: 'Contact Us' }
                ].map(item => (
                  <button
                    key={item.key}
                    onClick={() => navigateTo(item.key)}
                    className={`mobile-nav-link ${activeTab === item.key ? 'active' : ''}`}
                  >
                    <span>{item.label}</span>
                    <ArrowRight size={14} className="mobile-link-arrow" />
                  </button>
                ))}
              </div>

              <div className="mobile-drawer-section">
                <div className="mobile-section-label">Browse by Category</div>
                <div className="mobile-cat-grid">
                  <button
                    onClick={() => handleCategoryClick('all')}
                    className={`mobile-cat-chip ${selectedCategory === 'all' && activeTab === 'home' ? 'active' : ''}`}
                  >
                    <LayoutGrid size={14} />
                    <span>All ({products.length})</span>
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryClick(cat.id)}
                      className={`mobile-cat-chip ${selectedCategory === cat.id && activeTab === 'home' ? 'active' : ''}`}
                    >
                      <span>{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Direct Help / Info strip */}
              <div className="mobile-drawer-info">
                <div className="mobile-info-item">
                  <Mail size={14} color="var(--accent-teal)" />
                  <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
                </div>
                <div className="mobile-info-item">
                  <MapPin size={14} color="var(--accent-teal)" />
                  <span>{siteConfig.address?.line2 || 'Sheridan, WY'} • {siteConfig.companyName}</span>
                </div>
              </div>

              <div className="mobile-drawer-footer">
                <button 
                  className="btn-hero-primary"
                  style={{ width: '100%', justifyContent: 'center', padding: '14px 20px', fontSize: '0.96rem' }}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleOpenPartner('partner');
                  }}
                >
                  Partner Today With Us
                </button>
              </div>
            </div>
          </>
        )}
      </header>

      {/* VIEW: HOME PAGE */}
      {activeTab === 'home' && (
        <main>
          {/* EXACT HERO SECTION REPLICATING SCREENSHOT */}
          <section className="hero-section">
            <div className="hero-overlay"></div>
            <div className="hero-container">
              <div className="hero-content">
                <div className="hero-pretitle">{siteConfig.companyName}</div>
                <h1 className="hero-title">{siteConfig.heroTitle || siteConfig.tagline}</h1>
                <p className="hero-description">
                  {siteConfig.heroSubtitle} Direct commercial inquiries: {siteConfig.phoneDirect} or {siteConfig.email}.
                </p>
                <div className="hero-actions">
                  <button 
                    className="btn-hero-primary"
                    onClick={() => {
                      const el = document.getElementById('categories-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    View Categories
                  </button>
                  <button 
                    className="btn-hero-outline"
                    onClick={() => handleOpenPartner('partner')}
                  >
                    Partner Today
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* EXACT "SHOP BY CATEGORY" & "Product Categories" SECTION */}
          <section id="categories-section" className="section-wrapper">
            <div className="section-header-center">
              <span className="section-tag">SHOP BY CATEGORY</span>
              <h2 className="section-title">Product Categories</h2>
            </div>

            {/* 3 Main Highlighted Categories matching the screenshot cards */}
            <div className="categories-grid">
              {categories.slice(0, 3).map((cat) => (
                <div 
                  key={cat.id} 
                  className="category-card"
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    const el = document.getElementById('featured-products-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="category-card-img" 
                    loading="lazy"
                  />
                  <div className="category-card-overlay">
                    <h3 className="category-title">{cat.name}</h3>
                    <p className="category-desc">{cat.description}</p>
                    <button 
                      className="btn-category-pill"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (cat.buttonText === 'Partner With Us') {
                          handleOpenPartner('partner');
                        } else {
                          setSelectedCategory(cat.id);
                          const el = document.getElementById('featured-products-section');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                    >
                      {cat.buttonText}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* EXACT "Featured Products" SECTION WITH 5 AUTHENTIC LIVE PRODUCTS */}
          <section id="featured-products-section" className="section-wrapper" style={{ paddingTop: '20px' }}>
            <div className="section-header-center">
              <span className="section-tag">OFFICIAL STORE CATALOG</span>
              <h2 className="section-title">Featured Products</h2>
            </div>

            {/* Category Filter Tabs */}
            <div className="filter-tabs">
              <button 
                className={`filter-tab ${selectedCategory === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('all')}
              >
                All Products ({products.length})
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  className={`filter-tab ${selectedCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Controls Bar: Search + Sorting */}
            <div className="catalog-toolbar">
              <div className="search-container">
                <Search className="search-icon" size={18} />
                <input
                  type="text"
                  placeholder="Search products by title, SKU, or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>

              <div className="sorting-container">
                <span className="results-count-text">
                  Showing all {filteredProducts.length} results
                </span>
                <select 
                  className="sorting-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  aria-label="Sort products"
                >
                  <option value="default">Default sorting</option>
                  <option value="popularity">Sort by popularity</option>
                  <option value="rating">Sort by average rating</option>
                  <option value="latest">Sort by latest</option>
                  <option value="price-low">Sort by price: low to high</option>
                  <option value="price-high">Sort by price: high to low</option>
                </select>
              </div>
            </div>

            {/* Products Grid with 5 Exact Products */}
            <div className="products-grid">
              {filteredProducts.map((prod) => (
                <div key={prod.id} className="product-card">
                  <div 
                    className="product-img-wrap"
                    onClick={() => viewProductDetail(prod)}
                    style={{ cursor: 'pointer' }}
                  >
                    <img src={prod.image} alt={prod.name} className="product-img" loading="lazy" />
                    <span className="product-badge">{prod.categoryName}</span>
                  </div>
                  <div className="product-body">
                    <div className="product-header-row">
                      <span className="product-sku">SKU: {prod.sku}</span>
                      <span className="stock-tag">● {prod.availability}</span>
                    </div>
                    
                    <h3 className="product-title">
                      <button 
                        onClick={() => viewProductDetail(prod)}
                        className="product-title-btn"
                      >
                        {prod.name}
                      </button>
                    </h3>

                    <div className="product-price-box">
                      <span className="product-price-val">{prod.price}</span>
                      <span className="product-price-sub">Wholesale Tiered</span>
                    </div>

                    <p className="product-excerpt">{prod.description}</p>

                    <div className="product-actions-row">
                      <button 
                        className="btn-add-cart"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(prod, 1, true);
                        }}
                      >
                        <ShoppingCart size={15} />
                        <span>Add to cart</span>
                      </button>
                      <button 
                        className="btn-view-details"
                        onClick={(e) => {
                          e.stopPropagation();
                          viewProductDetail(prod);
                        }}
                        title="View Full Specifications & Details"
                      >
                        <Eye size={15} />
                        <span>View Details</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff', borderRadius: '16px' }}>
                <p style={{ fontSize: '1.1rem', color: '#64748b' }}>No products match your search or filter.</p>
                <button 
                  onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                  style={{ marginTop: '12px', background: '#1e7087', color: '#fff', padding: '8px 20px', borderRadius: '20px', border: 'none', cursor: 'pointer' }}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </section>

          {/* AUTHENTIC CORPORATE PROFILE & DIRECT TRADING DESK (ANTI-AI REDESIGN) */}
          <section className="corporate-profile-section">
            <div className="corporate-profile-container">
              
              {/* Left Column: Official Corporate Ledger & Credentials */}
              <div className="corporate-credentials-col">
                <div className="corp-section-eyebrow">
                  <span className="corp-dot"></span>
                  CORPORATE ENTITY & GLOBAL DISTRIBUTION INFRASTRUCTURE
                </div>
                
                <h2 className="corp-headline">
                  Dedicated to Excellence in Global Trade & Distribution
                </h2>
                
                <p className="corp-lead-text">
                  {siteConfig.ownerName ? <>Owned and directed by <strong>{siteConfig.ownerName}</strong>, </> : null}<strong>{siteConfig.legalName || siteConfig.companyName}</strong> is a registered commercial wholesale and global trade enterprise headquartered in {siteConfig.address?.cityStateZip || 'Sheridan, WY, USA'}. We bridge verified manufacturers and international brand sources with retail chains, regional distributors, and institutional organizations worldwide.
                </p>

                <div className="corp-actions-row">
                  <button 
                    className="btn-corp-primary"
                    onClick={() => navigateTo('about')}
                  >
                    <span>Read Company Overview</span>
                    <ArrowRight size={16} />
                  </button>
                  <button 
                    className="btn-corp-outline"
                    onClick={() => navigateTo('business')}
                  >
                    <span>Our Business Model</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Executive Trading & Procurement Desk */}
              <div className="corporate-trade-desk">
                <div className="trade-desk-badge-strip">
                  <span className="trade-desk-status">
                    <span className="pulse-indicator"></span> Direct Trading Desk Active
                  </span>
                  <span className="trade-desk-id">{siteConfig.address?.jurisdiction || 'Wyoming LLC #68479'}</span>
                </div>

                <h3 className="trade-desk-title">Wholesale Inquiries & Quotes</h3>
                
                <p className="trade-desk-desc">
                  Connect with our executive trading desk for custom pricing quotes, catalog distribution, or supplier collaboration.
                </p>

                <div className="trade-desk-contacts">
                  {/* 1. Company Name */}
                  <div className="trade-contact-item static">
                    <div className="contact-icon-box">
                      <Building2 size={18} />
                    </div>
                    <div className="contact-details">
                      <span className="contact-role">Company Name</span>
                      <strong className="contact-val">{siteConfig.companyName}</strong>
                    </div>
                  </div>

                  {/* 2. Phone Number */}
                  <a href={`tel:${(siteConfig.phoneDirect || '').replace(/[^+\d]/g, '')}`} className="trade-contact-item">
                    <div className="contact-icon-box">
                      <Phone size={18} />
                    </div>
                    <div className="contact-details">
                      <span className="contact-role">Phone Number</span>
                      <strong className="contact-val">{siteConfig.phoneDirect}</strong>
                    </div>
                  </a>

                  {/* 3. WhatsApp Number */}
                  <a href={`https://wa.me/${(siteConfig.whatsappNumber || '').replace(/[^\d]/g, '')}`} target="_blank" rel="noreferrer" className="trade-contact-item">
                    <div className="contact-icon-box">
                      <MessageSquare size={18} />
                    </div>
                    <div className="contact-details">
                      <span className="contact-role">WhatsApp Number</span>
                      <strong className="contact-val">{siteConfig.whatsappDisplay || siteConfig.phoneDirect}</strong>
                    </div>
                  </a>

                  {/* 4. Email Address */}
                  <a href={`mailto:${siteConfig.email}`} className="trade-contact-item">
                    <div className="contact-icon-box">
                      <Mail size={18} />
                    </div>
                    <div className="contact-details">
                      <span className="contact-role">Email Address</span>
                      <strong className="contact-val">{siteConfig.email}</strong>
                    </div>
                  </a>

                  {/* 5. Address */}
                  <div className="trade-contact-item static">
                    <div className="contact-icon-box">
                      <MapPin size={18} />
                    </div>
                    <div className="contact-details">
                      <span className="contact-role">Registered Address</span>
                      <strong className="contact-val">{siteConfig.address?.line1} {siteConfig.address?.line2}</strong>
                      <span className="contact-note">USA & Global Distribution Facility</span>
                    </div>
                  </div>

                  {/* 6. Official Website */}
                  <a href={siteConfig.footer?.websiteUrl || `https://${siteConfig.website}`} target="_blank" rel="noreferrer" className="trade-contact-item">
                    <div className="contact-icon-box">
                      <Globe size={18} />
                    </div>
                    <div className="contact-details">
                      <span className="contact-role">Official Website</span>
                      <strong className="contact-val">{siteConfig.website}</strong>
                    </div>
                  </a>
                </div>

                <div className="trade-desk-cta-group">
                  <a 
                    href={`https://wa.me/${(siteConfig.whatsappNumber || '').replace(/[^\d]/g, '')}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="btn-trade-whatsapp"
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M12.031 2C6.494 2 2 6.494 2 12.031c0 1.95.558 3.771 1.523 5.319L2.094 22l4.802-1.408a10.02 10.02 0 0 0 5.135 1.44c5.537 0 10.031-4.494 10.031-10.031S17.568 2 12.031 2zm5.727 14.152c-.24.673-1.393 1.282-1.922 1.346-.51.063-1.168.089-3.743-.977-3.136-1.298-5.14-4.524-5.297-4.733-.153-.209-1.264-1.684-1.264-3.213s.801-2.28 1.086-2.585c.285-.306.621-.382.828-.382.207 0 .414.002.595.011.192.01.448-.073.701.536.262.632.894 2.181.972 2.34.078.158.13.344.026.552-.104.209-.156.338-.311.52-.156.182-.328.406-.468.545-.156.155-.319.324-.137.636.182.312.81 1.336 1.737 2.161 1.192 1.062 2.196 1.391 2.508 1.547.312.156.494.13.676-.078.182-.208.78-.909.988-1.221.208-.312.416-.26.697-.156.281.104 1.79.845 2.099 1 .309.155.515.234.59.364.075.13.075.754-.165 1.427z"/>
                    </svg>
                    <span>Chat on WhatsApp</span>
                  </a>
                  <button 
                    onClick={() => handleOpenPartner('partner')}
                    className="btn-trade-rfq"
                  >
                    <span>Submit RFQ Form</span>
                  </button>
                </div>
              </div>

            </div>
          </section>
        </main>
      )}

      {/* VIEW: PRODUCT DETAIL PAGE */}
      {activeTab === 'product-detail' && activeProduct && (
        <div className="product-detail-page">
          <div className="detail-container">
            
            {/* Top Breadcrumbs & Back Button */}
            <div className="detail-top-nav">
              <button 
                className="btn-back-catalog" 
                onClick={() => navigateTo('home')}
              >
                <ArrowLeft size={16} />
                <span>Back to Wholesale Catalog</span>
              </button>
              <div className="detail-breadcrumbs">
                <span onClick={() => navigateTo('home')} className="crumb-link">Home</span>
                <span className="crumb-sep">/</span>
                <span 
                  onClick={() => { setSelectedCategory(activeProduct.category); navigateTo('home'); }} 
                  className="crumb-link"
                >
                  {activeProduct.categoryName}
                </span>
                <span className="crumb-sep">/</span>
                <span className="crumb-current">{activeProduct.name}</span>
              </div>
            </div>

            {/* Main Product Showcase Grid */}
            <div className="detail-showcase-grid">
              
              {/* Left Column: Visual Showcase & Quality Badges */}
              <div className="detail-gallery-col">
                <div className="detail-img-card">
                  <img 
                    src={activeProduct.image} 
                    alt={activeProduct.name} 
                    className="detail-hero-img" 
                  />
                  <div className="detail-badge-float">{activeProduct.categoryName}</div>
                  <div className="detail-verified-badge">
                    <ShieldCheck size={16} />
                    <span>100% Genuine Wholesale Batch</span>
                  </div>
                </div>

                {/* Quality & Assurance Badges */}
                <div className="detail-assurance-strip">
                  <div className="assurance-item">
                    <Truck size={18} className="assurance-icon" />
                    <div>
                      <strong>Fast B2B Dispatch</strong>
                      <span>{siteConfig.hubs?.originText || 'Dispatched via Sheridan, WY & KSA Trade Hubs'}</span>
                    </div>
                  </div>
                  <div className="assurance-item">
                    <Award size={18} className="assurance-icon" />
                    <div>
                      <strong>Quality Inspected</strong>
                      <span>Verified under {siteConfig.ownerName || siteConfig.companyName} management</span>
                    </div>
                  </div>
                  <div className="assurance-item">
                    <Building2 size={18} className="assurance-icon" />
                    <div>
                      <strong>Registered Wholesale Entity</strong>
                      <span>Official {siteConfig.address?.jurisdiction || 'Wyoming LLC #68479'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Commercial Product Information & Add to Cart */}
              <div className="detail-info-col">
                <div className="detail-meta-row">
                  <span className="detail-sku-badge">SKU: {activeProduct.sku}</span>
                  <span className="detail-stock-badge">
                    <span className="stock-pulsing-dot"></span>
                    {activeProduct.availability} ({activeProduct.stockUnits?.toLocaleString() || '1,000+'} units available)
                  </span>
                </div>

                <h1 className="detail-product-title">{activeProduct.name}</h1>

                <div className="detail-reviews-row">
                  <div className="star-rating">★★★★★</div>
                  <span className="rating-score">{activeProduct.rating}</span>
                  <span className="review-count">({activeProduct.reviewCount || 35} verified B2B partner reviews)</span>
                </div>

                <div className="detail-price-panel">
                  <div className="detail-price-row">
                    <div className="detail-unit-price">
                      <span className="price-currency">{activeProduct.price}</span>
                      <span className="price-per">/ unit</span>
                    </div>
                    <div className="detail-price-note">
                      <span className="tax-tag">Wholesale Net</span>
                      <span>{activeProduct.priceNote}</span>
                    </div>
                  </div>
                  <div className="detail-moq-row">
                    <span>Minimum Wholesale Order (MOQ):</span>
                    <strong>{activeProduct.minOrder}</strong>
                  </div>
                </div>

                {/* Wholesale Volume Tier Table */}
                {activeProduct.tiers && activeProduct.tiers.length > 0 && (
                  <div className="wholesale-tiers-box">
                    <div className="tiers-title">Wholesale Volume Pricing Tiers:</div>
                    <div className="tiers-grid">
                      {activeProduct.tiers.map((tier, idx) => (
                        <div key={idx} className="tier-card">
                          <div className="tier-qty">{tier.range}</div>
                          <div className="tier-price">{tier.price} <small>/ unit</small></div>
                          <div className="tier-discount">{tier.discount}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <p className="detail-lead-summary">{activeProduct.description}</p>

                {/* Key Features Bullet Points */}
                {activeProduct.features && (
                  <div className="detail-features-box">
                    <h3 className="features-title">Product Highlights:</h3>
                    <ul className="features-list">
                      {activeProduct.features.map((feat, idx) => (
                        <li key={idx}>
                          <Check size={16} className="feature-check" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Purchase & Cart Actions */}
                <div className="detail-purchase-panel">
                  <div className="qty-row">
                    <label className="qty-label">Wholesale Quantity:</label>
                    <div className="qty-stepper">
                      <button 
                        type="button" 
                        className="stepper-btn"
                        onClick={() => setDetailQuantity(q => Math.max(1, q - 1))}
                      >
                        <Minus size={16} />
                      </button>
                      <input 
                        type="number" 
                        min="1" 
                        value={detailQuantity} 
                        onChange={(e) => setDetailQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="stepper-input"
                      />
                      <button 
                        type="button" 
                        className="stepper-btn"
                        onClick={() => setDetailQuantity(q => q + 1)}
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <div className="subtotal-preview">
                      Subtotal: <strong>${(activeProduct.priceNumeric * detailQuantity).toLocaleString()}</strong>
                    </div>
                  </div>

                  <div className="detail-actions-grid">
                    <button 
                      className="btn-detail-add-cart"
                      onClick={() => addToCart(activeProduct, detailQuantity, true)}
                    >
                      <ShoppingCart size={18} />
                      <span>Add to Cart ({detailQuantity} Units)</span>
                    </button>

                    <a 
                      href={`https://wa.me/${(siteConfig.whatsappNumber || '').replace(/[^\d]/g, '')}?text=${encodeURIComponent(`Hello ${siteConfig.ownerName || siteConfig.companyName}, I want to order ${detailQuantity}x ${activeProduct.name} (SKU: ${activeProduct.sku}, Total: $${(activeProduct.priceNumeric * detailQuantity).toLocaleString()}) from ${siteConfig.companyName}.`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-detail-whatsapp"
                    >
                      <MessageSquare size={18} />
                      <span>WhatsApp Direct Order</span>
                    </a>
                  </div>

                  <div className="detail-secondary-actions">
                    <button 
                      className="btn-detail-rfq"
                      onClick={() => handleOpenQuote(activeProduct)}
                    >
                      <span>Request Formal Wholesale Quote / Invoice</span>
                    </button>
                  </div>
                </div>

                {/* Contact Help Strip */}
                <div className="detail-help-strip">
                  <span>Questions about bulk orders?</span>
                  <a href={`tel:${(siteConfig.phoneDirect || '').replace(/[^+\d]/g, '')}`} className="help-link">
                    <Phone size={14} /> {siteConfig.phoneDirect}
                  </a>
                  <span className="sep">•</span>
                  <a href={`mailto:${siteConfig.email}`} className="help-link">
                    <Mail size={14} /> {siteConfig.email}
                  </a>
                </div>

              </div>
            </div>

            {/* Tabbed Detailed Specifications */}
            <div className="detail-tabs-section">
              <div className="detail-tabs-header">
                <button 
                  className={`detail-tab-btn ${activeDetailTab === 'description' ? 'active' : ''}`}
                  onClick={() => setActiveDetailTab('description')}
                >
                  Product Details & Overview
                </button>
                <button 
                  className={`detail-tab-btn ${activeDetailTab === 'specs' ? 'active' : ''}`}
                  onClick={() => setActiveDetailTab('specs')}
                >
                  Technical Specifications & Packaging
                </button>
                <button 
                  className={`detail-tab-btn ${activeDetailTab === 'shipping' ? 'active' : ''}`}
                  onClick={() => setActiveDetailTab('shipping')}
                >
                  Wholesale Logistics & Terms
                </button>
              </div>

              <div className="detail-tab-content">
                {activeDetailTab === 'description' && (
                  <div className="tab-pane">
                    <h3 className="tab-title">Product Description</h3>
                    <p className="tab-lead-text">{activeProduct.longDescription || activeProduct.description}</p>
                    <div className="tab-features-grid">
                      <div className="tab-feature-card">
                        <h4>Commercial Quality Standard</h4>
                        <p>Specially manufactured and selected for sustained commercial and retail performance, offering high durability and verified consumer satisfaction.</p>
                      </div>
                      <div className="tab-feature-card">
                        <h4>Packaging & Presentation</h4>
                        <p>All units come in shelf-ready retail packaging with standard barcoding, regulatory ingredient/material markings, and protective outer wrap.</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeDetailTab === 'specs' && (
                  <div className="tab-pane">
                    <h3 className="tab-title">Technical Specifications & Dimensions</h3>
                    {activeProduct.specs && activeProduct.specs.length > 0 ? (
                      <table className="specs-table">
                        <tbody>
                          {activeProduct.specs.map((item, idx) => (
                            <tr key={idx}>
                              <td className="spec-label">{item.label}</td>
                              <td className="spec-value">{item.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p>Standard export specifications apply. Contact our desk for complete COA / spec sheets.</p>
                    )}
                  </div>
                )}

                {activeDetailTab === 'shipping' && (
                  <div className="tab-pane">
                    <h3 className="tab-title">Wholesale Logistics & Dispatch Terms</h3>
                    <div className="shipping-info-grid">
                      <div className="ship-card">
                        <h4>Order Processing & Lead Time</h4>
                        <p>Orders are dispatched within 24 to 48 business hours upon confirmation. Tracking numbers and freight waybills are provided immediately.</p>
                      </div>
                      <div className="ship-card">
                        <h4>Shipping Hubs & Carriers</h4>
                        <p>{siteConfig.hubs?.dispatchNote || 'Dispatched from our primary registered facilities at Sheridan, Wyoming (US domestic & North America) and our Middle East trade hub in KSA.'}</p>
                      </div>
                      <div className="ship-card">
                        <h4>Pallet & Container Loads</h4>
                        <p>Full Container Load (FCL) and Less than Container Load (LCL) consolidation available for cross-border wholesale buyers.</p>
                      </div>
                      <div className="ship-card">
                        <h4>Payment Methods</h4>
                        <p>We accept Wire Transfer (T/T), Commercial ACH, Letter of Credit (LC for qualifying volumes), and verified bank deposits.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Related Products Strip */}
            <div className="detail-related-section">
              <div className="related-header">
                <span className="section-tag">CATALOG ASSORTMENT</span>
                <h2 className="related-title">Other Products from {siteConfig.shortName || siteConfig.companyName}</h2>
              </div>

              <div className="products-grid">
                {products.filter(p => p.id !== activeProduct.id).map(prod => (
                  <div 
                    key={prod.id} 
                    className="product-card" 
                    onClick={() => viewProductDetail(prod)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="product-img-wrap">
                      <img src={prod.image} alt={prod.name} className="product-img" loading="lazy" />
                      <span className="product-badge">{prod.categoryName}</span>
                    </div>
                    <div className="product-body">
                      <div className="product-header-row">
                        <span className="product-sku">SKU: {prod.sku}</span>
                        <span className="stock-tag">● {prod.availability}</span>
                      </div>
                      <h3 className="product-title">
                        <button 
                          onClick={(e) => { e.stopPropagation(); viewProductDetail(prod); }}
                          className="product-title-btn"
                        >
                          {prod.name}
                        </button>
                      </h3>
                      <div className="product-price-box">
                        <span className="product-price-val">{prod.price}</span>
                        <span className="product-price-sub">Wholesale Tiered</span>
                      </div>
                      <p className="product-excerpt">{prod.description}</p>
                      <div className="product-actions-row">
                        <button 
                          className="btn-add-cart"
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(prod, 1, true);
                          }}
                        >
                          <ShoppingCart size={15} />
                          <span>Add to cart</span>
                        </button>
                        <button 
                          className="btn-view-details"
                          onClick={(e) => {
                            e.stopPropagation();
                            viewProductDetail(prod);
                          }}
                        >
                          <Eye size={15} />
                          <span>View Details</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* VIEW: ABOUT US */}
      {activeTab === 'about' && (
        <div className="section-wrapper" style={{ padding: '60px 24px' }}>
          <div style={{ maxWidth: '850px', margin: '0 auto', background: '#fff', padding: '48px', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <span className="section-tag">COMPANY OVERVIEW</span>
            <h1 className="section-title" style={{ marginBottom: '20px' }}>About {siteConfig.companyName}</h1>
            <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.8, marginBottom: '20px' }}>
              <strong>{siteConfig.legalName || siteConfig.companyName}</strong>{siteConfig.ownerName ? <> is owned and managed by <strong>{siteConfig.ownerName}</strong>, operating</> : ' operates'} from our registered headquarters at <strong>{siteConfig.address?.full || `${siteConfig.address?.line1} ${siteConfig.address?.line2}`}</strong>. Our mission is to bridge the gap between quality manufacturers and businesses across retail, hospitality, industrial sectors, and e-commerce distribution channels.
            </p>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.8, marginBottom: '20px' }}>
              We pride ourselves on thoughtful sourcing — choosing products that deliver genuine performance, high customer satisfaction, and dependable margin structure for our wholesale partners worldwide.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', margin: '36px 0' }}>
              <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ color: '#102a3a', fontSize: '1.1rem', marginBottom: '8px' }}>Integrity First</h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Transparent pricing, transparent communication, and authentic certificates of analysis.</p>
              </div>
              <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ color: '#102a3a', fontSize: '1.1rem', marginBottom: '8px' }}>Logistics Agility</h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Fast customs turnaround, reliable carrier contracts, and multi-hub fulfillment.</p>
              </div>
              <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ color: '#102a3a', fontSize: '1.1rem', marginBottom: '8px' }}>Partner Centric</h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Dedicated account managers ready to accommodate special pack sizes and schedules.</p>
              </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '30px' }}>
              <button className="btn-hero-primary" onClick={() => navigateTo('contact')}>
                Contact Management Desk
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: OUR BUSINESS */}
      {activeTab === 'business' && (
        <div className="section-wrapper" style={{ padding: '60px 24px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div className="section-header-center">
              <span className="section-tag">CAPABILITIES & OPERATIONS</span>
              <h1 className="section-title">Our Business Model</h1>
              <p style={{ color: '#64748b', maxWidth: '650px', margin: '12px auto 0' }}>
                Supplying verified retail and commercial sectors through streamlined supply chains and B2B excellence.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginTop: '40px' }}>
              <div style={{ background: '#fff', padding: '30px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
                <div style={{ color: '#1e7087', marginBottom: '14px' }}><Layers size={36} /></div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>Wholesale Distribution</h3>
                <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: 1.6 }}>
                  Direct supply of Everyday Essentials, Personal Care, and Household products to retail chains, convenience stores, and e-commerce merchants.
                </p>
              </div>
              <div style={{ background: '#fff', padding: '30px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
                <div style={{ color: '#1e7087', marginBottom: '14px' }}><Truck size={36} /></div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>Import & Export</h3>
                <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: 1.6 }}>
                  International trade routes connecting high-demand markets with premier suppliers across North America, the Middle East, and Asia.
                </p>
              </div>
              <div style={{ background: '#fff', padding: '30px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
                <div style={{ color: '#1e7087', marginBottom: '14px' }}><Building2 size={36} /></div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>Commercial Procurement</h3>
                <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: 1.6 }}>
                  Specialized contracts for offices, hotels, cleaning service companies, and institutional facilities requiring continuous recurring supplies.
                </p>
              </div>
            </div>

            <div style={{ marginTop: '40px', background: '#102a3a', color: '#fff', padding: '36px', borderRadius: '20px', textAlign: 'center' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '12px' }}>Ready to Scale Your Inventory?</h2>
              <p style={{ color: '#cbd5e1', maxWidth: '600px', margin: '0 auto 24px' }}>
                Let us build a customized supply plan tailored to your volume requirements and distribution schedule.
              </p>
              <button className="btn-hero-primary" onClick={() => handleOpenPartner('partner')}>
                Inquire For Wholesale Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: PRODUCT CATEGORIES */}
      {activeTab === 'categories' && (
        <div className="section-wrapper" style={{ padding: '60px 24px' }}>
          <div className="section-header-center">
            <span className="section-tag">CATALOG OVERVIEW</span>
            <h1 className="section-title">All Product Categories</h1>
            <p style={{ color: '#64748b', maxWidth: '600px', margin: '10px auto 0' }}>
              Explore our core catalog sectors thoughtfully curated for reliable turnover and high quality.
            </p>
          </div>

          <div className="categories-grid" style={{ marginBottom: '50px' }}>
            {categories.map((cat) => (
              <div 
                key={cat.id} 
                className="category-card"
                onClick={() => {
                  setSelectedCategory(cat.id);
                  navigateTo('home');
                  setTimeout(() => {
                    const el = document.getElementById('featured-products-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
              >
                <img src={cat.image} alt={cat.name} className="category-card-img" />
                <div className="category-card-overlay">
                  <h3 className="category-title">{cat.name}</h3>
                  <p className="category-desc">{cat.description}</p>
                  <button className="btn-category-pill">
                    {cat.buttonText}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW: WHOLESALE PARTNERSHIPS */}
      {activeTab === 'partnerships' && (
        <div className="section-wrapper" style={{ padding: '60px 24px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', background: '#fff', padding: '40px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
            <span className="section-tag">EXPAND WITH US</span>
            <h1 className="section-title" style={{ marginBottom: '16px' }}>Wholesale Partnerships</h1>
            <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.7, marginBottom: '24px' }}>
              Whether you are an independent supermarket, a chain retailer, or an online merchant, {siteConfig.legalName || siteConfig.companyName} provides flexible minimums, volume price tiers, and dependable fulfillment.
            </p>

            <form onSubmit={handleFormSubmit} className="modal-form">
              <div className="form-row-2col">
                <div className="form-group">
                  <label className="form-label">Contact Name *</label>
                  <input type="text" required placeholder="Your full name" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Company / Business Name *</label>
                  <input type="text" required placeholder="Business entity name" className="form-input" />
                </div>
              </div>
              <div className="form-row-2col">
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input type="email" required placeholder="business@example.com" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input type="tel" required placeholder={siteConfig.phoneDirect} className="form-input" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Business Type</label>
                <select className="form-select">
                  <option>Brick & Mortar Retailer</option>
                  <option>E-commerce / Marketplace Seller</option>
                  <option>Regional Distributor</option>
                  <option>Institutional / Facility Buyer</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Estimated Monthly Purchase Volume</label>
                <select className="form-select">
                  <option>$5,000 - $25,000</option>
                  <option>$25,000 - $100,000</option>
                  <option>$100,000+</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Message & Products of Interest</label>
                <textarea rows={4} placeholder="Tell us which products and categories you are looking to purchase..." className="form-textarea" required></textarea>
              </div>
              <button type="submit" className="btn-submit-modal">
                Submit Wholesale Application
              </button>
            </form>

            {formSubmitted && (
              <div style={{ marginTop: '20px', padding: '16px', background: '#ecfdf5', color: '#065f46', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={24} color="#059669" />
                <div>
                  <strong>Application Submitted Successfully!</strong>
                  <p style={{ fontSize: '0.88rem' }}>Our wholesale accounts director {siteConfig.ownerName || siteConfig.companyName} will review your details and contact you shortly.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW: SUPPLIER INQUIRIES */}
      {activeTab === 'supplier' && (
        <div className="section-wrapper" style={{ padding: '60px 24px' }}>
          <div style={{ maxWidth: '850px', margin: '0 auto' }}>
            <div className="section-header-center">
              <span className="section-tag">SUPPLIER INQUIRIES</span>
              <h1 className="section-title">Supplier Inquiries</h1>
              <p style={{ color: '#475569', fontSize: '1.05rem', maxWidth: '680px', margin: '14px auto 0' }}>
                Tell us about your products and wholesale inquiry; our team will review your message.
              </p>
            </div>

            {/* Quick Contact Info Strip with unified 1-6 sequence */}
            <div style={{
              background: '#102a3a',
              color: '#ffffff',
              padding: '24px 30px',
              borderRadius: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: '32px'
            }}>
              {/* 1. Company Name */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Building2 size={18} color="#38bdf8" />
                <span style={{ fontWeight: '700' }}>{siteConfig.companyName}</span>
              </div>
              {/* 2. Phone Number */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={18} color="#38bdf8" />
                <a href={`tel:${(siteConfig.phoneDirect || '').replace(/[^+\d]/g, '')}`} style={{ color: '#fff', textDecoration: 'none', fontWeight: '600' }}>
                  {siteConfig.phoneDirect}
                </a>
              </div>
              {/* 3. WhatsApp Number */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MessageSquare size={18} color="#38bdf8" />
                <a href={`https://wa.me/${(siteConfig.whatsappNumber || '').replace(/[^\d]/g, '')}`} target="_blank" rel="noreferrer" style={{ color: '#4ade80', textDecoration: 'none', fontWeight: '600' }}>
                  {siteConfig.whatsappDisplay || siteConfig.phoneDirect}
                </a>
              </div>
              {/* 4. Email Address */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={18} color="#38bdf8" />
                <a href={`mailto:${siteConfig.email}`} style={{ color: '#fff', textDecoration: 'none', fontWeight: '600' }}>
                  {siteConfig.email}
                </a>
              </div>
              {/* 5. Address */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MapPin size={18} color="#38bdf8" />
                <span>{siteConfig.address?.full || `${siteConfig.address?.line1} ${siteConfig.address?.line2}`}</span>
              </div>
              {/* 6. Official Website */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Globe size={18} color="#38bdf8" />
                <a href={siteConfig.footer?.websiteUrl || `https://${siteConfig.website}`} target="_blank" rel="noreferrer" style={{ color: '#93c5fd', textDecoration: 'none', fontWeight: '600' }}>
                  {siteConfig.website}
                </a>
              </div>
            </div>

            <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
              <div style={{ marginBottom: '24px', borderLeft: '4px solid #1e7087', paddingLeft: '16px' }}>
                <h3 style={{ fontSize: '1.25rem', color: '#102a3a', marginBottom: '8px' }}>Supplier Inquiries</h3>
                <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Tell us about your business and the product you’re looking to source. Share product details, brand information, and your preferred order quantities. Our team will review your inquiry and follow up about potential next steps.
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="modal-form">
                <div className="form-row-2col">
                  <div className="form-group">
                    <label className="form-label">Company / Factory Name *</label>
                    <input type="text" required placeholder="Manufacturing or trading entity" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Representative Name *</label>
                    <input type="text" required placeholder="Your name" className="form-input" />
                  </div>
                </div>
                <div className="form-row-2col">
                  <div className="form-group">
                    <label className="form-label">Direct Email *</label>
                    <input type="email" required placeholder="rep@brand.com" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Direct Phone / WhatsApp *</label>
                    <input type="tel" required placeholder="(+966) 547035184" className="form-input" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Preferred Order Quantities / MOQs</label>
                  <input type="text" placeholder="e.g. LCL, FCL, Pallets, Master Cartons" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Share Product Details & Brand Information *</label>
                  <textarea rows={4} placeholder="Describe your product lines, certifications (FDA, ISO, GMP), brand catalog link, and manufacturing location..." className="form-textarea" required></textarea>
                </div>
                <button type="submit" className="btn-submit-modal">
                  Submit Supplier Inquiry
                </button>
              </form>

              {formSubmitted && (
                <div style={{ marginTop: '20px', padding: '16px', background: '#ecfdf5', color: '#065f46', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 size={24} color="#059669" />
                  <div>
                    <strong>Supplier Inquiry Received!</strong>
                    <p style={{ fontSize: '0.88rem' }}>Our team will review your inquiry and follow up about potential next steps.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* VIEW: CONTACT US */}
      {activeTab === 'contact' && (
        <div className="section-wrapper" style={{ padding: '60px 24px' }}>
          <div style={{ maxWidth: '960px', margin: '0 auto' }}>
            <div className="section-header-center">
              <span className="section-tag">GET IN TOUCH</span>
              <h1 className="section-title">Contact {siteConfig.shortName || siteConfig.companyName}</h1>
              <p style={{ color: '#64748b', maxWidth: '600px', margin: '10px auto 0' }}>
                We are at your service for catalog requests, partnership discussions, or direct wholesale inquiries.
              </p>
            </div>

            <div className="contact-layout-grid">
              <div style={{ background: '#102a3a', color: '#fff', padding: '36px', borderRadius: '20px' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', marginBottom: '20px', borderBottom: '1px solid #1e3a4e', paddingBottom: '12px' }}>
                  Official Commercial Details
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '0.95rem' }}>
                  {/* 1. Company Name */}
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{ background: 'rgba(56, 189, 248, 0.15)', padding: '10px', borderRadius: '10px', display: 'flex' }}>
                      <Building2 size={20} color="#38bdf8" />
                    </div>
                    <div>
                      <div style={{ color: '#94a3b8', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Company Name</div>
                      <div style={{ color: '#fff', fontWeight: '700', fontSize: '1.05rem' }}>{siteConfig.companyName}</div>
                      {siteConfig.ownerName && <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Managing Director: {siteConfig.ownerName}</div>}
                    </div>
                  </div>

                  {/* 2. Phone Number */}
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{ background: 'rgba(56, 189, 248, 0.15)', padding: '10px', borderRadius: '10px', display: 'flex' }}>
                      <Phone size={20} color="#38bdf8" />
                    </div>
                    <div>
                      <div style={{ color: '#94a3b8', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Phone Number</div>
                      <a href={`tel:${(siteConfig.phoneDirect || '').replace(/[^+\d]/g, '')}`} style={{ color: '#fff', fontWeight: '700', fontSize: '1.05rem', textDecoration: 'none' }}>
                        {siteConfig.phoneDirect}
                      </a>
                    </div>
                  </div>

                  {/* 3. WhatsApp Number */}
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{ background: 'rgba(56, 189, 248, 0.15)', padding: '10px', borderRadius: '10px', display: 'flex' }}>
                      <MessageSquare size={20} color="#38bdf8" />
                    </div>
                    <div>
                      <div style={{ color: '#94a3b8', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>WhatsApp Number</div>
                      <a href={`https://wa.me/${(siteConfig.whatsappNumber || '').replace(/[^\d]/g, '')}`} target="_blank" rel="noreferrer" style={{ color: '#4ade80', fontWeight: '700', fontSize: '1.05rem', textDecoration: 'none' }}>
                        {siteConfig.whatsappDisplay || siteConfig.phoneDirect}
                      </a>
                    </div>
                  </div>

                  {/* 4. Email Address */}
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{ background: 'rgba(56, 189, 248, 0.15)', padding: '10px', borderRadius: '10px', display: 'flex' }}>
                      <Mail size={20} color="#38bdf8" />
                    </div>
                    <div>
                      <div style={{ color: '#94a3b8', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email Address</div>
                      <a href={`mailto:${siteConfig.email}`} style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: '700', fontSize: '1rem', wordBreak: 'break-all' }}>
                        {siteConfig.email}
                      </a>
                    </div>
                  </div>

                  {/* 5. Official Registered Address */}
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{ background: 'rgba(56, 189, 248, 0.15)', padding: '10px', borderRadius: '10px', display: 'flex' }}>
                      <MapPin size={20} color="#38bdf8" />
                    </div>
                    <div>
                      <div style={{ color: '#94a3b8', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Official Registered Address</div>
                      <div style={{ color: '#fff', fontWeight: '600' }}>{siteConfig.address?.line1}</div>
                      <div style={{ color: '#cbd5e1' }}>{siteConfig.address?.cityStateZip || siteConfig.address?.line2}</div>
                    </div>
                  </div>

                  {/* 6. Official Website */}
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{ background: 'rgba(56, 189, 248, 0.15)', padding: '10px', borderRadius: '10px', display: 'flex' }}>
                      <Globe size={20} color="#38bdf8" />
                    </div>
                    <div>
                      <div style={{ color: '#94a3b8', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Official Website</div>
                      <a 
                        href={siteConfig.footer?.websiteUrl || `https://${siteConfig.website}`} 
                        target="_blank" 
                        rel="noreferrer" 
                        style={{ color: '#38bdf8', fontWeight: '700', fontSize: '1rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                      >
                        {siteConfig.website} <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ background: '#fff', padding: '36px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '18px' }}>Send Us a Message</h3>
                <form onSubmit={handleFormSubmit} className="modal-form">
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input type="text" required placeholder="Your name" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input type="email" required placeholder="your.email@example.com" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Subject</label>
                    <input type="text" placeholder="Wholesale Inquiry / Catalog" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Message *</label>
                    <textarea rows={4} placeholder="How can we assist you today?" required className="form-textarea"></textarea>
                  </div>
                  <button type="submit" className="btn-submit-modal">
                    Send Message
                  </button>
                </form>

                {formSubmitted && (
                  <div style={{ marginTop: '16px', padding: '12px', background: '#ecfdf5', color: '#065f46', borderRadius: '8px', fontSize: '0.9rem' }}>
                    Thank you! Your message has been routed to {siteConfig.ownerName || siteConfig.companyName}. We will reply within 24 hours.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-container">
          <div className="footer-brand">
            <img src={siteConfig.logo || logoImg} alt={`${siteConfig.companyName} Logo`} className="footer-logo-img" />
            <h3>{siteConfig.companyName}</h3>
            <p>
              Professional wholesale, sourcing, and distribution services{siteConfig.ownerName ? ` managed by ${siteConfig.ownerName}` : ''}. Dedicated to supplying top tier merchandise with transparent global logistics.
            </p>
            <div style={{ marginTop: '16px', fontSize: '0.85rem', color: '#cbd5e1', lineHeight: '1.7' }}>
              <div><strong>Company Name:</strong> {siteConfig.companyName}</div>
              <div><strong>Phone:</strong> <a href={`tel:${(siteConfig.phoneDirect || '').replace(/[^+\d]/g, '')}`} style={{ color: '#fff' }}>{siteConfig.phoneDirect}</a></div>
              <div><strong>WhatsApp:</strong> <a href={`https://wa.me/${(siteConfig.whatsappNumber || '').replace(/[^\d]/g, '')}`} target="_blank" rel="noreferrer" style={{ color: '#4ade80' }}>{siteConfig.whatsappDisplay || siteConfig.phoneDirect}</a></div>
              <div><strong>Email:</strong> <a href={`mailto:${siteConfig.email}`} style={{ color: '#38bdf8' }}>{siteConfig.email}</a></div>
              <div><strong>Registered Address:</strong> {siteConfig.address?.full || `${siteConfig.address?.line1} ${siteConfig.address?.line2}`}</div>
              <div><strong>Website:</strong> <a href={siteConfig.footer?.websiteUrl || `https://${siteConfig.website}`} target="_blank" rel="noreferrer" style={{ color: '#38bdf8' }}>{siteConfig.website}</a></div>
            </div>
          </div>

          <div className="footer-col">
            <h4>Menu</h4>
            <ul>
              <li><a href="#home" onClick={(e) => { e.preventDefault(); navigateTo('home'); }}>Home</a></li>
              <li><a href="#about" onClick={(e) => { e.preventDefault(); navigateTo('about'); }}>About Us</a></li>
              <li><a href="#business" onClick={(e) => { e.preventDefault(); navigateTo('business'); }}>Our Business</a></li>
              <li><a href="#categories" onClick={(e) => { e.preventDefault(); navigateTo('categories'); }}>Product Categories</a></li>
              <li><a href="#partnerships" onClick={(e) => { e.preventDefault(); navigateTo('partnerships'); }}>Wholesale Partnerships</a></li>
              <li><a href="#supplier" onClick={(e) => { e.preventDefault(); navigateTo('supplier'); }}>Supplier Inquiries</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); navigateTo('contact'); }}>Contact Us</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contacts</h4>
            <ul style={{ marginBottom: '20px' }}>
              {/* 1. Company Name */}
              <li>
                <span style={{ color: '#94a3b8', fontSize: '0.74rem', textTransform: 'uppercase', display: 'block', letterSpacing: '0.04em' }}>Company Name</span>
                <strong style={{ color: '#fff', fontSize: '0.94rem' }}>{siteConfig.companyName}</strong>
              </li>
              {/* 2. Phone Number */}
              <li style={{ marginTop: '8px' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.74rem', textTransform: 'uppercase', display: 'block', letterSpacing: '0.04em' }}>Phone</span>
                <a href={`tel:${(siteConfig.phoneDirect || '').replace(/[^+\d]/g, '')}`} style={{ color: '#fff', fontSize: '0.88rem', fontWeight: '600' }}>
                  {siteConfig.phoneDirect}
                </a>
              </li>
              {/* 3. WhatsApp Number */}
              <li style={{ marginTop: '8px' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.74rem', textTransform: 'uppercase', display: 'block', letterSpacing: '0.04em' }}>WhatsApp</span>
                <a href={`https://wa.me/${(siteConfig.whatsappNumber || '').replace(/[^\d]/g, '')}`} target="_blank" rel="noreferrer" style={{ color: '#4ade80', fontSize: '0.88rem', fontWeight: '600' }}>
                  {siteConfig.whatsappDisplay || siteConfig.phoneDirect}
                </a>
              </li>
              {/* 4. Email */}
              <li style={{ marginTop: '8px' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.74rem', textTransform: 'uppercase', display: 'block', letterSpacing: '0.04em' }}>Email</span>
                <a href={`mailto:${siteConfig.email}`} style={{ color: '#38bdf8', fontSize: '0.88rem' }}>
                  {siteConfig.email}
                </a>
              </li>
              {/* 5. Registered Address */}
              <li style={{ marginTop: '8px' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.74rem', textTransform: 'uppercase', display: 'block', letterSpacing: '0.04em' }}>Official Address</span>
                <span style={{ color: '#cbd5e1', fontSize: '0.85rem' }}>{siteConfig.address?.line1}<br />{siteConfig.address?.line2}</span>
              </li>
              {/* 6. Website */}
              <li style={{ marginTop: '10px' }}>
                <a href={siteConfig.footer?.websiteUrl || `https://${siteConfig.website}`} target="_blank" rel="noreferrer" style={{ color: '#38bdf8', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.86rem' }}>
                  <Globe size={14} /> {siteConfig.website}
                </a>
              </li>
            </ul>

            <h4 style={{ marginTop: '16px' }}>Socials</h4>
            <ul>
              <li><a href="https://facebook.com/" target="_blank" rel="noreferrer">Facebook</a></li>
              <li><a href="https://instagram.com/" target="_blank" rel="noreferrer">Instagram</a></li>
              <li><a href="https://tiktok.com/" target="_blank" rel="noreferrer">TikTok</a></li>
              <li><a href={`https://wa.me/${(siteConfig.whatsappNumber || '').replace(/[^\d]/g, '')}`} target="_blank" rel="noreferrer" style={{ color: '#4ade80' }}>WhatsApp</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Subscribe to our newsletter</h4>
            <p style={{ fontSize: '0.85rem', marginBottom: '14px', color: '#cbd5e1' }}>
              Receive exclusive wholesale price updates, catalog drops, and seasonal availability lists.
            </p>
            <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Email *</label>
              <input 
                type="email" 
                required 
                placeholder="Enter your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                style={{
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid #334155',
                  background: '#0f2432',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
              <button 
                type="submit" 
                style={{
                  background: '#1e7087',
                  color: '#ffffff',
                  padding: '10px',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: '600',
                  cursor: 'pointer',
                  marginTop: '4px'
                }}
              >
                Subscribe
              </button>
            </form>

            {newsletterSuccess && (
              <div style={{ marginTop: '10px', color: '#4ade80', fontSize: '0.82rem' }}>
                ✓ Thank you for subscribing to our wholesale bulletin!
              </div>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            © 2026 <strong>{siteConfig.companyName}</strong>. All rights reserved.
          </div>
          <div style={{ color: '#64748b' }}>
            {siteConfig.ownerName ? `Managed by ${siteConfig.ownerName} • ` : ''}{siteConfig.address?.full || `${siteConfig.address?.line1} ${siteConfig.address?.line2}`} • Tel: {siteConfig.phoneDirect}
          </div>
        </div>
      </footer>

      {/* CART DRAWER SLIDE-OVER */}
      {cartOpen && (
        <div className="cart-backdrop" onClick={() => setCartOpen(false)}>
          <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="cart-drawer-header">
              <div className="cart-header-title">
                <ShoppingBag size={20} color="#1e7087" />
                <h3>Your Wholesale Cart</h3>
                <span className="cart-count-pill">{totalCartItems} units</span>
              </div>
              <button className="cart-close-btn" onClick={() => setCartOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="cart-drawer-body">
              {cart.length === 0 ? (
                <div className="cart-empty-state">
                  <div className="empty-cart-icon">
                    <ShoppingCart size={48} strokeWidth={1.5} color="#94a3b8" />
                  </div>
                  <h4>Your Cart is Empty</h4>
                  <p>Browse our catalog and add wholesale products to calculate tiered totals or place direct orders.</p>
                  <button 
                    className="btn-hero-primary" 
                    style={{ marginTop: '16px' }}
                    onClick={() => {
                      setCartOpen(false);
                      navigateTo('home');
                    }}
                  >
                    Explore Wholesale Catalog
                  </button>
                </div>
              ) : (
                <div className="cart-items-list">
                  {cart.map((item) => (
                    <div key={item.product.id} className="cart-item-card">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="cart-item-thumb"
                        onClick={() => {
                          viewProductDetail(item.product);
                          setCartOpen(false);
                        }}
                      />
                      <div className="cart-item-details">
                        <div className="cart-item-meta">
                          <span className="cart-item-sku">SKU: {item.product.sku}</span>
                          <button 
                            className="btn-remove-item"
                            onClick={() => removeFromCart(item.product.id)}
                            title="Remove item"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                        <h4 
                          className="cart-item-title"
                          onClick={() => {
                            viewProductDetail(item.product);
                            setCartOpen(false);
                          }}
                        >
                          {item.product.name}
                        </h4>
                        <div className="cart-item-price-row">
                          <span className="cart-unit-price">{item.product.price} / unit</span>
                          <span className="cart-line-total">${(item.product.priceNumeric * item.quantity).toLocaleString()}</span>
                        </div>
                        <div className="cart-stepper-row">
                          <div className="cart-qty-stepper">
                            <button 
                              onClick={() => updateCartQuantity(item.product.id, -1)}
                              className="cart-step-btn"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="cart-step-val">{item.quantity}</span>
                            <button 
                              onClick={() => updateCartQuantity(item.product.id, 1)}
                              className="cart-step-btn"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <button 
                            className="cart-view-link"
                            onClick={() => {
                              viewProductDetail(item.product);
                              setCartOpen(false);
                            }}
                          >
                            View details →
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="cart-drawer-footer">
                <div className="cart-summary-box">
                  <div className="summary-row">
                    <span>Total Quantity:</span>
                    <strong>{totalCartItems} units</strong>
                  </div>
                  <div className="summary-row subtotal">
                    <span>Estimated Subtotal:</span>
                    <strong className="summary-amount">${cartSubtotal.toLocaleString()}</strong>
                  </div>
                  <p className="summary-note">Wholesale tiered rates and freight confirmed upon order dispatch.</p>
                </div>

                <div className="cart-footer-actions">
                  <a 
                    href={`https://wa.me/${(siteConfig.whatsappNumber || '').replace(/[^\d]/g, '')}?text=${encodeURIComponent(
                      `Hello ${siteConfig.ownerName || siteConfig.companyName}, I want to place an order from ${siteConfig.companyName}:\n\n` +
                      cart.map(i => `• ${i.product.name} (SKU: ${i.product.sku}) - Qty: ${i.quantity} x ${i.product.price} = $${(i.product.priceNumeric * i.quantity).toLocaleString()}`).join('\n') +
                      `\n\nTotal Estimated: $${cartSubtotal.toLocaleString()}\nTotal Units: ${totalCartItems}`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-cart-whatsapp"
                  >
                    <MessageSquare size={18} />
                    <span>Instant Checkout via WhatsApp</span>
                  </a>

                  <button 
                    className="btn-cart-checkout"
                    onClick={() => {
                      setCartOpen(false);
                      handleOpenPartner('checkout');
                    }}
                  >
                    <span>Proceed to Wholesale Checkout</span>
                    <ArrowRight size={18} />
                  </button>
                </div>

                <div className="cart-clear-row">
                  <button onClick={clearCart} className="btn-clear-cart">
                    Clear Entire Cart
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="cart-toast">
          <CheckCircle2 size={18} color="#10b981" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* MODAL: QUOTE REQUEST, PARTNER INQUIRY, OR CHECKOUT */}
      {modalType && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <X size={18} />
            </button>

            {modalType === 'quote' && selectedProduct && (
              <>
                <h3 className="modal-title">Request Wholesale Quote</h3>
                <p className="modal-subtitle">
                  Inquiring for: <strong>{selectedProduct.name}</strong> (SKU: {selectedProduct.sku})
                </p>
                <form onSubmit={handleFormSubmit} className="modal-form">
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input type="text" required placeholder="Your name" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Business Email *</label>
                    <input type="email" required placeholder="buyer@company.com" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number / WhatsApp *</label>
                    <input type="tel" required placeholder={siteConfig.phoneDirect} className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Requested Quantity (Minimum: {selectedProduct.minOrder})</label>
                    <input type="text" placeholder={`e.g. 20 Cases / 1 Pallet`} className="form-input" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Destination Port / Delivery Zip Code</label>
                    <input type="text" placeholder="City, State / Country" className="form-input" required />
                  </div>
                  <button type="submit" className="btn-submit-modal">
                    Submit Quote Request
                  </button>
                </form>
              </>
            )}

            {modalType === 'partner' && (
              <>
                <h3 className="modal-title">Wholesale Partnership Today</h3>
                <p className="modal-subtitle">
                  Connect with {siteConfig.ownerName ? `${siteConfig.ownerName} and the ` : ''}{siteConfig.shortName || siteConfig.companyName} executive desk.
                </p>
                <form onSubmit={handleFormSubmit} className="modal-form">
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input type="text" required placeholder="Your name" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Business / Company Name *</label>
                    <input type="text" required placeholder="Company LLC" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input type="email" required placeholder="contact@company.com" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone / WhatsApp *</label>
                    <input type="tel" required placeholder={siteConfig.phoneDirect} className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Categories of Interest</label>
                    <select className="form-select">
                      <option>All Product Categories</option>
                      <option>Everyday Essentials</option>
                      <option>Home & Office</option>
                      <option>Cleaning & Commercial</option>
                      <option>Grocery & Pantry</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Notes / Expected Order Size</label>
                    <textarea rows={3} placeholder="Tell us about your distribution needs..." className="form-textarea"></textarea>
                  </div>
                  <button type="submit" className="btn-submit-modal">
                    Connect With {siteConfig.ownerName || siteConfig.companyName}
                  </button>
                </form>
              </>
            )}

            {modalType === 'checkout' && (
              <>
                <h3 className="modal-title">Wholesale Checkout / Purchase Order</h3>
                <p className="modal-subtitle">
                  Submitting order for: <strong>{totalCartItems} units • Total: ${cartSubtotal.toLocaleString()}</strong>
                </p>
                <form onSubmit={handleFormSubmit} className="modal-form">
                  <div className="form-group">
                    <label className="form-label">Buyer / Contact Name *</label>
                    <input type="text" required placeholder="Your name" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Company / Business Name *</label>
                    <input type="text" required placeholder="Company / Organization" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Business Email *</label>
                    <input type="email" required placeholder="procurement@company.com" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">WhatsApp / Phone Number *</label>
                    <input type="tel" required placeholder={siteConfig.phoneDirect} className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Delivery / Destination Address *</label>
                    <input type="text" required placeholder="Warehouse address, City, Country" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Order Notes / Custom Pallet Instructions</label>
                    <textarea rows={2} placeholder="Optional delivery instructions, dock requirements..." className="form-textarea"></textarea>
                  </div>
                  <button type="submit" className="btn-submit-modal">
                    Confirm & Place Purchase Order (${cartSubtotal.toLocaleString()})
                  </button>
                </form>
              </>
            )}

            {formSubmitted && (
              <div style={{ marginTop: '20px', padding: '16px', background: '#ecfdf5', color: '#065f46', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={24} color="#059669" />
                <div>
                  <strong>Order / Inquiry Dispatched!</strong>
                  <p style={{ fontSize: '0.85rem' }}>{siteConfig.ownerName ? `${siteConfig.ownerName} and our ` : 'Our '}logistics desk will confirm your order and send invoice details via WhatsApp and email promptly.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

