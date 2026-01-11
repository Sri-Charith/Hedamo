# Hedamo — Product Disclosure Registry

Hedamo is a professional, institutional-grade product registry interface built for producer-declared disclosures. It is designed with a "trust through transparency" philosophy, focusing on neutral, objective presentation of healthcare and industrial product information.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19-blue.svg)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-38B2AC.svg)

## 🏛️ Design Philosophy

Hedamo departs from traditional e-commerce or marketing-led interfaces. Instead, it adopts an **Institutional Design System** similar to fintech, healthcare registries, or government portals.

### High-Impact Design Prompt
The entire UI was built following this core logic:
> "Design a Product Disclosure system that feels institutional, calm, and trustworthy. Use a neutral palette with a single blue-600 accent. Every interaction must be restrained. The language must strictly reflect 'disclosure' and never imply 'verification' or 'certification'."

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js**: Version 18.0 or higher
- **npm**: Version 9.0 or higher

### 1. Clone & Install
```bash
# Clone the repository
git clone https://github.com/Sri-Charith/Hedamo.git

# Navigate to directory
cd hedamo

# Install dependencies
npm install
```

### 2. Development
```bash
# Start the development server
npm run dev
```
The app will be available at `http://localhost:5173`.

### 3. Build & Production
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🎨 Visual System & Hierarchy

### Color Palette
- **Background**: `gray-50` (soft off-white)
- **Surfaces**: `white` (cards and modula components)
- **Borders**: `gray-200` (subtle separation)
- **Text**: `gray-900` (Primary) / `gray-500` (Secondary)
- **Accent**: `blue-600` (Focus, links, and primary actions)

### Status Badges (Muted Professionalism)
- **Draft**: `bg-gray-100` / `text-gray-700`
- **Submitted**: `bg-blue-100` / `text-blue-700`
- **Published**: `bg-green-100` / `text-green-700`

### Spacing & Typography
- **Scale**: Strict 4 / 8 / 16 / 24 / 32px increments.
- **Typography**: Inter (Google Fonts) for high legibility and professional tone.
- **Transitions**: Global 150–250ms ease-out for all interactions.

---

## 🛠️ Key Features

- **Product Registry Listing**: Searchable, filterable grid of disclosures.
- **Advanced Filtering**: Categorize by industry status and sort by name or recent updates.
- **Secure Detail View**: In-depth product disclosures including version history and evidence counts.
- **Legal Compliance**: Prominent registry disclaimers on every detail page.
- **Accessibility**: First-class support for keyboard navigation with visible focus-ring states.
- **Modern Performance**: Skeleton loading states and ultra-light CSS footprint using Tailwind v4.

---

## 📂 Project Structure

```text
hedamo/
├── src/
│   ├── App.jsx        # Main application logic & routing
│   ├── data.js       # Product and taxonomy definitions
│   ├── index.css     # Global Tailwind v4 / PostCSS styles
│   └── main.jsx      # Entry point
├── postcss.config.js # PostCSS configuration
├── vite.config.js    # Vite & React plugin setup
└── package.json      # Dependencies and scripts
```

---

## ⚖️ Disclaimer
This interface is a demonstration of a disclosure-first UI. All data displayed is producer-declared; it is not certification or verification by any governing body.

---

Developed with a focus on Frontend Design Maturity.
