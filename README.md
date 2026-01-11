# Product Disclosure UI

A frontend web application for browsing and viewing **producer-declared product information**. The system is designed to prioritize **clarity, transparency, and institutional-grade presentation**, without implying verification, approval, certification, or endorsement of any product data.

---

## Purpose

This project demonstrates a disclosure-first user interface pattern suitable for regulated, quasi-regulated, or trust-sensitive domains (e.g., fintech, healthcare, infrastructure, AI systems). All information displayed is explicitly **producer-reported**, and the UI language is carefully constrained to avoid authoritative or validating signals.

The application is **read-only by design** and intentionally excludes transactional, approval, or enforcement workflows.

---

## Application Overview

The system implements a **two-page disclosure experience**:

### 1. Product Listing Page

* Presents a catalog of products with producer-declared attributes
* Supports search, category filtering, status filtering, and sorting
* Uses a calm, registry-style layout optimized for scanning and comparison

### 2. Product Detail Page

* Displays detailed disclosure information for a selected product
* Includes a disclosure summary, version history, and a mandatory disclaimer
* Employs precise language to reinforce producer responsibility for all data

---

## Design Principles

### Disclosure-Centered Communication

* All content is explicitly framed as producer-declared
* No language implying validation, approval, or institutional authority

### Institutional Visual Design

* Muted, neutral color palette
* Consistent spacing and typography
* Visual conventions inspired by government, healthcare, and financial systems

### Clarity Over Complexity

* Predictable layouts and interactions
* Minimal visual noise and restrained motion
* Focus on readability and information hierarchy

### Accessibility Awareness

* Semantic HTML structure
* Keyboard-accessible navigation
* Visible focus states and accessible contrast ratios

---

## Technology Stack

* **React** – component-based UI
* **Vite** – fast development and build tooling
* **Tailwind CSS** – utility-first styling with disciplined constraints
* **Client-side state** with mock data (no backend dependencies)

---

## UI Characteristics

* Card-based, registry-style layout
* Muted status indicators (Draft, Submitted, Published)
* Subtle hover and focus affordances
* Short, consistent transitions (150–250ms)
* Skeleton loading placeholders
* Clear empty and no-results states
* Fully keyboard-navigable interface

---

## Project Structure

```
hedamo/
├── src/
│   ├── App.jsx        # Application routing and core UI composition
│   ├── data.js       # Mock product data and taxonomies
│   ├── index.css     # Global Tailwind v4 / PostCSS styles
│   └── main.jsx      # Application entry point
├── postcss.config.js # PostCSS configuration
├── vite.config.js    # Vite and React plugin setup
└── package.json      # Dependencies and scripts
```

---

## Getting Started

### Prerequisites

* Node.js v18 or later
* npm or yarn

### Installation

Clone the repository:

```
git clone https://github.com/your-username/product-disclosure-ui.git
cd product-disclosure-ui
```

Install dependencies:

```
npm install
```

Start the development server:

```
npm run dev
```

Open the application in your browser:

```
http://localhost:5173
```

---

## Available Scripts

* `npm run dev` — Start the development server
* `npm run build` — Create a production build
* `npm run preview` — Preview the production build locally

---

## Disclaimer

This application displays **producer-declared information only**.

It does **not** certify, verify, approve, validate, or endorse any product, claim, or dataset. All information presented is the sole responsibility of the producing entity.

---

## Notes

* This project emphasizes frontend craftsmanship, visual discipline, and UX rigor.
* Language and visual cues are intentionally restrained to avoid signaling authority or endorsement.
* Built for demonstration, evaluation, and design exploration purposes only.
