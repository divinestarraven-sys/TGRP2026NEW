import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Props {
  className?: string;
  starCount?: number;
  meteoriteInterval?: number;
  cometInterval?: number;
}

interface Star {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  hue: number;
  depth: number;
}

interface Meteorite {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  trail: { x: number; y: number; alpha: number }[];
  hue: number;
  brightness: number;
}

interface Comet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  tailSegments: { x: number; y: number; alpha: number; width: number }[];
  hue: number;
  innerHue: number;
  brightness: number;
  wobblePhase: number;
  wobbleAmp: number;
}

export default function Starfield({
  className = '',
  starCount = 200,
  meteoriteInterval = 4000,
  cometInterval = 12000,
}: Props) {
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

    // --- Stars ---
    const stars: Star[] = Array.from({ length: starCount }, () => {
      const depth = Math.random();
      const hueRoll = Math.random();
      let hue: number;
      if (hueRoll < 0.5) hue = 0; // white
      else if (hueRoll < 0.65) hue = 45 + Math.random() * 15; // warm gold
      else if (hueRoll < 0.8) hue = 160 + Math.random() * 20; // teal
      else if (hueRoll < 0.9) hue = 140 + Math.random() * 15; // green
      else hue = 200 + Math.random() * 20; // blue

      return {
        x: Math.random() * w,
        y: Math.random() * h,
        size: (Math.random() * 1.8 + 0.3) * (0.3 + depth * 0.7),
        baseAlpha: (Math.random() * 0.5 + 0.2) * (0.2 + depth * 0.8),
        twinkleSpeed: Math.random() * 0.04 + 0.008,
        twinklePhase: Math.random() * Math.PI * 2,
        hue,
        depth,
      };
    });

    // --- Meteorites ---
    const meteorites: Meteorite[] = [];

    const spawnMeteorite = () => {
      const angle = (Math.random() * 30 + 20) * (Math.PI / 180); // 20-50 deg from horizontal
      const speed = Math.random() * 6 + 4;
      const fromRight = Math.random() > 0.3;
      const hueRoll = Math.random();
      let hue: number;
      if (hueRoll < 0.4) hue = 40 + Math.random() * 15; // amber
      else if (hueRoll < 0.7) hue = 25 + Math.random() * 15; // copper
      else hue = 160 + Math.random() * 20; // teal

      meteorites.push({
        x: fromRight ? w + 20 : Math.random() * w * 0.6,
        y: fromRight ? Math.random() * h * 0.4 : -20,
        vx: fromRight ? -Math.cos(angle) * speed : Math.cos(angle) * speed * 0.5,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 2 + 1.5,
        life: 0,
        maxLife: Math.random() * 60 + 40,
        trail: [],
        hue,
        brightness: Math.random() * 0.4 + 0.6,
      });
    };

    // --- Comets ---
    const comets: Comet[] = [];

    const spawnComet = () => {
      const angle = (Math.random() * 25 + 15) * (Math.PI / 180);
      const speed = Math.random() * 2.5 + 1.5;
      const fromRight = Math.random() > 0.4;
      const hueRoll = Math.random();
      let hue: number;
      let innerHue: number;
      if (hueRoll < 0.35) {
        hue = 140 + Math.random() * 20; // green
        innerHue = 160 + Math.random() * 20; // teal core
      } else if (hueRoll < 0.65) {
        hue = 40 + Math.random() * 15; // amber
        innerHue = 50 + Math.random() * 10; // gold core
      } else {
        hue = 190 + Math.random() * 20; // cyan
        innerHue = 170 + Math.random() * 15; // teal core
      }

      comets.push({
        x: fromRight ? w + 40 : Math.random() * w * 0.5,
        y: fromRight ? Math.random() * h * 0.3 : -40,
        vx: fromRight ? -Math.cos(angle) * speed : Math.cos(angle) * speed * 0.4,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 3 + 3,
        life: 0,
        maxLife: Math.random() * 200 + 150,
        tailSegments: [],
        hue,
        innerHue,
        brightness: Math.random() * 0.3 + 0.7,
        wobblePhase: Math.random() * Math.PI * 2,
        wobbleAmp: Math.random() * 0.3 + 0.1,
      });
    };

    // Timers for spawning
    let meteoriteTimer = 0;
    let cometTimer = 0;
    let nextMeteoriteAt = Math.random() * meteoriteInterval * 0.5;
    let nextCometAt = Math.random() * cometInterval * 0.5;

    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      // --- Draw stars ---
      for (const s of stars) {
        const twinkle = (Math.sin(t * s.twinkleSpeed + s.twinklePhase) + 1) / 2;
        const alpha = s.baseAlpha * (0.4 + twinkle * 0.6);

        // Subtle glow for brighter stars
        if (s.size > 1.2 && alpha > 0.3) {
          const glowSize = s.size * 3;
          const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, glowSize);
          if (s.hue === 0) {
            glow.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.15})`);
          } else {
            glow.addColorStop(0, `hsla(${s.hue}, 60%, 70%, ${alpha * 0.15})`);
          }
          glow.addColorStop(1, 'transparent');
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(s.x, s.y, glowSize, 0, Math.PI * 2);
          ctx.fill();
        }

        // Star core
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * (0.8 + twinkle * 0.2), 0, Math.PI * 2);
        if (s.hue === 0) {
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        } else {
          ctx.fillStyle = `hsla(${s.hue}, 65%, 75%, ${alpha})`;
        }
        ctx.fill();

        // Cross sparkle on bright twinkle peaks
        if (twinkle > 0.85 && s.size > 1.4) {
          const sparkleLen = s.size * 4 * twinkle;
          const sparkleAlpha = alpha * 0.25;
          ctx.strokeStyle = s.hue === 0
            ? `rgba(255, 255, 255, ${sparkleAlpha})`
            : `hsla(${s.hue}, 50%, 80%, ${sparkleAlpha})`;
          ctx.lineWidth = 0.3;
          ctx.beginPath();
          ctx.moveTo(s.x - sparkleLen, s.y);
          ctx.lineTo(s.x + sparkleLen, s.y);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(s.x, s.y - sparkleLen);
          ctx.lineTo(s.x, s.y + sparkleLen);
          ctx.stroke();
        }
      }

      // --- Spawn meteorites ---
      meteoriteTimer += 16.67;
      if (meteoriteTimer >= nextMeteoriteAt) {
        spawnMeteorite();
        meteoriteTimer = 0;
        nextMeteoriteAt = meteoriteInterval * (0.5 + Math.random());
      }

      // --- Draw meteorites ---
      for (let i = meteorites.length - 1; i >= 0; i--) {
        const m = meteorites[i];
        m.life++;
        m.x += m.vx;
        m.y += m.vy;

        // Trail
        m.trail.push({ x: m.x, y: m.y, alpha: 1 });
        if (m.trail.length > 25) m.trail.shift();
        for (const tp of m.trail) tp.alpha *= 0.88;

        const lifeRatio = m.life / m.maxLife;
        const fadeAlpha = lifeRatio < 0.1 ? lifeRatio / 0.1 : lifeRatio > 0.8 ? (1 - lifeRatio) / 0.2 : 1;
        const alpha = fadeAlpha * m.brightness;

        // Draw trail
        for (let j = 0; j < m.trail.length - 1; j++) {
          const tp = m.trail[j];
          const next = m.trail[j + 1];
          if (tp.alpha < 0.02) continue;
          const trailAlpha = tp.alpha * alpha * 0.6;
          const trailWidth = m.size * tp.alpha * 0.8;
          ctx.beginPath();
          ctx.moveTo(tp.x, tp.y);
          ctx.lineTo(next.x, next.y);
          ctx.strokeStyle = `hsla(${m.hue}, 80%, 70%, ${trailAlpha})`;
          ctx.lineWidth = trailWidth;
          ctx.lineCap = 'round';
          ctx.stroke();
        }

        // Head glow
        const headGlow = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.size * 6);
        headGlow.addColorStop(0, `hsla(${m.hue}, 90%, 85%, ${alpha * 0.5})`);
        headGlow.addColorStop(0.3, `hsla(${m.hue}, 80%, 65%, ${alpha * 0.2})`);
        headGlow.addColorStop(1, 'transparent');
        ctx.fillStyle = headGlow;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.size * 6, 0, Math.PI * 2);
        ctx.fill();

        // Bright core
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${m.hue}, 90%, 90%, ${alpha})`;
        ctx.fill();

        // Remove dead meteorites
        if (m.life >= m.maxLife || m.x < -100 || m.x > w + 100 || m.y > h + 100) {
          meteorites.splice(i, 1);
        }
      }

      // --- Spawn comets ---
      cometTimer += 16.67;
      if (cometTimer >= nextCometAt) {
        spawnComet();
        cometTimer = 0;
        nextCometAt = cometInterval * (0.6 + Math.random() * 0.8);
      }

      // --- Draw comets ---
      for (let i = comets.length - 1; i >= 0; i--) {
        const c = comets[i];
        c.life++;

        // Wobble for organic path
        const wobble = Math.sin(t * 0.02 + c.wobblePhase) * c.wobbleAmp;
        c.x += c.vx + wobble * 0.3;
        c.y += c.vy;

        // Build tail
        c.tailSegments.push({
          x: c.x,
          y: c.y,
          alpha: 1,
          width: c.size * 0.8,
        });
        if (c.tailSegments.length > 80) c.tailSegments.shift();
        for (const seg of c.tailSegments) {
          seg.alpha *= 0.975;
          seg.width *= 0.995;
        }

        const lifeRatio = c.life / c.maxLife;
        const fadeAlpha = lifeRatio < 0.08 ? lifeRatio / 0.08 : lifeRatio > 0.85 ? (1 - lifeRatio) / 0.15 : 1;
        const alpha = fadeAlpha * c.brightness;

        // Draw tail - outer diffuse glow
        for (let j = 0; j < c.tailSegments.length - 1; j++) {
          const seg = c.tailSegments[j];
          const next = c.tailSegments[j + 1];
          if (seg.alpha < 0.01) continue;

          const tailAlpha = seg.alpha * alpha * 0.15;
          const tailWidth = seg.width * 3;
          ctx.beginPath();
          ctx.moveTo(seg.x, seg.y);
          ctx.lineTo(next.x, next.y);
          ctx.strokeStyle = `hsla(${c.hue}, 50%, 55%, ${tailAlpha})`;
          ctx.lineWidth = tailWidth;
          ctx.lineCap = 'round';
          ctx.stroke();
        }

        // Draw tail - inner bright core
        for (let j = 0; j < c.tailSegments.length - 1; j++) {
          const seg = c.tailSegments[j];
          const next = c.tailSegments[j + 1];
          if (seg.alpha < 0.02) continue;

          const tailAlpha = seg.alpha * alpha * 0.5;
          const tailWidth = seg.width * 0.6;
          ctx.beginPath();
          ctx.moveTo(seg.x, seg.y);
          ctx.lineTo(next.x, next.y);
          ctx.strokeStyle = `hsla(${c.innerHue}, 80%, 75%, ${tailAlpha})`;
          ctx.lineWidth = tailWidth;
          ctx.lineCap = 'round';
          ctx.stroke();
        }

        // Comet head - large diffuse coma
        const comaSize = c.size * 8;
        const coma = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, comaSize);
        coma.addColorStop(0, `hsla(${c.innerHue}, 80%, 80%, ${alpha * 0.25})`);
        coma.addColorStop(0.2, `hsla(${c.hue}, 60%, 60%, ${alpha * 0.1})`);
        coma.addColorStop(1, 'transparent');
        ctx.fillStyle = coma;
        ctx.beginPath();
        ctx.arc(c.x, c.y, comaSize, 0, Math.PI * 2);
        ctx.fill();

        // Comet head - bright core
        const coreGlow = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.size * 3);
        coreGlow.addColorStop(0, `hsla(${c.innerHue}, 90%, 92%, ${alpha * 0.9})`);
        coreGlow.addColorStop(0.4, `hsla(${c.hue}, 80%, 70%, ${alpha * 0.4})`);
        coreGlow.addColorStop(1, 'transparent');
        ctx.fillStyle = coreGlow;
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // White-hot center
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.size * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
        ctx.fill();

        // Remove dead comets
        if (c.life >= c.maxLife || c.x < -200 || c.x > w + 200 || c.y > h + 200) {
          comets.splice(i, 1);
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
      observer.disconnect();
    };
  }, [starCount, meteoriteInterval, cometInterval]);

  useEffect(() => {
    if (!isVisible) cancelAnimationFrame(animRef.current);
  }, [isVisible]);

  return (
    <motion.canvas
      ref={canvasRef}
      className={`fixed inset-0 z-0 pointer-events-none ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 4, ease: 'easeOut' }}
      style={{ width: '100%', height: '100%' }}
    />
  );
}
