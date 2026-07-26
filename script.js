// loader
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('loaded');
            document.body.classList.add('loaded');
            if (typeof typeLine === 'function') {
                setTimeout(() => typeLine(0), 1200); // wait for fadeUp to start
            }
            // Allow time for the slide-up animation to finish before hiding completely
            setTimeout(() => {
                loader.style.display = 'none';
            }, 800);
        }, 1200); // Wait for the loading bar animation to finish
    } else {
        document.body.classList.add('loaded');
        if (typeof typeLine === 'function') typeLine(0);
    }
});

// year
document.getElementById('year').textContent = new Date().getFullYear();

// mobile nav
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// reveal on scroll (vertical, horizontal, diagonal variants)
const revealSelector = '.reveal, .reveal-left, .reveal-right, .reveal-diag, .reveal-diag-rev';
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduced) {
    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: .15 });
    document.querySelectorAll(revealSelector).forEach(el => io.observe(el));
} else {
    document.querySelectorAll(revealSelector).forEach(el => el.classList.add('in'));
}

// custom cursor: ring trails with easing, dot tracks instantly; both invert via mix-blend-mode
const cursorRing = document.getElementById('cursorRing');
const cursorDot = document.getElementById('cursorDot');
const canCustomCursor = window.matchMedia('(pointer:fine)').matches && !reduced;
if (canCustomCursor) {
    document.body.classList.add('custom-cursor-active');
    let mouseX = -100, mouseY = -100, ringX = -100, ringY = -100;
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX; mouseY = e.clientY;
        cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%,-50%)`;
    });
    (function ringLoop() {
        ringX += (mouseX - ringX) * 0.16;
        ringY += (mouseY - ringY) * 0.16;
        cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%,-50%)`;
        requestAnimationFrame(ringLoop);
    })();
    const hoverables = 'a, button, .work-card, .svc-row, .tdot, input, textarea, select';
    document.querySelectorAll(hoverables).forEach(el => {
        el.addEventListener('mouseenter', () => { cursorRing.classList.add('hovering'); cursorDot.classList.add('hovering'); });
        el.addEventListener('mouseleave', () => { cursorRing.classList.remove('hovering'); cursorDot.classList.remove('hovering'); });
    });
}

// hero wordmark: split into animated letters
const heroWord = document.getElementById('heroWord');
const wordText = 'KIVEX';
wordText.split('').forEach((ch, i) => {
    const s = document.createElement('span');
    s.className = 'letter';
    s.textContent = ch;
    s.style.animationDelay = (i * 0.12) + 's';
    heroWord.appendChild(s);
});

// hero glow follows pointer (desktop only, respects reduced motion)
const heroGlow = document.getElementById('heroGlow');
const heroSection = document.querySelector('.hero');
if (!reduced && window.matchMedia('(pointer:fine)').matches) {
    heroSection.addEventListener('mousemove', (e) => {
        const r = heroSection.getBoundingClientRect();
        const x = e.clientX - r.left - 260;
        const y = e.clientY - r.top - 260;
        heroGlow.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
}

// ticker content
const tickerItems = ['Website Design', 'Web Development', 'Automation & CRM', 'Servers & Hosting', 'Shopify Stores'];
const tickerTrack = document.getElementById('tickerTrack');
const tickerHTML = tickerItems.map(t => `<span>${t}</span>`).join('');
tickerTrack.innerHTML = tickerHTML + tickerHTML; // duplicate for seamless loop

// stat counters
const stats = document.querySelectorAll('.stat-num');
const animateCount = (el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const isDecimal = target % 1 !== 0;
    const duration = 1200;
    const start = performance.now();
    function tick(now) {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = target * eased;
        el.textContent = (isDecimal ? val.toFixed(1) : Math.round(val)) + suffix;
        if (p < 1) requestAnimationFrame(tick);
    }
    if (reduced) {
        el.textContent = (isDecimal ? target.toFixed(1) : target) + suffix;
    } else {
        requestAnimationFrame(tick);
    }
};
if (stats.length) {
    const statIO = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { animateCount(e.target); statIO.unobserve(e.target); } });
    }, { threshold: .4 });
    stats.forEach(s => statIO.observe(s));
}

