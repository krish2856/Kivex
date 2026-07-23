const servicesData = {
    'web-design': {
        id: 'web-design',
        path: '/web-design',
        title: 'Website Design',
        tagline: 'Interfaces built around how your customers think, not how your org chart looks.',
        overview: 'We craft bespoke, user-centered digital interfaces that merge brand storytelling with high-converting UX architecture. Every element is designed with intent—from typography hierarchy to micro-interactions—ensuring your web presence leaves a lasting impression while driving business growth.',
        heroImage: 'assets/services/web-design-hero.png',
        galleryImages: [
            'assets/services/web-design-hero.png'
        ],
        features: [
            { icon: '🎨', title: 'Custom Design', desc: 'Unique visual identities tailored precisely to your brand guidelines.' },
            { icon: '📱', title: 'Mobile Responsive', desc: 'Pixel-perfect rendering across mobile, tablet, and ultra-wide desktops.' },
            { icon: '⚡', title: 'Fast Performance', desc: 'Optimized graphics and crisp SVGs for sub-second page loads.' },
            { icon: '🔍', title: 'SEO Ready', desc: 'Semantic HTML markup and structured headings ready for search engines.' },
            { icon: '🔒', title: 'Secure & Compliant', desc: 'Accessibility (WCAG 2.1) and modern web compliance out of the box.' },
            { icon: '⚙️', title: 'Easy Management', desc: 'Clean Figma and code handoff docs for seamless maintenance.' },
            { icon: '✨', title: 'Modern UI', desc: 'Glassmorphism, dark themes, dynamic gradients, and smooth typography.' },
            { icon: '🤝', title: 'Ongoing Support', desc: 'Post-launch design iterations and UI enhancements whenever needed.' }
        ],
        process: [
            { step: '01', title: 'Discovery', desc: 'Auditing your brand, user personas, key objectives, and competitive landscape.' },
            { step: '02', title: 'Planning', desc: 'Creating information architecture, site maps, and user journey flows.' },
            { step: '03', title: 'Wireframing', desc: 'Building high-fidelity layout wireframes to test content layout.' },
            { step: '04', title: 'UI Design', desc: 'Crafting full-color mockups with interactive prototypes in Figma.' },
            { step: '05', title: 'Testing & Refinement', desc: 'Conducting usability feedback and visual polishing across viewports.' },
            { step: '06', title: 'Handoff & Launch', desc: 'Delivering production-ready design tokens and asset kits.' }
        ],
        technologies: ['Figma', 'Adobe XD', 'Sketch', 'HTML5', 'CSS3 / SCSS', 'Tailwind CSS', 'Framer', 'Webflow', 'JavaScript (ES6+)'],
        faqs: [
            { q: 'How long does a custom website design take?', a: 'Typically 2 to 4 weeks depending on the number of pages, custom features, and feedback iterations.' },
            { q: 'Will I get editable design files?', a: 'Yes! You receive complete, organized Figma source files along with design system tokens and component libraries.' },
            { q: 'Is mobile responsiveness included?', a: 'Absolute mobile responsiveness is standard across all our design projects—mobile, tablet, and desktop views are designed explicitly.' },
            { q: 'Do you redesign existing websites?', a: 'Yes, we specialize in modernizing legacy sites into fast, sleek, modern web applications built for conversion.' },
            { q: 'Can you work with our existing brand guidelines?', a: 'Yes, we can seamlessly incorporate your logo, colors, typography, and brand rules while elevating the digital execution.' }
        ]
    },

    'development': {
        id: 'development',
        path: '/development',
        title: 'Web Development',
        tagline: 'Fast, maintainable builds — from marketing sites to full web applications, made to scale.',
        overview: 'We build high-performance web applications and websites using clean, scalable code. Whether you need a lightning-fast marketing platform or a modern full-stack web app with complex database backends, our builds prioritize performance, security, and effortless maintainability.',
        heroImage: 'assets/services/development-hero.png',
        galleryImages: [
            'assets/services/development-hero.png'
        ],
        features: [
            { icon: '🚀', title: 'Fast Performance', desc: 'Sub-second initial loads and 95+ Lighthouse optimization.' },
            { icon: '💻', title: 'Clean Architecture', desc: 'Maintainable, modular code written to strict industry standards.' },
            { icon: '🔒', title: 'Robust Security', desc: 'XSS, CSRF, and data encryption protections built-in.' },
            { icon: '🔄', title: 'API Integration', desc: 'Seamless connection with third-party web services and REST/GraphQL APIs.' },
            { icon: '📱', title: 'Cross-Device', desc: 'Tested across iOS, Android, macOS, Windows, and Linux viewports.' },
            { icon: '🛠️', title: 'Easy Management', desc: 'Intuitive admin dashboards and content management integration.' },
            { icon: '⚡', title: 'SEO Optimized', desc: 'Server-side rendering or static generation for maximum indexing power.' },
            { icon: '🛡️', title: 'Ongoing Maintenance', desc: 'Proactive code updates, security patches, and monitoring.' }
        ],
        process: [
            { step: '01', title: 'Discovery', desc: 'Analyzing functional requirements, data models, and API specifications.' },
            { step: '02', title: 'Planning', desc: 'Defining tech stack architecture, DB schemas, and component structure.' },
            { step: '03', title: 'Frontend Build', desc: 'Developing semantic, accessible, and ultra-responsive user interfaces.' },
            { step: '04', title: 'Backend & APIs', desc: 'Engineering secure database schemas, server endpoints, and logic.' },
            { step: '05', title: 'Testing & QA', desc: 'Unit testing, cross-browser compatibility, and load performance checks.' },
            { step: '06', title: 'Deployment', desc: 'Automated CI/CD deployment to production environments with SSL.' }
        ],
        technologies: ['JavaScript (ES6+)', 'Node.js', 'React.js', 'Next.js', 'Express', 'Python', 'PHP', 'PostgreSQL', 'MongoDB', 'MySQL', 'Git'],
        faqs: [
            { q: 'What frameworks do you use for web development?', a: 'We use Vanilla JavaScript, React, Next.js, Node.js, and Express depending on project needs for optimal speed.' },
            { q: 'Will the website be fast on mobile devices?', a: 'Yes! All code is optimized for minimal bundle size, efficient caching, and 90+ Lighthouse performance scores.' },
            { q: 'Do you provide backend and database setup?', a: 'Yes, we handle the full stack—databases (MySQL, Postgres, Mongo), APIs, server configuration, and authentication.' },
            { q: 'Who owns the code after completion?', a: 'You have 100% full ownership of all source code, assets, and repository access upon project completion.' },
            { q: 'How do you handle website maintenance?', a: 'We offer continuous monitoring, security updates, feature enhancements, and server maintenance packages.' }
        ]
    },

    'automation': {
        id: 'automation',
        path: '/automation',
        title: 'Automation & CRM',
        tagline: 'We wire up your CRM so every lead gets followed up automatically, every time.',
        overview: 'Stop letting valuable leads slip through the cracks. We build automated workflow engines connecting your website, CRM, communication channels, and calendars—ensuring instant lead follow-ups, automated SMS/email reminders, missed-call text-backs, and seamless customer tracking.',
        heroImage: 'assets/services/automation-hero.png',
        galleryImages: [
            'assets/services/automation-hero.png'
        ],
        features: [
            { icon: '📲', title: 'Missed-Call Text-Back', desc: 'Instantly text callers back when your team is busy so you never lose a client.' },
            { icon: '⚡', title: 'Instant Lead Routing', desc: 'Direct incoming form leads straight to sales reps on WhatsApp and email in seconds.' },
            { icon: '📅', title: 'Automated Reminders', desc: 'Cut no-shows with SMS and email appointment reminders.' },
            { icon: '⭐', title: 'Review Campaigns', desc: 'Automatically request Google reviews from satisfied clients post-job.' },
            { icon: '🔄', title: 'CRM Sync', desc: 'Keep lead data updated dynamically across HubSpot, GoHighLevel, or custom CRMs.' },
            { icon: '📊', title: 'Analytics Tracking', desc: 'Full insight into conversion bottlenecks, lead sources, and response times.' },
            { icon: '💬', title: 'WhatsApp Bots', desc: 'Conversational AI bots that answer common questions 24/7.' },
            { icon: '🛠️', title: 'Zero Manual Work', desc: 'Eliminate repetitive data entry and free up team hours.' }
        ],
        process: [
            { step: '01', title: 'Audit', desc: 'Mapping your current lead flow, sales process, and communication touchpoints.' },
            { step: '02', title: 'Strategy', desc: 'Designing trigger rules, messaging sequences, and fallback conditions.' },
            { step: '03', title: 'CRM Setup', desc: 'Configuring pipelines, tags, custom fields, and webhook endpoints.' },
            { step: '04', title: 'Integration', desc: 'Connecting web forms, phone systems, WhatsApp, and email gateways.' },
            { step: '05', title: 'Testing', desc: 'Simulating lead journeys to ensure zero delivery failures or delays.' },
            { step: '06', title: 'Go Live', desc: 'Deploying live automation with real-time logging and performance alerts.' }
        ],
        technologies: ['Make.com', 'Zapier', 'GoHighLevel', 'HubSpot', 'WhatsApp API', 'Twilio', 'Webhooks', 'Node.js', 'Python'],
        faqs: [
            { q: 'What CRMs can you integrate with?', a: 'We work with GoHighLevel, HubSpot, Salesforce, Zoho, ActiveCampaign, or custom backends.' },
            { q: 'How fast is the lead response time with automation?', a: 'Responses trigger in under 15 seconds after a lead fills out your form or misses a call.' },
            { q: 'Can we send messages via WhatsApp?', a: 'Yes! We integrate official WhatsApp Business APIs for automatic notifications and replies.' },
            { q: 'Is it hard for our team to use?', a: 'Not at all. Everything operates automatically in the background; your team receives structured updates.' },
            { q: 'Can you customize follow-up logic?', a: '100% custom—we tailor delays, branching logic, tags, and messaging specifically for your industry.' }
        ]
    },

    'servers': {
        id: 'servers',
        path: '/servers',
        title: 'Servers & Hosting',
        tagline: 'Provisioning, deployment, monitoring — your infrastructure, kept running quietly.',
        overview: 'Keep your web applications fast, online, and impenetrable. We provision high-grade cloud servers, configure bulletproof SSL certificates, set up automated daily database backups, and maintain 24/7 proactive performance monitoring.',
        heroImage: 'assets/services/servers-hero.png',
        galleryImages: [
            'assets/services/servers-hero.png'
        ],
        features: [
            { icon: '🛡️', title: '99.99% Uptime Guarantee', desc: 'High-availability infrastructure ensuring your business stays online 24/7.' },
            { icon: '🔒', title: 'SSL & Encryption', desc: 'Automated Let’s Encrypt / Cloudflare SSL installation and management.' },
            { icon: '💾', title: 'Automated Daily Backups', desc: 'Off-site snapshot backups allowing instant 1-click restore if needed.' },
            { icon: '🚀', title: 'Global CDN Delivery', desc: 'Caching content worldwide so users enjoy lightning response times anywhere.' },
            { icon: '🔥', title: 'DDoS & WAF Protection', desc: 'Shielding your application from malicious attacks and bot traffic.' },
            { icon: '📈', title: 'Auto-Scaling Infrastructure', desc: 'Handling sudden traffic surges without performance degradation.' },
            { icon: '🖥️', title: 'Server Health Monitoring', desc: '24/7 resource monitoring with instant alert dispatch on load spikes.' },
            { icon: '🤝', title: 'Full DevOps Management', desc: 'Zero server management burden on your team.' }
        ],
        process: [
            { step: '01', title: 'Infrastructure Audit', desc: 'Evaluating traffic load requirements, security risks, and stack needs.' },
            { step: '02', title: 'Server Provisioning', desc: 'Spinning up virtual private servers or cloud instances (AWS, VPS, Vercel).' },
            { step: '03', title: 'Security Hardening', desc: 'Configuring firewall rules, SSH keys, WAF, and SSL certificates.' },
            { step: '04', title: 'Database & Code Deployment', desc: 'Migrating data, tuning caching layers, and launching production code.' },
            { step: '05', title: 'Backup Setup', desc: 'Configuring automated daily backup routines to isolated cloud storage.' },
            { step: '06', title: '24/7 Monitoring', desc: 'Activating real-time health checks, uptime monitors, and error logs.' }
        ],
        technologies: ['AWS', 'DigitalOcean', 'Vercel', 'Nginx', 'Docker', 'Cloudflare', 'Ubuntu Linux', 'Redis', 'PostgreSQL'],
        faqs: [
            { q: 'Where are the servers hosted?', a: 'We deploy on AWS, Vercel, DigitalOcean, or Linode based on performance and budget needs.' },
            { q: 'How often are backups taken?', a: 'Database backups occur daily with 30-day retention; system snapshots occur weekly.' },
            { q: 'What happens if my site experiences a traffic surge?', a: 'Our auto-scaling and Cloudflare caching layers handle traffic spikes without crashing.' },
            { q: 'Can you migrate my existing website to a faster server?', a: 'Yes, we handle full zero-downtime website and database migrations.' },
            { q: 'Is email hosting included?', a: 'We configure professional business email routing via Google Workspace or Microsoft 365.' }
        ]
    },

    'shopify': {
        id: 'shopify',
        path: '/shopify',
        title: 'Shopify Stores',
        tagline: 'Storefronts built to convert — custom sections, themes, and checkout tuned for real customers.',
        overview: 'We build high-converting Shopify storefronts that turn visitors into loyal customers. From custom Liquid theme engineering to frictionless checkout optimization, dynamic upsells, and app integrations, we craft ecommerce experiences that maximize average order value (AOV).',
        heroImage: 'assets/services/shopify-hero.png',
        galleryImages: [
            'assets/services/shopify-hero.png'
        ],
        features: [
            { icon: '🛍️', title: 'Custom Theme Development', desc: 'Unique Liquid sections tailored specifically to your product line.' },
            { icon: '📱', title: 'Mobile-First Checkout', desc: 'Frictionless Apple Pay, Google Pay, and Shop Pay single-tap purchasing.' },
            { icon: '🚀', title: 'Speed Optimization', desc: 'Clean asset loading ensuring fast product page renders.' },
            { icon: '📈', title: 'AOV Upsell Engines', desc: 'In-cart upsells, bundle offers, and post-purchase recommendations.' },
            { icon: '🔍', title: 'E-Commerce SEO', desc: 'Product schema tags, collection SEO structures, and fast image loading.' },
            { icon: '💳', title: 'Payment Gateway Integration', desc: 'Stripe, Razorpay, PayPal, and local payment gateway setup.' },
            { icon: '📦', title: 'Inventory & Shipping Sync', desc: 'Integrating logistics partners and real-time shipping calculators.' },
            { icon: '🤝', title: 'Full Store Training', desc: 'Walkthrough video guides on managing products, orders, and discounts.' }
        ],
        process: [
            { step: '01', title: 'Brand Audit', desc: 'Reviewing catalog structure, target demographics, and brand assets.' },
            { step: '02', title: 'UX Architecture', desc: 'Designing collection pages, product pages, and cart drawers.' },
            { step: '03', title: 'Shopify Setup', desc: 'Configuring domain, currencies, tax settings, and payment portals.' },
            { step: '04', title: 'Theme Development', desc: 'Building custom Liquid sections, filters, and dynamic components.' },
            { step: '05', title: 'App Integration', desc: 'Connecting review apps, CRM automation, email capture, and upsells.' },
            { step: '06', title: 'Testing & Launch', desc: 'Conducting test transactions, speed checks, and domain go-live.' }
        ],
        technologies: ['Shopify Liquid', 'Shopify Plus', 'HTML5', 'CSS3 / Tailwind', 'JavaScript', 'Klaviyo', 'Recharge', 'GraphQL Storefront API'],
        faqs: [
            { q: 'Can you migrate my store from WooCommerce or WordPress to Shopify?', a: 'Yes! We migrate all product catalogs, customer databases, order histories, and SEO redirects seamlessly.' },
            { q: 'Do you build custom Liquid sections?', a: 'Yes, we create drag-and-drop Liquid sections so you can edit content easily in Shopify Theme Editor.' },
            { q: 'Can you set up payment gateways for international currencies?', a: 'Yes, we set up multi-currency options with automated geolocation switching.' },
            { q: 'Is inventory management included?', a: 'We set up your catalog structure, variants, inventory tracking, and collection tags.' },
            { q: 'How long does a custom Shopify store take?', a: 'Usually 3 to 5 weeks from initial wireframes to official transaction launch.' }
        ]
    },

    'single-page': {
        id: 'single-page',
        path: '/single-page',
        title: 'Single-page website',
        tagline: 'High-impact, single-page websites to get your brand online fast.',
        overview: 'Fast, sleek, and laser-focused on conversion. A custom landing page synthesizes your entire value proposition into a single smooth-scrolling experience, perfect for product launches, event registration, or new business announcements.',
        heroImage: 'assets/services/single-page-hero.png',
        galleryImages: [
            'assets/services/single-page-hero.png'
        ],
        features: [
            { icon: '🎯', title: 'Conversion Focused', desc: 'Designed to lead visitors straight to your booking form or CTA.' },
            { icon: '⚡', title: 'Ultra-Fast Launch', desc: 'Get fully live online in as little as 5 to 7 business days.' },
            { icon: '📱', title: 'Mobile Perfect', desc: 'Optimized touch navigation and smooth scroll section linking.' },
            { icon: '🔍', title: 'SEO Optimized', desc: 'Structured Meta tags and headings to rank for core brand keywords.' },
            { icon: '🔒', title: 'SSL Included', desc: 'Secure HTTPS setup with fast global delivery.' },
            { icon: '✨', title: 'Interactive Micro-Animations', desc: 'Engaging scroll effects that keep visitors hooked.' },
            { icon: '📩', title: 'Lead Form Capture', desc: 'Forms integrated directly with your WhatsApp or email address.' },
            { icon: '🤝', title: 'Post-Launch Support', desc: 'Free maintenance updates for the first 30 days.' }
        ],
        process: [
            { step: '01', title: 'Content Brief', desc: 'Gathering copy, logo, photos, and key offer details.' },
            { step: '02', title: 'UI Design', desc: 'Crafting a visual mock-up focusing on typography and hierarchy.' },
            { step: '03', title: 'Build', desc: 'Writing lightweight HTML/CSS/JS code.' },
            { step: '04', title: 'Form Wireup', desc: 'Connecting lead capture form to WhatsApp and email.' },
            { step: '05', title: 'Testing', desc: 'Verifying mobile responsiveness and page load speed.' },
            { step: '06', title: 'Launch', desc: 'Linking domain name and publishing live.' }
        ],
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Google Fonts', 'WhatsApp API'],
        faqs: [
            { q: 'How fast can a single-page website be delivered?', a: 'Typically within 5 to 7 business days after content is supplied.' },
            { q: 'Can I add more pages in the future?', a: 'Yes! The site is built on clean code so extra pages can be added anytime.' },
            { q: 'Where do form inquiries go?', a: 'Forms send instant notifications to your WhatsApp and email address.' }
        ]
    },

    'branding': {
        id: 'branding',
        path: '/branding',
        title: 'Custom Logo & Branding',
        tagline: 'Professional logo design and brand identity kits.',
        overview: 'Build an iconic visual identity that commands authority in your industry. We create custom logos, typography standards, color palettes, vector brand marks, and comprehensive brand guideline documentation.',
        heroImage: 'assets/services/branding-hero.png',
        galleryImages: [
            'assets/services/branding-hero.png'
        ],
        features: [
            { icon: '✏️', title: 'Bespoke Logo Design', desc: '100% vector logo marks built from scratch—no templates.' },
            { icon: '📐', title: 'Brand Guidelines', desc: 'Full PDF brand manual covering clear space, misuse, and color rules.' },
            { icon: '🎨', title: 'Color Palette Architecture', desc: 'HEX, RGB, CMYK, and Pantone specifications for web & print.' },
            { icon: '🔤', title: 'Typography System', desc: 'Selected font pairings for web headers, body copy, and social media.' },
            { icon: '🖼️', title: 'Vector Asset Package', desc: 'SVG, EPS, AI, PDF, PNG, and transparent icon files.' },
            { icon: '📱', title: 'Social Media Kit', desc: 'Profile avatars, headers, and post template grids.' },
            { icon: '📄', title: 'Stationery Mockups', desc: 'Business card, letterhead, and invoice layout templates.' },
            { icon: '🤝', title: 'Copyright Transfer', desc: 'Complete ownership of all final trademarked assets.' }
        ],
        process: [
            { step: '01', title: 'Discovery', desc: 'Understanding brand values, target market, and competitor visuals.' },
            { step: '02', title: 'Concept Sketches', desc: 'Drafting initial logo mark ideas on paper and vector software.' },
            { step: '03', title: 'Refinement', desc: 'Selecting top concepts and perfecting geometry and proportions.' },
            { step: '04', title: 'Color & Type', desc: 'Applying color palettes and testing font combinations.' },
            { step: '05', title: 'Guidelines', desc: 'Compiling usage rules into a clean PDF brand manual.' },
            { step: '06', title: 'Final Delivery', desc: 'Exporting high-resolution vector and raster packages.' }
        ],
        technologies: ['Adobe Illustrator', 'Adobe Photoshop', 'Figma', 'Vector Export'],
        faqs: [
            { q: 'How many logo concepts do I get to see?', a: 'We provide 3 to 4 distinct design directions during the initial review stage.' },
            { q: 'In what file formats will I receive my logo?', a: 'You receive vector files (AI, EPS, SVG, PDF) and transparent PNGs in high-resolution.' },
            { q: 'Will I own full copyright for the logo?', a: 'Yes, full commercial usage rights and ownership transfer to you upon completion.' }
        ]
    },

    'ai-art': {
        id: 'ai-art',
        path: '/ai-art',
        title: 'AI-generated Art',
        tagline: 'Unique, high-quality images and art pieces generated by cutting-edge AI.',
        overview: 'Elevate your visual storytelling with custom hyper-realistic graphics, conceptual art, and brand visuals generated using state-of-the-art AI art models, refined by expert digital artists.',
        heroImage: 'assets/services/ai-art-hero.png',
        galleryImages: [
            'assets/services/ai-art-hero.png'
        ],
        features: [
            { icon: '🖼️', title: 'Custom Prompt Crafting', desc: 'Tailored prompt engineering to generate exact brand aesthetics.' },
            { icon: '⚡', title: 'High Resolution Upscaling', desc: '8K resolution output ready for web and large format print.' },
            { icon: '✨', title: 'Photorealistic & Conceptual', desc: 'From realistic product photography to abstract digital artwork.' },
            { icon: '🎯', title: 'Commercial Rights', desc: 'Full usage rights for marketing, websites, and print materials.' }
        ],
        process: [
            { step: '01', title: 'Briefing', desc: 'Gathering visual references and style preferences.' },
            { step: '02', title: 'Prompting', desc: 'Generating initial art variations with cutting-edge AI tools.' },
            { step: '03', title: 'Curation', desc: 'Selecting top render candidates.' },
            { step: '04', title: 'Retouching', desc: 'Polishing details in Photoshop.' },
            { step: '05', title: 'Upscaling', desc: 'Exporting 8K high-resolution files.' }
        ],
        technologies: ['Midjourney v6', 'Stable Diffusion', 'Photoshop AI', 'Topaz Gigapixel'],
        faqs: [
            { q: 'Can I use AI images for commercial ads?', a: 'Yes, all images are upscale-ready with commercial usage licenses.' }
        ]
    },

    'social-setup': {
        id: 'social-setup',
        path: '/social-setup',
        title: 'Social Media Setup',
        tagline: 'Professional setup for your LinkedIn, Instagram, and other social profiles.',
        overview: 'Turn your social profiles into trust-building sales channels. We optimize bio copy, design high-impact banner art, create custom highlight covers, and link automated call-to-action buttons.',
        heroImage: 'assets/services/social-setup-hero.png',
        galleryImages: [
            'assets/services/social-setup-hero.png'
        ],
        features: [
            { icon: '📱', title: 'Bio Copywriting', desc: 'Punchy bios written to convert visitors into profile clicks.' },
            { icon: '🖼️', title: 'Banner Graphics', desc: 'Custom header banners for LinkedIn, Twitter/X, and Facebook.' },
            { icon: '✨', title: 'Highlight Covers', desc: 'Matching Instagram story highlight graphics.' },
            { icon: '🔗', title: 'Link-in-Bio Page', desc: 'Custom multi-link landing page for your social profiles.' }
        ],
        process: [
            { step: '01', title: 'Profile Audit', desc: 'Reviewing current handles and bio text.' },
            { step: '02', title: 'Graphics Design', desc: 'Designing cover photos, banners, and avatars.' },
            { step: '03', title: 'Bio Writing', desc: 'Crafting clear, keyword-optimized bios.' },
            { step: '04', title: 'Setup & Go Live', desc: 'Updating profiles across platforms.' }
        ],
        technologies: ['Figma', 'Photoshop', 'LinkedIn Creator Tools', 'Instagram Pro'],
        faqs: [
            { q: 'Which platforms do you cover?', a: 'LinkedIn, Instagram, Facebook, X/Twitter, YouTube, and TikTok.' }
        ]
    },

    'marketing': {
        id: 'marketing',
        path: '/marketing',
        title: 'Marketing Materials',
        tagline: 'Flyers, brochures, and business card designs ready for print or digital distribution.',
        overview: 'Tangible brand experiences that leave a powerful impression. We design print-ready flyers, tri-fold brochures, digital pitch decks, and premium business cards.',
        heroImage: 'assets/services/marketing-hero.png',
        galleryImages: [
            'assets/services/marketing-hero.png'
        ],
        features: [
            { icon: '📄', title: 'Print Ready CMYK', desc: 'Exported with bleed margins, vector fonts, and print specs.' },
            { icon: '📊', title: 'Pitch Decks', desc: 'High-impact investor and sales presentation slides.' },
            { icon: '🎴', title: 'Business Cards', desc: 'Bespoke business card layouts including QR code integration.' },
            { icon: '📁', title: 'Digital PDFs', desc: 'Interactive, hyperlinked PDFs for email distribution.' }
        ],
        process: [
            { step: '01', title: 'Briefing', desc: 'Defining dimensions, target audience, and printing requirements.' },
            { step: '02', title: 'Layout', desc: 'Structuring content flow and visual focal points.' },
            { step: '03', title: 'Design', desc: 'Applying high-resolution typography and graphics.' },
            { step: '04', title: 'Export', desc: 'Delivering press-ready PDF files with bleed marks.' }
        ],
        technologies: ['Adobe InDesign', 'Adobe Illustrator', 'Photoshop', 'PDF/X Export'],
        faqs: [
            { q: 'Do you handle the actual printing?', a: 'We deliver press-ready PDF files formatted for any commercial printer of your choice.' }
        ]
    },

    'promo-video': {
        id: 'promo-video',
        path: '/promo-video',
        title: 'Promo Videos & Animations',
        tagline: 'Short promotional videos and animations to engage your audience.',
        overview: 'Capture attention instantly with dynamic video motion graphics, app walkthrough trailers, and high-impact promo visual clips designed for web headers and ad campaigns.',
        heroImage: 'assets/services/promo-video-hero.png',
        galleryImages: [
            'assets/services/promo-video-hero.png'
        ],
        features: [
            { icon: '🎬', title: 'Dynamic Motion Graphics', desc: 'Sleek kinetic typography and 2D logo animations.' },
            { icon: '🔊', title: 'Sound Design & SFX', desc: 'Professional audio mixing and royalty-free background beats.' },
            { icon: '⚡', title: 'Web-Optimized Video', desc: 'Compressed MP4/WebM formats built for zero web lag.' },
            { icon: '📱', title: 'Multi-Aspect Ratios', desc: '16:9 widescreen, 1:1 square, and 9:16 vertical formats.' }
        ],
        process: [
            { step: '01', title: 'Script & Storyboard', desc: 'Planning scene timing and key animation moments.' },
            { step: '02', title: 'Asset Creation', desc: 'Preparing vector graphics and screen captures.' },
            { step: '03', title: 'Motion Editing', desc: 'Animating timing, transitions, and text layers.' },
            { step: '04', title: 'Sound Design', desc: 'Adding sound effects and background music.' },
            { step: '05', title: 'Final Render', desc: 'Exporting crisp 4K & web-optimized video files.' }
        ],
        technologies: ['After Effects', 'Premiere Pro', 'Lottie', 'DaVinci Resolve'],
        faqs: [
            { q: 'What video lengths do you create?', a: 'Typically 15-second ad clips up to 90-second detailed promo videos.' }
        ]
    },

    'seo-copy': {
        id: 'seo-copy',
        path: '/seo-copy',
        title: 'SEO Blog & Copywriting',
        tagline: 'Keyword-optimized blog writing and copywriting to rank higher and convert better.',
        overview: 'Turn search traffic into active revenue. We write persuasive website sales copy and in-depth, keyword-rich SEO blog articles designed to dominate search engines while establishing brand authority.',
        heroImage: 'assets/services/seo-copy-hero.png',
        galleryImages: [
            'assets/services/seo-copy-hero.png'
        ],
        features: [
            { icon: '🔍', title: 'Keyword Strategy', desc: 'Targeting search terms with strong commercial intent.' },
            { icon: '📝', title: 'Sales Landing Copy', desc: 'Persuasive messaging that highlights customer pain points.' },
            { icon: '📈', title: 'Blog Content Systems', desc: 'Regular publishing pipelines to boost organic rankings.' },
            { icon: '🎯', title: 'Meta Tags & Schema', desc: 'Writing titles, descriptions, and snippet tags.' }
        ],
        process: [
            { step: '01', title: 'Keyword Research', desc: 'Identifying high-volume search queries.' },
            { step: '02', title: 'Content Outline', desc: 'Structuring headers (H1, H2, H3) for readability.' },
            { step: '03', title: 'Writing', desc: 'Drafting original, engaging copy.' },
            { step: '04', title: 'Editing & SEO Optimization', desc: 'Polishing tone and keyword density.' }
        ],
        technologies: ['Ahrefs', 'SEMrush', 'Surfer SEO', 'Google Search Console'],
        faqs: [
            { q: 'How long until SEO articles start ranking?', a: 'Typically search engines index and rank new authority articles within 4 to 12 weeks.' }
        ]
    },

    'email-templates': {
        id: 'email-templates',
        path: '/email-templates',
        title: 'Email Newsletters',
        tagline: 'Beautiful, responsive email newsletter templates designed for high click-through rates.',
        overview: 'Engage your subscriber list with custom responsive email newsletters. Tested across Gmail, Apple Mail, Outlook, and mobile clients to guarantee flawless rendering and high click-through rates.',
        heroImage: 'assets/services/email-templates-hero.png',
        galleryImages: [
            'assets/services/email-templates-hero.png'
        ],
        features: [
            { icon: '📬', title: 'Cross-Client Compatible', desc: 'Pixel perfect on Outlook, Gmail, Apple Mail, and Yahoo.' },
            { icon: '⚡', title: 'Drag & Drop Ready', desc: 'Integrated directly into Klaviyo, Mailchimp, or Brevo.' },
            { icon: '🎯', title: 'High CTR Layouts', desc: 'Strategic call-to-action buttons designed for clicks.' },
            { icon: '🔄', title: 'Automated Flows', desc: 'Welcome series, abandoned cart, and post-purchase designs.' }
        ],
        process: [
            { step: '01', title: 'Strategy', desc: 'Defining email goals and segment messaging.' },
            { step: '02', title: 'Design', desc: 'Creating mobile-first email layouts.' },
            { step: '03', title: 'HTML Coding', desc: 'Building responsive inline HTML email code.' },
            { step: '04', title: 'Litmus Testing', desc: 'Testing inbox rendering across 50+ email clients.' }
        ],
        technologies: ['HTML Email', 'Klaviyo', 'Mailchimp', 'Brevo', 'Litmus Testing'],
        faqs: [
            { q: 'Will these templates work in Klaviyo?', a: 'Yes! We import templates directly into Klaviyo, Mailchimp, or any major ESP.' }
        ]
    },

    'reels-script': {
        id: 'reels-script',
        path: '/reels-script',
        title: 'Script for Reels',
        tagline: 'Engaging scripts for Instagram Reels and TikToks to go viral.',
        overview: 'Hook viewers in the first 3 seconds. We write high-engagement short-form video scripts designed for Instagram Reels, TikTok, and YouTube Shorts that build authority and drive profile conversions.',
        heroImage: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" fill="none"><rect width="1200" height="675" fill="%23f7f7f5"/><rect x="420" y="50" width="360" height="575" rx="32" fill="%23ffffff" stroke="%23e2e2df" stroke-width="4"/><rect x="440" y="80" width="320" height="515" rx="20" fill="%230a0a0a"/><circle cx="600" cy="550" r="28" fill="%23ff3b30"/><path d="M585 535 L620 550 L585 565 Z" fill="%23ffffff"/><text x="470" y="160" font-family="sans-serif" font-weight="bold" font-size="22" fill="%23ffffff">Viral Reels Script</text><rect x="470" y="190" width="260" height="12" rx="4" fill="%23ffffff" opacity="0.8"/><rect x="470" y="215" width="220" height="12" rx="4" fill="%23ffffff" opacity="0.6"/><rect x="470" y="240" width="180" height="12" rx="4" fill="%23ffffff" opacity="0.4"/><text x="470" y="320" font-family="sans-serif" font-size="16" fill="%23ffbd2e">⚡ 3-Sec Hook Framework</text></svg>',
        galleryImages: [
            'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" fill="none"><rect width="1200" height="675" fill="%23f7f7f5"/><rect x="420" y="50" width="360" height="575" rx="32" fill="%23ffffff" stroke="%23e2e2df" stroke-width="4"/><rect x="440" y="80" width="320" height="515" rx="20" fill="%230a0a0a"/><circle cx="600" cy="550" r="28" fill="%23ff3b30"/><path d="M585 535 L620 550 L585 565 Z" fill="%23ffffff"/><text x="470" y="160" font-family="sans-serif" font-weight="bold" font-size="22" fill="%23ffffff">Viral Reels Script</text></svg>'
        ],
        features: [
            { icon: '🪝', title: 'Strong 3-Sec Hooks', desc: 'Stop the scroll immediately with proven hook frameworks.' },
            { icon: '💬', title: 'On-Screen B-Roll Cues', desc: 'Clear instructions for visual overlays, cuts, and text captions.' },
            { icon: '🎯', title: 'Clear Call-To-Action', desc: 'Direct viewers to comment, share, or click your bio link.' },
            { icon: '⏱️', title: 'Paced Timing', desc: 'Structured for optimal retention across 15 to 60 second formats.' }
        ],
        process: [
            { step: '01', title: 'Topic Brainstorming', desc: 'Identifying trending topics in your niche.' },
            { step: '02', title: 'Hook Drafting', desc: 'Writing 3 variations of the opening line.' },
            { step: '03', title: 'Body Scripting', desc: 'Writing concise, punchy value points.' },
            { step: '04', title: 'Visual Cues', desc: 'Adding B-roll suggestions and caption highlights.' }
        ],
        technologies: ['Notion', 'CapCut Cues', 'Teleprompter Formatting'],
        faqs: [
            { q: 'How many scripts are included per package?', a: 'Typically batches of 10, 20, or 30 ready-to-record scripts.' }
        ]
    }
};
