# 🚀 Website Clone & Replication Guide (10–12 Websites Template)

Is guide ki madad se aap is website ka exact copy bana kar **10 se 12 mukhtalif companies/clients** ke liye nayi websites kuch hi minutes mein tayyar kar sakte hain.

---

## 📋 Summary: Aapko Har Nayi Website Mein Kya Change Karna Hoga?

1. **GitHub Repository** (Naya GitHub repo banana aur connect karna)
2. **Project Name** (`package.json` aur `index.html`)
3. **Logo & Favicon** (`src/images/image.png` aur `public/`)
4. **Company Details & Contact Info** (Company Name, Phone, WhatsApp, Email, Address in `src/App.jsx`)
5. **Products & Categories** (`src/data/products.js`)
6. **Theme Colors (Optional)** (`src/index.css` mein primary/accent colors)

---

## ⚙️ Step 1: Naya Folder Banayein & GitHub Setup Karein

### A. Folder Copy Karein
1. Apne computer mein is pure folder (`abeertrading`) ko copy karein aur naye client ke naam se paste karein (e.g., `client2-trading`).
2. Naye folder ko VS Code ya terminal mein open karein.

### B. Naya GitHub Repo Connect Karein
Purane GitHub repo ka connection hatane aur naya repo lagane ke liye terminal mein yeh commands chalayein:

```bash
# 1. Purana git origin check karein
git remote -v

# 2. Agar bilkul naya git shuru karna ho to purana .git hata kar naya init karein:
# Windows PowerShell mein:
Remove-Item -Recurse -Force .git
git init

# 3. GitHub par jaa kar ek NAYA empty repository banayein (e.g. https://github.com/USERNAME/new-client-repo.git)

# 4. Naya repo URL add karein:
git remote add origin https://github.com/APNA_USERNAME/NAYA_REPO_NAME.git

# 5. Files stage karein aur first commit karein:
git add .
git commit -m "Initial commit for new client"
git branch -M main
git push -u origin main
```

*(Note: Agar aap `.git` delete nahi karna chahte, to direct `git remote set-url origin <NEW_URL>` bhi chala sakte hain).*

---

## 🏷️ Step 2: Basic Configuration (Name & Meta)

