/* =========================================================
   PORTFOLIO.JS — Kivex Technology Portfolio
   Text animations + theme matching
   ========================================================= */

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Loader
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('loaded');
            document.body.classList.add('loaded');
        }, 1400);
    } else {
        document.body.classList.add('loaded');
    }
});

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav
const navToggle = document.getElementById('navToggle');
const mobileNav = document.getElementById('mobileNav');
if (navToggle && mobileNav) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('open');
        mobileNav.classList.toggle('open');
        document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            navToggle.classList.remove('open');
            mobileNav.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
}

// =========================================================
// TEXT SPLIT ANIMATION UTILITY
// =========================================================
function splitTextToWords(el) {
    if (!el || reduced) return;
    const text = el.textContent.trim();
    const words = text.split(/\s+/);
    el.innerHTML = words.map((word, i) => {
        return `<span class="anim-word" style="--wd:${(i * 0.06) + 's'}"><span class="inner">${word}</span></span>`;
    }).join(' ');
    el.classList.add('anim-text');
}

// Split headings into animated words
['projectsTitle', 'processTitle', 'ctaTitle'].forEach(id => {
    const el = document.getElementById(id);
    if (el) splitTextToWords(el);
});

// =========================================================
// INTERSECTION OBSERVER — scroll-triggered animations
// =========================================================
const animObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('in');
            animObserver.unobserve(e.target);
        }
    });
}, { threshold: 0.15 });

// Observe all animation elements
function observeAnimations() {
    const selectors = [
        '.anim-slide-left',
        '.anim-slide-right',
        '.anim-slide-up',
        '.anim-fade-scale',
        '.anim-clip',
        '.anim-text',
        '.stagger-children',
        '.section-header',
        '.project-card',
        '.process-step',
        '.stat-item'
    ];
    document.querySelectorAll(selectors.join(',')).forEach(el => {
        animObserver.observe(el);
    });
}

if (!reduced) {
    observeAnimations();
} else {
    document.querySelectorAll('.anim-slide-left, .anim-slide-right, .anim-slide-up, .anim-fade-scale, .anim-clip, .anim-text, .stagger-children').forEach(el => el.classList.add('in'));
}

// =========================================================
// CUSTOM CURSOR
// =========================================================
const cursorRing = document.getElementById('cursorRing');
const cursorDot = document.getElementById('cursorDot');
const canCustomCursor = window.matchMedia('(pointer:fine)').matches && !reduced;
if (canCustomCursor && cursorRing && cursorDot) {
    document.body.classList.add('custom-cursor-active');
    let mouseX = -100, mouseY = -100, ringX = -100, ringY = -100;
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%,-50%)`;
    });
    (function ringLoop() {
        ringX += (mouseX - ringX) * 0.16;
        ringY += (mouseY - ringY) * 0.16;
        cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%,-50%)`;
        requestAnimationFrame(ringLoop);
    })();
    const hoverables = 'a, button, .project-card, input, textarea, select';
    document.querySelectorAll(hoverables).forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorRing.classList.add('hovering');
            cursorDot.classList.add('hovering');
        });
        el.addEventListener('mouseleave', () => {
            cursorRing.classList.remove('hovering');
            cursorDot.classList.remove('hovering');
        });
    });
}

// =========================================================
// HERO GLOW
// =========================================================
const heroGlow = document.getElementById('heroGlow');
const heroSection = document.querySelector('.hero');
if (!reduced && heroGlow && heroSection && window.matchMedia('(pointer:fine)').matches) {
    heroSection.addEventListener('mousemove', (e) => {
        const r = heroSection.getBoundingClientRect();
        const x = e.clientX - r.left - 260;
        const y = e.clientY - r.top - 260;
        heroGlow.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
}

// =========================================================
// STAT COUNTERS
// =========================================================
const stats = document.querySelectorAll('.stat-number');
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
        entries.forEach(e => {
            if (e.isIntersecting) {
                animateCount(e.target);
                statIO.unobserve(e.target);
            }
        });
    }, { threshold: 0.4 });
    stats.forEach(s => statIO.observe(s));
}

// =========================================================
// TICKER
// =========================================================
const tickerItems = ['Website Design', 'Web Development', 'CRM Automation', 'Server Hosting', 'Shopify Stores', 'Brand Identity'];
const tickerTrack = document.getElementById('tickerTrack');
if (tickerTrack) {
    const tickerHTML = tickerItems.map(t => `<span>${t}</span>`).join('');
    tickerTrack.innerHTML = tickerHTML + tickerHTML;
}

// =========================================================
// PROJECT CARDS — horizontal card-slide animation (alternating)
// =========================================================
document.querySelectorAll('.project-card').forEach((el, i) => {
    const cls = i % 2 === 0 ? 'anim-slide-left' : 'anim-slide-right';
    el.classList.add(cls);
    el.style.setProperty('--d', (i * 0.15) + 's');
});

// =========================================================
// MAGNETIC HOVER ON BUTTONS (desktop)
// =========================================================
if (!reduced && window.matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
}
