'use client';

import { useEffect } from 'react';
import anime from 'animejs';
import Lenis from 'lenis';

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
        const parallaxImages = document.querySelectorAll<HTMLElement>('.project-card img, .project-card .img-placeholder');
        const timelineProgress = document.querySelector<HTMLElement>('.timeline-progress');
        const timeline = document.querySelector<HTMLElement>('.timeline');

        let ticking = false;

        const updateScrollEffects = () => {
            const windowHeight = window.innerHeight;

            // 1. Smooth Timeline Progress Bar
            if (timeline && timelineProgress) {
                const timelineRect = timeline.getBoundingClientRect();
                const timelineTop = timelineRect.top;
                const timelineHeight = timelineRect.height;

                let progress = (windowHeight * 0.5 - timelineTop) / (timelineHeight * 0.8);
                progress = Math.max(0, Math.min(1, progress));

                timelineProgress.style.transform = `scaleY(${progress})`;
            }

            // 2. Subtle Parallax for visible project cards images (GPU-accelerated)
            for (let i = 0; i < parallaxImages.length; i++) {
                const img = parallaxImages[i];
                const rect = img.getBoundingClientRect();
                if (rect.top < windowHeight && rect.bottom > 0) {
                    const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
                    const yOffset = (progress - 0.5) * 16;
                    img.style.transform = `scale(1.08) translate3d(0, ${yOffset}px, 0)`;
                }
            }

            ticking = false;
        };

        lenis.on('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        });

        return () => {
            observer.disconnect();
            lenis.destroy();
        };
    }, []);

    return <></>;
}
