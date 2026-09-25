'use client';

import { useEffect, useRef } from 'react';

export default function CanvasBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        let gradient: CanvasGradient | null = null;
        const particles: Particle[] = [];

        // Modern, vibrant colors for the particles
        const colors = ['#FF3366', '#20E3B2', '#7C3AED', '#FF9E00', '#3b82f6'];

        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            if (canvas && ctx) {
                canvas.width = width;
                canvas.height = height;
                // Cache gradient on resize rather than creating it every frame
                gradient = ctx.createLinearGradient(0, 0, width, height);
                gradient.addColorStop(0, 'rgba(15, 15, 20, 0.8)');
                gradient.addColorStop(1, 'rgba(5, 5, 10, 0.9)');
            }
        }

        window.addEventListener('resize', resize);
        resize();

        let scrollVelocity = 0;
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            scrollVelocity = (currentScrollY - lastScrollY) * 0.35; // Gentle velocity to prevent particle jumps
            lastScrollY = currentScrollY;
        };
        window.addEventListener('scroll', handleScroll, { passive: true });

        class Particle {
            x: number;
            y: number;
            size: number;
            color: string;
            speedX: number;
            speedY: number;
            opacity: number;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 2 + 1.2;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.speedX = (Math.random() - 0.5) * 0.4;
                this.speedY = (Math.random() - 0.5) * 0.4;
                this.opacity = Math.random() * 0.5 + 0.15;
            }

            update(scrollVelY: number) {
                this.x += this.speedX;
                this.y += this.speedY - (scrollVelY * this.size * 0.08);

                if (this.x > width + 10) this.x = -10;
                if (this.x < -10) this.x = width + 10;
                if (this.y > height + 20) this.y = -20;
                if (this.y < -20) this.y = height + 20;
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.opacity;
                ctx.fill();
            }
        }

        // Keep particle count lean and performant (max 40)
        const particleCount = Math.min(Math.floor((width * height) / 35000), 40);
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        let animationFrameId: number;
        const maxDistSq = 80 * 80; // 6400

        function animate() {
            if (!ctx) return;

            scrollVelocity *= 0.88;

            if (gradient) {
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, width, height);
            } else {
                ctx.clearRect(0, 0, width, height);
            }

            // Update and draw particles
            for (let i = 0; i < particles.length; i++) {
                particles[i].update(scrollVelocity);
                particles[i].draw();
            }

            // Connect close particles with squared distance check
            ctx.lineWidth = 0.5;
            for (let i = 0; i < particles.length; i++) {
                const pi = particles[i];
                for (let j = i + 1; j < particles.length; j++) {
                    const pj = particles[j];
                    const dx = pi.x - pj.x;
                    const dy = pi.y - pj.y;
                    const distSq = dx * dx + dy * dy;

                    if (distSq < maxDistSq) {
                        const alpha = (1 - distSq / maxDistSq) * 0.22;
                        ctx.beginPath();
                        ctx.strokeStyle = pi.color;
                        ctx.globalAlpha = alpha;
                        ctx.moveTo(pi.x, pi.y);
                        ctx.lineTo(pj.x, pj.y);
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        }

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('scroll', handleScroll);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas 
            ref={canvasRef} 
            id="bg-canvas" 
            style={{ 
                position: 'fixed', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%', 
                zIndex: -1,
                pointerEvents: 'none'
            }}
        />
    );
}
