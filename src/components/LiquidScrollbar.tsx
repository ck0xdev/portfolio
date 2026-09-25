'use client';

import { useEffect, useRef } from 'react';

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

        let ticking = false;
        let lastScrollY = window.scrollY;
        let docHeight = document.documentElement.scrollHeight;
        let winHeight = window.innerHeight;
        let trackHeight = track.clientHeight;

        const updateDimensions = () => {
            docHeight = document.documentElement.scrollHeight;
            winHeight = window.innerHeight;
            trackHeight = track.clientHeight;
        };

        const renderScrollbar = () => {
            const scrollHeight = docHeight - winHeight;
            if (scrollHeight <= 0) {
                thumb.style.opacity = '0';
                ticking = false;
                return;
            }
            thumb.style.opacity = '1';

            const scrollY = window.scrollY;
            const scrollProgress = Math.max(0, Math.min(1, scrollY / scrollHeight));
            const thumbHeight = Math.max(50, (winHeight / docHeight) * trackHeight);
            const maxScrollTop = trackHeight - thumbHeight;
            const scrollTop = scrollProgress * maxScrollTop;

            const velocity = scrollY - lastScrollY;
            lastScrollY = scrollY;

            let stretch = 1;
            let squeeze = 1;
            if (!isDragging.current) {
                stretch = 1 + Math.min(Math.abs(velocity) * 0.003, 0.4);
                squeeze = 1 - Math.min(Math.abs(velocity) * 0.0015, 0.2);
            }

            thumb.style.height = `${thumbHeight}px`;
            thumb.style.transformOrigin = velocity >= 0 ? 'top center' : 'bottom center';
            thumb.style.transform = `translate3d(0, ${scrollTop}px, 0) scaleY(${stretch}) scaleX(${squeeze})`;

            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(renderScrollbar);
                ticking = true;
            }
        };

        const onResize = () => {
            updateDimensions();
            onScroll();
        };

        // Resize observer to detect DOM height changes
        const resizeObserver = new ResizeObserver(() => {
            onResize();
        });
        resizeObserver.observe(document.body);

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onResize);
        
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

        onScroll();
        
        // Fallback update after fonts/images load
        const fallbackTimer = setTimeout(onResize, 1000);

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onResize);
            resizeObserver.disconnect();
            window.removeEventListener('mousemove', onDragMove);
            window.removeEventListener('mouseup', onDragEnd);
            window.removeEventListener('touchmove', onDragMove);
            window.removeEventListener('touchend', onDragEnd);
            thumb.removeEventListener('mousedown', onDragStart);
            thumb.removeEventListener('touchstart', onDragStart);
            clearTimeout(fallbackTimer);
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
