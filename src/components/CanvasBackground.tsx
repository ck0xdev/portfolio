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
        const particles: Particle[] = [];

        // Modern, vibrant colors for the particles
        const colors = ['#FF3366', '#20E3B2', '#7C3AED', '#FF9E00', '#3b82f6'];

        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            if(canvas) {
                canvas.width = width;
                canvas.height = height;
            }
        }

        window.addEventListener('resize', resize);
        resize();

        let scrollVelocity = 0;
        let lastScrollY = window.scrollY;

        // Try to hook into Lenis if it exists (we initialize it globally or get the scroll event)
        // For standalone, we listen to scroll but calculate velocity smoothly
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            scrollVelocity = (currentScrollY - lastScrollY) * 0.8; // Amplified velocity
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
            baseY: number;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.baseY = this.y;
                this.size = Math.random() * 3 + 1.5;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.6 + 0.1;
            }

            update(scrollVelY: number) {
                this.x += this.speedX;
                // Add scroll velocity to Y position for parallax effect (larger particles move faster)
                this.y += this.speedY - (scrollVelY * this.size * 0.15); 

                // Wrap around edges smoothly
                if (this.x > width + 10) this.x = -10;
                if (this.x < -10) this.x = width + 10;
                
                // Infinite vertical wrapping for continuous scrolling
                if (this.y > height + 50) this.y = -50;
                if (this.y < -50) this.y = height + 50;
            }

            draw() {
                if(!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.opacity;
                ctx.fill();
            }
        }

        // Create particles (denser on larger screens)
        const particleCount = Math.min(Math.floor((width * height) / 15000), 100);
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        let animationFrameId: number;

        function animate() {
            if(!ctx) return;
            // Create a trailing effect with semi-transparent clear
            ctx.fillStyle = 'rgba(10, 10, 10, 1)'; // Dark background (fallback if CSS doesn't cover)
            ctx.clearRect(0, 0, width, height);

            scrollVelocity *= 0.90; // Friction to slow down the scroll effect

            // Add a subtle gradient background (dark mode aesthetic)
            const gradient = ctx.createLinearGradient(0, 0, width, height);
            gradient.addColorStop(0, 'rgba(15, 15, 20, 0.8)');
            gradient.addColorStop(1, 'rgba(5, 5, 10, 0.9)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            // Update and draw particles
            particles.forEach(p => {
                p.update(scrollVelocity);
                p.draw();
            });

            // Draw some connections between close particles for a "network" effect
            ctx.globalAlpha = 1;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = particles[i].color;
                        ctx.globalAlpha = (100 - distance) / 500; // Fade out as they get further
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
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
