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

        tSlides.forEach((_, i) => {
            const d = document.createElement('button');
            d.className = 'tdot' + (i === 0 ? ' active' : '');
            d.setAttribute('aria-label', 'Go to review ' + (i + 1));
            d.addEventListener('click', () => { goTo(i); resetAutoplay(); });
            tDotsWrap.appendChild(d);
        });
        const tDots = document.querySelectorAll('.tdot');

        function goTo(i) {
            tIndex = (i + tSlides.length) % tSlides.length;
            tTrack.style.transform = `translateX(-${tIndex * 100}%)`;
            tDots.forEach((d, di) => d.classList.toggle('active', di === tIndex));
        }
        function autoAdvance() { goTo(tIndex + 1); }
        function resetAutoplay() {
            clearInterval(tTimer);
            if (!reduced) tTimer = setInterval(autoAdvance, 5500);
        }
        tPrev.addEventListener('click', () => { goTo(tIndex - 1); resetAutoplay(); });
        tNext.addEventListener('click', () => { goTo(tIndex + 1); resetAutoplay(); });
        const tCarousel = document.querySelector('.tcarousel');
        tCarousel.addEventListener('mouseenter', () => clearInterval(tTimer));
        tCarousel.addEventListener('mouseleave', resetAutoplay);

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
