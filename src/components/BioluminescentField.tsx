import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Props {
  className?: string;
  density?: number;
}

interface Firefly {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  hue: number;
  phase: number;
  speed: number;
  pulseFreq: number;
  trail: { x: number; y: number; alpha: number }[];
  depth: number;
}

interface Spore {
  x: number;
  y: number;
  size: number;
  speed: number;
  drift: number;
  phase: number;
  hue: number;
}

interface DustMote {
  x: number;
  y: number;
  size: number;
  alpha: number;
  drift: number;
  phase: number;
  hue: number;
}

export default function BioluminescentField({ className = '', density = 40 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let w = window.innerWidth;
    let h = window.innerHeight;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    let t = 0;
    const mouse = { x: w / 2, y: h / 2 };

    const handleMouse = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouse);

    // Firefly particles - 3 depth layers
    const fireflies: Firefly[] = Array.from({ length: density }, () => {
      const hueChoice = Math.random();
      let hue: number;
      if (hueChoice < 0.35) hue = 140 + Math.random() * 30; // green biolum
      else if (hueChoice < 0.55) hue = 45 + Math.random() * 20; // amber
      else if (hueChoice < 0.75) hue = 170 + Math.random() * 20; // cyan-teal
      else if (hueChoice < 0.88) hue = 150 + Math.random() * 10; // bright biolum
      else hue = 30 + Math.random() * 15; // warm copper

      const depth = Math.random();
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3 * (0.5 + depth * 0.5),
        vy: (Math.random() - 0.5) * 0.3 * (0.5 + depth * 0.5),
        size: (Math.random() * 2.5 + 1) * (0.4 + depth * 0.6),
        hue,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.5 + 0.2,
        pulseFreq: Math.random() * 0.03 + 0.01,
        trail: [],
        depth,
      };
    });

    // Floating spore particles
    const spores: Spore[] = Array.from({ length: 40 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 1.2 + 0.3,
      speed: Math.random() * 0.15 + 0.05,
      drift: Math.random() * 0.3 + 0.1,
      phase: Math.random() * Math.PI * 2,
      hue: Math.random() > 0.6 ? 47 : Math.random() > 0.5 ? 160 : 150,
    }));

    // Dust motes - tiny ambient particles
    const dustMotes: DustMote[] = Array.from({ length: 50 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 0.6 + 0.2,
      alpha: Math.random() * 0.15 + 0.05,
      drift: Math.random() * 0.15 + 0.05,
      phase: Math.random() * Math.PI * 2,
      hue: Math.random() > 0.5 ? 140 : 45,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      // Draw dust motes (deepest layer)
      for (const d of dustMotes) {
        d.x += Math.sin(t * 0.005 + d.phase) * d.drift;
        d.y += Math.cos(t * 0.003 + d.phase * 1.3) * d.drift * 0.5;

        if (d.x < -10) d.x = w + 10;
        if (d.x > w + 10) d.x = -10;
        if (d.y < -10) d.y = h + 10;
        if (d.y > h + 10) d.y = -10;

        const moteAlpha = d.alpha * (0.5 + Math.sin(t * 0.01 + d.phase) * 0.5);
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${d.hue}, 40%, 60%, ${moteAlpha})`;
        ctx.fill();
      }

      // Draw spores (mid layer)
      for (const s of spores) {
        s.y -= s.speed;
        s.x += Math.sin(t * 0.01 + s.phase) * s.drift;

        if (s.y < -10) {
          s.y = h + 10;
          s.x = Math.random() * w;
        }

        const sporeAlpha = (Math.sin(t * 0.02 + s.phase) + 1) / 2 * 0.3 + 0.1;

        // Spore glow
        const sporeGlow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size * 4);
        sporeGlow.addColorStop(0, `hsla(${s.hue}, 60%, 60%, ${sporeAlpha * 0.3})`);
        sporeGlow.addColorStop(1, 'transparent');
        ctx.fillStyle = sporeGlow;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${s.hue}, 60%, 65%, ${sporeAlpha})`;
        ctx.fill();
      }

      // Draw fireflies (foreground layer)
      for (const f of fireflies) {
        // Organic movement
        const angle = Math.sin(t * f.speed + f.phase) * Math.PI;
        f.vx += Math.cos(angle) * 0.005 * (0.5 + f.depth * 0.5);
        f.vy += Math.sin(angle) * 0.005 * (0.5 + f.depth * 0.5);

        // Mouse interaction
        const dx = mouse.x - f.x;
        const dy = mouse.y - f.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200 && dist > 0) {
          const force = (200 - dist) / 200 * 0.02;
          f.vx += (dx / dist) * force;
          f.vy += (dy / dist) * force;
        }

        f.vx *= 0.98;
        f.vy *= 0.98;
        f.x += f.vx;
        f.y += f.vy;

        // Wrap
        if (f.x < -20) f.x = w + 20;
        if (f.x > w + 20) f.x = -20;
        if (f.y < -20) f.y = h + 20;
        if (f.y > h + 20) f.y = -20;

        // Trail
        f.trail.push({ x: f.x, y: f.y, alpha: 1 });
        if (f.trail.length > 10) f.trail.shift();
        for (const tp of f.trail) tp.alpha *= 0.82;

        // Pulsing bioluminescence
        const pulse = (Math.sin(t * f.pulseFreq + f.phase) + 1) / 2;
        const alpha = (0.15 + pulse * 0.6) * (0.3 + f.depth * 0.7);
        const glowSize = f.size * (3 + pulse * 5) * (0.5 + f.depth * 0.5);

        // Draw trail
        for (let i = 0; i < f.trail.length - 1; i++) {
          const tp = f.trail[i];
          if (tp.alpha < 0.03) continue;
          ctx.beginPath();
          ctx.arc(tp.x, tp.y, f.size * 0.4 * tp.alpha * f.depth, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${f.hue}, 80%, 60%, ${tp.alpha * alpha * 0.25})`;
          ctx.fill();
        }

        // Outer glow
        const glowGrad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, glowSize);
        glowGrad.addColorStop(0, `hsla(${f.hue}, 80%, 65%, ${alpha * 0.3})`);
        glowGrad.addColorStop(0.3, `hsla(${f.hue}, 70%, 55%, ${alpha * 0.1})`);
        glowGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(f.x, f.y, glowSize, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.size * (0.8 + pulse * 0.4), 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${f.hue}, 85%, 78%, ${alpha})`;
        ctx.fill();

        // Cross sparkle on bright pulses
        if (pulse > 0.7 && f.size > 1.8) {
          const sparkleLen = f.size * 3 * pulse;
          const sparkleAlpha = alpha * 0.3;
          ctx.beginPath();
          ctx.moveTo(f.x - sparkleLen, f.y);
          ctx.lineTo(f.x + sparkleLen, f.y);
          ctx.strokeStyle = `hsla(${f.hue}, 70%, 75%, ${sparkleAlpha})`;
          ctx.lineWidth = 0.4;
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(f.x, f.y - sparkleLen);
          ctx.lineTo(f.x, f.y + sparkleLen);
          ctx.stroke();
        }
      }

      // Connection lines between nearby fireflies
      for (let i = 0; i < fireflies.length; i++) {
        for (let j = i + 1; j < fireflies.length; j++) {
          const a = fireflies[i];
          const b = fireflies[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            const lineAlpha = (1 - dist / 100) * 0.05 * Math.min(a.depth, b.depth);
            const avgHue = (a.hue + b.hue) / 2;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `hsla(${avgHue}, 60%, 55%, ${lineAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      t++;
      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
      observer.disconnect();
    };
  }, [density]);

  useEffect(() => {
    if (!isVisible) cancelAnimationFrame(animRef.current);
  }, [isVisible]);

  return (
    <motion.canvas
      ref={canvasRef}
      className={`fixed inset-0 z-0 pointer-events-none ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 3, ease: 'easeOut' }}
      style={{ width: '100%', height: '100%' }}
    />
  );
}
