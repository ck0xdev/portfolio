'use client';

import { useEffect, useRef } from 'react';
import anime from 'animejs';

export default function LiquidScrollbar() {
    const thumbRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const startY = useRef(0);
    const startScrollY = useRef(0);

    useEffect(() => {
        const thumb = thumbRef.current;
        const track = trackRef.current;
        if (!thumb || !track) return;

        let scrollTimeout: NodeJS.Timeout;
        let lastScrollY = window.scrollY;

        const updateScrollbar = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            
            if (scrollHeight <= 0) {
                thumb.style.opacity = '0';
                return;
            }
            thumb.style.opacity = '1';

            const scrollProgress = window.scrollY / scrollHeight;
            const trackHeight = track.clientHeight;
            // Min height 50px so it's grabbable
            const thumbHeight = Math.max(50, (window.innerHeight / document.documentElement.scrollHeight) * trackHeight);
            const maxScrollTop = trackHeight - thumbHeight;
            const scrollTop = scrollProgress * maxScrollTop;

            const currentScrollY = window.scrollY;
            const velocity = currentScrollY - lastScrollY;
            lastScrollY = currentScrollY;

            // Only stretch if we are not dragging manually
            let stretch = 1;
            let squeeze = 1;
            if (!isDragging.current) {
                stretch = 1 + Math.min(Math.abs(velocity) * 0.005, 0.6);
                squeeze = 1 - Math.min(Math.abs(velocity) * 0.002, 0.3);
            }

            anime.set(thumb, {
                height: `${thumbHeight}px`,
                translateY: scrollTop,
                scaleY: stretch,
                scaleX: squeeze,
                transformOrigin: velocity > 0 ? 'top center' : 'bottom center'
            });

            clearTimeout(scrollTimeout);
            if (!isDragging.current) {
                scrollTimeout = setTimeout(() => {
                    anime({
                        targets: thumb,
                        scaleY: 1,
                        scaleX: 1,
                        duration: 600,
                        easing: 'easeOutElastic(1, .4)'
                    });
                }, 50);
            }
        };

        // Resize observer to detect DOM changes (fixes missing scrollbar bug)
        const resizeObserver = new ResizeObserver(() => {
            updateScrollbar();
        });
        resizeObserver.observe(document.body);

        window.addEventListener('scroll', updateScrollbar, { passive: true });
        window.addEventListener('resize', updateScrollbar);
        
        // Setup Dragging
        const onDragStart = (e: MouseEvent | TouchEvent) => {
            isDragging.current = true;
            const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
            startY.current = clientY;
            startScrollY.current = window.scrollY;
            document.body.style.userSelect = 'none'; // Prevent text selection
        };

        const onDragMove = (e: MouseEvent | TouchEvent) => {
            if (!isDragging.current) return;
            const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
            const deltaY = clientY - startY.current;
            
            const trackHeight = track.clientHeight;
            const thumbHeight = thumb.clientHeight;
            const maxScrollTop = trackHeight - thumbHeight;
            const scrollRatio = deltaY / maxScrollTop;
            
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            window.scrollTo(0, startScrollY.current + (scrollRatio * scrollHeight));
        };

        const onDragEnd = () => {
            isDragging.current = false;
            document.body.style.userSelect = '';
        };

        thumb.addEventListener('mousedown', onDragStart);
        thumb.addEventListener('touchstart', onDragStart, { passive: true });
        window.addEventListener('mousemove', onDragMove);
        window.addEventListener('touchmove', onDragMove, { passive: true });
        window.addEventListener('mouseup', onDragEnd);
        window.addEventListener('touchend', onDragEnd);

        updateScrollbar();
        
        // Fallback update after fonts/images load
        setTimeout(updateScrollbar, 1000);

        return () => {
            window.removeEventListener('scroll', updateScrollbar);
            window.removeEventListener('resize', updateScrollbar);
            resizeObserver.disconnect();
            window.removeEventListener('mousemove', onDragMove);
            window.removeEventListener('mouseup', onDragEnd);
            window.removeEventListener('touchmove', onDragMove);
            window.removeEventListener('touchend', onDragEnd);
            thumb.removeEventListener('mousedown', onDragStart);
            thumb.removeEventListener('touchstart', onDragStart);
            clearTimeout(scrollTimeout);
        };
    }, []);

    return (
        <div 
            ref={trackRef}
            className="fixed right-1 top-2 bottom-2 w-[10px] z-[9999] pointer-events-none"
        >
            <div 
                ref={thumbRef}
                className="absolute top-0 right-0 w-full rounded-full bg-white/20 backdrop-blur-md shadow-[inset_0_0_10px_rgba(255,255,255,0.8)] pointer-events-auto cursor-pointer"
                style={{ 
                    transition: 'background 0.3s ease, opacity 0.3s ease',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.4)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                }}
            ></div>
        </div>
    );
}
