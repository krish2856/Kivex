const serviceCategories = [
    {
        "id": "cat-web",
        "title": "Web Development",
        "icon": "💻",
        "desc": "Custom websites, stores, and web apps.",
        "services": [
            "web-design",
            "development",
            "single-page",
            "shopify",
            "web-apps"
        ]
    },
    {
        "id": "cat-ai",
        "title": "AI & Automation",
        "icon": "🤖",
        "desc": "Smart systems to scale your operations.",
        "services": [
            "ai-marketing",
            "automation",
            "ai-chatbots",
            "ai-workflow",
            "lead-gen"
        ]
    },
    {
        "id": "cat-creative",
        "title": "Creative & Media",
        "icon": "🎨",
        "desc": "Branding, video, and design assets.",
        "services": [
            "branding",
            "ai-art",
            "promo-video",
            "reels-script",
            "marketing"
        ]
    },
    {
        "id": "cat-digital",
        "title": "Digital Marketing & Online Presence",
        "icon": "📈",
        "desc": "SEO, social media, and email campaigns.",
        "services": [
            "seo-copy",
            "email-templates",
            "social-setup",
            "gmb-setup",
            "smm"
        ]
    },
    {
        "id": "cat-cloud",
        "title": "Cloud & Infrastructure",
        "icon": "☁️",
        "desc": "Servers, hosting, and security.",
        "services": [
            "servers",
            "dns",
            "maintenance",
            "security"
        ]
    }
];

