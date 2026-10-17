# Swera — Personal Portfolio Website
### UI/UX Designer & Web Developer

A production-quality personal portfolio inspired by modern high-craft design studios like Lusion. Built with semantic HTML5, Vanilla modern CSS3 (Custom properties, fluid typography, responsive layout), and performant ES6+ JavaScript with an interactive HTML5 Canvas hero shader.

---

## 🎨 Visual Identity & Design Tokens

- **Dark Plum / Near Black:** `#100D14` (Primary background environment)
- **Royal Purple:** `#5425D8` (Primary brand accent)
- **Electric Violet:** `#B52DFF` (Luminous highlights & depth)
- **Magenta:** `#F044C5` (Gradients & key interactive moments)
- **Silver:** `#C5C5D0` (Restrained secondary details)
- **Soft White:** `#F7F5FA` (High-contrast, accessible typography)

---

## 📁 Repository Structure

```
portfolio/
├── index.html                   # Main semantic entrypoint with full OpenGraph/SEO
├── README.md                    # Project documentation and deployment guide
├── PORTFOLIO_IMPLEMENTATION_PLAN.md # Strategic design & technical implementation plan
├── assets/
│   └── images/
│       ├── aura-fintech.jpg     # Aura Wealth Intelligence project visual
│       ├── lumina-spatial.jpg   # Lumina Spatial Studio project visual
│       ├── vanguard-health.jpg  # Vanguard Telehealth Suite project visual
│       └── kroma-tokens.jpg     # Kroma Design System project visual
├── css/
│   ├── variables.css            # Brand color tokens, typography scale, elevations
│   ├── base.css                 # CSS reset, fluid typography, accessibility rules
│   ├── components.css           # Navigation, buttons, badges, modals, form controls
│   ├── sections.css             # Hero, work, case studies, services, about, contact
│   └── responsive.css           # Tablet and mobile fluid adaptations
└── js/
    ├── portfolio-data.js        # Centralized editable configuration for all content
    ├── canvas-hero.js           # 60fps interactive particle & mesh shader
    ├── case-studies.js          # Interactive case study modal engine (WCAG accessible)
    ├── navigation.js            # Sticky header, mobile drawer toggle, scrollspy
    ├── form-handler.js          # Contact inquiry validation and direct mailto link
    └── main.js                  # IntersectionObserver reveals and smooth scroll
```

---

## ⚙️ How to Update Personal Information & Projects

All copy, projects, and contact information are centralized in [js/portfolio-data.js](file:///d:/Faiz/SMIT/swera%20projects/portfolio/js/portfolio-data.js).

To customize your details:
1. Open [js/portfolio-data.js](file:///d:/Faiz/SMIT/swera%20projects/portfolio/js/portfolio-data.js).
2. Edit `profile.name`, `profile.fullName`, `profile.email`, `profile.linkedin`, and `profile.github`.
3. Update project details, images, or client outcomes in the `projects` array.
4. Modify services, skills, or methodology steps in their respective sections.

---

## 🚀 Running Locally

Because this project is built on pure web standards without bloated dependencies or build chains, you can run it immediately:

### Option 1: Direct Browser Launch
Simply double-click or open [index.html](file:///d:/Faiz/SMIT/swera%20projects/portfolio/index.html) in any modern browser (Chrome, Edge, Firefox, Safari).

### Option 2: Local HTTP Server (VS Code Live Server)
If you use VS Code or Antigravity IDE, right-click `index.html` and click **"Open with Live Server"**.

### Option 3: Python / Node (if installed)
```bash
# Python 3
python -m http.server 8080

# Node.js
npx serve .
```

---

## 🚢 Deployment Options

This portfolio is static and can be deployed anywhere with 100% reliability and zero costs:

1. **GitHub Pages:**
   - Push this repository to GitHub.
   - Go to **Settings > Pages > Branch: `main` / `root` > Save**.
2. **Vercel / Netlify:**
   - Drag and drop the `portfolio` folder directly into Vercel or Netlify Dashboard.
   - Or connect the Git repository for automated deployments.

---

## ♿ Accessibility & Performance Compliance
- Strict WCAG 2.1 AA text-to-background contrast ratios.
- Full keyboard navigation support (Tab navigation with visible focus rings).
- Escape key listener and backdrop clicks for the case study modal.
- `prefers-reduced-motion` detection disabling demanding animations.
- Lightweight particle canvas engine that pauses when out of viewport or when tab is hidden.
