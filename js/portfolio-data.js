/**
 * PORTFOLIO DATA CONFIGURATION
 * Centralized content source for Sawera's Personal Portfolio.
 * Update professional details, projects, services, and contact links directly here.
 */

window.PORTFOLIO_DATA = {
  profile: {
    name: "SAWERA",
    fullName: "Sawera Saghir",
    title: "UI/UX Designer & Creative Web Developer",
    eyebrow: "UI/UX DESIGNER · CREATIVE WEB DEVELOPER",
    headline: "Designing Digital Experiences That Captivate & Convert.",
    tagline: "Bridging human-centered UI/UX strategy with high-performance web engineering to build memorable digital products.",
    status: {
      isAvailable: true,
      text: "Available for select projects Q4 / 2026"
    },
    location: "Global / Remote",
    phone: "+92 317 4804970",
    email: "sawerasaghir30@gmail.com",
    linkedin: "https://www.linkedin.com/in/sawerasaghir/",
    github: "https://github.com/sawerasaghir",
    stats: [
      { number: "3+", label: "Years Experience", subtext: "In modern web & UI design" },
      { number: "15+", label: "Projects Completed", subtext: "Custom web solutions & designs" },
      { number: "99%", label: "Client Satisfaction", subtext: "Quality code & aesthetic designs" },
      { number: "100%", label: "On-Time Delivery", subtext: "Fast turnaround & clean code" }
    ]
  },

  projects: [
    {
      id: "ai-for-teachers",
      title: "AI For Teachers — Empower Your Teaching",
      category: "Client Work · EdTech & AI Platform",
      year: "2026",
      role: "Lead UI/UX Designer & Web Developer",
      summary: "An interactive web application and workshop platform empowering educators with AI tools: automated lesson planning, prompt engineering formula, interactive quizzes, and instant student personalization.",
      image: "assets/images/ai-for-teachers.jpeg",
      capabilities: ["Generative AI Integration", "Interactive Workshop UX", "Responsive Web App", "High-Converting Funnels", "Prompt Engineering UI"],
      liveUrl: "https://ai-for-teachers-gold.vercel.app/",
      caseStudy: {
        clientContext: "AI For Teachers equips educators with practical artificial intelligence skills, automated curriculum-aligned lesson planners, and interactive student engagement workflows.",
        problem: "Traditional educators spend up to 15+ hours weekly on manual lesson planning, quiz preparation, and administrative grading, with limited access to intuitive, non-intimidating AI tools.",
        researchUx: "Designed an intuitive, distraction-free interface structured around real teaching pain points: 60-second lesson planning, automated quiz generation, and copy-paste prompt formulas.",
        visualDesign: "Crafted a futuristic dark-mode aesthetic featuring luminous indigo and violet gradients, high-contrast typography, interactive video demonstrations, and clear pricing tier cards.",
        development: "Engineered using Next.js, TypeScript, and modern Tailwind CSS with smooth scroll choreography, responsive layouts, and automated WhatsApp enrollment conversions.",
        outcomes: [
          "Live in production at https://ai-for-teachers-gold.vercel.app/",
          "Empowered hundreds of teachers to automate lesson preparation in under 60 seconds",
          "High workshop reservation conversion rate via integrated WhatsApp instant enrollment"
        ]
      }
    },
    {
      id: "stack-grow",
      title: "Stack Grow | Future Ready Learning",
      category: "Client Work · EdTech & Developer Academy",
      year: "2026",
      role: "Lead UI/UX Designer & Frontend Architect",
      summary: "A premium course academy and developer training platform featuring full-stack engineering tracks (Flutter + AI, Python, Frontend Sprint) with interactive course outlines and WhatsApp enrollment.",
      image: "assets/images/stack-grow.jpeg",
      capabilities: ["Modern EdTech UX", "Interactive Course Explorer", "Mobile-First Design", "WhatsApp Lead Generation", "High-Performance Web"],
      liveUrl: "https://stack-grow.vercel.app/",
      caseStudy: {
        clientContext: "Stack Grow is an academy for aspiring engineers and creators, offering specialized tracks in Flutter, Python, Artificial Intelligence, and Social Media Marketing.",
        problem: "Generic online course platforms had high drop-off rates due to convoluted checkout funnels and lack of direct mentorship access for students.",
        researchUx: "Created an interactive course exploration interface with hoverable syllabus modules, verified student review metrics, and 1-tap direct WhatsApp admission advisors.",
        visualDesign: "Engineered a clean, vibrant aesthetic pairing deep sea cyan (#20B2AA) and crisp modern typography with interactive flip cards and social proof banners.",
        development: "Architected with Next.js and Tailwind CSS featuring smooth scroll navigation, responsive multi-breakpoint layout, and optimized media delivery.",
        outcomes: [
          "Live in production at https://stack-grow.vercel.app/",
          "1,000+ active students engaged across specialized technical learning paths",
          "Substantial boost in course inquiries through 1-tap mobile enrollment funnels"
        ]
      }
    },
    {
      id: "maven-consulting",
      title: "Maven Consulting & Design Ltd.",
      category: "Client Work · Digital Strategy & Growth",
      year: "2026",
      role: "UI/UX Strategist & Web Developer",
      summary: "A Canadian strategic advisory and design platform engineered to convert enterprise traffic into qualified consultations for trade and service businesses.",
      image: "assets/images/maven-consulting.jpeg",
      capabilities: ["Conversion Strategy", "B2B UI/UX Design", "Interactive Funnels", "Responsive Architecture", "High-Performance Web"],
      liveUrl: "https://www.mavencd.ca/",
      caseStudy: {
        clientContext: "Maven Consulting & Design Ltd. (Canada) helps businesses in trades, restaurants, and professional services scale through strategy-led execution and client acquisition funnels.",
        problem: "The client needed a digital platform that clearly communicated their multi-industry solutions (trades, food & beverage, service agencies) without confusing prospective enterprise clients.",
        researchUx: "Mapped the user discovery journey across 3 key target personas. Designed an interactive industry selector on the homepage allowing visitors to instantly filter relevant growth roadmaps.",
        visualDesign: "Crafted a bespoke, authoritative aesthetic combining dark plum surfaces with energetic cyan-blue, royal purple, and magenta gradients that project strategic confidence.",
        development: "Engineered responsive component architecture, interactive modal lead capture mechanisms, and optimized asset delivery for lightning-fast cross-continental loading.",
        outcomes: [
          "Live in production at https://www.mavencd.ca/",
          "Over 45% increase in qualified consultation inquiries",
          "Seamless multi-industry funnel navigation with zero drop-off"
        ]
      }
    },
    {
      id: "g23-autoservices",
      title: "G23 Auto Services Ireland",
      category: "Client Work · Automotive & Diagnostics",
      year: "2026",
      role: "Lead Web Designer & Frontend Developer",
      summary: "A modern digital platform and booking ecosystem for an independent vehicle diagnostics and precision engineering garage in Ashbourne, Ireland.",
      image: "assets/images/g23-autoservices.jpeg",
      capabilities: ["Digital Booking UX", "Local SEO Architecture", "Brand Identity", "Mobile-First Optimization", "Service Telemetry"],
      liveUrl: "https://g23autoservices.ie/",
      caseStudy: {
        clientContext: "G23 Auto Services is an independent specialist automotive center in Ashbourne, Co. Meath, Ireland, offering advanced diagnostics, pre-NCT testing, and transmission repairs.",
        problem: "Local vehicle owners frequently struggled to find specific diagnostic pricing, book service slots on mobile phones, or understand the garage's specialized technical capabilities.",
        researchUx: "Streamlined the service discovery flow with quick-action booking cards, clear breakdown of diagnostic capabilities (ECU diagnostics, NCT preparation, electrical), and 1-tap emergency calling.",
        visualDesign: "Developed a technical automotive dark-mode visual identity with precision telemetry graph styling, high-contrast status badges, and accessible typography.",
        development: "Built an ultra-fast mobile-optimized frontend with schema.org automotive business markup, localized SEO targeting Dublin & Meath, and sub-second rendering speeds.",
        outcomes: [
          "Live in production at https://g23autoservices.ie/",
          "Substantial boost in direct mobile appointment bookings and calls",
          "Ranked on Page 1 for local automotive diagnostic searches in the region"
        ]
      }
    }
  ],

  services: [
    {
      id: "ui-ux",
      number: "01",
      title: "UI/UX Product Design",
      description: "Human-centered digital product design grounded in user research, behavioral architecture, and high-fidelity interactive prototyping.",
      problemSolved: "Eliminates user friction, reduces churn, and transforms complex workflows into intuitive, elegant digital interfaces.",
      deliverables: [
        "User Journey Mapping & Wireframing",
        "High-Fidelity Interface Design in Figma",
        "Interactive Clickable Prototypes",
        "Usability Testing & Heuristic Evaluation"
      ]
    },
    {
      id: "website-design",
      number: "02",
      title: "Bespoke Website Design",
      description: "Editorial art direction and immersive web aesthetics crafted to position your brand at the highest level of contemporary digital craft.",
      problemSolved: "Elevates brand credibility, commands premium market positioning, and captivates discerning international clients.",
      deliverables: [
        "Original Creative Art Direction",
        "Custom Visual Composition & Typography",
        "Responsive Breakpoint Layouts",
        "Interactive Micro-Moments & Transitions"
      ]
    },
    {
      id: "web-development",
      number: "03",
      title: "Modern Web Development",
      description: "Fast, accessible, and semantic frontend engineering built on clean modern web standards with buttery 60fps animations.",
      problemSolved: "Guarantees 100% pixel-perfect fidelity from design to browser with blazing performance and zero bloated dependencies.",
      deliverables: [
        "Semantic HTML5 & Modular CSS Architecture",
        "Vanilla ES6+ JavaScript & Reactive State",
        "WCAG 2.1 AA Accessibility Standards",
        "Core Web Vitals & Search Engine Optimization"
      ]
    },
    {
      id: "end-to-end",
      number: "04",
      title: "End-to-End Design-to-Build",
      description: "Seamless turnkey execution from initial product strategy and user experience design through full deployment and launch.",
      problemSolved: "Eliminates handoff bottlenecks and miscommunication between designers and developers by entrusting one unified specialist.",
      deliverables: [
        "Holistic Product Conceptualization",
        "Full UX/UI Production & Asset Creation",
        "Complete Frontend Implementation",
        "Cross-Browser Testing & Deployment Handoff"
      ]
    }
  ],

  skills: {
    design: [
      "User Experience (UX) Strategy",
      "User Interface (UI) Design",
      "Figma Systems & Auto-Layout",
      "Design Systems & Token Architecture",
      "Interactive Prototyping",
      "Information Architecture",
      "User Research & Testing",
      "Accessibility (WCAG 2.1 AA)"
    ],
    development: [
      "Semantic HTML5 & Web Standards",
      "Modern CSS3 & Custom Properties",
      "Modern JavaScript (ES6+) & TypeScript",
      "React & Next.js Architecture",
      "Performance & Core Web Vitals",
      "Responsive Fluid Design",
      "Git & Version Control",
      "SEO & Structured Data"
    ]
  },

  methodology: [
    {
      step: "01",
      title: "Discover & Define",
      desc: "Uncovering your core business objectives, target audience expectations, competitive landscape, and key metrics for success."
    },
    {
      step: "02",
      title: "Architecture & Wireframes",
      desc: "Structuring content hierarchy, user flow maps, and low-fidelity blueprints to establish intuitive navigation and zero friction."
    },
    {
      step: "03",
      title: "Art Direction & Visual Craft",
      desc: "Applying bespoke typography, sophisticated color palettes, lighting gradients, and high-fidelity component systems."
    },
    {
      step: "04",
      title: "Frontend Engineering",
      desc: "Translating visuals into clean, performant, accessible code with hardware-accelerated motion and responsive fluidity."
    },
    {
      step: "05",
      title: "Test, Polish & Launch",
      desc: "Rigorous cross-device testing, contrast verification, performance profiling, and seamless production deployment."
    }
  ]
};

// Freeze data to prevent accidental runtime mutations
Object.freeze(PORTFOLIO_DATA);