const servicesData = {
    "web-design": {
        "id": "web-design",
        "path": "/web-design",
        "title": "Website Design",
        "tagline": "Interfaces built around how your customers think, not how your org chart looks.",
        "overview": "We craft bespoke, user-centered digital interfaces that merge brand storytelling with high-converting UX architecture. Every element is designed with intent—from typography hierarchy to micro-interactions—ensuring your web presence leaves a lasting impression while driving business growth.",
        "heroImage": "assets/services/web-design-hero.png",
        "galleryImages": [
            "assets/services/web-design-hero.png"
        ],
        "features": [
            {
                "icon": "🎨",
                "title": "Custom Design",
                "desc": "Unique visual identities tailored precisely to your brand guidelines."
            },
            {
                "icon": "📱",
                "title": "Mobile Responsive",
                "desc": "Pixel-perfect rendering across mobile, tablet, and ultra-wide desktops."
            },
            {
                "icon": "⚡",
                "title": "Fast Performance",
                "desc": "Optimized graphics and crisp SVGs for sub-second page loads."
            },
            {
                "icon": "🔍",
                "title": "SEO Ready",
                "desc": "Semantic HTML markup and structured headings ready for search engines."
            },
            {
                "icon": "🔒",
                "title": "Secure & Compliant",
                "desc": "Accessibility (WCAG 2.1) and modern web compliance out of the box."
            },
            {
                "icon": "⚙️",
                "title": "Easy Management",
                "desc": "Clean Figma and code handoff docs for seamless maintenance."
            },
            {
                "icon": "✨",
                "title": "Modern UI",
                "desc": "Glassmorphism, dark themes, dynamic gradients, and smooth typography."
            },
            {
                "icon": "🤝",
                "title": "Ongoing Support",
                "desc": "Post-launch design iterations and UI enhancements whenever needed."
            }
        ],
        "process": [
            {
                "step": "01",
                "title": "Discovery",
                "desc": "Auditing your brand, user personas, key objectives, and competitive landscape."
            },
            {
                "step": "02",
                "title": "Planning",
                "desc": "Creating information architecture, site maps, and user journey flows."
            },
            {
                "step": "03",
                "title": "Wireframing",
                "desc": "Building high-fidelity layout wireframes to test content layout."
            },
            {
                "step": "04",
                "title": "UI Design",
                "desc": "Crafting full-color mockups with interactive prototypes in Figma."
            },
            {
                "step": "05",
                "title": "Testing & Refinement",
                "desc": "Conducting usability feedback and visual polishing across viewports."
            },
            {
                "step": "06",
                "title": "Handoff & Launch",
                "desc": "Delivering production-ready design tokens and asset kits."
            }
        ],
        "technologies": [
            "Figma",
            "Adobe XD",
            "Sketch",
            "HTML5",
            "CSS3 / SCSS",
            "Tailwind CSS",
            "Framer",
            "Webflow",
            "JavaScript (ES6+)"
        ],
        "faqs": [
            {
                "q": "How long does a custom website design take?",
                "a": "Typically 2 to 4 weeks depending on the number of pages, custom features, and feedback iterations."
            },
            {
                "q": "Will I get editable design files?",
                "a": "Yes! You receive complete, organized Figma source files along with design system tokens and component libraries."
            },
            {
                "q": "Is mobile responsiveness included?",
                "a": "Absolute mobile responsiveness is standard across all our design projects—mobile, tablet, and desktop views are designed explicitly."
            },
            {
                "q": "Do you redesign existing websites?",
                "a": "Yes, we specialize in modernizing legacy sites into fast, sleek, modern web applications built for conversion."
            },
            {
                "q": "Can you work with our existing brand guidelines?",
                "a": "Yes, we can seamlessly incorporate your logo, colors, typography, and brand rules while elevating the digital execution."
            }
        ]
    },
    "development": {
        "id": "development",
        "path": "/development",
        "title": "Web Development",
        "tagline": "Fast, maintainable builds — from marketing sites to full web applications, made to scale.",
        "overview": "We build high-performance web applications and websites using clean, scalable code. Whether you need a lightning-fast marketing platform or a modern full-stack web app with complex database backends, our builds prioritize performance, security, and effortless maintainability.",
        "heroImage": "assets/services/development-hero.png",
        "galleryImages": [
            "assets/services/development-hero.png"
        ],
        "features": [
            {
                "icon": "🚀",
                "title": "Fast Performance",
                "desc": "Sub-second initial loads and 95+ Lighthouse optimization."
            },
            {
                "icon": "💻",
                "title": "Clean Architecture",
                "desc": "Maintainable, modular code written to strict industry standards."
            },
            {
                "icon": "🔒",
                "title": "Robust Security",
                "desc": "XSS, CSRF, and data encryption protections built-in."
            },
            {
                "icon": "🔄",
                "title": "API Integration",
                "desc": "Seamless connection with third-party web services and REST/GraphQL APIs."
            },
            {
                "icon": "📱",
                "title": "Cross-Device",
                "desc": "Tested across iOS, Android, macOS, Windows, and Linux viewports."
            },
            {
                "icon": "🛠️",
                "title": "Easy Management",
                "desc": "Intuitive admin dashboards and content management integration."
            },
            {
                "icon": "⚡",
                "title": "SEO Optimized",
                "desc": "Server-side rendering or static generation for maximum indexing power."
            },
            {
                "icon": "🛡️",
                "title": "Ongoing Maintenance",
                "desc": "Proactive code updates, security patches, and monitoring."
            }
        ],
        "process": [
            {
                "step": "01",
                "title": "Discovery",
                "desc": "Analyzing functional requirements, data models, and API specifications."
            },
            {
                "step": "02",
                "title": "Planning",
                "desc": "Defining tech stack architecture, DB schemas, and component structure."
            },
            {
                "step": "03",
                "title": "Frontend Build",
                "desc": "Developing semantic, accessible, and ultra-responsive user interfaces."
            },
            {
                "step": "04",
                "title": "Backend & APIs",
                "desc": "Engineering secure database schemas, server endpoints, and logic."
            },
            {
                "step": "05",
                "title": "Testing & QA",
                "desc": "Unit testing, cross-browser compatibility, and load performance checks."
            },
            {
                "step": "06",
                "title": "Deployment",
                "desc": "Automated CI/CD deployment to production environments with SSL."
            }
        ],
        "technologies": [
            "JavaScript (ES6+)",
            "Node.js",
            "React.js",
            "Next.js",
            "Express",
            "Python",
            "PHP",
            "PostgreSQL",
            "MongoDB",
            "MySQL",
            "Git"
        ],
        "faqs": [
            {
                "q": "What frameworks do you use for web development?",
                "a": "We use Vanilla JavaScript, React, Next.js, Node.js, and Express depending on project needs for optimal speed."
            },
            {
                "q": "Will the website be fast on mobile devices?",
                "a": "Yes! All code is optimized for minimal bundle size, efficient caching, and 90+ Lighthouse performance scores."
            },
            {
                "q": "Do you provide backend and database setup?",
                "a": "Yes, we handle the full stack—databases (MySQL, Postgres, Mongo), APIs, server configuration, and authentication."
            },
            {
                "q": "Who owns the code after completion?",
                "a": "You have 100% full ownership of all source code, assets, and repository access upon project completion."
            },
            {
                "q": "How do you handle website maintenance?",
                "a": "We offer continuous monitoring, security updates, feature enhancements, and server maintenance packages."
            }
        ]
    },
    "automation": {
        "id": "automation",
        "path": "/automation",
        "title": "Automation & CRM",
        "tagline": "We wire up your CRM so every lead gets followed up automatically, every time.",
        "overview": "Stop letting valuable leads slip through the cracks. We build automated workflow engines connecting your website, CRM, communication channels, and calendars—ensuring instant lead follow-ups, automated SMS/email reminders, missed-call text-backs, and seamless customer tracking.",
        "heroImage": "assets/services/automation-hero.png",
        "galleryImages": [
            "assets/services/automation-hero.png"
        ],
        "features": [
            {
                "icon": "📲",
                "title": "Missed-Call Text-Back",
                "desc": "Instantly text callers back when your team is busy so you never lose a client."
            },
            {
                "icon": "⚡",
                "title": "Instant Lead Routing",
                "desc": "Direct incoming form leads straight to sales reps on WhatsApp and email in seconds."
            },
            {
                "icon": "📅",
                "title": "Automated Reminders",
                "desc": "Cut no-shows with SMS and email appointment reminders."
            },
            {
                "icon": "⭐",
                "title": "Review Campaigns",
                "desc": "Automatically request Google reviews from satisfied clients post-job."
            },
            {
                "icon": "🔄",
                "title": "CRM Sync",
                "desc": "Keep lead data updated dynamically across HubSpot, GoHighLevel, or custom CRMs."
            },
            {
                "icon": "📊",
                "title": "Analytics Tracking",
                "desc": "Full insight into conversion bottlenecks, lead sources, and response times."
            },
            {
                "icon": "💬",
                "title": "WhatsApp Bots",
                "desc": "Conversational AI bots that answer common questions 24/7."
            },
            {
                "icon": "🛠️",
                "title": "Zero Manual Work",
                "desc": "Eliminate repetitive data entry and free up team hours."
            }
        ],
        "process": [
            {
                "step": "01",
                "title": "Audit",
                "desc": "Mapping your current lead flow, sales process, and communication touchpoints."
            },
            {
                "step": "02",
                "title": "Strategy",
                "desc": "Designing trigger rules, messaging sequences, and fallback conditions."
            },
            {
                "step": "03",
                "title": "CRM Setup",
                "desc": "Configuring pipelines, tags, custom fields, and webhook endpoints."
            },
            {
                "step": "04",
                "title": "Integration",
                "desc": "Connecting web forms, phone systems, WhatsApp, and email gateways."
            },
            {
                "step": "05",
                "title": "Testing",
                "desc": "Simulating lead journeys to ensure zero delivery failures or delays."
            },
            {
                "step": "06",
                "title": "Go Live",
                "desc": "Deploying live automation with real-time logging and performance alerts."
            }
        ],
        "technologies": [
            "Make.com",
            "Zapier",
            "GoHighLevel",
            "HubSpot",
            "WhatsApp API",
            "Twilio",
            "Webhooks",
            "Node.js",
            "Python"
        ],
        "faqs": [
            {
                "q": "What CRMs can you integrate with?",
                "a": "We work with GoHighLevel, HubSpot, Salesforce, Zoho, ActiveCampaign, or custom backends."
            },
            {
                "q": "How fast is the lead response time with automation?",
                "a": "Responses trigger in under 15 seconds after a lead fills out your form or misses a call."
            },
            {
                "q": "Can we send messages via WhatsApp?",
                "a": "Yes! We integrate official WhatsApp Business APIs for automatic notifications and replies."
            },
            {
                "q": "Is it hard for our team to use?",
                "a": "Not at all. Everything operates automatically in the background; your team receives structured updates."
            },
            {
                "q": "Can you customize follow-up logic?",
                "a": "100% custom—we tailor delays, branching logic, tags, and messaging specifically for your industry."
            }
        ]
    },
    "servers": {
        "id": "servers",
        "path": "/servers",
        "title": "Servers & Hosting",
        "tagline": "Provisioning, deployment, monitoring — your infrastructure, kept running quietly.",
        "overview": "Keep your web applications fast, online, and impenetrable. We provision high-grade cloud servers, configure bulletproof SSL certificates, set up automated daily database backups, and maintain 24/7 proactive performance monitoring.",
        "heroImage": "assets/services/servers-hero.png",
        "galleryImages": [
            "assets/services/servers-hero.png"
        ],
        "features": [
            {
                "icon": "🛡️",
                "title": "99.99% Uptime Guarantee",
                "desc": "High-availability infrastructure ensuring your business stays online 24/7."
            },
            {
                "icon": "🔒",
                "title": "SSL & Encryption",
                "desc": "Automated Let’s Encrypt / Cloudflare SSL installation and management."
            },
            {
                "icon": "💾",
                "title": "Automated Daily Backups",
                "desc": "Off-site snapshot backups allowing instant 1-click restore if needed."
            },
            {
                "icon": "🚀",
                "title": "Global CDN Delivery",
                "desc": "Caching content worldwide so users enjoy lightning response times anywhere."
            },
            {
                "icon": "🔥",
                "title": "DDoS & WAF Protection",
                "desc": "Shielding your application from malicious attacks and bot traffic."
            },
            {
                "icon": "📈",
                "title": "Auto-Scaling Infrastructure",
                "desc": "Handling sudden traffic surges without performance degradation."
            },
            {
                "icon": "🖥️",
                "title": "Server Health Monitoring",
                "desc": "24/7 resource monitoring with instant alert dispatch on load spikes."
            },
            {
                "icon": "🤝",
                "title": "Full DevOps Management",
                "desc": "Zero server management burden on your team."
            }
        ],
        "process": [
            {
                "step": "01",
                "title": "Infrastructure Audit",
                "desc": "Evaluating traffic load requirements, security risks, and stack needs."
            },
            {
                "step": "02",
                "title": "Server Provisioning",
                "desc": "Spinning up virtual private servers or cloud instances (AWS, VPS, Vercel)."
            },
            {
                "step": "03",
                "title": "Security Hardening",
                "desc": "Configuring firewall rules, SSH keys, WAF, and SSL certificates."
            },
            {
                "step": "04",
                "title": "Database & Code Deployment",
                "desc": "Migrating data, tuning caching layers, and launching production code."
            },
            {
                "step": "05",
                "title": "Backup Setup",
                "desc": "Configuring automated daily backup routines to isolated cloud storage."
            },
            {
                "step": "06",
                "title": "24/7 Monitoring",
                "desc": "Activating real-time health checks, uptime monitors, and error logs."
            }
        ],
        "technologies": [
            "AWS",
            "DigitalOcean",
            "Vercel",
            "Nginx",
            "Docker",
            "Cloudflare",
            "Ubuntu Linux",
            "Redis",
            "PostgreSQL"
        ],
        "faqs": [
            {
                "q": "Where are the servers hosted?",
                "a": "We deploy on AWS, Vercel, DigitalOcean, or Linode based on performance and budget needs."
            },
            {
                "q": "How often are backups taken?",
                "a": "Database backups occur daily with 30-day retention; system snapshots occur weekly."
            },
            {
                "q": "What happens if my site experiences a traffic surge?",
                "a": "Our auto-scaling and Cloudflare caching layers handle traffic spikes without crashing."
            },
            {
                "q": "Can you migrate my existing website to a faster server?",
                "a": "Yes, we handle full zero-downtime website and database migrations."
            },
            {
                "q": "Is email hosting included?",
                "a": "We configure professional business email routing via Google Workspace or Microsoft 365."
            }
        ]
    },
    "shopify": {
        "id": "shopify",
        "path": "/shopify",
        "title": "Shopify Stores",
        "tagline": "Storefronts built to convert — custom sections, themes, and checkout tuned for real customers.",
        "overview": "We build high-converting Shopify storefronts that turn visitors into loyal customers. From custom Liquid theme engineering to frictionless checkout optimization, dynamic upsells, and app integrations, we craft ecommerce experiences that maximize average order value (AOV).",
        "heroImage": "assets/services/shopify-hero.png",
        "galleryImages": [
            "assets/services/shopify-hero.png"
        ],
        "features": [
            {
                "icon": "🛍️",
                "title": "Custom Theme Development",
                "desc": "Unique Liquid sections tailored specifically to your product line."
            },
            {
                "icon": "📱",
                "title": "Mobile-First Checkout",
                "desc": "Frictionless Apple Pay, Google Pay, and Shop Pay single-tap purchasing."
            },
            {
                "icon": "🚀",
                "title": "Speed Optimization",
                "desc": "Clean asset loading ensuring fast product page renders."
            },
            {
                "icon": "📈",
                "title": "AOV Upsell Engines",
                "desc": "In-cart upsells, bundle offers, and post-purchase recommendations."
            },
            {
                "icon": "🔍",
                "title": "E-Commerce SEO",
                "desc": "Product schema tags, collection SEO structures, and fast image loading."
            },
            {
                "icon": "💳",
                "title": "Payment Gateway Integration",
                "desc": "Stripe, Razorpay, PayPal, and local payment gateway setup."
            },
            {
                "icon": "📦",
                "title": "Inventory & Shipping Sync",
                "desc": "Integrating logistics partners and real-time shipping calculators."
            },
            {
                "icon": "🤝",
                "title": "Full Store Training",
                "desc": "Walkthrough video guides on managing products, orders, and discounts."
            }
        ],
        "process": [
            {
                "step": "01",
                "title": "Brand Audit",
                "desc": "Reviewing catalog structure, target demographics, and brand assets."
            },
            {
                "step": "02",
                "title": "UX Architecture",
                "desc": "Designing collection pages, product pages, and cart drawers."
            },
            {
                "step": "03",
                "title": "Shopify Setup",
                "desc": "Configuring domain, currencies, tax settings, and payment portals."
            },
            {
                "step": "04",
                "title": "Theme Development",
                "desc": "Building custom Liquid sections, filters, and dynamic components."
            },
            {
                "step": "05",
                "title": "App Integration",
                "desc": "Connecting review apps, CRM automation, email capture, and upsells."
            },
            {
                "step": "06",
                "title": "Testing & Launch",
                "desc": "Conducting test transactions, speed checks, and domain go-live."
            }
        ],
        "technologies": [
            "Shopify Liquid",
            "Shopify Plus",
            "HTML5",
            "CSS3 / Tailwind",
            "JavaScript",
            "Klaviyo",
            "Recharge",
            "GraphQL Storefront API"
        ],
        "faqs": [
            {
                "q": "Can you migrate my store from WooCommerce or WordPress to Shopify?",
                "a": "Yes! We migrate all product catalogs, customer databases, order histories, and SEO redirects seamlessly."
            },
            {
                "q": "Do you build custom Liquid sections?",
                "a": "Yes, we create drag-and-drop Liquid sections so you can edit content easily in Shopify Theme Editor."
            },
            {
                "q": "Can you set up payment gateways for international currencies?",
                "a": "Yes, we set up multi-currency options with automated geolocation switching."
            },
            {
                "q": "Is inventory management included?",
                "a": "We set up your catalog structure, variants, inventory tracking, and collection tags."
            },
            {
                "q": "How long does a custom Shopify store take?",
                "a": "Usually 3 to 5 weeks from initial wireframes to official transaction launch."
            }
        ]
    },
    "single-page": {
        "id": "single-page",
        "path": "/single-page",
        "title": "Single-page website",
        "tagline": "High-impact, single-page websites to get your brand online fast.",
        "overview": "Fast, sleek, and laser-focused on conversion. A custom landing page synthesizes your entire value proposition into a single smooth-scrolling experience, perfect for product launches, event registration, or new business announcements.",
        "heroImage": "assets/services/single-page-hero.png",
        "galleryImages": [
            "assets/services/single-page-hero.png"
        ],
        "features": [
            {
                "icon": "🎯",
                "title": "Conversion Focused",
                "desc": "Designed to lead visitors straight to your booking form or CTA."
            },
            {
                "icon": "⚡",
                "title": "Ultra-Fast Launch",
                "desc": "Get fully live online in as little as 5 to 7 business days."
            },
            {
                "icon": "📱",
                "title": "Mobile Perfect",
                "desc": "Optimized touch navigation and smooth scroll section linking."
            },
            {
                "icon": "🔍",
                "title": "SEO Optimized",
                "desc": "Structured Meta tags and headings to rank for core brand keywords."
            },
            {
                "icon": "🔒",
                "title": "SSL Included",
                "desc": "Secure HTTPS setup with fast global delivery."
            },
            {
                "icon": "✨",
                "title": "Interactive Micro-Animations",
                "desc": "Engaging scroll effects that keep visitors hooked."
            },
            {
                "icon": "📩",
                "title": "Lead Form Capture",
                "desc": "Forms integrated directly with your WhatsApp or email address."
            },
            {
                "icon": "🤝",
                "title": "Post-Launch Support",
                "desc": "Free maintenance updates for the first 30 days."
            }
        ],
        "process": [
            {
                "step": "01",
                "title": "Content Brief",
                "desc": "Gathering copy, logo, photos, and key offer details."
            },
            {
                "step": "02",
                "title": "UI Design",
                "desc": "Crafting a visual mock-up focusing on typography and hierarchy."
            },
            {
                "step": "03",
                "title": "Build",
                "desc": "Writing lightweight HTML/CSS/JS code."
            },
            {
                "step": "04",
                "title": "Form Wireup",
                "desc": "Connecting lead capture form to WhatsApp and email."
            },
            {
                "step": "05",
                "title": "Testing",
                "desc": "Verifying mobile responsiveness and page load speed."
            },
            {
                "step": "06",
                "title": "Launch",
                "desc": "Linking domain name and publishing live."
            }
        ],
        "technologies": [
            "HTML5",
            "CSS3",
            "JavaScript",
            "Google Fonts",
            "WhatsApp API"
        ],
        "faqs": [
            {
                "q": "How fast can a single-page website be delivered?",
                "a": "Typically within 5 to 7 business days after content is supplied."
            },
            {
                "q": "Can I add more pages in the future?",
                "a": "Yes! The site is built on clean code so extra pages can be added anytime."
            },
            {
                "q": "Where do form inquiries go?",
                "a": "Forms send instant notifications to your WhatsApp and email address."
            }
        ]
    },
    "branding": {
        "id": "branding",
        "path": "/branding",
        "title": "Custom Logo & Branding",
        "tagline": "Professional logo design and brand identity kits.",
        "overview": "Build an iconic visual identity that commands authority in your industry. We create custom logos, typography standards, color palettes, vector brand marks, and comprehensive brand guideline documentation.",
        "heroImage": "assets/services/branding-hero.png",
        "galleryImages": [
            "assets/services/branding-hero.png"
        ],
        "features": [
            {
                "icon": "✏️",
                "title": "Bespoke Logo Design",
                "desc": "100% vector logo marks built from scratch—no templates."
            },
            {
                "icon": "📐",
                "title": "Brand Guidelines",
                "desc": "Full PDF brand manual covering clear space, misuse, and color rules."
            },
            {
                "icon": "🎨",
                "title": "Color Palette Architecture",
                "desc": "HEX, RGB, CMYK, and Pantone specifications for web & print."
            },
            {
                "icon": "🔤",
                "title": "Typography System",
                "desc": "Selected font pairings for web headers, body copy, and social media."
            },
            {
                "icon": "🖼️",
                "title": "Vector Asset Package",
                "desc": "SVG, EPS, AI, PDF, PNG, and transparent icon files."
            },
            {
                "icon": "📱",
                "title": "Social Media Kit",
                "desc": "Profile avatars, headers, and post template grids."
            },
            {
                "icon": "📄",
                "title": "Stationery Mockups",
                "desc": "Business card, letterhead, and invoice layout templates."
            },
            {
                "icon": "🤝",
                "title": "Copyright Transfer",
                "desc": "Complete ownership of all final trademarked assets."
            }
        ],
        "process": [
            {
                "step": "01",
                "title": "Discovery",
                "desc": "Understanding brand values, target market, and competitor visuals."
            },
            {
                "step": "02",
                "title": "Concept Sketches",
                "desc": "Drafting initial logo mark ideas on paper and vector software."
            },
            {
                "step": "03",
                "title": "Refinement",
                "desc": "Selecting top concepts and perfecting geometry and proportions."
            },
            {
                "step": "04",
                "title": "Color & Type",
                "desc": "Applying color palettes and testing font combinations."
            },
            {
                "step": "05",
                "title": "Guidelines",
                "desc": "Compiling usage rules into a clean PDF brand manual."
            },
            {
                "step": "06",
                "title": "Final Delivery",
                "desc": "Exporting high-resolution vector and raster packages."
            }
        ],
        "technologies": [
            "Adobe Illustrator",
            "Adobe Photoshop",
            "Figma",
            "Vector Export"
        ],
        "faqs": [
            {
                "q": "How many logo concepts do I get to see?",
                "a": "We provide 3 to 4 distinct design directions during the initial review stage."
            },
            {
                "q": "In what file formats will I receive my logo?",
                "a": "You receive vector files (AI, EPS, SVG, PDF) and transparent PNGs in high-resolution."
            },
            {
                "q": "Will I own full copyright for the logo?",
                "a": "Yes, full commercial usage rights and ownership transfer to you upon completion."
            }
        ]
    },
    "ai-art": {
        "id": "ai-art",
        "path": "/ai-art",
        "title": "AI-generated Art",
        "tagline": "Unique, high-quality images and art pieces generated by cutting-edge AI.",
        "overview": "Elevate your visual storytelling with custom hyper-realistic graphics, conceptual art, and brand visuals generated using state-of-the-art AI art models, refined by expert digital artists.",
        "heroImage": "assets/services/ai-art-hero.png",
        "galleryImages": [
            "assets/services/ai-art-hero.png"
        ],
        "features": [
            {
                "icon": "🖼️",
                "title": "Custom Prompt Crafting",
                "desc": "Tailored prompt engineering to generate exact brand aesthetics."
            },
            {
                "icon": "⚡",
                "title": "High Resolution Upscaling",
                "desc": "8K resolution output ready for web and large format print."
            },
            {
                "icon": "✨",
                "title": "Photorealistic & Conceptual",
                "desc": "From realistic product photography to abstract digital artwork."
            },
            {
                "icon": "🎯",
                "title": "Commercial Rights",
                "desc": "Full usage rights for marketing, websites, and print materials."
            }
        ],
        "process": [
            {
                "step": "01",
                "title": "Briefing",
                "desc": "Gathering visual references and style preferences."
            },
            {
                "step": "02",
                "title": "Prompting",
                "desc": "Generating initial art variations with cutting-edge AI tools."
            },
            {
                "step": "03",
                "title": "Curation",
                "desc": "Selecting top render candidates."
            },
            {
                "step": "04",
                "title": "Retouching",
                "desc": "Polishing details in Photoshop."
            },
            {
                "step": "05",
                "title": "Upscaling",
                "desc": "Exporting 8K high-resolution files."
            }
        ],
        "technologies": [
            "Midjourney v6",
            "Stable Diffusion",
            "Photoshop AI",
            "Topaz Gigapixel"
        ],
        "faqs": [
            {
                "q": "Can I use AI images for commercial ads?",
                "a": "Yes, all images are upscale-ready with commercial usage licenses."
            }
        ]
    },
    "social-setup": {
        "id": "social-setup",
        "path": "/social-setup",
        "title": "Social Media Setup",
        "tagline": "Professional setup for your LinkedIn, Instagram, and other social profiles.",
        "overview": "Turn your social profiles into trust-building sales channels. We optimize bio copy, design high-impact banner art, create custom highlight covers, and link automated call-to-action buttons.",
        "heroImage": "assets/services/social-setup-hero.png",
        "galleryImages": [
            "assets/services/social-setup-hero.png"
        ],
        "features": [
            {
                "icon": "📱",
                "title": "Bio Copywriting",
                "desc": "Punchy bios written to convert visitors into profile clicks."
            },
            {
                "icon": "🖼️",
                "title": "Banner Graphics",
                "desc": "Custom header banners for LinkedIn, Twitter/X, and Facebook."
            },
            {
                "icon": "✨",
                "title": "Highlight Covers",
                "desc": "Matching Instagram story highlight graphics."
            },
            {
                "icon": "🔗",
                "title": "Link-in-Bio Page",
                "desc": "Custom multi-link landing page for your social profiles."
            }
        ],
        "process": [
            {
                "step": "01",
                "title": "Profile Audit",
                "desc": "Reviewing current handles and bio text."
            },
            {
                "step": "02",
                "title": "Graphics Design",
                "desc": "Designing cover photos, banners, and avatars."
            },
            {
                "step": "03",
                "title": "Bio Writing",
                "desc": "Crafting clear, keyword-optimized bios."
            },
            {
                "step": "04",
                "title": "Setup & Go Live",
                "desc": "Updating profiles across platforms."
            }
        ],
        "technologies": [
            "Figma",
            "Photoshop",
            "LinkedIn Creator Tools",
            "Instagram Pro"
        ],
        "faqs": [
            {
                "q": "Which platforms do you cover?",
                "a": "LinkedIn, Instagram, Facebook, X/Twitter, YouTube, and TikTok."
            }
        ]
    },
    "marketing": {
        "id": "marketing",
        "path": "/marketing",
        "title": "Marketing Materials",
        "tagline": "Flyers, brochures, and business card designs ready for print or digital distribution.",
        "overview": "Tangible brand experiences that leave a powerful impression. We design print-ready flyers, tri-fold brochures, digital pitch decks, and premium business cards.",
        "heroImage": "assets/services/marketing-hero.png",
        "galleryImages": [
            "assets/services/marketing-hero.png"
        ],
        "features": [
            {
                "icon": "📄",
                "title": "Print Ready CMYK",
                "desc": "Exported with bleed margins, vector fonts, and print specs."
            },
            {
                "icon": "📊",
                "title": "Pitch Decks",
                "desc": "High-impact investor and sales presentation slides."
            },
            {
                "icon": "🎴",
                "title": "Business Cards",
                "desc": "Bespoke business card layouts including QR code integration."
            },
            {
                "icon": "📁",
                "title": "Digital PDFs",
                "desc": "Interactive, hyperlinked PDFs for email distribution."
            }
        ],
        "process": [
            {
                "step": "01",
                "title": "Briefing",
                "desc": "Defining dimensions, target audience, and printing requirements."
            },
            {
                "step": "02",
                "title": "Layout",
                "desc": "Structuring content flow and visual focal points."
            },
            {
                "step": "03",
                "title": "Design",
                "desc": "Applying high-resolution typography and graphics."
            },
            {
                "step": "04",
                "title": "Export",
                "desc": "Delivering press-ready PDF files with bleed marks."
            }
        ],
        "technologies": [
            "Adobe InDesign",
            "Adobe Illustrator",
            "Photoshop",
            "PDF/X Export"
        ],
        "faqs": [
            {
                "q": "Do you handle the actual printing?",
                "a": "We deliver press-ready PDF files formatted for any commercial printer of your choice."
            }
        ]
    },
    "promo-video": {
        "id": "promo-video",
        "path": "/promo-video",
        "title": "Promo Videos & Animations",
        "tagline": "Short promotional videos and animations to engage your audience.",
        "overview": "Capture attention instantly with dynamic video motion graphics, app walkthrough trailers, and high-impact promo visual clips designed for web headers and ad campaigns.",
        "heroImage": "assets/services/promo-video-hero.png",
        "galleryImages": [
            "assets/services/promo-video-hero.png"
        ],
        "features": [
            {
                "icon": "🎬",
                "title": "Dynamic Motion Graphics",
                "desc": "Sleek kinetic typography and 2D logo animations."
            },
            {
                "icon": "🔊",
                "title": "Sound Design & SFX",
                "desc": "Professional audio mixing and royalty-free background beats."
            },
            {
                "icon": "⚡",
                "title": "Web-Optimized Video",
                "desc": "Compressed MP4/WebM formats built for zero web lag."
            },
            {
                "icon": "📱",
                "title": "Multi-Aspect Ratios",
                "desc": "16:9 widescreen, 1:1 square, and 9:16 vertical formats."
            }
        ],
        "process": [
            {
                "step": "01",
                "title": "Script & Storyboard",
                "desc": "Planning scene timing and key animation moments."
            },
            {
                "step": "02",
                "title": "Asset Creation",
                "desc": "Preparing vector graphics and screen captures."
            },
            {
                "step": "03",
                "title": "Motion Editing",
                "desc": "Animating timing, transitions, and text layers."
            },
            {
                "step": "04",
                "title": "Sound Design",
                "desc": "Adding sound effects and background music."
            },
            {
                "step": "05",
                "title": "Final Render",
                "desc": "Exporting crisp 4K & web-optimized video files."
            }
        ],
        "technologies": [
            "After Effects",
            "Premiere Pro",
            "Lottie",
            "DaVinci Resolve"
        ],
        "faqs": [
            {
                "q": "What video lengths do you create?",
                "a": "Typically 15-second ad clips up to 90-second detailed promo videos."
            }
        ]
    },
    "seo-copy": {
        "id": "seo-copy",
        "path": "/seo-copy",
        "title": "SEO Blog & Copywriting",
        "tagline": "Keyword-optimized blog writing and copywriting to rank higher and convert better.",
        "overview": "Turn search traffic into active revenue. We write persuasive website sales copy and in-depth, keyword-rich SEO blog articles designed to dominate search engines while establishing brand authority.",
        "heroImage": "assets/services/seo-copy-hero.png",
        "galleryImages": [
            "assets/services/seo-copy-hero.png"
        ],
        "features": [
            {
                "icon": "🔍",
                "title": "Keyword Strategy",
                "desc": "Targeting search terms with strong commercial intent."
            },
            {
                "icon": "📝",
                "title": "Sales Landing Copy",
                "desc": "Persuasive messaging that highlights customer pain points."
            },
            {
                "icon": "📈",
                "title": "Blog Content Systems",
                "desc": "Regular publishing pipelines to boost organic rankings."
            },
            {
                "icon": "🎯",
                "title": "Meta Tags & Schema",
                "desc": "Writing titles, descriptions, and snippet tags."
            }
        ],
        "process": [
            {
                "step": "01",
                "title": "Keyword Research",
                "desc": "Identifying high-volume search queries."
            },
            {
                "step": "02",
                "title": "Content Outline",
                "desc": "Structuring headers (H1, H2, H3) for readability."
            },
            {
                "step": "03",
                "title": "Writing",
                "desc": "Drafting original, engaging copy."
            },
            {
                "step": "04",
                "title": "Editing & SEO Optimization",
                "desc": "Polishing tone and keyword density."
            }
        ],
        "technologies": [
            "Ahrefs",
            "SEMrush",
            "Surfer SEO",
            "Google Search Console"
        ],
        "faqs": [
            {
                "q": "How long until SEO articles start ranking?",
                "a": "Typically search engines index and rank new authority articles within 4 to 12 weeks."
            }
        ]
    },
    "email-templates": {
        "id": "email-templates",
        "path": "/email-templates",
        "title": "Email Newsletters",
        "tagline": "Beautiful, responsive email newsletter templates designed for high click-through rates.",
        "overview": "Engage your subscriber list with custom responsive email newsletters. Tested across Gmail, Apple Mail, Outlook, and mobile clients to guarantee flawless rendering and high click-through rates.",
        "heroImage": "assets/services/email-templates-hero.png",
        "galleryImages": [
            "assets/services/email-templates-hero.png"
        ],
        "features": [
            {
                "icon": "📬",
                "title": "Cross-Client Compatible",
                "desc": "Pixel perfect on Outlook, Gmail, Apple Mail, and Yahoo."
            },
            {
                "icon": "⚡",
                "title": "Drag & Drop Ready",
                "desc": "Integrated directly into Klaviyo, Mailchimp, or Brevo."
            },
            {
                "icon": "🎯",
                "title": "High CTR Layouts",
                "desc": "Strategic call-to-action buttons designed for clicks."
            },
            {
                "icon": "🔄",
                "title": "Automated Flows",
                "desc": "Welcome series, abandoned cart, and post-purchase designs."
            }
        ],
        "process": [
            {
                "step": "01",
                "title": "Strategy",
                "desc": "Defining email goals and segment messaging."
            },
            {
                "step": "02",
                "title": "Design",
                "desc": "Creating mobile-first email layouts."
            },
            {
                "step": "03",
                "title": "HTML Coding",
                "desc": "Building responsive inline HTML email code."
            },
            {
                "step": "04",
                "title": "Litmus Testing",
                "desc": "Testing inbox rendering across 50+ email clients."
            }
        ],
        "technologies": [
            "HTML Email",
            "Klaviyo",
            "Mailchimp",
            "Brevo",
            "Litmus Testing"
        ],
        "faqs": [
            {
                "q": "Will these templates work in Klaviyo?",
                "a": "Yes! We import templates directly into Klaviyo, Mailchimp, or any major ESP."
            }
        ]
    },
    "reels-script": {
        "id": "reels-script",
        "path": "/reels-script",
        "title": "Script for Reels & Video",
        "tagline": "Viral-engineered scripts that capture attention in the first 3 seconds.",
        "overview": "We write high-retention scripts for TikTok, Instagram Reels, and YouTube Shorts. Engineered with psychological hooks, engaging pacing, and strong calls-to-action to maximize your organic reach.",
        "heroImage": "assets/services/reels-script-hero.png",
        "galleryImages": [],
        "features": [
            {
                "icon": "🪝",
                "title": "Strong Hooks",
                "desc": "Stop the scroll instantly."
            },
            {
                "icon": "⏱️",
                "title": "Perfect Pacing",
                "desc": "Keep viewers watching until the end."
            },
            {
                "icon": "📣",
                "title": "Clear CTAs",
                "desc": "Turn viewers into followers and buyers."
            },
            {
                "icon": "📈",
                "title": "Trend Analysis",
                "desc": "Capitalize on current audio and format trends."
            }
        ],
        "process": [
            {
                "step": "01",
                "title": "Strategy",
                "desc": "Aligning scripts with your brand voice and goals."
            },
            {
                "step": "02",
                "title": "Drafting",
                "desc": "Writing the hooks, body, and CTA."
            },
            {
                "step": "03",
                "title": "Review",
                "desc": "Refining based on your feedback."
            },
            {
                "step": "04",
                "title": "Production Guide",
                "desc": "Providing visual and audio cues for filming."
            }
        ],
        "technologies": [
            "Notion",
            "Trend Analytics",
            "AI Copywriting"
        ],
        "faqs": [
            {
                "q": "Do you edit the videos too?",
                "a": "This service is for scripting, but we offer editing as an add-on."
            }
        ]
    },
    "web-apps": {
        "id": "web-apps",
        "path": "/web-apps",
        "title": "Web Applications",
        "tagline": "Scalable, feature-rich web applications that drive your business logic.",
        "overview": "We build complex, data-driven web applications that perform like native software. From SaaS platforms to internal business dashboards, our full-stack solutions are engineered for speed, security, and limitless scalability.",
        "heroImage": "assets/services/web-apps-hero.png",
        "galleryImages": [],
        "features": [
            {
                "icon": "⚡",
                "title": "High Performance",
                "desc": "Sub-second load times and optimized rendering."
            },
            {
                "icon": "🔒",
                "title": "Enterprise Security",
                "desc": "Robust authentication and secure data handling."
            },
            {
                "icon": "🔄",
                "title": "API Integrations",
                "desc": "Seamless connections with your existing tech stack."
            },
            {
                "icon": "📱",
                "title": "Responsive UI",
                "desc": "Flawless experience across all devices."
            }
        ],
        "process": [
            {
                "step": "01",
                "title": "Architecture",
                "desc": "Planning the database schema and system architecture."
            },
            {
                "step": "02",
                "title": "Development",
                "desc": "Agile sprints delivering functional components."
            },
            {
                "step": "03",
                "title": "Testing",
                "desc": "Rigorous QA and automated testing pipelines."
            },
            {
                "step": "04",
                "title": "Deployment",
                "desc": "Smooth rollout with zero downtime."
            }
        ],
        "technologies": [
            "React",
            "Node.js",
            "MongoDB",
            "AWS",
            "Next.js"
        ],
        "faqs": [
            {
                "q": "How long does it take to build a web app?",
                "a": "Depending on complexity, between 4 to 12 weeks."
            },
            {
                "q": "Do you provide post-launch support?",
                "a": "Yes, we offer comprehensive maintenance plans."
            }
        ]
    },
    "ai-marketing": {
        "id": "ai-marketing",
        "path": "/ai-marketing",
        "title": "AI Marketing",
        "tagline": "Next-generation marketing powered by artificial intelligence.",
        "overview": "Leverage machine learning algorithms to hyper-target your audience, predict consumer behavior, and automate personalized marketing campaigns at scale. We integrate AI into your marketing pipeline for unprecedented ROI.",
        "heroImage": "assets/services/ai-marketing-hero.png",
        "galleryImages": [],
        "features": [
            {
                "icon": "🎯",
                "title": "Hyper-Targeting",
                "desc": "Reach the right audience with pinpoint accuracy."
            },
            {
                "icon": "📈",
                "title": "Predictive Analytics",
                "desc": "Forecast trends and customer behaviors."
            },
            {
                "icon": "⚙️",
                "title": "Automated Campaigns",
                "desc": "Self-optimizing ad runs and email sequences."
            },
            {
                "icon": "🧠",
                "title": "Machine Learning",
                "desc": "Algorithms that learn and improve over time."
            }
        ],
        "process": [
            {
                "step": "01",
                "title": "Data Audit",
                "desc": "Analyzing your current data ecosystem."
            },
            {
                "step": "02",
                "title": "Model Setup",
                "desc": "Configuring AI models for your specific niche."
            },
            {
                "step": "03",
                "title": "Integration",
                "desc": "Connecting AI with your ad and CRM platforms."
            },
            {
                "step": "04",
                "title": "Optimization",
                "desc": "Continuous learning and tweaking for max ROI."
            }
        ],
        "technologies": [
            "OpenAI",
            "TensorFlow",
            "Meta Ads API",
            "HubSpot",
            "Zapier"
        ],
        "faqs": [
            {
                "q": "Is AI marketing suitable for small businesses?",
                "a": "Absolutely. It helps maximize smaller budgets efficiently."
            }
        ]
    },
    "ai-chatbots": {
        "id": "ai-chatbots",
        "path": "/ai-chatbots",
        "title": "AI Chatbots",
        "tagline": "Intelligent conversational agents that work 24/7.",
        "overview": "Deploy custom AI chatbots that understand context, handle customer support, and close sales around the clock. Trained on your company data to provide accurate, brand-aligned responses instantly.",
        "heroImage": "assets/services/ai-chatbots-hero.png",
        "galleryImages": [],
        "features": [
            {
                "icon": "💬",
                "title": "Natural Language",
                "desc": "Human-like conversations powered by LLMs."
            },
            {
                "icon": "🕒",
                "title": "24/7 Availability",
                "desc": "Never miss a lead or customer query."
            },
            {
                "icon": "📚",
                "title": "Custom Training",
                "desc": "Trained exclusively on your knowledge base."
            },
            {
                "icon": "🔌",
                "title": "Multi-Channel",
                "desc": "Deploy on Website, WhatsApp, and Social Media."
            }
        ],
        "process": [
            {
                "step": "01",
                "title": "Knowledge Extraction",
                "desc": "Gathering your FAQs and company data."
            },
            {
                "step": "02",
                "title": "Bot Training",
                "desc": "Fine-tuning the LLM for your specific tone."
            },
            {
                "step": "03",
                "title": "Testing",
                "desc": "Simulating user conversations to ensure accuracy."
            },
            {
                "step": "04",
                "title": "Deployment",
                "desc": "Going live across all your communication channels."
            }
        ],
        "technologies": [
            "OpenAI",
            "LangChain",
            "Dialogflow",
            "WhatsApp API"
        ],
        "faqs": [
            {
                "q": "Can the bot escalate to a human?",
                "a": "Yes, seamless handoffs to your live agents are included."
            }
        ]
    },
    "ai-workflow": {
        "id": "ai-workflow",
        "path": "/ai-workflow",
        "title": "AI Workflow Automation",
        "tagline": "Eliminate manual tasks with intelligent internal systems.",
        "overview": "Transform your business operations by automating repetitive tasks, data entry, and document processing. Our AI workflows connect your disparate tools into a unified, self-driving machine.",
        "heroImage": "assets/services/ai-workflow-hero.png",
        "galleryImages": [],
        "features": [
            {
                "icon": "🤖",
                "title": "Smart Automation",
                "desc": "AI decisions built into your daily workflows."
            },
            {
                "icon": "🔗",
                "title": "Tool Syncing",
                "desc": "Connects CRM, emails, and internal software."
            },
            {
                "icon": "📄",
                "title": "Document Parsing",
                "desc": "Automatically extract data from PDFs and invoices."
            },
            {
                "icon": "⏳",
                "title": "Time Saving",
                "desc": "Save hundreds of human hours every month."
            }
        ],
        "process": [
            {
                "step": "01",
                "title": "Process Mapping",
                "desc": "Identifying bottlenecks in your current operations."
            },
            {
                "step": "02",
                "title": "Workflow Design",
                "desc": "Architecting the automated sequence."
            },
            {
                "step": "03",
                "title": "Implementation",
                "desc": "Building custom scripts and API bridges."
            },
            {
                "step": "04",
                "title": "Monitoring",
                "desc": "Ensuring 100% uptime and accuracy."
            }
        ],
        "technologies": [
            "Make.com",
            "Zapier",
            "Python",
            "OpenAI",
            "Airtable"
        ],
        "faqs": [
            {
                "q": "Do I need to change my current software?",
                "a": "Usually no. We integrate with the tools you already use."
            }
        ]
    },
    "lead-gen": {
        "id": "lead-gen",
        "path": "/lead-gen",
        "title": "Lead Generation Automation",
        "tagline": "A relentless machine that fills your sales pipeline.",
        "overview": "We build automated lead generation engines that scrape, enrich, qualify, and outreach to potential prospects. Stop manually hunting for clients and let our systems do the heavy lifting.",
        "heroImage": "assets/services/lead-gen-hero.png",
        "galleryImages": [],
        "features": [
            {
                "icon": "🧲",
                "title": "Automated Outreach",
                "desc": "Cold email and LinkedIn sequences on autopilot."
            },
            {
                "icon": "📊",
                "title": "Data Enrichment",
                "desc": "Automatically find contact info and company data."
            },
            {
                "icon": "🎯",
                "title": "Lead Scoring",
                "desc": "AI qualifies leads before they reach your calendar."
            },
            {
                "icon": "📈",
                "title": "High Conversion",
                "desc": "Optimized copy and multi-touchpoint strategies."
            }
        ],
        "process": [
            {
                "step": "01",
                "title": "Targeting",
                "desc": "Defining your ideal customer profile (ICP)."
            },
            {
                "step": "02",
                "title": "System Setup",
                "desc": "Warming up domains and configuring scraping tools."
            },
            {
                "step": "03",
                "title": "Campaign Launch",
                "desc": "Initiating automated multi-channel outreach."
            },
            {
                "step": "04",
                "title": "Handoff",
                "desc": "Qualified leads are booked directly into your calendar."
            }
        ],
        "technologies": [
            "Apollo.io",
            "Instantly",
            "Phantombuster",
            "HubSpot"
        ],
        "faqs": [
            {
                "q": "Are the leads exclusive?",
                "a": "Yes, we generate fresh, custom leads specifically for your business."
            }
        ]
    },
    "gmb-setup": {
        "id": "gmb-setup",
        "path": "/gmb-setup",
        "title": "Google Business Profile",
        "tagline": "Dominate local search and get found on Google Maps.",
        "overview": "We fully optimize your Google Business Profile to ensure you rank at the top of the 'Local Pack'. From keyword-optimized descriptions to automated review management, we make sure local customers choose you.",
        "heroImage": "assets/services/gmb-setup-hero.png",
        "galleryImages": [],
        "features": [
            {
                "icon": "📍",
                "title": "Local SEO",
                "desc": "Rank higher in your specific geographic area."
            },
            {
                "icon": "⭐",
                "title": "Review Management",
                "desc": "Strategies to consistently generate 5-star reviews."
            },
            {
                "icon": "📸",
                "title": "Profile Optimization",
                "desc": "Professional photos and fully completed attributes."
            },
            {
                "icon": "📊",
                "title": "Performance Tracking",
                "desc": "Monthly reports on calls, clicks, and directions."
            }
        ],
        "process": [
            {
                "step": "01",
                "title": "Audit",
                "desc": "Evaluating your current local search presence."
            },
            {
                "step": "02",
                "title": "Optimization",
                "desc": "Updating categories, keywords, and media."
            },
            {
                "step": "03",
                "title": "Citation Building",
                "desc": "Ensuring NAP consistency across the web."
            },
            {
                "step": "04",
                "title": "Ongoing Management",
                "desc": "Weekly posts and Q&A management."
            }
        ],
        "technologies": [
            "Google Business",
            "BrightLocal",
            "Whitespark"
        ],
        "faqs": [
            {
                "q": "How long until I see results?",
                "a": "Local SEO typically shows significant improvements in 30 to 90 days."
            }
        ]
    },
    "smm": {
        "id": "smm",
        "path": "/smm",
        "title": "Social Media Management",
        "tagline": "Build a loyal community and elevate your brand presence.",
        "overview": "End-to-end management of your social channels. We handle content creation, scheduling, community engagement, and growth strategies so you can focus on running your business.",
        "heroImage": "assets/services/smm-hero.png",
        "galleryImages": [],
        "features": [
            {
                "icon": "📅",
                "title": "Consistent Posting",
                "desc": "Maintain an active and engaging presence."
            },
            {
                "icon": "🎨",
                "title": "Custom Graphics",
                "desc": "High-quality visuals tailored to your brand."
            },
            {
                "icon": "💬",
                "title": "Community Engagement",
                "desc": "Responding to comments and DMs."
            },
            {
                "icon": "📈",
                "title": "Growth Strategies",
                "desc": "Hashtag research and viral content formats."
            }
        ],
        "process": [
            {
                "step": "01",
                "title": "Strategy",
                "desc": "Creating a tailored content calendar."
            },
            {
                "step": "02",
                "title": "Creation",
                "desc": "Designing graphics and writing captions."
            },
            {
                "step": "03",
                "title": "Approval",
                "desc": "You review and approve all content before it goes live."
            },
            {
                "step": "04",
                "title": "Publishing",
                "desc": "Automated scheduling for peak engagement times."
            }
        ],
        "technologies": [
            "Buffer",
            "Hootsuite",
            "Canva",
            "Later"
        ],
        "faqs": [
            {
                "q": "Which platforms do you manage?",
                "a": "Instagram, Facebook, LinkedIn, Twitter/X, and TikTok."
            }
        ]
    },
    "dns": {
        "id": "dns",
        "path": "/dns",
        "title": "Domain & DNS Management",
        "tagline": "Secure, fast, and reliable domain infrastructure.",
        "overview": "Expert management of your domains, DNS records, and SSL certificates. We ensure your website and emails always route correctly, preventing downtime and delivery issues.",
        "heroImage": "assets/services/dns-hero.png",
        "galleryImages": [],
        "features": [
            {
                "icon": "🌐",
                "title": "DNS Optimization",
                "desc": "Fast global resolution times."
            },
            {
                "icon": "📧",
                "title": "Email Deliverability",
                "desc": "SPF, DKIM, and DMARC setup to prevent spam."
            },
            {
                "icon": "🔒",
                "title": "SSL Management",
                "desc": "Automated certificate renewals."
            },
            {
                "icon": "🛡️",
                "title": "DDoS Protection",
                "desc": "Shielding your infrastructure from attacks."
            }
        ],
        "process": [
            {
                "step": "01",
                "title": "Audit",
                "desc": "Reviewing current DNS configuration."
            },
            {
                "step": "02",
                "title": "Migration",
                "desc": "Moving to a premium DNS provider if necessary."
            },
            {
                "step": "03",
                "title": "Configuration",
                "desc": "Setting up advanced routing and security records."
            },
            {
                "step": "04",
                "title": "Monitoring",
                "desc": "24/7 uptime tracking."
            }
        ],
        "technologies": [
            "Cloudflare",
            "AWS Route 53",
            "Google Domains"
        ],
        "faqs": [
            {
                "q": "Can you fix my emails going to spam?",
                "a": "Yes, proper DNS configuration (SPF/DKIM/DMARC) is exactly how we fix this."
            }
        ]
    },
    "maintenance": {
        "id": "maintenance",
        "path": "/maintenance",
        "title": "Website Maintenance",
        "tagline": "Keep your digital assets running flawlessly.",
        "overview": "Proactive monitoring, plugin updates, bug fixes, and content edits. We act as your on-call web team to ensure your site is always fast, secure, and up-to-date.",
        "heroImage": "assets/services/maintenance-hero.png",
        "galleryImages": [],
        "features": [
            {
                "icon": "🔄",
                "title": "Regular Updates",
                "desc": "Safe core and plugin updates."
            },
            {
                "icon": "🛠️",
                "title": "Bug Fixes",
                "desc": "Rapid resolution of any technical issues."
            },
            {
                "icon": "📝",
                "title": "Content Edits",
                "desc": "Quick turnaround for copy and image swaps."
            },
            {
                "icon": "⚡",
                "title": "Performance Tuning",
                "desc": "Ongoing speed optimizations."
            }
        ],
        "process": [
            {
                "step": "01",
                "title": "Onboarding",
                "desc": "Gaining secure access to your environments."
            },
            {
                "step": "02",
                "title": "Initial Audit",
                "desc": "Fixing immediate vulnerabilities."
            },
            {
                "step": "03",
                "title": "Weekly Checks",
                "desc": "Routine maintenance schedules."
            },
            {
                "step": "04",
                "title": "Reporting",
                "desc": "Monthly summaries of work completed."
            }
        ],
        "technologies": [
            "WordPress",
            "Shopify",
            "React",
            "Node.js"
        ],
        "faqs": [
            {
                "q": "How fast do you execute content requests?",
                "a": "Standard edits are completed within 24-48 business hours."
            }
        ]
    },
    "security": {
        "id": "security",
        "path": "/security",
        "title": "Website Security & Backups",
        "tagline": "Ironclad protection for your online business.",
        "overview": "Comprehensive security hardening, malware removal, and automated off-site backups. We protect your data and reputation from emerging cyber threats.",
        "heroImage": "assets/services/security-hero.png",
        "galleryImages": [],
        "features": [
            {
                "icon": "🛡️",
                "title": "Firewall Setup",
                "desc": "Blocking malicious traffic before it hits your server."
            },
            {
                "icon": "🦠",
                "title": "Malware Scanning",
                "desc": "Daily automated checks for vulnerabilities."
            },
            {
                "icon": "💾",
                "title": "Cloud Backups",
                "desc": "Encrypted, daily off-site backups."
            },
            {
                "icon": "🚨",
                "title": "Incident Response",
                "desc": "Rapid recovery in case of a breach."
            }
        ],
        "process": [
            {
                "step": "01",
                "title": "Hardening",
                "desc": "Locking down access points and admin areas."
            },
            {
                "step": "02",
                "title": "Backup Config",
                "desc": "Setting up redundant backup pipelines."
            },
            {
                "step": "03",
                "title": "Monitoring",
                "desc": "24/7 security event logging."
            },
            {
                "step": "04",
                "title": "Testing",
                "desc": "Regular restoration drills to ensure backups work."
            }
        ],
        "technologies": [
            "Cloudflare",
            "AWS S3",
            "Wordfence",
            "Sucuri"
        ],
        "faqs": [
            {
                "q": "What happens if my site gets hacked?",
                "a": "We restore it instantly from our daily backups and patch the vulnerability."
            }
        ]
    }
};

