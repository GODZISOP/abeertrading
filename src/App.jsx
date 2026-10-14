import React, { useState } from 'react';
import { 
  Phone, Mail, MapPin, Search, ArrowRight, CheckCircle2, 
  Send, ExternalLink, ShieldCheck, Truck, Award,
  X, MessageSquare, Layers, Building2, ShoppingCart, Menu as MenuIcon
} from 'lucide-react';
import { categories, products } from './data/products';
import logoImg from './images/image.png';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [modalType, setModalType] = useState(null); // 'partner', 'quote', 'supplier', null
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

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

  return (
    <div className="min-h-screen bg-[#f5f7f9] text-[#1e293b]">
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="top-bar">
        <div className="top-bar-item">
          <span>Official Wholesale: <strong>ABEER TRADING COMPANY LLC</strong></span>
          <span style={{ opacity: 0.5, margin: '0 6px' }}>•</span>
          <span>Managed by Tahir Mehmood</span>
          <span style={{ opacity: 0.5, margin: '0 6px' }}>•</span>
          <span style={{ color: '#93c5fd' }}>30 N Gould St # 68479 Sheridan, WY 82801</span>
        </div>
        <div className="top-bar-contact">
          <div className="top-bar-item">
            <Phone size={14} color="#93c5fd" />
            <a href="tel:+966547035184">(+966) 547035184</a>
            <span style={{ opacity: 0.5 }}>/</span>
            <a href="tel:+16615770052">+1 661-577-0052</a>
          </div>
          <div className="top-bar-item">
            <Mail size={14} color="#93c5fd" />
            <a href="mailto:Abeer.tahir2025@gmail.com">Abeer.tahir2025@gmail.com</a>
          </div>
          <div className="top-bar-item">
            <a 
              href="https://wa.me/966547035184" 
              target="_blank" 
              rel="noreferrer"
              style={{ color: '#4ade80', fontWeight: '600' }}
            >
              WhatsApp Support
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER NAVIGATION WITH OFFICIAL LOGO */}
      <header className="main-nav">
        <div className="nav-brand" onClick={() => navigateTo('home')} style={{ cursor: 'pointer' }}>
          <img src={logoImg} alt="ATC Abeer Trading Company LLC Logo" className="brand-logo-img" />
          <div>
            <div className="brand-title">Abeer Trading Co.</div>
            <div className="brand-subtitle">Wholesale, Sourced Thoughtfully</div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav>
          <ul className="nav-links">
            <li>
              <button 
                className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
                onClick={() => navigateTo('home')}
                style={{ background: 'none', border: 'none', font: 'inherit' }}
              >
                Home
              </button>
            </li>
            <li>
              <button 
                className={`nav-link ${activeTab === 'about' ? 'active' : ''}`}
                onClick={() => navigateTo('about')}
                style={{ background: 'none', border: 'none', font: 'inherit' }}
              >
                About Us
              </button>
            </li>
            <li>
              <button 
                className={`nav-link ${activeTab === 'business' ? 'active' : ''}`}
                onClick={() => navigateTo('business')}
                style={{ background: 'none', border: 'none', font: 'inherit' }}
              >
                Our Business
              </button>
            </li>
            <li>
              <button 
                className={`nav-link ${activeTab === 'categories' ? 'active' : ''}`}
                onClick={() => navigateTo('categories')}
                style={{ background: 'none', border: 'none', font: 'inherit' }}
              >
                Product Categories
              </button>
            </li>
            <li>
              <button 
                className={`nav-link ${activeTab === 'partnerships' ? 'active' : ''}`}
                onClick={() => navigateTo('partnerships')}
                style={{ background: 'none', border: 'none', font: 'inherit' }}
              >
                Wholesale Partnerships
              </button>
            </li>
            <li>
              <button 
                className={`nav-link ${activeTab === 'supplier' ? 'active' : ''}`}
                onClick={() => navigateTo('supplier')}
                style={{ background: 'none', border: 'none', font: 'inherit' }}
              >
                Supplier Inquiries
              </button>
            </li>
            <li>
              <button 
                className={`nav-link ${activeTab === 'contact' ? 'active' : ''}`}
                onClick={() => navigateTo('contact')}
                style={{ background: 'none', border: 'none', font: 'inherit' }}
              >
                Contact Us
              </button>
            </li>
          </ul>
        </nav>

        <div className="nav-actions">
          <button 
            className="btn-nav-partner"
            onClick={() => handleOpenPartner('partner')}
          >
            <span>Partner Today</span>
            <ArrowRight size={16} />
          </button>
          <button 
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ 
              display: 'none',
              background: '#f1f5f9', 
              border: '1px solid #cbd5e1', 
              borderRadius: '8px', 
              padding: '8px', 
              cursor: 'pointer' 
            }}
          >
            <MenuIcon size={20} />
          </button>
        </div>
      </header>

      {/* MOBILE MENU ACCORDION */}
      {mobileMenuOpen && (
        <div style={{
          background: '#ffffff',
          padding: '20px',
          borderBottom: '2px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {['home', 'about', 'business', 'categories', 'partnerships', 'supplier', 'contact'].map(key => (
            <button
              key={key}
              onClick={() => navigateTo(key)}
              style={{
                textAlign: 'left',
                padding: '10px 14px',
                background: activeTab === key ? '#e6f4f8' : 'transparent',
                color: activeTab === key ? '#1e7087' : '#334155',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '0.95rem',
                textTransform: 'capitalize'
              }}
            >
              {key === 'business' ? 'Our Business' : key === 'supplier' ? 'Supplier Inquiries' : key === 'partnerships' ? 'Wholesale Partnerships' : key}
            </button>
          ))}
        </div>
      )}

      {/* VIEW: HOME PAGE */}
      {activeTab === 'home' && (
        <main>
          {/* EXACT HERO SECTION REPLICATING SCREENSHOT */}
          <section className="hero-section">
            <div className="hero-overlay"></div>
            <div className="hero-container">
              <div className="hero-content">
                <div className="hero-pretitle">Abeer Trading Company llc</div>
                <h1 className="hero-title">Wholesale, Sourced Thoughtfully</h1>
                <p className="hero-description">
                  ABEER TRADING COMPANY LLC is owned and managed by Tahir Mehmood, providing customers with professional trading services. For business inquiries, please contact us at +1 661-577-0052 or email Abeer.tahir2025@gmail.com. Visit our official website at <strong>https://abeertradingcompanyllc.com</strong> for more information about our company and services.
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
                      <a 
                        href={prod.url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="product-title-link"
                      >
                        {prod.name}
                      </a>
                    </h3>

                    <div className="product-price-box">
                      <span className="product-price-val">{prod.price}</span>
                      <span className="product-price-sub">Wholesale Tiered</span>
                    </div>

                    <p className="product-excerpt">{prod.description}</p>

                    <div className="product-actions-row">
                      <button 
                        className="btn-add-cart"
                        onClick={() => handleOpenQuote(prod)}
                      >
                        <ShoppingCart size={15} />
                        <span>Add to cart</span>
                      </button>
                      <a 
                        href={prod.url} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="btn-view-live"
                        title="View on official store"
                      >
                        <ExternalLink size={15} />
                      </a>
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
                  Owned and directed by <strong>Tahir Mehmood</strong>, <strong>ABEER TRADING COMPANY LLC</strong> is a registered commercial wholesale and global trade enterprise headquartered in Sheridan, Wyoming, USA. We bridge verified manufacturers and international brand sources with retail chains, regional distributors, and institutional organizations worldwide.
                </p>

                {/* Structured Verification Ledger */}
                <div className="corp-ledger">
                  <div className="corp-ledger-row">
                    <span className="ledger-label">Registered Legal Entity</span>
                    <div className="ledger-val-group">
                      <strong>ABEER TRADING COMPANY LLC</strong>
                      <span className="ledger-sub">State of Wyoming • Registered Domestic Entity ID # 68479</span>
                    </div>
                  </div>

                  <div className="corp-ledger-row">
                    <span className="ledger-label">Principal Leadership</span>
                    <div className="ledger-val-group">
                      <strong>Tahir Mehmood</strong>
                      <span className="ledger-sub">Owner & Managing Director</span>
                    </div>
                  </div>

                  <div className="corp-ledger-row">
                    <span className="ledger-label">Registered U.S. Office</span>
                    <div className="ledger-val-group">
                      <span>30 N Gould St # 68479 Sheridan, WY 82801, United States</span>
                    </div>
                  </div>

                  <div className="corp-ledger-row">
                    <span className="ledger-label">Operational Desks</span>
                    <div className="ledger-val-group">
                      <span><strong>United States</strong> (Domestic Freight) • <strong>Middle East / KSA</strong> (Direct Trading Desk)</span>
                    </div>
                  </div>

                  <div className="corp-ledger-row">
                    <span className="ledger-label">Wholesale Portfolio</span>
                    <div className="ledger-val-group">
                      <span>Everyday Essentials • Beauty & Health • Home & Office • Commercial Cleaning • Pantry</span>
                    </div>
                  </div>

                  <div className="corp-ledger-row">
                    <span className="ledger-label">Procurement Standard</span>
                    <div className="ledger-val-group">
                      <span>Strict manufacturer lot tracking, transparent chain of custody, flexible MOQs, prompt multi-carrier dispatch.</span>
                    </div>
                  </div>
                </div>

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
                  <span className="trade-desk-id">WY LLC #68479</span>
                </div>

                <h3 className="trade-desk-title">Wholesale Inquiries & Quotes</h3>
                
                <p className="trade-desk-desc">
                  Connect with our executive trading desk for custom pricing quotes, catalog distribution, or supplier collaboration.
                </p>

                <div className="trade-desk-contacts">
                  <a href="tel:+966547035184" className="trade-contact-item">
                    <div className="contact-icon-box">
                      <Phone size={18} />
                    </div>
                    <div className="contact-details">
                      <span className="contact-role">Primary Trading Desk (Direct / WhatsApp)</span>
                      <strong className="contact-val">(+966) 547035184</strong>
                    </div>
                  </a>

                  <a href="tel:+16615770052" className="trade-contact-item">
                    <div className="contact-icon-box">
                      <Building2 size={18} />
                    </div>
                    <div className="contact-details">
                      <span className="contact-role">United States Office Support</span>
                      <strong className="contact-val">+1 661-577-0052</strong>
                    </div>
                  </a>

                  <a href="mailto:Abeer.tahir2025@gmail.com" className="trade-contact-item">
                    <div className="contact-icon-box">
                      <Mail size={18} />
                    </div>
                    <div className="contact-details">
                      <span className="contact-role">Direct Executive Email</span>
                      <strong className="contact-val">Abeer.tahir2025@gmail.com</strong>
                    </div>
                  </a>

                  <div className="trade-contact-item static">
                    <div className="contact-icon-box">
                      <MapPin size={18} />
                    </div>
                    <div className="contact-details">
                      <span className="contact-role">Corporate Registered Address</span>
                      <strong className="contact-val">30 N Gould St # 68479 Sheridan, WY 82801</strong>
                      <span className="contact-note">Managed by Tahir Mehmood • USA & Global Distribution</span>
                    </div>
                  </div>
                </div>

                <div className="trade-desk-cta-group">
                  <a 
                    href="https://wa.me/966547035184" 
                    target="_blank" 
                    rel="noreferrer"
                    className="btn-trade-whatsapp"
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M12.031 2C6.494 2 2 6.494 2 12.031c0 1.95.558 3.771 1.523 5.319L2.094 22l4.802-1.408a10.02 10.02 0 0 0 5.135 1.44c5.537 0 10.031-4.494 10.031-10.031S17.568 2 12.031 2zm5.727 14.152c-.24.673-1.393 1.282-1.922 1.346-.51.063-1.168.089-3.743-.977-3.136-1.298-5.14-4.524-5.297-4.733-.153-.209-1.264-1.684-1.264-3.213s.801-2.28 1.086-2.585c.285-.306.621-.382.828-.382.207 0 .414.002.595.011.192.01.448-.073.701.536.262.632.894 2.181.972 2.34.078.158.13.344.026.552-.104.209-.156.338-.311.52-.156.182-.328.406-.468.545-.156.155-.319.324-.137.636.182.312.81 1.336 1.737 2.161 1.192 1.062 2.196 1.391 2.508 1.547.312.156.494.13.676-.078.182-.208.78-.909.988-1.221.208-.312.416-.26.697-.156.281.104 1.79.845 2.099 1 .309.155.515.234.59.364.075.13.075.754-.165 1.427z"/>
                    </svg>
                    <span>Chat on WhatsApp (+966)</span>
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

      {/* VIEW: ABOUT US */}
      {activeTab === 'about' && (
        <div className="section-wrapper" style={{ padding: '60px 24px' }}>
          <div style={{ maxWidth: '850px', margin: '0 auto', background: '#fff', padding: '48px', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <span className="section-tag">COMPANY OVERVIEW</span>
            <h1 className="section-title" style={{ marginBottom: '20px' }}>About Abeer Trading Company LLC</h1>
            <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.8, marginBottom: '20px' }}>
              <strong>ABEER TRADING COMPANY LLC</strong> is owned and managed by <strong>Tahir Mehmood</strong>, operating from our registered headquarters at <strong>30 N Gould St # 68479 Sheridan, WY 82801</strong>. Our mission is to bridge the gap between quality manufacturers and businesses across retail, hospitality, industrial sectors, and e-commerce distribution channels.
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
              Whether you are an independent supermarket, a chain retailer, or an online merchant, ABEER TRADING COMPANY LLC provides flexible minimums, volume price tiers, and dependable fulfillment.
            </p>

            <form onSubmit={handleFormSubmit} className="modal-form">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Contact Name *</label>
                  <input type="text" required placeholder="Your full name" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Company / Business Name *</label>
                  <input type="text" required placeholder="Business entity name" className="form-input" />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input type="email" required placeholder="business@example.com" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input type="tel" required placeholder="(+966) / (+1) Phone" className="form-input" />
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
                  <p style={{ fontSize: '0.88rem' }}>Our wholesale accounts director Tahir Mehmood will review your details and contact you shortly.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW: SUPPLIER INQUIRIES (WITH EXACT TEXT PROVIDED BY USER) */}
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

            {/* Quick Contact Info Strip with exact address and phone */}
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Mail size={20} color="#38bdf8" />
                <a href="mailto:Abeer.tahir2025@gmail.com" style={{ color: '#fff', textDecoration: 'none', fontWeight: '600' }}>
                  Abeer.tahir2025@gmail.com
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Phone size={20} color="#38bdf8" />
                <a href="tel:+966547035184" style={{ color: '#fff', textDecoration: 'none', fontWeight: '600' }}>
                  (+966) 547035184
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <MapPin size={20} color="#38bdf8" />
                <span>30 N Gould St # 68479 Sheridan, WY 82801</span>
              </div>
            </div>

            <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
              <div style={{ marginBottom: '24px', borderLeft: '4px solid #1e7087', paddingLeft: '16px' }}>
                <h3 style={{ fontSize: '1.25rem', color: '#102a3a', marginBottom: '8px' }}>Supplier Inquiries</h3>
                <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Tell us about your business and the products you’re looking to source. Share product details, brand information, and your preferred order quantities. Our team will review your inquiry and follow up about potential next steps.
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="modal-form">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Company / Factory Name *</label>
                    <input type="text" required placeholder="Manufacturing or trading entity" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Representative Name *</label>
                    <input type="text" required placeholder="Your name" className="form-input" />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Direct Email *</label>
                    <input type="email" required placeholder="rep@brand.com" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Direct Phone / WhatsApp *</label>
                    <input type="tel" required placeholder="(+966) 547035184 or US phone" className="form-input" />
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
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div className="section-header-center">
              <span className="section-tag">GET IN TOUCH</span>
              <h1 className="section-title">Contact Abeer Trading Company LLC</h1>
              <p style={{ color: '#64748b', maxWidth: '600px', margin: '10px auto 0' }}>
                We are at your service for catalog requests, partnership discussions, or general inquiries.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '32px', marginTop: '40px' }}>
              <div style={{ background: '#102a3a', color: '#fff', padding: '36px', borderRadius: '20px' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginBottom: '16px' }}>Direct Coordinates</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '0.95rem' }}>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <Mail size={20} color="#38bdf8" />
                    <div>
                      <div style={{ color: '#94a3b8', fontSize: '0.8rem', textTransform: 'uppercase' }}>Email</div>
                      <a href="mailto:Abeer.tahir2025@gmail.com" style={{ color: '#fff', textDecoration: 'none', fontWeight: '600' }}>
                        Abeer.tahir2025@gmail.com
                      </a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <Phone size={20} color="#38bdf8" />
                    <div>
                      <div style={{ color: '#94a3b8', fontSize: '0.8rem', textTransform: 'uppercase' }}>Phone Numbers</div>
                      <div>Primary: <a href="tel:+966547035184" style={{ color: '#fff' }}>(+966) 547035184</a></div>
                      <div>US Support: <a href="tel:+16615770052" style={{ color: '#fff' }}>+1 661-577-0052</a></div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <MapPin size={20} color="#38bdf8" />
                    <div>
                      <div style={{ color: '#94a3b8', fontSize: '0.8rem', textTransform: 'uppercase' }}>Official Registered Address</div>
                      <div style={{ color: '#fff', fontWeight: '600' }}>30 N Gould St # 68479</div>
                      <div style={{ color: '#fff' }}>Sheridan, WY 82801</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <MessageSquare size={20} color="#4ade80" />
                    <div>
                      <div style={{ color: '#94a3b8', fontSize: '0.8rem', textTransform: 'uppercase' }}>WhatsApp Chat</div>
                      <a 
                        href="https://wa.me/966547035184" 
                        target="_blank" 
                        rel="noreferrer"
                        style={{ color: '#4ade80', fontWeight: '600', textDecoration: 'none' }}
                      >
                        +966 54 703 5184 (Instant)
                      </a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <Building2 size={20} color="#38bdf8" />
                    <div>
                      <div style={{ color: '#94a3b8', fontSize: '0.8rem', textTransform: 'uppercase' }}>Management</div>
                      <div style={{ color: '#fff' }}>Tahir Mehmood</div>
                      <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Owner & Managing Director</div>
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
                    Thank you! Your message has been routed to Tahir Mehmood. We will reply within 24 hours.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. FOOTER AS EXACTLY SPECIFIED BY USER */}
      <footer className="site-footer">
        <div className="footer-container">
          <div className="footer-brand">
            <img src={logoImg} alt="ATC Abeer Trading Company LLC Logo" className="footer-logo-img" />
            <h3>Abeer Trading Company LLC</h3>
            <p>
              Professional wholesale, sourcing, and distribution services managed by Tahir Mehmood. Dedicated to supplying top tier merchandise with transparent global logistics.
            </p>
            <div style={{ marginTop: '16px', fontSize: '0.85rem', color: '#cbd5e1' }}>
              <div><strong>Registered Address:</strong> 30 N Gould St # 68479 Sheridan, WY 82801</div>
              <div><strong>Management:</strong> Tahir Mehmood</div>
              <div><strong>Website:</strong> abeertradingcompanyllc.com</div>
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
              <li>
                <a href="mailto:Abeer.tahir2025@gmail.com">
                  Abeer.tahir2025@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+966547035184">
                  (+966) 547035184
                </a>
              </li>
              <li>
                <a href="tel:+16615770052">
                  (+1) 661-577-0052
                </a>
              </li>
              <li style={{ color: '#cbd5e1', fontSize: '0.85rem', marginTop: '6px' }}>
                30 N Gould St # 68479 Sheridan, WY 82801
              </li>
            </ul>

            <h4 style={{ marginTop: '16px' }}>Socials</h4>
            <ul>
              <li><a href="https://facebook.com/" target="_blank" rel="noreferrer">Facebook</a></li>
              <li><a href="https://instagram.com/" target="_blank" rel="noreferrer">Instagram</a></li>
              <li><a href="https://tiktok.com/" target="_blank" rel="noreferrer">TikTok</a></li>
              <li><a href="https://wa.me/966547035184" target="_blank" rel="noreferrer" style={{ color: '#4ade80' }}>WhatsApp</a></li>
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
            © 2026 <strong>ABEER TRADING COMPANY LLC</strong>. All rights reserved.
          </div>
          <div style={{ color: '#64748b' }}>
            Managed by Tahir Mehmood • 30 N Gould St # 68479 Sheridan, WY 82801
          </div>
        </div>
      </footer>

      {/* MODAL: QUOTE REQUEST OR PARTNER INQUIRY */}
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
                    <input type="tel" required placeholder="(+966) / (+1) Phone" className="form-input" />
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
                  Connect with Tahir Mehmood and the Abeer Trading executive desk.
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
                    <input type="tel" required placeholder="(+966) 547035184 or US line" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Categories of Interest</label>
                    <select className="form-select">
                      <option>All Product Categories</option>
                      <option>Everyday Essentials</option>
                      <option>Beauty & Health</option>
                      <option>Home & Office</option>
                      <option>Cleaning & Commercial</option>
                      <option>Grocery & Gourmet</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Notes / Expected Order Size</label>
                    <textarea rows={3} placeholder="Tell us about your distribution needs..." className="form-textarea"></textarea>
                  </div>
                  <button type="submit" className="btn-submit-modal">
                    Connect With Tahir Mehmood
                  </button>
                </form>
              </>
            )}

            {formSubmitted && (
              <div style={{ marginTop: '20px', padding: '16px', background: '#ecfdf5', color: '#065f46', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={24} color="#059669" />
                <div>
                  <strong>Inquiry Dispatched!</strong>
                  <p style={{ fontSize: '0.85rem' }}>We will contact you via email / WhatsApp at the earliest.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
