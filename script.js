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
            s.style.animationDelay = (i * 0.07) + 's';
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
        typeLine(0);

        // contact form -> opens WhatsApp with a pre-filled message built from the fields
        const WHATSAPP_NUMBER = '917041888899'; // country code 91 + number, no + or spaces
        const form = document.getElementById('contactForm');
        const status = document.getElementById('formStatus');
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const project = document.getElementById('project').value;
            const message = document.getElementById('message').value.trim();

            const text =
                `New enquiry from kivextechnology.com\n` +
                `Name: ${name}\n` +
                `Email: ${email}\n` +
                `Project type: ${project}\n` +
                `Details: ${message}`;

            const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
            status.textContent = 'Opening WhatsApp…';
            window.open(waLink, '_blank');
        });

        /* =========================================================
           SERVICE DETAILS FULL-SCREEN OVERLAY & LIGHTBOX LOGIC
           ========================================================= */
        const serviceOverlay = document.getElementById('serviceOverlay');
        const overlayBackdrop = document.getElementById('overlayBackdrop');
        const overlayClose = document.getElementById('overlayClose');

        const imageLightbox = document.getElementById('imageLightbox');
        const lightboxOverlay = document.getElementById('lightboxOverlay');
        const lightboxClose = document.getElementById('lightboxClose');
        const lightboxImg = document.getElementById('lightboxImg');
        const lightboxCaption = document.getElementById('lightboxCaption');

        let activeService = null;
        let activeGalleryImages = [];
        let currentImageIdx = 0;

        // Open Service Overlay
        function openServiceOverlay(serviceId) {
            if (typeof servicesData === 'undefined' || !servicesData[serviceId]) {
                console.warn('Service data not found for:', serviceId);
                return;
            }
            activeService = servicesData[serviceId];
            activeGalleryImages = [activeService.heroImage, ...(activeService.galleryImages || [])];
            currentImageIdx = 0;

            // Header Copy
            document.getElementById('soEyebrow').textContent = activeService.path || '/' + serviceId;
            document.getElementById('soTitle').textContent = activeService.title;
            document.getElementById('soTagline').textContent = activeService.tagline;
            document.getElementById('soOverview').textContent = activeService.overview;

            // Main Hero Image & Thumbnails
            updateOverlayGallery();

            // Section 2: Features Grid
            const featuresGrid = document.getElementById('soFeaturesGrid');
            featuresGrid.innerHTML = (activeService.features || []).map(f => `
                <div class="so-feature-card">
                    <span class="so-feature-icon">${f.icon}</span>
                    <h4>${f.title}</h4>
                    <p>${f.desc}</p>
                </div>
            `).join('');

            // Section 3: Process Timeline
            const processTimeline = document.getElementById('soProcessTimeline');
            processTimeline.innerHTML = (activeService.process || []).map(p => `
                <div class="so-process-step">
                    <span class="so-step-badge">STEP ${p.step}</span>
                    <h4>${p.title}</h4>
                    <p>${p.desc}</p>
                </div>
            `).join('');



            // Section 5: Tech Badges
            const techBadges = document.getElementById('soTechBadges');
            techBadges.innerHTML = (activeService.technologies || []).map(tech => `
                <span class="so-tech-badge">${tech}</span>
            `).join('');

            // Section 6: FAQs
            const faqList = document.getElementById('soFaqList');
            faqList.innerHTML = (activeService.faqs || []).map((faq, index) => `
                <div class="so-faq-item ${index === 0 ? 'active' : ''}">
                    <button class="so-faq-question">
                        <span>${faq.q}</span>
                        <span class="so-faq-icon">+</span>
                    </button>
                    <div class="so-faq-answer">${faq.a}</div>
                </div>
            `).join('');

            // Accordion click handlers
            faqList.querySelectorAll('.so-faq-question').forEach(btn => {
                btn.addEventListener('click', () => {
                    const item = btn.closest('.so-faq-item');
                    item.classList.toggle('active');
                });
            });

            // Show Overlay
            serviceOverlay.classList.add('open');
            serviceOverlay.setAttribute('aria-hidden', 'false');
            document.body.classList.add('overlay-open');
        }

        // Gallery Slider Updates
        function updateOverlayGallery() {
            const heroImg = document.getElementById('soHeroImg');
            if (activeGalleryImages.length > 0) {
                heroImg.src = activeGalleryImages[currentImageIdx];
            }

            const track = document.getElementById('soThumbTrack');
            track.innerHTML = activeGalleryImages.map((img, idx) => `
                <div class="so-thumb-item ${idx === currentImageIdx ? 'active' : ''}" data-index="${idx}">
                    <img src="${img}" alt="Thumbnail ${idx + 1}">
                </div>
            `).join('');

            track.querySelectorAll('.so-thumb-item').forEach(thumb => {
                thumb.addEventListener('click', () => {
                    currentImageIdx = parseInt(thumb.dataset.index);
                    updateOverlayGallery();
                });
            });
        }

        // Thumb Prev / Next
        const thumbPrev = document.getElementById('soThumbPrev');
        const thumbNext = document.getElementById('soThumbNext');
        if (thumbPrev) {
            thumbPrev.addEventListener('click', () => {
                if (activeGalleryImages.length === 0) return;
                currentImageIdx = (currentImageIdx - 1 + activeGalleryImages.length) % activeGalleryImages.length;
                updateOverlayGallery();
            });
        }
        if (thumbNext) {
            thumbNext.addEventListener('click', () => {
                if (activeGalleryImages.length === 0) return;
                currentImageIdx = (currentImageIdx + 1) % activeGalleryImages.length;
                updateOverlayGallery();
            });
        }

        // Enlarge Main Image
        const enlargeMainBtn = document.getElementById('soEnlargeMain');
        if (enlargeMainBtn) {
            enlargeMainBtn.addEventListener('click', () => {
                if (activeGalleryImages[currentImageIdx]) {
                    openLightbox(activeGalleryImages[currentImageIdx], activeService ? activeService.title : '');
                }
            });
        }

        // Close Service Overlay
        function closeServiceOverlay() {
            if (!serviceOverlay) return;
            serviceOverlay.classList.remove('open');
            serviceOverlay.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('overlay-open');
        }

        if (overlayClose) overlayClose.addEventListener('click', closeServiceOverlay);
        if (overlayBackdrop) overlayBackdrop.addEventListener('click', closeServiceOverlay);

        // Lightbox Functions
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

        // Global ESC Key Close Handler
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (imageLightbox && imageLightbox.classList.contains('open')) {
                    closeLightbox();
                } else if (serviceOverlay && serviceOverlay.classList.contains('open')) {
                    closeServiceOverlay();
                }
            }
        });

        // Attach click triggers to Service Cards in #services
        document.querySelectorAll('.svc-row[data-service-id]').forEach(card => {
            card.addEventListener('click', () => {
                const serviceId = card.dataset.serviceId;
                openServiceOverlay(serviceId);
            });
        });

        // CTA Links in Overlay: Smooth Scroll to #contact & Close Overlay
        ['soCtaPrimary', 'soCtaSecondary', 'soFinalCta'].forEach(id => {
            const btn = document.getElementById(id);
            if (btn) {
                btn.addEventListener('click', (e) => {
                    closeServiceOverlay();
                });
            }
        });

