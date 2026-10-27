# Thetidhkar — Thoughtful Gifts & Handmade Candles

A clean, modern, frontend-only React JS + Tailwind CSS e-commerce showcase application powered by Vite.

## 🌸 Overview

Thetidhkar is an artisanal gift boutique specializing in handmade flower candles, romantic candle trios, elegant pearl accessories, and curated gift sets. Orders and inquiries are handled directly through Instagram.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

```bash
npm install
```

### Development Server

Start the local Vite development server:

```bash
npm run dev
```

Visit [http://localhost:5173/](http://localhost:5173/) to view the store.

### Production Build

Create an optimized production bundle:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## 🛠️ Tech Stack

- **Framework**: React 19 (JavaScript JSX)
- **Styling**: Tailwind CSS v4 & custom design tokens
- **Build Tool**: Vite 7
- **Routing**: Wouter (lightweight client-side router)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Notifications**: Radix UI Toast (with custom toaster)

## 📁 Project Structure

```
├── public/                # Static assets & product photographs
│   ├── assets/            # WebP product images and hero banner
│   ├── favicon.svg        # Brand favicon
│   └── robots.txt         # SEO robots directives
├── src/
│   ├── components/        # Storefront sections and UI components
│   │   ├── ui/            # Card, Toast, Toaster, Tooltip primitives
│   │   ├── error-boundary.jsx
│   │   └── Storefront.jsx # Complete storefront layout and sections
│   ├── config/            # Site configuration & social links
│   │   └── site.js
│   ├── data/              # Static product catalogs & FAQ answers
│   │   ├── faqs.js
│   │   └── products.js
│   ├── hooks/             # Custom React hooks (useToast)
│   ├── lib/               # Utility functions (cn helper)
│   ├── pages/             # Route pages (Home, NotFound)
│   ├── App.jsx            # Application shell & routing
│   ├── index.css          # Design system, theme tokens & responsive styles
│   └── main.jsx           # React DOM entry point
├── index.html             # HTML entry point with SEO metadata
├── vite.config.js         # Vite configuration with Tailwind CSS plugin
└── package.json           # Scripts and dependencies
```

## ✨ Key Features

- **Interactive Anti-Gravity Hero**: Parallax zero-gravity floating candle artwork reacting smoothly to mouse coordinates, accompanied by floating pearls and drifting rose petals.
- **Dynamic Category Filtering**: Seamlessly filter products across Candles, Flower Candles, Accessories, and Gift Sets with animated layout transitions.
- **Product Quick View Modal**: Accessible modal dialog with focus trapping, keyboard navigation (`Escape`, `Tab`), and direct Instagram inquiry actions.
- **Animated FAQ Accordion**: Interactive accordion explaining custom gifting, fragrance notes, order lead times, and shipping.
- **Fully Responsive**: Optimized layouts tested across mobile (320px, 375px), tablet (768px), and desktop (1024px, 1440px) screen sizes.
