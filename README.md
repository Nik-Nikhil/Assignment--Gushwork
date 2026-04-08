# Mangalam HDPE Pipes — Product Landing Page

A responsive product landing page for Mangalam HDPE Pipes & Coils, built with vanilla HTML, CSS, and JavaScript — no frameworks or dependencies.

---

## Features

- Sticky price bar that appears after scrolling past the hero section
- Product image carousel with prev/next navigation and thumbnail selection
- Hover-activated image zoom with lens and preview panel
- Responsive navigation with hamburger menu for mobile
- Dismissible announcement bar
- Accordion FAQ section
- Horizontally scrollable applications carousel
- Process tabs for manufacturing steps
- Catalogue request and contact forms with basic email validation
- Modal overlays for catalogue and callback requests
- Smooth scroll and CSS transitions throughout

---

## Project Structure

```
├── index.html       # Main HTML — all sections and markup
├── styles.css       # All styles — Figma-matched design tokens, layout, components
├── script.js        # Vanilla JS — interactivity for all components
└── img/             # Images and icons used across the page
```

---

## Sections

| Section | Description |
|---|---|
| Announcement Bar | Dismissible top banner with CTA link |
| Navigation | Sticky-capable top nav with mobile hamburger |
| Hero | Product carousel with zoom + pricing info |
| Trust Bar | Partner logo strip |
| Technical Specs | Dark-themed specs table with download CTA |
| Features | 3-column feature card grid |
| FAQ | Accordion-style Q&A |
| Applications | Horizontally scrollable card carousel |
| Manufacturing Process | Tabbed process walkthrough |
| Testimonials | Customer review cards |
| Contact / Footer | Quote request form and footer links |

---

## Key Implementations

### Sticky Price Bar
Activates via `IntersectionObserver`-style scroll listener — becomes visible once the hero section scrolls out of view. Uses CSS `transform: translateY` for smooth entry.

### Image Carousel + Zoom
- Prev/next buttons and thumbnail clicks update the main image
- On hover, a lens overlay tracks the cursor and a zoomed preview panel renders at 3× scale
- Zoom preview is positioned to the right of the carousel

### Responsive Design
- Fluid layout using `clamp()` for font sizes and spacing
- Mobile nav hidden behind hamburger toggle below `768px`
- Grid and flex layouts collapse gracefully on smaller screens

### Forms
- Email regex validation on submit
- Submit button disabled during simulated async send
- Success/error feedback shown inline

---

## Evaluation Criteria

- Figma design accuracy — spacing, typography, colors, and component structure match the provided spec
- Code quality — semantic HTML, BEM-style CSS class naming, modular IIFE-wrapped JS
- Sticky header — smooth scroll-triggered price bar with CSS transition
- Image carousel — functional navigation with zoom lens and preview panel
- Responsive design — mobile-first breakpoints, hamburger nav, fluid widths
- Code readability — commented sections, consistent formatting, no external dependencies

---

## Getting Started

No build step required. Open `index.html` directly in a browser.

```bash
# Or serve locally with any static server
npx serve .
```

---

## Tech Stack

- HTML5
- CSS3 (custom properties, flexbox, grid, clamp)
- Vanilla JavaScript (ES6+, IIFEs, passive scroll listeners)
- Google Fonts — Inter, Urbanist
