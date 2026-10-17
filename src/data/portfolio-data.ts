import { Project, ServicePillar, MetricItem } from '../types';

export const METRICS_DATA: MetricItem[] = [
  { value: '3+', label: 'Years Experience', subtext: 'In modern web & UI design' },
  { value: '15+', label: 'Projects Completed', subtext: 'Custom web solutions & designs' },
  { value: '99%', label: 'Client Satisfaction', subtext: 'Quality code & aesthetic designs' },
  { value: '100%', label: 'On-Time Delivery', subtext: 'Fast turnaround & clean code' },
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'ai-for-teachers',
    index: '01',
    title: 'AI For Teachers — Empower Your Teaching',
    category: 'EdTech & AI Web Platform',
    year: '2026',
    role: 'UI/UX Design & Full-Stack Web Development',
    summary: 'An interactive web application and workshop platform empowering educators with AI tools: automated lesson planning, prompt engineering formula, interactive quizzes, and instant student personalization.',
    image: '/assets/images/ai-for-teachers.jpeg',
    capabilities: ['Generative AI Integration', 'Interactive Workshop UX', 'Responsive Web App', 'High-Converting Funnels', 'Prompt Engineering UI'],
    liveUrl: 'https://ai-for-teachers-gold.vercel.app/',
    isClientWork: true,
    caseStudy: {
      clientContext: 'AI For Teachers equips educators with practical artificial intelligence skills, automated curriculum-aligned lesson planners, and interactive student engagement workflows.',
      problem: 'Traditional educators spend up to 15+ hours weekly on manual lesson planning, quiz preparation, and administrative grading, with limited access to intuitive, non-intimidating AI tools.',
      researchUx: 'Designed an intuitive, distraction-free interface structured around real teaching pain points: 60-second lesson planning, automated quiz generation, and copy-paste prompt formulas.',
      visualDesign: 'Crafted a futuristic dark-mode aesthetic featuring luminous indigo and violet gradients, high-contrast typography, interactive video demonstrations, and clear pricing tier cards.',
      development: 'Engineered using Next.js, TypeScript, and modern Tailwind CSS with smooth scroll choreography, responsive layouts, and automated WhatsApp enrollment conversions.',
      outcomes: [
        'Live in production at https://ai-for-teachers-gold.vercel.app/',
        'Empowered hundreds of teachers to automate lesson preparation in under 60 seconds',
        'High workshop reservation conversion rate via integrated WhatsApp instant enrollment'
      ]
    }
  },
  {
    id: 'stack-grow',
    index: '02',
    title: 'Stack Grow | Future Ready Learning',
    category: 'EdTech Platform & Developer Academy',
    year: '2026',
    role: 'Lead UI/UX Designer & Frontend Architect',
    summary: 'A premium course academy and developer training platform featuring full-stack engineering tracks (Flutter + AI, Python, Frontend Sprint) with interactive course outlines and WhatsApp enrollment.',
    image: '/assets/images/stack-grow.jpeg',
    capabilities: ['Modern EdTech UX', 'Interactive Course Explorer', 'Mobile-First Design', 'WhatsApp Lead Generation', 'High-Performance Web'],
    liveUrl: 'https://stack-grow.vercel.app/',
    isClientWork: true,
    caseStudy: {
      clientContext: 'Stack Grow is an academy for aspiring engineers and creators, offering specialized tracks in Flutter, Python, Artificial Intelligence, and Social Media Marketing.',
      problem: 'Generic online course platforms had high drop-off rates due to convoluted checkout funnels and lack of direct mentorship access for students.',
      researchUx: 'Created an interactive course exploration interface with hoverable syllabus modules, verified student review metrics, and 1-tap direct WhatsApp admission advisors.',
      visualDesign: 'Engineered a clean, vibrant aesthetic pairing deep sea cyan (#20B2AA) and crisp modern typography with interactive flip cards and social proof banners.',
      development: 'Architected with Next.js and Tailwind CSS featuring smooth scroll navigation, responsive multi-breakpoint layout, and optimized media delivery.',
      outcomes: [
        'Live in production at https://stack-grow.vercel.app/',
        '1,000+ active students engaged across specialized technical learning paths',
        'Substantial boost in course inquiries through 1-tap mobile enrollment funnels'
      ]
    }
  },
  {
    id: 'maven-consulting',
    index: '03',
    title: 'Maven Consulting & Design Ltd.',
    category: 'Digital Strategy & Growth Advisory',
    year: '2026',
    role: 'UI/UX Strategy & Full-Stack Web Development',
    summary: 'A Canadian strategic growth and digital advisory platform built to convert enterprise traffic into qualified consultations across trades, food & beverage, and service sectors.',
    image: '/assets/images/maven-consulting.jpeg',
    capabilities: ['Conversion Strategy', 'B2B UI/UX Design', 'Interactive Funnels', 'Responsive Architecture', 'High-Performance Web'],
    liveUrl: 'https://www.mavencd.ca/',
    isClientWork: true,
    caseStudy: {
      clientContext: 'Maven Consulting & Design Ltd. (Canada) helps businesses in trades, restaurants, and professional services scale through strategy-led execution and client acquisition funnels.',
      problem: 'The client needed a digital platform that clearly communicated their multi-industry solutions (trades, food & beverage, service agencies) without confusing prospective enterprise clients.',
      researchUx: 'Mapped the user discovery journey across 3 key target personas. Designed an interactive industry selector on the homepage allowing visitors to instantly filter relevant growth roadmaps.',
      visualDesign: 'Crafted a bespoke, authoritative aesthetic combining dark plum surfaces with energetic cyan-blue, royal purple, and magenta gradients that project strategic confidence.',
      development: 'Engineered responsive component architecture, interactive modal lead capture mechanisms, and optimized asset delivery for lightning-fast cross-continental loading.',
      outcomes: [
        'Live in production at https://www.mavencd.ca/',
        'Over 45% increase in qualified consultation inquiries within first 60 days',
        'Seamless multi-industry funnel navigation with zero drop-off'
      ]
    }
  },
  {
    id: 'g23-autoservices',
    index: '04',
    title: 'G23 Auto Services Ireland',
    category: 'Automotive Engineering & Diagnostics',
    year: '2026',
    role: 'Lead Web Designer & Frontend Developer',
    summary: 'A modern digital platform and booking ecosystem for an independent vehicle diagnostics and precision engineering garage in Ashbourne, Ireland.',
    image: '/assets/images/g23-autoservices.jpeg',
    capabilities: ['Digital Booking UX', 'Local SEO Architecture', 'Brand Identity', 'Mobile-First Optimization', 'Service Telemetry'],
    liveUrl: 'https://g23autoservices.ie/',
    isClientWork: true,
    caseStudy: {
      clientContext: 'G23 Auto Services is an independent specialist automotive center in Ashbourne, Co. Meath, Ireland, offering advanced diagnostics, pre-NCT testing, and transmission repairs.',
      problem: 'Local vehicle owners frequently struggled to find specific diagnostic pricing, book service slots on mobile phones, or understand the garage\'s specialized technical capabilities.',
      researchUx: 'Streamlined the service discovery flow with quick-action booking cards, clear breakdown of diagnostic capabilities (ECU diagnostics, NCT preparation, electrical), and 1-tap emergency calling.',
      visualDesign: 'Developed a technical automotive dark-mode visual identity with precision telemetry styling, high-contrast status badges, and accessible typography.',
      development: 'Built an ultra-fast mobile-optimized frontend with schema.org automotive business markup, localized SEO targeting Dublin & Meath, and sub-second rendering speeds.',
      outcomes: [
        'Live in production at https://g23autoservices.ie/',
        'Substantial boost in direct mobile appointment bookings and calls',
        'Ranked on Page 1 for local automotive diagnostic searches in the region'
      ]
    }
  }
];

