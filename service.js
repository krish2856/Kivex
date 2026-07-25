document.addEventListener('DOMContentLoaded', () => {
    // 1. Get service ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const serviceId = urlParams.get('id');

    if (!serviceId || typeof servicesData === 'undefined' || !servicesData[serviceId]) {
        // Redirect to home if invalid service ID
        window.location.href = 'index.html';
        return;
    }

    const svc = servicesData[serviceId];

    // 2. Populate basic info
    document.title = `${svc.title} | Kivex Technology`;
    document.getElementById('soEyebrow').textContent = svc.path || '/' + serviceId;
    document.getElementById('soTitle').textContent = svc.title;
    document.getElementById('soTagline').textContent = svc.tagline;
    document.getElementById('soOverview').textContent = svc.overview;

    // 3. Populate Hero Image
    const heroImg = document.getElementById('soHeroImg');
    if (svc.heroImage && heroImg) {
        heroImg.src = svc.heroImage;
        heroImg.style.display = 'block';
    } else if (heroImg) {
        heroImg.style.display = 'none';
    }

    // 4. Populate Features
    const featuresGrid = document.getElementById('soFeaturesGrid');
    if (featuresGrid) {
        featuresGrid.innerHTML = (svc.features || []).map(f => `
            <div class="so-feature-card">
                <span class="so-feature-icon">${f.icon}</span>
                <h4>${f.title}</h4>
                <p>${f.desc}</p>
            </div>
        `).join('');
    }

    // 5. Populate Process Timeline
    const processTimeline = document.getElementById('soProcessTimeline');
    if (processTimeline) {
        processTimeline.innerHTML = (svc.process || []).map(p => `
            <div class="so-process-step">
                <span class="so-step-badge">STEP ${p.step}</span>
                <h4>${p.title}</h4>
                <p>${p.desc}</p>
            </div>
        `).join('');
    }

    // 6. Populate Tech Badges
    const techBadges = document.getElementById('soTechBadges');
    if (techBadges) {
        techBadges.innerHTML = (svc.technologies || []).map(tech => `
            <span class="so-tech-badge">${tech}</span>
        `).join('');
    }

    // 7. Populate FAQs
    const faqList = document.getElementById('soFaqList');
    if (faqList) {
        faqList.innerHTML = (svc.faqs || []).map((faq, index) => `
            <div class="so-faq-item ${index === 0 ? 'active' : ''}">
                <button class="so-faq-question">
                    <span>${faq.q}</span>
                    <span class="so-faq-icon">+</span>
                </button>
                <div class="so-faq-answer">${faq.a}</div>
            </div>
        `).join('');

        faqList.querySelectorAll('.so-faq-question').forEach(btn => {
            btn.addEventListener('click', () => {
                const item = btn.closest('.so-faq-item');
                item.classList.toggle('active');
            });
        });
    }

    // Mobile Nav Toggle for Header (Re-implemented from script.js)
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Update footer links to work properly on the service page
    document.querySelectorAll('.foot-svc-link').forEach(elem => {
        elem.addEventListener('click', (e) => {
            const newServiceId = elem.dataset.serviceId;
            if (newServiceId) {
                window.location.href = 'service.html?id=' + newServiceId;
            }
        });
    });
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
