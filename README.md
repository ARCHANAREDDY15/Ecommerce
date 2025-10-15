# 🛍️ Ecommerce Store

A modern, Pinterest-inspired ecommerce website built with React, Bootstrap, and Vite. Features a warm orange color scheme, smooth animations, and responsive design.


## 🚀 Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: CSS3, Bootstrap 5
- **Icons**: React Icons, Font Awesome
- **API**: DummyJSON for product data
- **State Management**: React Hooks, localStorage

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/ARCHANAREDDY15/Ecommerce.git
cd Ecommerce
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## 🏗️ Project Structure

```
src/
├── Components/
│   ├── Navbar/          # Navigation with categories dropdown
│   ├── Carousel/        # Hero image carousel
│   ├── CategoryCard/    # Category display cards
│   ├── ProductCard/     # Product display cards
│   └── Footer/          # Site footer with social links
├── Pages/
│   ├── Home/            # Landing page
│   ├── Product/         # Individual product page
│   └── CartPage/        # Shopping cart
├── utils/
│   └── cartUtils.js     # Cart management utilities
└── assets/              # Static assets
```

## 🎨 Design Features

- **Color Scheme**: Warm orange gradients (#ff6b35 to #f7931e)
- **Animations**: Cubic-bezier easing for smooth transitions
- **Hover Effects**: Scale, rotate, and lift animations
- **Glassmorphism**: Backdrop blur and transparency effects
- **Typography**: Modern font stack with proper spacing

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: 576px, 768px, 992px, 1200px
- Optimized touch interactions
- Flexible grid layouts

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