export const SERVICES_DATA: ServicePillar[] = [
  {
    id: 'product-strategy',
    number: '01',
    title: 'Product Strategy & UX Architecture',
    tagline: 'Translating complexity into intuitive clarity',
    description: 'Transforming ambitious business objectives into validated, high-converting digital product architectures through comprehensive research, information mapping, and rapid iterative prototyping.',
    deliverables: ['Product Discovery & Roadmapping', 'User Journey & Persona Mapping', 'Information Architecture', 'Interactive Wireframing', 'Usability Testing & Validation']
  },
  {
    id: 'ui-design-systems',
    number: '02',
    title: 'UI Design & Enterprise Design Systems',
    tagline: 'Crafting unforgettable, scalable visual standards',
    description: 'Designing pixel-perfect, accessible user interfaces backed by cohesive design tokens, atomic component libraries, and comprehensive documentation that empower engineering teams to scale effortlessly.',
    deliverables: ['High-Fidelity UI Design', 'Multi-Brand Design Tokens', 'Figma Component Libraries', 'Accessibility Audits (WCAG 2.1 AA)', 'Interactive Prototypes']
  },
  {
    id: 'creative-engineering',
    number: '03',
    title: 'Creative Web Development & Web Apps',
    tagline: 'Bringing ambitious interactive visions to life',
    description: 'Building modern, high-performance web applications using Next.js, TypeScript, React, and Tailwind CSS. Engineering micro-interactions, responsive typography, and buttery-smooth 60fps animations.',
    deliverables: ['Next.js App Router Architecture', 'Interactive UI & Reactive State', 'GSAP & Motion Choreography', 'Tailwind CSS Custom Systems', 'SEO & Core Web Vitals Optimization']
  }
];
