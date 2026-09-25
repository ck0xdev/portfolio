'use client';

import { useEffect } from 'react';
import anime from 'animejs';
import Lenis from 'lenis';
import gsap from 'gsap';

export default function ScrollMotion() {
    useEffect(() => {
        // Initialize Lenis with modern exponential decay easing for feather-light, buttery scrolling
        const lenis = new Lenis({
            duration: 1.0,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1.05,
            touchMultiplier: 1.2,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Prepare elements for Anime.js scroll reveals
        const sectionHeadings = document.querySelectorAll('.section-heading');
        const fadeUpElements = document.querySelectorAll('.fade-up');
        const projectCards = document.querySelectorAll('.project-card');
        const timelineItems = document.querySelectorAll('.timeline-item');

        // Hide elements initially with a subtle, soft translate
        anime.set([sectionHeadings, fadeUpElements, projectCards, timelineItems], {
            translateY: 32,
            opacity: 0
        });

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -40px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;

                    anime({
                        targets: target,
                        translateY: [32, 0],
                        opacity: [0, 1],
                        duration: 800,
                        easing: 'easeOutCubic',
                        delay: target.classList.contains('timeline-item') ? 60 : anime.stagger(80)
                    });

                    // For timeline items, also animate the dot
                    if (target.classList.contains('timeline-item')) {
                        const dot = target.querySelector('.timeline-dot');
                        if (dot) {
                            dot.classList.add('active');
                            anime({
                                targets: dot,
                                scale: [0.5, 1],
                                opacity: [0, 1],
                                duration: 500,
                                easing: 'easeOutElastic(1, .8)'
                            });
                        }
                    }

                    // Stop observing once animated
                    observer.unobserve(target);
                }
            });
        }, observerOptions);

        // Observe elements
        sectionHeadings.forEach(el => observer.observe(el));
        fadeUpElements.forEach(el => observer.observe(el));
        projectCards.forEach(el => observer.observe(el));
        timelineItems.forEach(el => observer.observe(el));

        // Parallax and scrubbable animations tied to Lenis scroll
        const parallaxImages = document.querySelectorAll('.project-card img, .project-card .img-placeholder');
        const skewCards = document.querySelectorAll('.project-card');
        const timelineProgress = document.querySelector('.timeline-progress') as HTMLElement;
        const timeline = document.querySelector('.timeline') as HTMLElement;
        const bentoContainer = document.querySelector('.bento-container') as HTMLElement;

        // Set initial states for parallax
        anime.set(parallaxImages, { scale: 1.15 });

        lenis.on('scroll', (e: { velocity?: number, direction?: number }) => {
            const windowHeight = window.innerHeight;

            // Premium velocity-based skew (soft, capped, non-conflicting)
            const velocity = e.velocity || 0;
            const skewAmount = Math.max(Math.min(velocity * 0.1, 2), -2);

            if (Math.abs(skewAmount) > 0.02) {
                skewCards.forEach(card => {
                    if (card.matches(':hover')) return;
                    const rect = card.getBoundingClientRect();
                    if (rect.top < windowHeight && rect.bottom > 0) {
                        gsap.to(card, {
                            skewY: skewAmount,
                            duration: 0.2,
                            ease: "power1.out",
                            overwrite: "auto"
                        });
                    }
                });
            } else {
                skewCards.forEach(card => {
                    if (card.matches(':hover')) return;
                    gsap.to(card, {
                        skewY: 0,
                        duration: 0.35,
                        ease: "power2.out",
                        overwrite: "auto"
                    });
                });
            }

            // 1. Timeline Progress Bar
            if (timeline && timelineProgress) {
                const timelineRect = timeline.getBoundingClientRect();
                const timelineTop = timelineRect.top;
                const timelineHeight = timelineRect.height;

                let progress = (windowHeight / 2 - timelineTop) / (timelineHeight * 0.8);
                progress = Math.max(0, Math.min(1, progress));

                anime.set(timelineProgress, {
                    scaleY: progress
                });
            }

            // 2. Parallax images in projects
            parallaxImages.forEach(img => {
                const rect = img.getBoundingClientRect();
                if (rect.top < windowHeight && rect.bottom > 0) {
                    const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
                    const yOffset = (progress - 0.5) * 30; // Move from -15% to 15% roughly

                    anime.set(img, {
                        translateY: `${yOffset}%`
                    });
                }
            });

            // 3. Subtle drift for bento container
            if (bentoContainer) {
                const rect = bentoContainer.getBoundingClientRect();
                if (rect.top < windowHeight && rect.bottom > 0) {
                    const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
                    anime.set(bentoContainer, {
                        translateY: progress * -40
                    });
                }
            }
        });

        return () => {
            observer.disconnect();
            lenis.destroy();
        };
    }, []);

    return <></>;
}
