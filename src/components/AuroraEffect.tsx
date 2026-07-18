import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Props {
  className?: string;
  intensity?: number;
  speed?: number;
}

interface AuroraBand {
  y: number;
  amplitude: number;
  frequency: number;
  phase: number;
  speed: number;
  width: number;
  hue: number;
  saturation: number;
  lightness: number;
  alpha: number;
}

export default function AuroraEffect({ className = '', intensity = 1, speed = 1 }: Props) {
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

    // Aurora bands - multiple layers with different properties
    const bands: AuroraBand[] = [
      // Primary green aurora
      { y: 0.15, amplitude: 40, frequency: 0.003, phase: 0, speed: 0.008, width: 80, hue: 140, saturation: 70, lightness: 45, alpha: 0.06 },
      { y: 0.18, amplitude: 55, frequency: 0.0025, phase: 1.2, speed: 0.006, width: 100, hue: 155, saturation: 65, lightness: 40, alpha: 0.05 },
      { y: 0.22, amplitude: 35, frequency: 0.004, phase: 2.5, speed: 0.01, width: 60, hue: 130, saturation: 75, lightness: 50, alpha: 0.04 },
      // Secondary amber/gold aurora
      { y: 0.12, amplitude: 30, frequency: 0.0035, phase: 0.8, speed: 0.007, width: 50, hue: 45, saturation: 80, lightness: 50, alpha: 0.035 },
      { y: 0.25, amplitude: 45, frequency: 0.002, phase: 3.1, speed: 0.005, width: 70, hue: 35, saturation: 70, lightness: 45, alpha: 0.03 },
      // Tertiary cyan/teal aurora
      { y: 0.20, amplitude: 50, frequency: 0.0028, phase: 1.7, speed: 0.009, width: 90, hue: 175, saturation: 60, lightness: 45, alpha: 0.04 },
      { y: 0.28, amplitude: 25, frequency: 0.005, phase: 4.0, speed: 0.012, width: 40, hue: 190, saturation: 55, lightness: 50, alpha: 0.03 },
      // Deep emerald lower band
      { y: 0.30, amplitude: 60, frequency: 0.0018, phase: 2.0, speed: 0.004, width: 120, hue: 150, saturation: 50, lightness: 35, alpha: 0.025 },
      // Bioluminescent accent
      { y: 0.16, amplitude: 20, frequency: 0.006, phase: 0.3, speed: 0.015, width: 30, hue: 150, saturation: 90, lightness: 60, alpha: 0.03 },
    ];

    // Floating particles that drift through the aurora
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      hue: number;
      alpha: number;
      pulsePhase: number;
      pulseSpeed: number;
      life: number;
      maxLife: number;
    }[] = [];

    const spawnParticle = () => {
      if (particles.length >= 60) return;
      const hueChoice = Math.random();
      let hue: number;
      if (hueChoice < 0.4) hue = 140 + Math.random() * 30;
      else if (hueChoice < 0.65) hue = 45 + Math.random() * 15;
      else if (hueChoice < 0.85) hue = 175 + Math.random() * 20;
      else hue = 150 + Math.random() * 10; // biolum

      particles.push({
        x: Math.random() * w,
        y: Math.random() * h * 0.5,
        vx: (Math.random() - 0.5) * 0.2,
        vy: Math.random() * 0.1 + 0.02,
        size: Math.random() * 2 + 0.5,
        hue,
        alpha: Math.random() * 0.4 + 0.2,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        life: 0,
        maxLife: Math.random() * 300 + 200,
      });
    };

    // Initialize some particles
    for (let i = 0; i < 30; i++) spawnParticle();

    const drawAuroraBand = (band: AuroraBand, time: number) => {
      const baseY = band.y * h;
      const mouseInfluence = (mouse.y / h - 0.5) * 20;

      ctx.beginPath();
      ctx.moveTo(0, baseY);

      // Draw the top edge of the band
      const points: { x: number; y: number }[] = [];
      for (let x = 0; x <= w; x += 3) {
        const wave1 = Math.sin(x * band.frequency + time * band.speed + band.phase) * band.amplitude;
        const wave2 = Math.sin(x * band.frequency * 1.7 + time * band.speed * 0.7 + band.phase * 1.3) * band.amplitude * 0.4;
        const wave3 = Math.sin(x * band.frequency * 0.5 + time * band.speed * 1.3 + band.phase * 0.6) * band.amplitude * 0.25;
        const mouseWave = Math.sin((x - mouse.x) * 0.005) * mouseInfluence * 0.3;
        const y = baseY + wave1 + wave2 + wave3 + mouseWave;
        points.push({ x, y });
        ctx.lineTo(x, y);
      }

      // Close the path by drawing the bottom edge
      for (let i = points.length - 1; i >= 0; i--) {
        const p = points[i];
        const bottomWave = Math.sin(p.x * band.frequency * 0.8 + time * band.speed * 0.5 + band.phase + 1) * band.width * 0.3;
        ctx.lineTo(p.x, p.y + band.width + bottomWave);
      }
      ctx.closePath();

      // Create gradient fill
      const grad = ctx.createLinearGradient(0, baseY - band.amplitude, 0, baseY + band.width + band.amplitude);
      const pulse = (Math.sin(time * 0.003 + band.phase) + 1) / 2;
      const alpha = band.alpha * intensity * (0.7 + pulse * 0.3);

      grad.addColorStop(0, 'transparent');
      grad.addColorStop(0.2, `hsla(${band.hue}, ${band.saturation}%, ${band.lightness}%, ${alpha * 0.3})`);
      grad.addColorStop(0.4, `hsla(${band.hue}, ${band.saturation}%, ${band.lightness + 10}%, ${alpha})`);
      grad.addColorStop(0.6, `hsla(${band.hue + 10}, ${band.saturation}%, ${band.lightness}%, ${alpha * 0.8})`);
      grad.addColorStop(0.8, `hsla(${band.hue}, ${band.saturation - 10}%, ${band.lightness - 5}%, ${alpha * 0.3})`);
      grad.addColorStop(1, 'transparent');

      ctx.fillStyle = grad;
      ctx.fill();

      // Bright edge line along the top
      ctx.beginPath();
      for (const p of points) {
        ctx.lineTo(p.x, p.y);
      }
      ctx.strokeStyle = `hsla(${band.hue}, ${band.saturation + 10}%, ${band.lightness + 20}%, ${alpha * 0.4})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      // Draw aurora bands (back to front)
      for (const band of bands) {
        drawAuroraBand(band, t);
      }

      // Draw floating particles
      if (Math.random() < 0.1) spawnParticle();

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx + Math.sin(t * 0.01 + p.pulsePhase) * 0.1;
        p.y += p.vy;

        if (p.life >= p.maxLife || p.y > h) {
          particles.splice(i, 1);
          continue;
        }

        const lifeRatio = p.life / p.maxLife;
        const fadeIn = Math.min(lifeRatio * 5, 1);
        const fadeOut = 1 - Math.pow(lifeRatio, 2);
        const pulse = (Math.sin(t * p.pulseSpeed + p.pulsePhase) + 1) / 2;
        const alpha = p.alpha * fadeIn * fadeOut * (0.5 + pulse * 0.5);

        // Particle glow
        const glowSize = p.size * (4 + pulse * 3);
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowSize);
        glow.addColorStop(0, `hsla(${p.hue}, 80%, 65%, ${alpha * 0.3})`);
        glow.addColorStop(0.5, `hsla(${p.hue}, 70%, 55%, ${alpha * 0.1})`);
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowSize, 0, Math.PI * 2);
        ctx.fill();

        // Particle core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (0.8 + pulse * 0.3), 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 75%, ${alpha})`;
        ctx.fill();
      }

      // Vertical curtain rays (aurora ray effect)
      const rayCount = 12;
      for (let i = 0; i < rayCount; i++) {
        const rayX = (w / rayCount) * i + Math.sin(t * 0.003 + i * 1.5) * 50;
        const rayAlpha = (Math.sin(t * 0.005 + i * 0.8) + 1) / 2 * 0.015 * intensity;
        const rayWidth = 30 + Math.sin(t * 0.004 + i) * 15;

        const rayGrad = ctx.createLinearGradient(rayX, 0, rayX, h * 0.5);
        rayGrad.addColorStop(0, 'transparent');
        rayGrad.addColorStop(0.2, `hsla(150, 60%, 50%, ${rayAlpha})`);
        rayGrad.addColorStop(0.5, `hsla(140, 70%, 45%, ${rayAlpha * 1.5})`);
        rayGrad.addColorStop(0.8, `hsla(155, 50%, 40%, ${rayAlpha * 0.5})`);
        rayGrad.addColorStop(1, 'transparent');

        ctx.fillStyle = rayGrad;
        ctx.fillRect(rayX - rayWidth / 2, 0, rayWidth, h * 0.5);
      }

      // Subtle overall glow at the top
      const topGlow = ctx.createLinearGradient(0, 0, 0, h * 0.4);
      const topPulse = (Math.sin(t * 0.002) + 1) / 2;
      topGlow.addColorStop(0, `hsla(150, 50%, 40%, ${0.02 * intensity * (0.5 + topPulse * 0.5)})`);
      topGlow.addColorStop(0.5, `hsla(140, 40%, 35%, ${0.01 * intensity})`);
      topGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = topGlow;
      ctx.fillRect(0, 0, w, h * 0.4);

      t += speed;
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
  }, [intensity, speed]);

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
