import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Props {
  className?: string;
}

interface Ember {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
  brightness: number;
}

interface FlameTongue {
  angle: number;
  length: number;
  width: number;
  speed: number;
  phase: number;
  hue: number;
}

export default function PhoenixSigilBackground({ className = '' }: Props) {
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

    const cx = w / 2;
    const cy = h / 2;
    let t = 0;
    const mouseInfluence = { x: 0, y: 0 };

    const handleMouse = (e: MouseEvent) => {
      mouseInfluence.x = (e.clientX - cx) / cx;
      mouseInfluence.y = (e.clientY - cy) / cy;
    };
    window.addEventListener('mousemove', handleMouse);

    // Ember particle system
    const embers: Ember[] = [];
    const maxEmbers = 150;

    const spawnEmber = (fromX: number, fromY: number, intensity: number = 1) => {
      if (embers.length >= maxEmbers) return;
      const angle = Math.random() * Math.PI * 2;
      const speed = (Math.random() * 1.5 + 0.5) * intensity;
      embers.push({
        x: fromX + (Math.random() - 0.5) * 20,
        y: fromY + (Math.random() - 0.5) * 20,
        vx: Math.cos(angle) * speed * 0.5,
        vy: -Math.random() * 2 * intensity - 0.5,
        life: 0,
        maxLife: Math.random() * 120 + 60,
        size: Math.random() * 3 + 0.5,
        hue: Math.random() > 0.4 ? 30 + Math.random() * 20 : 160 + Math.random() * 20,
        brightness: Math.random() * 0.5 + 0.5,
      });
    };

    // Flame tongues around the sigil
    const flameTongues: FlameTongue[] = Array.from({ length: 24 }, (_, i) => ({
      angle: (Math.PI * 2 / 24) * i,
      length: Math.random() * 40 + 30,
      width: Math.random() * 8 + 4,
      speed: Math.random() * 0.02 + 0.01,
      phase: Math.random() * Math.PI * 2,
      hue: Math.random() > 0.5 ? 30 + Math.random() * 25 : 45 + Math.random() * 15,
    }));

    const drawPhoenixBody = (
      centerX: number,
      centerY: number,
      size: number,
      rotation: number,
      alpha: number
    ) => {
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotation);
      ctx.globalAlpha = alpha;

      // Outer ring
      ctx.beginPath();
      ctx.arc(0, 0, size, 0, Math.PI * 2);
      ctx.strokeStyle = `hsla(160, 70%, 50%, ${alpha * 0.3})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Inner concentric rings with pulse
      const rings = [0.8, 0.6, 0.4, 0.2];
      rings.forEach((ratio, i) => {
        const pulse = Math.sin(t * 0.8 + i * 0.5) * 0.15;
        ctx.beginPath();
        ctx.arc(0, 0, size * ratio, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${i % 2 === 0 ? 160 : 47}, 70%, 50%, ${alpha * (0.15 + pulse)})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      // Radial lines (6-fold symmetry)
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const innerR = size * 0.2;
        const outerR = size * 0.85;
        const wobble = Math.sin(t * 0.5 + i) * 3;

        ctx.beginPath();
        ctx.moveTo(Math.cos(angle) * innerR, Math.sin(angle) * innerR);
        ctx.lineTo(Math.cos(angle) * outerR + wobble, Math.sin(angle) * outerR + wobble);
        ctx.strokeStyle = `hsla(160, 70%, 50%, ${alpha * 0.2})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // 12-fold node circles with glow
      for (let i = 0; i < 12; i++) {
        const angle = (Math.PI / 6) * i;
        const r = size * 0.5;
        const nodeX = Math.cos(angle) * r;
        const nodeY = Math.sin(angle) * r;
        const nodePulse = (Math.sin(t * 0.6 + i * 0.5) + 1) / 2;

        ctx.beginPath();
        ctx.arc(nodeX, nodeY, 4 + nodePulse * 2, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(47, 70%, 55%, ${alpha * (0.2 + nodePulse * 0.15)})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();

        const nodeGrad = ctx.createRadialGradient(nodeX, nodeY, 0, nodeX, nodeY, 8 + nodePulse * 4);
        nodeGrad.addColorStop(0, `hsla(47, 70%, 55%, ${alpha * 0.15 * nodePulse})`);
        nodeGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = nodeGrad;
        ctx.fill();
      }

      // Phoenix wing shapes (4 cardinal directions)
      const wingAlpha = alpha * (0.4 + Math.sin(t * 0.4) * 0.15);
      const wingPositions = [
        { angle: -Math.PI / 2 },
        { angle: Math.PI / 2 },
        { angle: 0 },
        { angle: Math.PI },
      ];

      for (const wing of wingPositions) {
        ctx.save();
        ctx.rotate(wing.angle);

        const wingLen = size * 0.35;
        const wingW = size * 0.12;
        const wingPulse = Math.sin(t * 0.5 + wing.angle) * 5;

        ctx.beginPath();
        ctx.moveTo(0, -size * 0.15);
        ctx.quadraticCurveTo(wingW + wingPulse, -wingLen * 0.5, 0, -wingLen);
        ctx.quadraticCurveTo(-wingW - wingPulse, -wingLen * 0.5, 0, -size * 0.15);
        ctx.closePath();

        const wingGrad = ctx.createLinearGradient(0, -size * 0.15, 0, -wingLen);
        wingGrad.addColorStop(0, `hsla(47, 70%, 55%, ${wingAlpha * 0.1})`);
        wingGrad.addColorStop(0.5, `hsla(30, 80%, 55%, ${wingAlpha * 0.3})`);
        wingGrad.addColorStop(1, `hsla(20, 90%, 50%, ${wingAlpha * 0.05})`);
        ctx.fillStyle = wingGrad;
        ctx.fill();

        ctx.strokeStyle = `hsla(47, 70%, 55%, ${wingAlpha * 0.5})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        ctx.restore();
      }

      // Central eye/bindu
      const eyePulse = (Math.sin(t * 0.7) + 1) / 2;
      const eyeSize = 6 + eyePulse * 3;
      const eyeGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, eyeSize * 3);
      eyeGrad.addColorStop(0, `hsla(47, 80%, 65%, ${alpha * (0.4 + eyePulse * 0.2)})`);
      eyeGrad.addColorStop(0.3, `hsla(30, 80%, 55%, ${alpha * 0.15})`);
      eyeGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = eyeGrad;
      ctx.beginPath();
      ctx.arc(0, 0, eyeSize * 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(0, 0, eyeSize, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(47, 80%, 70%, ${alpha * (0.5 + eyePulse * 0.3)})`;
      ctx.fill();

      ctx.restore();
    };

    const drawFlames = (
      centerX: number,
      centerY: number,
      size: number,
      rotation: number,
      alpha: number
    ) => {
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotation);

      for (const flame of flameTongues) {
        const flickerPhase = t * flame.speed + flame.phase;
        const flickerLen = flame.length * (0.7 + Math.sin(flickerPhase * 3) * 0.3);
        const flickerWidth = flame.width * (0.6 + Math.sin(flickerPhase * 5) * 0.4);
        const flickerAlpha = alpha * (0.15 + Math.sin(flickerPhase * 2) * 0.1);

        const baseX = Math.cos(flame.angle) * size * 0.85;
        const baseY = Math.sin(flame.angle) * size * 0.85;
        const tipX = Math.cos(flame.angle) * (size * 0.85 + flickerLen);
        const tipY = Math.sin(flame.angle) * (size * 0.85 + flickerLen);

        const perpX = -Math.sin(flame.angle);
        const perpY = Math.cos(flame.angle);

        ctx.beginPath();
        ctx.moveTo(baseX + perpX * flickerWidth * 0.3, baseY + perpY * flickerWidth * 0.3);
        ctx.quadraticCurveTo(
          (baseX + tipX) / 2 + perpX * flickerWidth * 0.5 + Math.sin(flickerPhase * 7) * 3,
          (baseY + tipY) / 2 + perpY * flickerWidth * 0.5 + Math.cos(flickerPhase * 7) * 3,
          tipX,
          tipY
        );
        ctx.quadraticCurveTo(
          (baseX + tipX) / 2 - perpX * flickerWidth * 0.5 - Math.sin(flickerPhase * 7) * 3,
          (baseY + tipY) / 2 - perpY * flickerWidth * 0.5 - Math.cos(flickerPhase * 7) * 3,
          baseX - perpX * flickerWidth * 0.3,
          baseY - perpY * flickerWidth * 0.3
        );
        ctx.closePath();

        const flameGrad = ctx.createLinearGradient(baseX, baseY, tipX, tipY);
        flameGrad.addColorStop(0, `hsla(${flame.hue}, 80%, 55%, ${flickerAlpha})`);
        flameGrad.addColorStop(0.6, `hsla(${flame.hue - 10}, 90%, 50%, ${flickerAlpha * 0.5})`);
        flameGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = flameGrad;
        ctx.fill();
      }

      ctx.restore();
    };

    const drawEnergyRings = (
      centerX: number,
      centerY: number,
      maxRadius: number,
      alpha: number
    ) => {
      ctx.save();
      ctx.translate(centerX, centerY);

      // Expanding energy rings
      for (let i = 0; i < 4; i++) {
        const phase = (t * 0.3 + i * 0.5) % 3;
        const progress = phase / 3;
        const radius = maxRadius * progress;
        const ringAlpha = (1 - progress) * 0.12 * alpha;

        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(47, 70%, 55%, ${ringAlpha})`;
        ctx.lineWidth = 2 * (1 - progress);
        ctx.stroke();
      }

      // Contracting rings (inward pulse)
      for (let i = 0; i < 2; i++) {
        const phase = (t * 0.2 + i * 1) % 2;
        const progress = phase / 2;
        const radius = maxRadius * (1 - progress);
        const ringAlpha = progress * 0.08 * alpha;

        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(160, 70%, 50%, ${ringAlpha})`;
        ctx.lineWidth = 1.5 * progress;
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawRebirthCycle = (
      centerX: number,
      centerY: number,
      size: number,
      alpha: number
    ) => {
      ctx.save();
      ctx.translate(centerX, centerY);

      // Three orbiting phoenix eggs (seeds of rebirth)
      const eggCount = 3;
      for (let i = 0; i < eggCount; i++) {
        const orbitAngle = t * 0.15 + (Math.PI * 2 / eggCount) * i;
        const orbitR = size * 1.3;
        const eggX = Math.cos(orbitAngle) * orbitR;
        const eggY = Math.sin(orbitAngle) * orbitR;
        const eggPulse = (Math.sin(t * 0.5 + i * 2) + 1) / 2;

        // Egg glow
        const eggGlow = ctx.createRadialGradient(eggX, eggY, 0, eggX, eggY, 12 + eggPulse * 6);
        eggGlow.addColorStop(0, `hsla(47, 80%, 65%, ${alpha * 0.2 * eggPulse})`);
        eggGlow.addColorStop(0.5, `hsla(30, 70%, 50%, ${alpha * 0.08 * eggPulse})`);
        eggGlow.addColorStop(1, 'transparent');
        ctx.fillStyle = eggGlow;
        ctx.beginPath();
        ctx.arc(eggX, eggY, 12 + eggPulse * 6, 0, Math.PI * 2);
        ctx.fill();

        // Egg core
        ctx.beginPath();
        ctx.arc(eggX, eggY, 3 + eggPulse * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(47, 80%, 70%, ${alpha * (0.3 + eggPulse * 0.2)})`;
        ctx.fill();

        // Orbit trail
        const trailLen = 0.3;
        ctx.beginPath();
        ctx.arc(0, 0, orbitR, orbitAngle - trailLen, orbitAngle);
        ctx.strokeStyle = `hsla(47, 70%, 55%, ${alpha * 0.06})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      const parallaxX = mouseInfluence.x * 10;
      const parallaxY = mouseInfluence.y * 10;
      const sigilCX = cx + parallaxX * 0.3;
      const sigilCY = cy + parallaxY * 0.3;

      // Background atmospheric glow
      const bgGrad = ctx.createRadialGradient(sigilCX, sigilCY, 0, sigilCX, sigilCY, Math.max(w, h) * 0.5);
      bgGrad.addColorStop(0, 'rgba(212, 168, 67, 0.04)');
      bgGrad.addColorStop(0.2, 'rgba(16, 185, 129, 0.02)');
      bgGrad.addColorStop(0.5, 'rgba(10, 61, 46, 0.02)');
      bgGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Large ambient glow behind sigil
      const ambientPulse = (Math.sin(t * 0.3) + 1) / 2;
      const ambientGrad = ctx.createRadialGradient(sigilCX, sigilCY, 0, sigilCX, sigilCY, 250 + ambientPulse * 50);
      ambientGrad.addColorStop(0, `rgba(212, 168, 67, ${0.06 + ambientPulse * 0.03})`);
      ambientGrad.addColorStop(0.4, `rgba(16, 185, 129, ${0.03 + ambientPulse * 0.02})`);
      ambientGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = ambientGrad;
      ctx.fillRect(0, 0, w, h);

      const sigilSize = Math.min(w, h) * 0.15;

      // Energy rings
      drawEnergyRings(sigilCX, sigilCY, 200, 0.8);

      // Rebirth cycle orbiting eggs
      drawRebirthCycle(sigilCX, sigilCY, sigilSize, 0.6);

      // Flame tongues
      drawFlames(sigilCX, sigilCY, sigilSize, t * 0.02, 0.6);

      // Phoenix body
      drawPhoenixBody(sigilCX, sigilCY, sigilSize, t * 0.015, 0.5);

      // Spawn embers from flame tips
      if (Math.random() < 0.3) {
        const flameIdx = Math.floor(Math.random() * flameTongues.length);
        const flame = flameTongues[flameIdx];
        const emberAngle = flame.angle + t * 0.02;
        const emberR = sigilSize * 0.85 + flame.length * 0.8;
        spawnEmber(
          sigilCX + Math.cos(emberAngle) * emberR,
          sigilCY + Math.sin(emberAngle) * emberR,
          0.6
        );
      }

      // Spawn embers from center occasionally
      if (Math.random() < 0.05) {
        spawnEmber(sigilCX, sigilCY, 1.2);
      }

      // Update and draw embers
      for (let i = embers.length - 1; i >= 0; i--) {
        const e = embers[i];
        e.life++;
        e.x += e.vx + Math.sin(t * 2 + e.life * 0.05) * 0.3;
        e.y += e.vy;
        e.vy -= 0.005;
        e.vx *= 0.995;

        const lifeRatio = e.life / e.maxLife;
        const fadeAlpha = lifeRatio < 0.1 ? lifeRatio * 10 : (1 - lifeRatio);

        if (e.life >= e.maxLife) {
          embers.splice(i, 1);
          continue;
        }

        // Ember core
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size * (1 - lifeRatio * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${e.hue}, 80%, ${50 + e.brightness * 20}%, ${fadeAlpha * e.brightness * 0.6})`;
        ctx.fill();

        // Ember glow
        if (e.size > 1.5) {
          const emberGlow = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.size * 5);
          emberGlow.addColorStop(0, `hsla(${e.hue}, 80%, 60%, ${fadeAlpha * 0.15})`);
          emberGlow.addColorStop(1, 'transparent');
          ctx.fillStyle = emberGlow;
          ctx.fillRect(e.x - e.size * 5, e.y - e.size * 5, e.size * 10, e.size * 10);
        }

        // Ember trail
        if (e.size > 1 && lifeRatio < 0.7) {
          ctx.beginPath();
          ctx.moveTo(e.x, e.y);
          ctx.lineTo(e.x - e.vx * 3, e.y - e.vy * 3);
          ctx.strokeStyle = `hsla(${e.hue}, 70%, 55%, ${fadeAlpha * 0.2})`;
          ctx.lineWidth = e.size * 0.5;
          ctx.stroke();
        }
      }

      // Vignette overlay
      const vignetteGrad = ctx.createRadialGradient(cx, cy, Math.min(w, h) * 0.3, cx, cy, Math.max(w, h) * 0.7);
      vignetteGrad.addColorStop(0, 'transparent');
      vignetteGrad.addColorStop(1, 'rgba(5, 10, 8, 0.4)');
      ctx.fillStyle = vignetteGrad;
      ctx.fillRect(0, 0, w, h);

      t += 0.008;
      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isVisible) {
      cancelAnimationFrame(animRef.current);
    }
  }, [isVisible]);

  return (
    <motion.canvas
      ref={canvasRef}
      className={`absolute inset-0 z-0 pointer-events-none ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2.5, ease: 'easeOut' }}
      style={{ width: '100%', height: '100%' }}
    />
  );
}
