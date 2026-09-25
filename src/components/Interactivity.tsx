'use client';

import { useEffect } from 'react';
import anime from 'animejs';

// --- Single Responsibility Functions ---

function setupSoftHoverEffects(cleanups: Array<() => void>) {
    const interactiveElements = document.querySelectorAll<HTMLElement>('a:not(.bento-card):not(.small-card), .btn:not(.magnetic)');
    
    interactiveElements.forEach(el => {
        const handleMouseEnter = () => {
            anime({
                targets: el,
                scale: 1.04,
                translateY: -2,
                duration: 400,
                easing: 'easeOutCubic'
            });
        };

        const handleMouseLeave = () => {
            anime({
                targets: el,
                scale: 1,
                translateY: 0,
                duration: 350,
                easing: 'easeOutCubic'
            });
        };

        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
        
        cleanups.push(() => {
            el.removeEventListener('mouseenter', handleMouseEnter);
            el.removeEventListener('mouseleave', handleMouseLeave);
        });
    });
}

function setupProjectCardParallax(cleanups: Array<() => void>) {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const img = card.querySelector('img, .img-placeholder');
        if (!img) return;

        const handleMouseEnter = () => {
            anime({
                targets: img,
                scale: 1.1,
                duration: 800,
                easing: 'easeOutSine'
            });
        };

        const handleMouseLeave = () => {
            anime({
                targets: img,
                scale: 1,
                duration: 800,
                easing: 'easeOutSine'
            });
        };

        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);
        
        cleanups.push(() => {
            card.removeEventListener('mouseenter', handleMouseEnter);
            card.removeEventListener('mouseleave', handleMouseLeave);
        });
    });
}

function setupRippleEffect(cleanups: Array<() => void>) {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
        const handleClick = (e: Event) => {
            const mouseEvent = e as MouseEvent;
            const existingRipple = btn.querySelector('.ripple');
            if (existingRipple) {
                existingRipple.remove();
            }

            const rect = btn.getBoundingClientRect();
            const x = mouseEvent.clientX - rect.left;
            const y = mouseEvent.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            btn.appendChild(ripple);

            anime({
                targets: ripple,
                scale: [0, 2.5],
                opacity: [0.5, 0],
                duration: 600,
                easing: 'easeOutCubic',
                complete: () => ripple.remove()
            });
        };

        btn.addEventListener('click', handleClick);
        
        cleanups.push(() => {
            btn.removeEventListener('click', handleClick);
        });
    });
}

function setupCursorGlow(cleanups: Array<() => void>) {
    const cursorOutline = document.querySelector('.cursor-outline');
    if (!cursorOutline) return;
    
    const handleGlobalClick = () => {
        anime({
            targets: cursorOutline,
            scale: [1, 1.5, 1],
            opacity: [1, 0.5, 1],
            duration: 400,
            easing: 'easeOutSine'
        });
    };
    
    window.addEventListener('click', handleGlobalClick);
    cleanups.push(() => window.removeEventListener('click', handleGlobalClick));
}

function setupMagneticElements(cleanups: Array<() => void>) {
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
        return;
    }
    const magneticElements = document.querySelectorAll<HTMLElement>('.magnetic, .btn');
    
    magneticElements.forEach((el) => {
        const handleMouseMove = (e: Event) => {
            const mouseEvent = e as MouseEvent;
            const rect = el.getBoundingClientRect();
            const x = mouseEvent.clientX - rect.left - rect.width / 2;
            const y = mouseEvent.clientY - rect.top - rect.height / 2;
            
            anime({
                targets: el,
                translateX: x * 0.4,
                translateY: y * 0.4,
                scale: 1.1,
                duration: 100,
                easing: 'easeOutSine'
            });
        };

        const handleMouseLeave = () => {
            anime({
                targets: el,
                translateX: 0,
                translateY: 0,
                scale: 1,
                duration: 1000,
                easing: 'easeOutElastic(1, .3)'
            });
        };

        el.addEventListener('mousemove', handleMouseMove);
        el.addEventListener('mouseleave', handleMouseLeave);
        
        cleanups.push(() => {
            el.removeEventListener('mousemove', handleMouseMove);
            el.removeEventListener('mouseleave', handleMouseLeave);
        });
    });
}

export default function Interactivity() {
    useEffect(() => {
        const cleanups: Array<() => void> = [];

        // Orchestrate all interactivity setups
        setupSoftHoverEffects(cleanups);
        setupProjectCardParallax(cleanups);
        setupRippleEffect(cleanups);
        setupCursorGlow(cleanups);
        setupMagneticElements(cleanups);

        // Cleanup function loops through and executes all collected removal tasks
        return () => {
            cleanups.forEach(cleanup => cleanup());
        };
    }, []);

    return <></>;
}

