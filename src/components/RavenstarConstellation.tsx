import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Props {
  className?: string;
}

interface Star {
  x: number;
  y: number;
  size: number;
  brightness: number;
  pulseSpeed: number;
  pulsePhase: number;
  hue: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

export default function RavenstarConstellation({ className = '' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let w = 0;
    let h = 0;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      w = rect?.width ?? window.innerWidth;
      h = rect?.height ?? 600;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    let t = 0;
    let mouse = { x: w / 2, y: h / 2 };

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    canvas.parentElement?.addEventListener('mousemove', handleMouse);

    // Background stars (distant, small, twinkling)
    const bgStars: Star[] = Array.from({ length: 80 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 1.2 + 0.3,
      brightness: Math.random() * 0.4 + 0.1,
      pulseSpeed: Math.random() * 0.03 + 0.005,
      pulsePhase: Math.random() * Math.PI * 2,
      hue: Math.random() > 0.7 ? 45 : Math.random() > 0.5 ? 160 : 200,
    }));

    // Ravenstar constellation points (the main constellation shape)
    // Forms a raven in flight with outstretched wings
    const constellationPoints = [
      // Head
      { x: 0.50, y: 0.18, label: 'Crown', size: 3.5, hue: 45 },
      { x: 0.47, y: 0.22, label: 'Eye Left', size: 2.5, hue: 160 },
      { x: 0.53, y: 0.22, label: 'Eye Right', size: 2.5, hue: 160 },
      { x: 0.50, y: 0.26, label: 'Beak', size: 2, hue: 30 },
      // Body
      { x: 0.50, y: 0.32, label: 'Throat', size: 2.5, hue: 45 },
      { x: 0.50, y: 0.42, label: 'Heart', size: 3.5, hue: 160 },
      { x: 0.50, y: 0.52, label: 'Core', size: 3, hue: 45 },
      { x: 0.50, y: 0.62, label: 'Tail Root', size: 2.5, hue: 200 },
      // Left wing
      { x: 0.42, y: 0.35, label: 'Left Shoulder', size: 2.5, hue: 45 },
      { x: 0.34, y: 0.30, label: 'Left Elbow', size: 2, hue: 160 },
      { x: 0.24, y: 0.25, label: 'Left Wrist', size: 2.5, hue: 45 },
      { x: 0.16, y: 0.22, label: 'Left Pinion', size: 3, hue: 160 },
      { x: 0.12, y: 0.28, label: 'Left Tip', size: 2, hue: 200 },
      // Left wing secondary feathers
      { x: 0.28, y: 0.38, label: 'Left Covert', size: 1.8, hue: 45 },
      { x: 0.20, y: 0.35, label: 'Left Secondary', size: 2, hue: 160 },
      // Right wing
      { x: 0.58, y: 0.35, label: 'Right Shoulder', size: 2.5, hue: 45 },
      { x: 0.66, y: 0.30, label: 'Right Elbow', size: 2, hue: 160 },
      { x: 0.76, y: 0.25, label: 'Right Wrist', size: 2.5, hue: 45 },
      { x: 0.84, y: 0.22, label: 'Right Pinion', size: 3, hue: 160 },
      { x: 0.88, y: 0.28, label: 'Right Tip', size: 2, hue: 200 },
      // Right wing secondary feathers
      { x: 0.72, y: 0.38, label: 'Right Covert', size: 1.8, hue: 45 },
      { x: 0.80, y: 0.35, label: 'Right Secondary', size: 2, hue: 160 },
      // Tail feathers
      { x: 0.46, y: 0.70, label: 'Tail Left', size: 2, hue: 200 },
      { x: 0.54, y: 0.70, label: 'Tail Right', size: 2, hue: 200 },
      { x: 0.42, y: 0.74, label: 'Tail Outer Left', size: 1.5, hue: 160 },
      { x: 0.58, y: 0.74, label: 'Tail Outer Right', size: 1.5, hue: 160 },
    ];

    // Constellation lines (indices into constellationPoints)
    const constellationLines = [
      // Head
      [0, 1], [0, 2], [1, 3], [2, 3], [3, 4],
      // Body
      [4, 5], [5, 6], [6, 7],
      // Left wing
      [4, 8], [8, 9], [9, 10], [10, 11], [11, 12],
      [9, 13], [13, 14], [10, 14],
      // Right wing
      [4, 15], [15, 16], [16, 17], [17, 18], [18, 19],
      [16, 20], [20, 21], [17, 21],
      // Tail
      [7, 22], [7, 23], [22, 24], [23, 25],
    ];

    // Shooting stars
    const shootingStars: ShootingStar[] = [];

    const spawnShootingStar = () => {
      if (shootingStars.length >= 2) return;
      const startX = Math.random() * w * 0.6 + w * 0.2;
      const startY = Math.random() * h * 0.3;
      const angle = Math.PI * 0.15 + Math.random() * 0.3;
      const speed = Math.random() * 3 + 2;
      shootingStars.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: Math.random() * 40 + 30,
        size: Math.random() * 1.5 + 1,
      });
    };

    // Nebula clouds (soft background glow areas)
    const nebulae = [
      { x: 0.3, y: 0.4, rx: 120, ry: 80, hue: 160, alpha: 0.03 },
      { x: 0.7, y: 0.3, rx: 100, ry: 60, hue: 45, alpha: 0.025 },
      { x: 0.5, y: 0.6, rx: 150, ry: 90, hue: 200, alpha: 0.02 },
    ];

    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      // Deep space background gradient
      const spaceGrad = ctx.createLinearGradient(0, 0, 0, h);
      spaceGrad.addColorStop(0, 'rgba(5, 10, 8, 0.3)');
      spaceGrad.addColorStop(0.5, 'rgba(10, 31, 22, 0.15)');
      spaceGrad.addColorStop(1, 'rgba(5, 10, 8, 0.3)');
      ctx.fillStyle = spaceGrad;
      ctx.fillRect(0, 0, w, h);

      // Nebula clouds
      for (const neb of nebulae) {
        const nx = neb.x * w;
        const ny = neb.y * h;
        const nebPulse = (Math.sin(t * 0.005 + neb.hue) + 1) / 2;
        const nebGrad = ctx.createRadialGradient(nx, ny, 0, nx, ny, Math.max(neb.rx, neb.ry));
        nebGrad.addColorStop(0, `hsla(${neb.hue}, 60%, 40%, ${neb.alpha + nebPulse * 0.01})`);
        nebGrad.addColorStop(0.5, `hsla(${neb.hue}, 50%, 30%, ${neb.alpha * 0.5})`);
        nebGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = nebGrad;
        ctx.beginPath();
        ctx.ellipse(nx, ny, neb.rx + nebPulse * 10, neb.ry + nebPulse * 5, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // Background stars
      for (const star of bgStars) {
        const pulse = (Math.sin(t * star.pulseSpeed + star.pulsePhase) + 1) / 2;
        const alpha = star.brightness * (0.5 + pulse * 0.5);

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * (0.8 + pulse * 0.4), 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${star.hue}, 50%, 80%, ${alpha})`;
        ctx.fill();

        // Tiny glow
        if (star.size > 0.8) {
          const starGlow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 4);
          starGlow.addColorStop(0, `hsla(${star.hue}, 60%, 70%, ${alpha * 0.2})`);
          starGlow.addColorStop(1, 'transparent');
          ctx.fillStyle = starGlow;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Constellation lines
      for (const [a, b] of constellationLines) {
        const pa = constellationPoints[a];
        const pb = constellationPoints[b];
        const ax = pa.x * w;
        const ay = pa.y * h;
        const bx = pb.x * w;
        const by = pb.y * h;

        // Line shimmer
        const linePulse = (Math.sin(t * 0.01 + a * 0.3) + 1) / 2;
        const lineAlpha = 0.08 + linePulse * 0.07;

        // Glow line
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.strokeStyle = `hsla(160, 60%, 55%, ${lineAlpha * 0.5})`;
        ctx.lineWidth = 3;
        ctx.stroke();

        // Core line
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.strokeStyle = `hsla(160, 60%, 60%, ${lineAlpha})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // Constellation stars
      for (const point of constellationPoints) {
        const px = point.x * w;
        const py = point.y * h;
        const pulse = (Math.sin(t * 0.015 + point.x * 10 + point.y * 7) + 1) / 2;

        // Mouse proximity glow
        const dx = mouse.x - px;
        const dy = mouse.y - py;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const proximity = Math.max(0, 1 - dist / 150);

        const starSize = point.size * (0.8 + pulse * 0.4 + proximity * 0.5);
        const glowRadius = starSize * (4 + pulse * 3 + proximity * 4);

        // Outer glow
        const starGlow = ctx.createRadialGradient(px, py, 0, px, py, glowRadius);
        starGlow.addColorStop(0, `hsla(${point.hue}, 70%, 65%, ${(0.15 + pulse * 0.1 + proximity * 0.15)})`);
        starGlow.addColorStop(0.4, `hsla(${point.hue}, 60%, 55%, ${(0.05 + proximity * 0.05)})`);
        starGlow.addColorStop(1, 'transparent');
        ctx.fillStyle = starGlow;
        ctx.beginPath();
        ctx.arc(px, py, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Star core
        ctx.beginPath();
        ctx.arc(px, py, starSize, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${point.hue}, 70%, 80%, ${0.6 + pulse * 0.3 + proximity * 0.1})`;
        ctx.fill();

        // Cross sparkle on brighter stars
        if (point.size >= 3) {
          const sparkleLen = starSize * (2 + pulse * 2 + proximity * 2);
          const sparkleAlpha = 0.15 + pulse * 0.1 + proximity * 0.15;
          ctx.beginPath();
          ctx.moveTo(px - sparkleLen, py);
          ctx.lineTo(px + sparkleLen, py);
          ctx.strokeStyle = `hsla(${point.hue}, 60%, 75%, ${sparkleAlpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(px, py - sparkleLen);
          ctx.lineTo(px, py + sparkleLen);
          ctx.strokeStyle = `hsla(${point.hue}, 60%, 75%, ${sparkleAlpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      // Shooting stars
      if (Math.random() < 0.005) spawnShootingStar();

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.life++;
        ss.x += ss.vx;
        ss.y += ss.vy;

        if (ss.life >= ss.maxLife) {
          shootingStars.splice(i, 1);
          continue;
        }

        const lifeRatio = ss.life / ss.maxLife;
        const fadeAlpha = lifeRatio < 0.2 ? lifeRatio * 5 : (1 - lifeRatio);

        // Trail
        const trailLen = 30;
        const trailGrad = ctx.createLinearGradient(
          ss.x, ss.y,
          ss.x - ss.vx * trailLen, ss.y - ss.vy * trailLen
        );
        trailGrad.addColorStop(0, `hsla(45, 80%, 80%, ${fadeAlpha * 0.6})`);
        trailGrad.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(ss.x - ss.vx * trailLen, ss.y - ss.vy * trailLen);
        ctx.strokeStyle = trailGrad;
        ctx.lineWidth = ss.size;
        ctx.stroke();

        // Head
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, ss.size * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(45, 80%, 90%, ${fadeAlpha})`;
        ctx.fill();
      }

      // Subtle vignette
      const vigGrad = ctx.createRadialGradient(w / 2, h / 2, h * 0.2, w / 2, h / 2, Math.max(w, h) * 0.6);
      vigGrad.addColorStop(0, 'transparent');
      vigGrad.addColorStop(1, 'rgba(5, 10, 8, 0.3)');
      ctx.fillStyle = vigGrad;
      ctx.fillRect(0, 0, w, h);

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
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isVisible) cancelAnimationFrame(animRef.current);
  }, [isVisible]);

  return (
    <motion.canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 2, ease: 'easeOut' }}
    />
  );
}
