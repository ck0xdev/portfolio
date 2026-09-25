"use client";
import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

export default function Animations() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (typeof window === 'undefined') return;

    const cleanups: Array<() => void> = [];
    const ctx = gsap.context(() => {
        // Initial State Setups
        gsap.set('.enter-prompt', { xPercent: -50, yPercent: -50, y: 20, opacity: 0 });

    // --- 1. Custom Cursor & Magnetic Elements ---
    const cursorDot = document.querySelector<HTMLElement>('.cursor-dot');
    const cursorOutline = document.querySelector<HTMLElement>('.cursor-outline');

    // Smooth Frame Path Generation
    function updateFramePaths() {
        const padding = 4;
        const r = 0;
        const w = window.innerWidth - padding * 2;
        const h = window.innerHeight - padding * 2;

        const leftPath = `M ${padding + w / 2} ${padding + h} L ${padding + r} ${padding + h} A ${r} ${r} 0 0 1 ${padding} ${padding + h - r} L ${padding} ${padding + r} A ${r} ${r} 0 0 1 ${padding + r} ${padding} L ${padding + w / 2} ${padding}`;
        const rightPath = `M ${padding + w / 2} ${padding + h} L ${padding + w - r} ${padding + h} A ${r} ${r} 0 0 0 ${padding + w} ${padding + h - r} L ${padding + w} ${padding + r} A ${r} ${r} 0 0 0 ${padding + w - r} ${padding} L ${padding + w / 2} ${padding}`;

        const leftEl = document.querySelector('.frame-path-left');
        const rightEl = document.querySelector('.frame-path-right');

        if (leftEl && rightEl) {
            leftEl.setAttribute('d', leftPath);
            rightEl.setAttribute('d', rightPath);
        }
    }

    window.addEventListener('resize', updateFramePaths);
    cleanups.push(() => window.removeEventListener('resize', updateFramePaths));
    updateFramePaths();

    const handleCursorMove = (e: MouseEvent) => {
        const posX = e.clientX;
        const posY = e.clientY;

        requestAnimationFrame(() => {
            if (!cursorDot || !cursorOutline) return;
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 800, fill: "forwards", easing: "cubic-bezier(0.16, 1, 0.3, 1)" });
        });
    };
    window.addEventListener('mousemove', handleCursorMove);
    cleanups.push(() => window.removeEventListener('mousemove', handleCursorMove));

    // Magnetic effect for buttons and specific elements
    const magnetics = document.querySelectorAll<HTMLElement>('.magnetic, .magnetic-strong');

    magnetics.forEach(btn => {
        const onMove = function (e: MouseEvent) {
            const rect = btn.getBoundingClientRect();
            const h = rect.width / 2;

            const x = e.clientX - rect.left - h;
            const y = e.clientY - rect.top - h;

            const factor = btn.classList.contains('magnetic-strong') ? 0.3 : 0.15;

            gsap.to(btn, {
                x: x * factor,
                y: y * factor,
                duration: 0.3,
                ease: "power2.out"
            });

            if (cursorOutline) {
                gsap.to(cursorOutline, {
                    scale: 1.4,
                    borderColor: 'var(--accent-1)',
                    duration: 0.25,
                    ease: "power2.out"
                });
            }
        };

        const onLeave = function () {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: "elastic.out(1, 0.3)"
            });

            if (cursorOutline) {
                gsap.to(cursorOutline, {
                    scale: 1,
                    borderColor: 'rgba(255, 255, 255, 0.25)',
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        };
        btn.addEventListener('mousemove', onMove);
        btn.addEventListener('mouseleave', onLeave);
        cleanups.push(() => {
            btn.removeEventListener('mousemove', onMove);
            btn.removeEventListener('mouseleave', onLeave);
        });
    });

    // --- 2. Innovative Navigation ---
    const navItems = document.querySelectorAll('.nav-item') as NodeListOf<HTMLElement>;
    const sections = document.querySelectorAll('.section') as NodeListOf<HTMLElement>;

    // Click to scroll
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetId = item.getAttribute('data-section');
            if (targetId) {
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Update active nav item based on scroll position
    const handleScroll = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id') || '';
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-section') === current) {
                item.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', handleScroll);
    cleanups.push(() => window.removeEventListener('scroll', handleScroll));

    // --- 3. Initial GSAP Animations ---

    // Register ScrollTrigger if available
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Initialize all Hero animation starting states immediately so they don't flash before the animation starts
        // Navbar
        gsap.set('.nav-wrapper', {
            y: -window.innerHeight,
            position: "fixed",
            bottom: "2rem"
        });
        gsap.set('.nav-island', {
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            padding: "0"
        });
        gsap.set('.nav-item', { opacity: 0, scale: 0.5 });

        // Hero Content
        gsap.set('.x-stick-1', { y: -window.innerHeight, opacity: 0 });
        gsap.set('.x-stick-2', { y: window.innerHeight, opacity: 0 });
        gsap.set('.bg-text-left', { x: 100, opacity: 0 });
        gsap.set('.bg-text-right', { x: -100, opacity: 0 });
        gsap.set('.bg-text-x', { opacity: 0 });
        gsap.set('.avatar-container', { scale: 0, opacity: 0 });

        // Split the hero role text immediately
        const roleEl = document.querySelector('.hero-role') as HTMLElement;
        if (roleEl) {
            const text = roleEl.textContent || '';
            roleEl.innerHTML = '';
            text.split('').forEach((char) => {
                const span = document.createElement('span');
                span.textContent = char;
                span.style.display = 'inline-block';
                if (char === ' ') {
                    span.style.width = '0.5em';
                } else {
                    gsap.set(span, {
                        opacity: 0,
                        x: (Math.random() - 0.5) * window.innerWidth * 1.5,
                        y: (Math.random() - 0.5) * window.innerHeight * 1.5,
                        rotation: (Math.random() - 0.5) * 1080,
                        scale: Math.random() * 3 + 1
                    });
                }
                roleEl.appendChild(span);
            });
        }

        function playHeroAnimations() {
            const heroTl = gsap.timeline();

            // 1. Navbar Drop and Expand Animation

            // Drop down the wrapper
            heroTl.to('.nav-wrapper', {
                y: 0,
                duration: 0.8,
                ease: "expo.out" // Silky smooth drop
            })
                // Expand the island to full width
                // Because the wrapper handles positioning, this will expand perfectly from the center!
                .to('.nav-island', {
                    width: "auto",
                    height: "auto",
                    padding: "0.5rem",
                    borderRadius: "100px",
                    duration: 1.0,
                    ease: "power4.out" // Extremely smooth stretch instead of bouncy elastic
                }, "-=0.3") // Start expanding slightly before the drop finishes
                // Pop in the nav links symmetrically from the center outwards
                .to('.nav-item', {
                    opacity: 1,
                    scale: 1,
                    stagger: {
                        each: 0.08,
                        from: "center"
                    },
                    duration: 0.6,
                    ease: "back.out(1.5)" // Gentle pop for the items
                }, "-=0.7")

            // 2. The 'X' Sticks Form and Text Slide
            // Execute Timeline
            // Sticks drop/rise in (Smoother, longer duration)
            heroTl.to('.x-stick-1', {
                y: 0,
                opacity: 1,
                duration: 1.0,
                ease: "power3.inOut"
            }, "+=0.3")
                .to('.x-stick-2', {
                    y: 0,
                    opacity: 1,
                    duration: 1.0,
                    ease: "power3.inOut"
                }, "<")
                // Rotate to form X
                .to('.x-stick-1', {
                    rotationZ: 38,
                    duration: 0.8,
                    ease: "power4.out" // Smoother snap
                }, "+=0.1")
                .to('.x-stick-2', {
                    rotationZ: -38,
                    duration: 0.8,
                    ease: "power4.out"
                }, "<")

                // Text parts slide out as the sticks fade out
                .to(['.x-stick-1', '.x-stick-2'], {
                    opacity: 0,
                    duration: 0.5
                }, "+=0.2")
                .to('.bg-text-x', {
                    opacity: 1,
                    duration: 0.5
                }, "<")
                .to('.bg-text-left', {
                    x: 0,
                    opacity: 1,
                    duration: 1.2, // Smoother, slower slide
                    ease: "expo.out"
                }, "<")
                .to('.bg-text-right', {
                    x: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: "expo.out"
                }, "<")

                // Image pops in
                .to('.avatar-container', {
                    scale: 1,
                    opacity: 1,
                    duration: 1.0,
                    ease: "back.out(1.2)" // Gentler back bounce
                }, "-=0.8")

                // Rocket Letters fly in consistently
                .to('.hero-role span', {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    rotation: 0,
                    scale: 1,
                    duration: 1.0, // Slower flight
                    stagger: 0.04,
                    ease: "power4.out" // Silky smooth deceleration instead of hard bounce
                }, "-=0.4");
        }

        // Use Navigation API to check if this is a page refresh
        const navEntries = performance.getEntriesByType("navigation");
        const isReload = navEntries.length > 0 && (navEntries[0] as PerformanceNavigationTiming).type === "reload";

        if (isReload) {
            // Quick Reload Path - Skip animation on refresh
            gsap.set(['.preloader', '.screen-frame-svg', '.white-fill-box', '.white-dot', '.enter-prompt'], { display: 'none' });

            const quickLoader = document.querySelector('.quick-loader') as HTMLElement | null;
            if (quickLoader) {
                quickLoader.style.display = 'flex';
                setTimeout(() => {
                    gsap.to('.quick-loader', {
                        opacity: 0,
                        duration: 0.5,
                        onComplete: () => {
                            quickLoader.style.display = 'none';
                            document.body.classList.remove('loading');
                            playHeroAnimations();
                        }
                    });
                }, 600); // Show spinner for 600ms
            } else {
                document.body.classList.remove('loading');
                    playHeroAnimations();
            }
        } else {
            // Full Intro Animation Path - Play on first load or new tab

            // Preloader Timeline
            const tl = gsap.timeline();

            // 1. Apple-style Cursive SVG Outline Drawing
            tl.to('.hello-text-svg', {
                strokeDashoffset: 0,
                duration: 2.5, // Draw the outline
                ease: "power2.inOut"
            })
                // Fill the text with solid color like ink blooming
                .to('.hello-text-svg', {
                    fill: "#000000",
                    duration: 0.8,
                    ease: "power1.inOut"
                }, "-=0.8")
                // Expand the text massively to cover the screen
                .to('.hello-svg', {
                    scale: 150, // Massive zoom
                    opacity: 0, // Fade it out as it gets huge so the transition is seamless
                    duration: 1.2,
                    ease: "power4.in"
                }, "+=0.4")
                // Simultaneously transition preloader background to black
                .to('.preloader', {
                    backgroundColor: "#000000",
                    duration: 0.8,
                    ease: "power2.in"
                }, "-=1.0") // Starts during the zoom
                .set('.hello-svg', { display: 'none' });

            // 1.5 Multi-lingual Greetings on the new black background
            const greetings = document.querySelectorAll('.greeting-text');

            greetings.forEach((greeting, index) => {
                const isLast = index === greetings.length - 1;

                // Fade in and slide up slightly (0.05s)
                tl.to(greeting, {
                    opacity: 1,
                    y: 0,
                    duration: 0.05,
                    ease: "power2.out"
                });

                if (!isLast) {
                    // Fade out quickly for the fast cycle effect (starts after 0.1s delay)
                    tl.to(greeting, {
                        opacity: 0,
                        y: -15,
                        duration: 0.05,
                        ease: "power2.in"
                    }, "+=0.10"); // Hold for 0.1s
                } else {
                    // Last greeting stays a bit, then shrinks into a dot
                    tl.to(greeting, {
                        opacity: 0,
                        scale: 0,
                        duration: 0.4,
                        ease: "back.in(1.5)"
                    }, "+=0.4");
                }
            });

            // Reveal the white dot right as the text vanishes
            tl.to('.white-dot', {
                scale: 1,
                opacity: 1,
                duration: 0.1
            }, "-=0.2")
                // Drop the white dot to the bottom of the screen
                .to('.white-dot', {
                    y: window.innerHeight / 2 - 4, // Drops exactly to where the bottom frame line will start (padding is 4px)
                    duration: 0.5,
                    ease: "power3.in"
                })
                // Hide the dot as the lines start drawing
                .to('.white-dot', {
                    opacity: 0,
                    duration: 0.05
                })
                .set('.screen-frame-svg', { opacity: 1 }, "-=0.05")
                // Draw the smooth SVG paths like brush strokes
                .fromTo(['.frame-path-left', '.frame-path-right'],
                    {
                        strokeDasharray: (i, target) => target.getTotalLength(),
                        strokeDashoffset: (i, target) => target.getTotalLength()
                    },
                    {
                        strokeDashoffset: 0,
                        duration: 1.5,
                        ease: "power2.inOut" // Smooth brush-like easing
                    }, "<"
                )
                // Fill white from outer to inner in a smooth circle
                .to('.white-fill-box', {
                    borderWidth: "75vmax", // 75 * 2 = 150vmax, perfectly closing the 150vmax wide element
                    duration: 1.2,
                    ease: "power2.inOut" // Smoother motion
                }, "+=0.2")
                // Show interactive click prompt
                .to('.enter-prompt', {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power2.out"
                })
                .add(() => {
                    // Function to handle the click to enter the portfolio
                    function enterPortfolio() {
                        document.body.removeEventListener('click', enterPortfolio);
                        document.body.removeEventListener('touchstart', enterPortfolio);
                        tl.play(); // Resume timeline
                    }
                    document.body.addEventListener('click', enterPortfolio);
                    document.body.addEventListener('touchstart', enterPortfolio);
                })
                .addPause() // Wait for user click!

                // === Everything below runs AFTER the user clicks "Click to Enter" ===

                .to('.enter-prompt', {
                    opacity: 0,
                    y: -20,
                    duration: 0.4,
                    ease: "power2.in"
                })
                // Fade out all preloader elements to reveal portfolio
                .to(['.white-fill-box', '.preloader', '.screen-frame-svg', '.white-dot'], {
                    opacity: 0,
                    duration: 1,
                    ease: "power2.inOut"
                })
                .set(['.white-fill-box', '.preloader', '.screen-frame-svg', '.white-dot', '.enter-prompt'], {
                    display: 'none',
                    onComplete: () => {
                        document.body.classList.remove('loading');
                        playHeroAnimations();
                    }
                });
        }

        // --- 3. Scroll Animations are now handled by AnimeScroll component ---
    }

    // --- 4. Bento Grid 3D Tilt & Mouse Tracking Glow ---
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (!isTouchDevice) {
        const bentoCards = document.querySelectorAll<HTMLElement>('.bento-card, .project-card');
        bentoCards.forEach(card => {
            const handleMouseMove = (e: MouseEvent) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Set CSS variables for radial glow effect
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);

                // Smooth 3D Tilt calculation (subtle, elegant tilt)
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -4.5;
                const rotateY = ((x - centerX) / centerX) * 4.5;

                gsap.to(card, {
                    rotateX: rotateX,
                    rotateY: rotateY,
                    y: -4,
                    transformPerspective: 1200,
                    duration: 0.35,
                    ease: "power2.out",
                    overwrite: "auto"
                });
            };

            const handleMouseLeave = () => {
                gsap.to(card, {
                    rotateX: 0,
                    rotateY: 0,
                    y: 0,
                    duration: 0.65,
                    ease: "power3.out",
                    overwrite: "auto"
                });
            };

            card.addEventListener('mousemove', handleMouseMove);
            card.addEventListener('mouseleave', handleMouseLeave);

            cleanups.push(() => {
                card.removeEventListener('mousemove', handleMouseMove);
                card.removeEventListener('mouseleave', handleMouseLeave);
            });
        });
    }
    }); // End of gsap.context()

    return () => {
      ctx.revert();
      cleanups.forEach(c => c());
    };
  }, []);

  return <></>;
}