### 1. `package.json`
File: [`package.json`](file:///d:/Downloads/abeertrading/package.json)
```json
{
  "name": "naya-client-name",
  "private": true,
  "version": "1.0.0",
  ...
}
```

### 2. `index.html`
File: [`index.html`](file:///d:/Downloads/abeertrading/index.html)
- Page Title badlein: `<title>Nayi Company - Wholesale Sourcing</title>`
- Meta Description badlein: Client ke hisaab se.

---

## 🎨 Step 3: Logo & Brand Images

1. **Main Logo**: 
   - File Path: [`src/images/image.png`](file:///d:/Downloads/abeertrading/src/images/image.png)
   - Naye client ka transparent PNG logo yahan paste karein aur naam `image.png` rakhein (ya naya naam dekar `src/App.jsx` mein import update karein).
2. **Hero Background Image (Optional)**:
   - `src/index.css` mein `.hero-section` ke andar background image URL change kar sakte hain.

---

## 📞 Step 4: Company Details, Phone, Email & Address

File: [`src/App.jsx`](file:///d:/Downloads/abeertrading/src/App.jsx)

Aapko sirf `App.jsx` mein yeh details replace karni hain (VS Code mein `Ctrl + H` se **Find & Replace** use karein):

| Purana Text (Abeer Trading) | Kya Replace Karna Hai | Kahan Use Hota Hai |
| :--- | :--- | :--- |
| `Abeer Trading Co.` | `[Nayi Company Ka Short Name]` | Navbar Logo, Footer |
| `ABEER TRADING COMPANY LLC` | `[Nayi Company Ka Full Legal Name]` | Hero, About, Invoices |
| `Wholesale, Sourced Thoughtfully` | `[Naya Slogan / Tagline]` | Navbar Tagline, Footer |
| `Tahir Mehmood` | `[Naye Owner/Manager Ka Naam]` | Hero description, About Us |
| `(+966) 547035184` | `[Naya Primary Phone / WhatsApp]` | Blue Navbar, Trade Desk, WhatsApp Links |
| `+1 661-577-0052` | `[Naya US/Secondary Phone]` | Support / Contact Desk |
| `Abeer.tahir2025@gmail.com` | `[Naya Company Email]` | Contact links, Inquiries, Footer |
| `30 N Gould St # 68479 Sheridan, WY 82801` | `[Naya Registered Address]` | Contact Page, Trade Desk, Footer |

> 💡 **WhatsApp Link Tip**: `App.jsx` mein `https://wa.me/966547035184` ko naye country code aur mobile number se replace karein (e.g. `https://wa.me/1xxxxxxxxxx`).

---

## 📦 Step 5: Products & Categories Update

File: [`src/data/products.js`](file:///d:/Downloads/abeertrading/src/data/products.js)

Har naye client ke products aur categories isi ek file se control hote hain:

### A. Categories Badlein (`categories` array):
```javascript
export const categories = [
  {
    id: 'beverages-drinks',
    name: 'Beverages & Drinks',
    description: 'Bulk juices, sparkling water, and energy drinks.',
    buttonText: 'View Products',
    image: 'https://images.unsplash.com/...',
    itemCount: 4
  },
  // Nayi categories add karein...
];
```

### B. Products Badlein (`products` array):
```javascript
export const products = [
  {
    id: 1,
    name: 'Organic Green Tea Bulk Pack',
    category: 'beverages-drinks', // Yahan category id match honi chahiye
    categoryName: 'Beverages & Drinks',
    sku: 'TEA-GRN-101',
    price: '$ 24.50',
    priceNumeric: 24.50,
    packSize: 'Master Carton (24 Packs)',
    availability: 'In Stock (Ready to Ship)',
    stockUnits: 800,
    minOrder: '10 Cartons',
    rating: 5.0,
    reviewCount: 42,
    priceNote: 'Wholesale Tiered Pricing Available',
    image: 'https://images.unsplash.com/...',
    description: 'Short product description here.',
    longDescription: 'Detailed commercial description here.',
    features: [
      '100% Certified Organic',
      'Export grade master packaging',
      'Tamper-evident seals'
    ],
    tiers: [
      { range: '10 - 49 Cartons', price: '$ 24.50', discount: 'Base MOQ' },
      { range: '50 - 199 Cartons', price: '$ 21.00', discount: '14% OFF' },
      { range: '200+ Cartons', price: '$ 18.50', discount: '24% Bulk Tier' }
    ],
    specs: [
      { label: 'Origin', value: 'Imported' },
      { label: 'Shelf Life', value: '24 Months' }
    ]
  }
];
```

---

## 🎨 Step 6 (Optional): Color Theme Change

Agar aap har website ko thora alag color dena chahte hain (e.g. ek green theme, ek royal blue, ek gold/navy):

File: [`src/index.css`](file:///d:/Downloads/abeertrading/src/index.css) (Lines 3–15):
```css
:root {
  --primary-navy: #102a3a;       /* Main Header / Footers */
  --secondary-teal: #1a5668;     /* Secondary accents */
  --accent-teal: #1e7087;        /* Buttons & Active tabs */
  --accent-teal-hover: #145061;  /* Hover state */
  --bg-light: #f5f7f9;
  --bg-card: #ffffff;
}
```

---

## 🧪 Step 7: Test & Deploy Karein

### 1. Locally Check Karein
```bash
npm install
npm run dev
```
Browser mein `http://localhost:3000` par website check karein.

### 2. Production Build Check Karein
```bash
npm run build
```
Agar `✓ built in ...` aaye to project bilkul error-free hai.

### 3. Vercel ya Netlify Par Deploy Karein
1. [Vercel.com](https://vercel.com) par login karein.
2. **"Add New Project"** click karein.
3. Naya GitHub repo select karein.
4. Framework **Vite** automatically detect hoga.
5. **Deploy** dabayein — 30 seconds mein website live ho jayegi!
