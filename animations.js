/* =========================================================
   KIVEX PREMIUM SCROLL ANIMATION SYSTEM
   Uses GSAP + ScrollTrigger for cinematic scroll experiences
   ========================================================= */

(function () {
    'use strict';

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth <= 768;

    // Wait for GSAP to be available
    function waitForGSAP(cb) {
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            if (typeof ScrollToPlugin !== 'undefined') {
                gsap.registerPlugin(ScrollToPlugin);
            }
            cb();
        } else {
            setTimeout(() => waitForGSAP(cb), 50);
        }
    }

    waitForGSAP(init);

    function init() {
        gsap.registerPlugin(ScrollTrigger);
        if (typeof ScrollToPlugin !== 'undefined') {
            gsap.registerPlugin(ScrollToPlugin);
        }

        if (reduced) {
            document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-diag, .reveal-diag-rev').forEach(el => el.classList.add('in'));
            return;
        }

        initLoaderSequence();
        initNavigation();
        initHeroCinematic();
        initTypographyReveals();
        initSectionTransitions();
        initServicesScrollExperience();
        initWorkSectionReveal();
        initAutomationReveal();
        initContactReveal();
        initFooterReveal();
        initParallaxElements();
        initMicroInteractions();
        initSmoothScrollProgress();
    }

    /* ─── LOADER SEQUENCE ─── */
    function initLoaderSequence() {
        const loader = document.getElementById('loader');
        if (!loader) return;

        // Enhanced loader with GSAP
        const tl = gsap.timeline({
            onComplete: () => {
                loader.style.display = 'none';
                document.body.classList.add('loaded');
                // Trigger hero entrance
                triggerHeroEntrance();
            }
        });

        tl.to('.loader-bar', {
            width: '100%',
            duration: 1,
            ease: 'power2.inOut'
        })
        .to(loader, {
            yPercent: -100,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.inOut'
        }, '+=0.2');

        // Remove the old loader timeout from script.js by overriding
        window.addEventListener('load', () => {
            // Already handled by GSAP
        });
    }

    /* ─── HERO CINEMATIC ENTRANCE ─── */
    let heroEntranceTriggered = false;

    function triggerHeroEntrance() {
        if (heroEntranceTriggered) return;
        heroEntranceTriggered = true;

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // Letter reveal with stagger
        const letters = document.querySelectorAll('.hero-word .letter');
        if (letters.length) {
            tl.fromTo(letters, {
                opacity: 0,
                y: 60,
                rotateX: -15
            }, {
                opacity: 1,
                y: 0,
                rotateX: 0,
                duration: 1,
                stagger: 0.08,
                ease: 'power3.out'
            }, 0);
        }

        // Technology line
        tl.fromTo('.hero-tech', {
            opacity: 0,
            clipPath: 'inset(0 100% 0 0)'
        }, {
            opacity: 1,
            clipPath: 'inset(0 0% 0 0)',
            duration: 0.8,
            ease: 'power2.inOut'
        }, 0.4);

        // Rotating text
        tl.fromTo('.hero-rotating-wrap', {
            opacity: 0,
            y: 20
        }, {
            opacity: 1,
            y: 0,
            duration: 0.8
        }, 0.6);

        // Subtitle
        tl.fromTo('.hero-sub', {
            opacity: 0,
            y: 20
        }, {
            opacity: 1,
            y: 0,
            duration: 0.8
        }, 0.7);

        // CTAs
        tl.fromTo('.hero-ctas', {
            opacity: 0,
            y: 16
        }, {
            opacity: 1,
            y: 0,
            duration: 0.7
        }, 0.9);

        // Glow
        tl.fromTo('.hero-glow', {
            opacity: 0,
            scale: 0.5
        }, {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'power2.out'
        }, 0.3);

        // Eyebrow
        tl.fromTo('.hero .eyebrow', {
            opacity: 0,
            y: -10
        }, {
            opacity: 1,
            y: 0,
            duration: 0.6
        }, 0.2);
    }

    function initHeroCinematic() {
        // Hero parallax on scroll
        gsap.to('.hero .wrap', {
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            },
            y: 80,
            opacity: 0.3
        });

        // Hero glow follows scroll
        gsap.to('.hero-glow', {
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1.5
            },
            y: 120,
            scale: 1.3,
            opacity: 0
        });

        // Ticker entrance
        gsap.fromTo('.ticker', {
            opacity: 0
        }, {
            opacity: 1,
            duration: 0.6,
            scrollTrigger: {
                trigger: '.ticker',
                start: 'top 90%',
                once: true
            }
        });

        // Ticker speed on scroll
        gsap.to('.ticker-track', {
            scrollTrigger: {
                trigger: '.ticker',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.5
            },
            x: '-=60'
        });
    }

    /* ─── NAVIGATION SCROLL BEHAVIOR ─── */
    function initNavigation() {
        const header = document.querySelector('header');
        if (!header) return;

        let lastScroll = 0;
        const threshold = 80;

        ScrollTrigger.create({
            start: 'top -80',
            end: 99999,
            onUpdate: (self) => {
                const currentScroll = self.scroll();

                if (currentScroll > threshold) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }

                // Hide/show on scroll direction
                if (currentScroll > lastScroll && currentScroll > 200) {
                    header.classList.add('nav-hidden');
                } else {
                    header.classList.remove('nav-hidden');
                }

                lastScroll = currentScroll;
            }
        });

        // Smooth scroll for anchor links with offset
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    const offset = 80;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                    gsap.to(window, {
                        scrollTo: { y: targetPosition, autoKill: false },
                        duration: 1,
                        ease: 'power3.inOut'
                    });
                    // Close mobile nav
                    const navLinks = document.getElementById('navLinks');
                    if (navLinks) navLinks.classList.remove('open');
                }
            });
        });
    }

    /* ─── TYPOGRAPHY REVEALS ─── */
    function initTypographyReveals() {
        // Section headings - split into words and reveal
        document.querySelectorAll('.section-head h2').forEach(heading => {
            wrapWords(heading);
            gsap.fromTo(heading.querySelectorAll('.word'), {
                opacity: 0,
                y: 30,
                clipPath: 'inset(0 0 100% 0)'
            }, {
                opacity: 1,
                y: 0,
                clipPath: 'inset(0 0 0% 0)',
                duration: 0.8,
                stagger: 0.06,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: heading,
                    start: 'top 85%',
                    once: true
                }
            });
        });

        // Section description paragraphs
        document.querySelectorAll('.section-head p').forEach(p => {
            gsap.fromTo(p, {
                opacity: 0,
                y: 16
            }, {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: p,
                    start: 'top 88%',
                    once: true
                }
            });
        });

        // Eyebrow labels
        document.querySelectorAll('.eyebrow').forEach(eyebrow => {
            gsap.fromTo(eyebrow, {
                opacity: 0,
                x: -20
            }, {
                opacity: 1,
                x: 0,
                duration: 0.6,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: eyebrow,
                    start: 'top 90%',
                    once: true
                }
            });
        });

        // Large display text - contact heading
        const contactH2 = document.querySelector('.contact-copy h2');
        if (contactH2) {
            wrapWords(contactH2);
            gsap.fromTo(contactH2.querySelectorAll('.word'), {
                opacity: 0,
                y: 40,
                clipPath: 'inset(0 0 100% 0)'
            }, {
                opacity: 1,
                y: 0,
                clipPath: 'inset(0 0 0% 0)',
                duration: 0.9,
                stagger: 0.08,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: contactH2,
                    start: 'top 85%',
                    once: true
                }
            });
        }

        // Automation heading
        const autoH2 = document.querySelector('.auto-copy h2');
        if (autoH2) {
            wrapWords(autoH2);
            gsap.fromTo(autoH2.querySelectorAll('.word'), {
                opacity: 0,
                y: 30,
                clipPath: 'inset(0 0 100% 0)'
            }, {
                opacity: 1,
                y: 0,
                clipPath: 'inset(0 0 0% 0)',
                duration: 0.9,
                stagger: 0.07,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: autoH2,
                    start: 'top 85%',
                    once: true
                }
            });
        }

        // Why section heading
        const whyH2 = document.querySelector('#about .section-head h2');
        if (whyH2) {
            wrapWords(whyH2);
            gsap.fromTo(whyH2.querySelectorAll('.word'), {
                opacity: 0,
                y: 30,
                clipPath: 'inset(0 0 100% 0)'
            }, {
                opacity: 1,
                y: 0,
                clipPath: 'inset(0 0 0% 0)',
                duration: 0.9,
                stagger: 0.07,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: whyH2,
                    start: 'top 85%',
                    once: true
                }
            });
        }

        // Footer wordmark
        const footWord = document.querySelector('.foot-word');
        if (footWord) {
            gsap.fromTo(footWord, {
                opacity: 0,
                y: 40,
                scale: 0.95
            }, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: footWord,
                    start: 'top 90%',
                    once: true
                }
            });
        }
    }

    function wrapWords(el) {
        if (el.dataset.wrapped) return;
        el.dataset.wrapped = 'true';
        const text = el.textContent;
        el.innerHTML = text.split(/\s+/).map(word =>
            `<span class="word" style="display:inline-block">${word}</span>`
        ).join(' ');
    }

    /* ─── SECTION TRANSITIONS ─── */
    function initSectionTransitions() {
        // About section - why items staggered reveal
        const whyItems = document.querySelectorAll('.why-item');
        if (whyItems.length) {
            gsap.fromTo(whyItems, {
                opacity: 0,
                y: 40
            }, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.why-grid',
                    start: 'top 80%',
                    once: true
                }
            });
        }

        // Stats grid reveal
        const stats = document.querySelectorAll('.stat');
        if (stats.length) {
            gsap.fromTo(stats, {
                opacity: 0,
                y: 30,
                scale: 0.96
            }, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.7,
                stagger: 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.stats-grid',
                    start: 'top 85%',
                    once: true
                }
            });
        }

        // Why intro text
        const whyIntro = document.querySelector('.why-intro');
        if (whyIntro) {
            gsap.fromTo(whyIntro, {
                opacity: 0,
                y: 20
            }, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: whyIntro,
                    start: 'top 88%',
                    once: true
                }
            });
        }

        // Dark section background - no animation needed, solid black
        // Removed background color transition for cleaner look
    }

    /* ─── SERVICES SECTION SCROLL EXPERIENCE ─── */
    function initServicesScrollExperience() {
        const servicesSection = document.getElementById('services');
        if (!servicesSection) return;

        // Service cards staggered reveal
        const renderServiceCards = () => {
            const cards = document.querySelectorAll('.svc-card');
            if (cards.length) {
                gsap.fromTo(cards, {
                    opacity: 0,
                    y: 30,
                    scale: 0.97
                }, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    stagger: 0.05,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.svc-grid',
                        start: 'top 85%',
                        once: true
                    }
                });
            }
        };

        // Wait for cards to render
        const observer = new MutationObserver(() => {
            const cards = document.querySelectorAll('.svc-card');
            if (cards.length > 0) {
                observer.disconnect();
                setTimeout(renderServiceCards, 100);
            }
        });
        observer.observe(document.getElementById('svcGridContainer'), { childList: true });

        // Also try immediately
        setTimeout(renderServiceCards, 500);

        // Filter bar entrance
        const filterBar = document.getElementById('servicesFilterBar');
        if (filterBar) {
            gsap.fromTo(filterBar, {
                opacity: 0,
                y: 16
            }, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: filterBar,
                    start: 'top 90%',
                    once: true
                }
            });
        }

        // Service card hover enhancement - scale effect
        document.addEventListener('mouseenter', (e) => {
            const card = e.target.closest('.svc-card');
            if (!card) return;
            gsap.to(card, {
                y: -6,
                boxShadow: '0 16px 40px rgba(0,0,0,0.1)',
                duration: 0.3,
                ease: 'power2.out'
            });
        }, true);

        document.addEventListener('mouseleave', (e) => {
            const card = e.target.closest('.svc-card');
            if (!card) return;
            gsap.to(card, {
                y: 0,
                boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                duration: 0.3,
                ease: 'power2.out'
            });
        }, true);
    }

    /* ─── WORK SECTION REVEAL ─── */
    function initWorkSectionReveal() {
        const workCards = document.querySelectorAll('.work-card');
        if (!workCards.length) return;

        workCards.forEach((card, i) => {
            const thumb = card.querySelector('.work-thumb');
            const meta = card.querySelector('.work-meta');
            const h3 = card.querySelector('h3');
            const p = card.querySelector('p');

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
                    once: true
                }
            });

            // Card entrance
            tl.fromTo(card, {
                opacity: 0,
                y: 40
            }, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out'
            }, 0);

            // Image/thumb reveal with clip-path
            if (thumb) {
                tl.fromTo(thumb, {
                    clipPath: 'inset(0 100% 0 0)',
                    scale: 1.08
                }, {
                    clipPath: 'inset(0 0% 0 0)',
                    scale: 1,
                    duration: 1,
                    ease: 'power2.inOut'
                }, 0.1);
            }

            // Meta tags
            if (meta) {
                tl.fromTo(meta, {
                    opacity: 0,
                    x: -10
                }, {
                    opacity: 1,
                    x: 0,
                    duration: 0.5
                }, 0.4);
            }

            // Title
            if (h3) {
                tl.fromTo(h3, {
                    opacity: 0,
                    y: 12
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6
                }, 0.5);
            }

            // Description
            if (p) {
                tl.fromTo(p, {
                    opacity: 0,
                    y: 10
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6
                }, 0.6);
            }
        });

        // Work note
        const workNote = document.querySelector('.work-note');
        if (workNote) {
            gsap.fromTo(workNote, {
                opacity: 0,
                y: 10
            }, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                scrollTrigger: {
                    trigger: workNote,
                    start: 'top 90%',
                    once: true
                }
            });
        }

        // Image parallax on scroll
        document.querySelectorAll('.work-thumb').forEach(thumb => {
            gsap.to(thumb, {
                scrollTrigger: {
                    trigger: thumb,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                },
                scale: 1.05,
                ease: 'none'
            });
        });
    }

    /* ─── AUTOMATION SECTION REVEAL ─── */
    function initAutomationReveal() {
        const autoSection = document.getElementById('automation');
        if (!autoSection) return;

        // Auto copy reveal
        const autoCopy = document.querySelector('.auto-copy');
        if (autoCopy) {
            const eyebrow = autoCopy.querySelector('.eyebrow');
            const p = autoCopy.querySelector('p');
            const ul = autoCopy.querySelector('.auto-list');
            const btn = autoCopy.querySelector('.btn');

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: autoSection,
                    start: 'top 75%',
                    once: true
                }
            });

            if (eyebrow) tl.fromTo(eyebrow, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5 }, 0);
            if (p) tl.fromTo(p, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.2);
            if (ul) {
                const items = ul.querySelectorAll('li');
                tl.fromTo(items, { opacity: 0, x: -12 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.08 }, 0.3);
            }
            if (btn) tl.fromTo(btn, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 0.5);
        }

        // SVG flow diagram reveal
        const flow = document.querySelector('.flow');
        if (flow) {
            const nodes = flow.querySelectorAll('.node');
            const lines = flow.querySelectorAll('.line');
            const texts = flow.querySelectorAll('text');
            const pulses = flow.querySelectorAll('.pulse');

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: flow,
                    start: 'top 80%',
                    once: true
                }
            });

            // Lines draw in
            lines.forEach((line, i) => {
                const length = Math.sqrt(
                    Math.pow(line.getAttribute('x2') - line.getAttribute('x1'), 2) +
                    Math.pow(line.getAttribute('y2') - line.getAttribute('y1'), 2)
                );
                gsap.set(line, { attr: { strokeDasharray: length, strokeDashoffset: length } });
                tl.to(line, {
                    strokeDashoffset: 0,
                    duration: 0.4,
                    ease: 'power2.inOut'
                }, i * 0.15);
            });

            // Nodes appear
            nodes.forEach((node, i) => {
                tl.fromTo(node, {
                    opacity: 0,
                    scale: 0.8
                }, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.4,
                    ease: 'back.out(1.7)'
                }, i * 0.15 + 0.1);
            });

            // Text appears
            texts.forEach((text, i) => {
                tl.fromTo(text, {
                    opacity: 0
                }, {
                    opacity: 1,
                    duration: 0.3
                }, i * 0.15 + 0.2);
            });

            // Pulse animation loop
            pulses.forEach(pulse => {
                gsap.to(pulse, {
                    scale: 3,
                    opacity: 0,
                    duration: 1.5,
                    repeat: -1,
                    ease: 'power2.out',
                    transformOrigin: 'center center'
                });
            });
        }
    }

    /* ─── CONTACT SECTION REVEAL ─── */
    function initContactReveal() {
        const contactSection = document.getElementById('contact');
        if (!contactSection) return;

        const contactCopy = document.querySelector('.contact-copy');
        const form = document.getElementById('contactForm');

        if (contactCopy) {
            const eyebrow = contactCopy.querySelector('.eyebrow');
            const p = contactCopy.querySelector('p');
            const info = contactCopy.querySelector('.contact-info');

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: contactSection,
                    start: 'top 75%',
                    once: true
                }
            });

            if (eyebrow) tl.fromTo(eyebrow, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5 }, 0);
            if (p) tl.fromTo(p, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.2);
            if (info) {
                const items = info.querySelectorAll('li');
                tl.fromTo(items, { opacity: 0, x: -12 }, { opacity: 1, x: 0, duration: 0.4, stagger: 0.08 }, 0.3);
            }
        }

        if (form) {
            const fields = form.querySelectorAll('.field');
            const btn = form.querySelector('.btn');

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: form,
                    start: 'top 80%',
                    once: true
                }
            });

            tl.fromTo(fields, {
                opacity: 0,
                y: 16
            }, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.08,
                ease: 'power2.out'
            }, 0);

            if (btn) {
                tl.fromTo(btn, {
                    opacity: 0,
                    y: 12
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5
                }, 0.4);
            }
        }
    }

    /* ─── FOOTER REVEAL ─── */
    function initFooterReveal() {
        const footer = document.querySelector('footer');
        if (!footer) return;

        const footCols = footer.querySelectorAll('.foot-col');
        const footBottom = footer.querySelector('.foot-bottom');

        gsap.fromTo(footCols, {
            opacity: 0,
            y: 24
        }, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: footer,
                start: 'top 90%',
                once: true
            }
        });

        if (footBottom) {
            gsap.fromTo(footBottom, {
                opacity: 0,
                y: 16
            }, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: 0.3,
                scrollTrigger: {
                    trigger: footer,
                    start: 'top 85%',
                    once: true
                }
            });
        }
    }

    /* ─── PARALLAX ELEMENTS ─── */
    function initParallaxElements() {
        // Subtle parallax on images
        document.querySelectorAll('.work-thumb, .so-main-image-wrap').forEach(el => {
            gsap.to(el.querySelector('span, img'), {
                scrollTrigger: {
                    trigger: el,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.5
                },
                y: -20,
                ease: 'none'
            });
        });

        // Section-specific parallax for visual depth
        document.querySelectorAll('section').forEach(section => {
            const bg = section.querySelector('.wrap');
            if (bg) {
                gsap.fromTo(bg, {
                    y: 0
                }, {
                    y: 10,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 2
                    }
                });
            }
        });
    }

    /* ─── MICRO-INTERACTIONS ─── */
    function initMicroInteractions() {
        // Button hover animations
        document.querySelectorAll('.btn').forEach(btn => {
            const arrow = btn.querySelector('.arrow');
            if (!arrow) return;

            btn.addEventListener('mouseenter', () => {
                gsap.to(arrow, { x: 5, duration: 0.25, ease: 'power2.out' });
            });

            btn.addEventListener('mouseleave', () => {
                gsap.to(arrow, { x: 0, duration: 0.25, ease: 'power2.out' });
            });
        });

        // Work card hover
        document.querySelectorAll('.work-card').forEach(card => {
            const visit = card.querySelector('.visit');
            if (!visit) return;

            card.addEventListener('mouseenter', () => {
                gsap.to(visit, { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(visit, { opacity: 0, x: -4, duration: 0.3, ease: 'power2.out' });
            });
        });

        // Footer link hover
        document.querySelectorAll('.foot-col a').forEach(link => {
            link.addEventListener('mouseenter', () => {
                gsap.to(link, { x: 4, color: '#ffffff', duration: 0.2, ease: 'power2.out' });
            });
            link.addEventListener('mouseleave', () => {
                gsap.to(link, { x: 0, color: '', duration: 0.2, ease: 'power2.out' });
            });
        });

        // Nav link hover
        document.querySelectorAll('nav.main-nav a:not(.btn)').forEach(link => {
            link.addEventListener('mouseenter', () => {
                gsap.to(link, { y: -1, duration: 0.2, ease: 'power2.out' });
            });
            link.addEventListener('mouseleave', () => {
                gsap.to(link, { y: 0, duration: 0.2, ease: 'power2.out' });
            });
        });
    }

    /* ─── SMOOTH SCROLL PROGRESS ─── */
    function initSmoothScrollProgress() {
        // Create a subtle progress indicator
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: var(--accent);
            z-index: 10001;
            transform-origin: left;
            transform: scaleX(0);
            width: 100%;
            pointer-events: none;
        `;
        document.body.appendChild(progressBar);

        gsap.to(progressBar, {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: document.body,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.3
            }
        });
    }

})();