// testimonial carousel
const tTrack = document.getElementById('tTrack');
const tSlides = document.querySelectorAll('.tslide');
const tDotsWrap = document.getElementById('tDots');
const tPrev = document.getElementById('tPrev');
const tNext = document.getElementById('tNext');
let tIndex = 0;
let tTimer;

if (tTrack && tSlides.length > 0) {
    if (tDotsWrap) {
        tSlides.forEach((_, i) => {
            const d = document.createElement('button');
            d.className = 'tdot' + (i === 0 ? ' active' : '');
            d.setAttribute('aria-label', 'Go to review ' + (i + 1));
            d.addEventListener('click', () => { goTo(i); resetAutoplay(); });
            tDotsWrap.appendChild(d);
        });
    }
    const tDots = document.querySelectorAll('.tdot');

    function goTo(i) {
        tIndex = (i + tSlides.length) % tSlides.length;
        if (tTrack) tTrack.style.transform = `translateX(-${tIndex * 100}%)`;
        tDots.forEach((d, di) => d.classList.toggle('active', di === tIndex));
    }
    function autoAdvance() { goTo(tIndex + 1); }
    function resetAutoplay() {
        clearInterval(tTimer);
        if (!reduced) tTimer = setInterval(autoAdvance, 5500);
    }
    if (tPrev) tPrev.addEventListener('click', () => { goTo(tIndex - 1); resetAutoplay(); });
    if (tNext) tNext.addEventListener('click', () => { goTo(tIndex + 1); resetAutoplay(); });
    const tCarousel = document.querySelector('.tcarousel');
    if (tCarousel) {
        tCarousel.addEventListener('mouseenter', () => clearInterval(tTimer));
        tCarousel.addEventListener('mouseleave', resetAutoplay);
    }

    // touch swipe
    let tStartX = 0;
    tTrack.addEventListener('touchstart', (e) => { tStartX = e.touches[0].clientX; }, { passive: true });
    tTrack.addEventListener('touchend', (e) => {
        const dx = e.changedTouches[0].clientX - tStartX;
        if (dx > 40) { goTo(tIndex - 1); resetAutoplay(); }
        else if (dx < -40) { goTo(tIndex + 1); resetAutoplay(); }
    }, { passive: true });

    goTo(0);
    resetAutoplay();
}

// pause autoplay while the client video review is playing
const clientVideo = document.getElementById('clientVideo');
if (clientVideo) {
    clientVideo.addEventListener('play', () => clearInterval(tTimer));
    clientVideo.addEventListener('pause', resetAutoplay);
    clientVideo.addEventListener('ended', resetAutoplay);
}

// terminal typing
const lines = [
    { text: '$ kivex deploy --client="your-business"', pause: 500 },
    { text: '✓ designing interface', pause: 350 },
    { text: '✓ building application', pause: 350 },
    { text: '✓ provisioning server', pause: 350 },
    { text: '✓ connecting automation', pause: 350 },
    { text: '✓ shipped.', pause: 0 }
];
const container = document.getElementById('terminalLines');

function typeLine(index) {
    if (index >= lines.length) {
        const cur = document.createElement('span');
        cur.className = 'cursor';
        container.appendChild(cur);
        return;
    }
    const lineEl = document.createElement('div');
    lineEl.className = 'terminal-line';
    container.appendChild(lineEl);
    const full = lines[index].text;
    if (reduced) {
        lineEl.textContent = full;
        lineEl.style.opacity = 1;
        typeLine(index + 1);
        return;
    }
    let i = 0;
    const speed = 18;
    function step() {
        lineEl.textContent = full.slice(0, i);
        lineEl.style.opacity = 1;
        i++;
        if (i <= full.length) {
            setTimeout(step, speed);
        } else {
            setTimeout(() => typeLine(index + 1), lines[index].pause);
        }
    }
    step();
}
// typeLine(0) is now called when the loader finishes

// contact form -> opens WhatsApp with a pre-filled message built from the fields
const WHATSAPP_NUMBER = '917041888899'; // country code 91 + number, no + or spaces
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const project = document.getElementById('project').value;
    const message = document.getElementById('message').value.trim();

    status.textContent = 'Submitting your request...';

    // 1. Send data to CRM Backend
    try {
        // IMPORTANT: Change this URL to your live Render URL after deploying
        const API_URL = 'http://localhost:3000/api/leads'; 
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, project, message })
        });
    } catch (err) {
        console.error("Failed to save lead to CRM:", err);
        // We catch the error so it continues to WhatsApp even if CRM is offline
    }

    // 2. Open WhatsApp
    const text =
        `New enquiry from kivextechnology.com\n` +
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Project type: ${project}\n` +
        `Details: ${message}`;

    const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    status.textContent = 'Redirecting to WhatsApp…';
    window.open(waLink, '_blank');
});

/* =========================================================
   SERVICES EXPLORER LOGIC (3-LEVEL)
   ========================================================= */
const servicesMainView = document.getElementById('servicesMain');

const servicesFilterBar = document.getElementById('servicesFilterBar');
const svcGridContainer = document.getElementById('svcGridContainer');

let currentActiveCategory = 'all';

function initCategories() {
    if (typeof serviceCategories === 'undefined' || !servicesFilterBar) return;
    
    // Create "All Services" tab
    let tabsHTML = `<button class="filter-tab active" data-category="all">All Services</button>`;
    
    // Create category tabs
    tabsHTML += serviceCategories.map(cat => `
        <button class="filter-tab" data-category="${cat.id}">${cat.title}</button>
    `).join('');
    
    servicesFilterBar.innerHTML = tabsHTML;

    // Attach click events to tabs
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const catId = tab.dataset.category;
            renderGrid(catId);
        });
    });
    
    // Initial render
    renderGrid('all');
}

function renderGrid(catId) {
    currentActiveCategory = catId;
    let servicesToRender = [];
    
    if (catId === 'all') {
        serviceCategories.forEach(cat => {
            servicesToRender = servicesToRender.concat(cat.services);
        });
        servicesToRender = [...new Set(servicesToRender)];
    } else {
        const category = serviceCategories.find(c => c.id === catId);
        if (category) {
            servicesToRender = category.services;
        }
    }
    
    svcGridContainer.innerHTML = servicesToRender.map(svcId => {
        const svc = servicesData[svcId];
        if (!svc) return '';
        return `
            <div class="svc-card" data-service-id="${svc.id}">
                <div class="cat-content">
                    <h3>${svc.title}</h3>
                    <p>${svc.tagline}</p>
                </div>
                <div class="cat-arrow">→</div>
            </div>
        `;
    }).join('');

    document.querySelectorAll('.svc-card').forEach(card => {
        card.addEventListener('click', () => {
            const svcId = card.dataset.serviceId;
            window.location.href = 'service.html?id=' + svcId;
        });
    });
}



document.addEventListener('DOMContentLoaded', () => {
    initCategories();
});

/* =========================================================
   LIGHTBOX LOGIC
   ========================================================= */
const imageLightbox = document.getElementById('imageLightbox');
const lightboxOverlay = document.getElementById('lightboxOverlay');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');

function openLightbox(imgSrc, caption = '') {
    if (!imageLightbox) return;
    lightboxImg.src = imgSrc;
    lightboxCaption.textContent = caption;
    imageLightbox.classList.add('open');
    imageLightbox.setAttribute('aria-hidden', 'false');
}

function closeLightbox() {
    if (!imageLightbox) return;
    imageLightbox.classList.remove('open');
    imageLightbox.setAttribute('aria-hidden', 'true');
}

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (imageLightbox && imageLightbox.classList.contains('open')) {
            closeLightbox();
        }
    }
});

document.querySelectorAll('.foot-svc-link').forEach(elem => {
    elem.addEventListener('click', (e) => {
        const serviceId = elem.dataset.serviceId;
        if (serviceId) {
            window.location.href = 'service.html?id=' + serviceId;
        }
    });
});

