import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Props {
  className?: string;
}

export default function SacredGeometryHero({ className = '' }: Props) {
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
      ctx.scale(dpr, dpr);
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

    // Particle system for ambient glow
    interface GlowParticle {
      angle: number;
      radius: number;
      speed: number;
      size: number;
      opacity: number;
      hue: number;
      drift: number;
    }

    const glowParticles: GlowParticle[] = Array.from({ length: 80 }, () => ({
      angle: Math.random() * Math.PI * 2,
      radius: Math.random() * 300 + 50,
      speed: (Math.random() - 0.5) * 0.003,
      size: Math.random() * 2.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
      hue: Math.random() > 0.6 ? 47 : (Math.random() > 0.5 ? 180 : 160),
      drift: Math.random() * 0.5 + 0.2,
    }));

    const drawFlowerOfLife = (
      centerX: number,
      centerY: number,
      baseRadius: number,
      rotation: number,
      alpha: number,
      color: string,
      lineWidth: number
    ) => {
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotation);
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;

      const r = baseRadius;

      // Center circle
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.stroke();

      // First ring - 6 circles
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        ctx.beginPath();
        ctx.arc(Math.cos(angle) * r, Math.sin(angle) * r, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Second ring - 6 circles offset
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i + Math.PI / 6;
        ctx.beginPath();
        ctx.arc(Math.cos(angle) * r * 1.73, Math.sin(angle) * r * 1.73, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Outer ring - 12 circles
      for (let i = 0; i < 12; i++) {
        const angle = (Math.PI / 6) * i;
        ctx.beginPath();
        ctx.arc(Math.cos(angle) * r * 2, Math.sin(angle) * r * 2, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Enclosing circle
      ctx.beginPath();
      ctx.arc(0, 0, r * 3, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();
    };

    const drawMetatronsCube = (
      centerX: number,
      centerY: number,
      size: number,
      rotation: number,
      alpha: number,
      color: string,
      lineWidth: number
    ) => {
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotation);
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;

      const nodes: { x: number; y: number }[] = [{ x: 0, y: 0 }];

      // Inner ring
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        nodes.push({ x: Math.cos(angle) * size, y: Math.sin(angle) * size });
      }

      // Outer ring
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i + Math.PI / 6;
        nodes.push({ x: Math.cos(angle) * size * 1.73, y: Math.sin(angle) * size * 1.73 });
      }

      // Draw all connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }

      // Draw nodes
      for (const node of nodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      }

      ctx.restore();
    };

    const drawSriYantra = (
      centerX: number,
      centerY: number,
      size: number,
      rotation: number,
      alpha: number,
      color: string,
      lineWidth: number
    ) => {
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotation);
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;

      // Concentric triangles pointing up and down
      for (let i = 0; i < 4; i++) {
        const s = size * (1 - i * 0.2);
        const offset = i * 0.05;

        // Upward triangle
        ctx.beginPath();
        ctx.moveTo(0, -s);
        ctx.lineTo(s * 0.866 + offset, s * 0.5);
        ctx.lineTo(-s * 0.866 - offset, s * 0.5);
        ctx.closePath();
        ctx.stroke();

        // Downward triangle
        ctx.beginPath();
        ctx.moveTo(0, s);
        ctx.lineTo(s * 0.866 + offset, -s * 0.5);
        ctx.lineTo(-s * 0.866 - offset, -s * 0.5);
        ctx.closePath();
        ctx.stroke();
      }

      // Central bindu point
      ctx.beginPath();
      ctx.arc(0, 0, 3, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();

      ctx.restore();
    };

    const drawGoldenSpiral = (
      centerX: number,
      centerY: number,
      maxRadius: number,
      rotation: number,
      alpha: number,
      color: string,
      lineWidth: number
    ) => {
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotation);
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;

      const phi = (1 + Math.sqrt(5)) / 2;
      const growthFactor = Math.log(phi) / (Math.PI / 2);

      ctx.beginPath();
      let firstPoint = true;
      for (let theta = 0; theta < Math.PI * 6; theta += 0.05) {
        const r = maxRadius * 0.05 * Math.exp(growthFactor * theta);
        if (r > maxRadius) break;
        const x = r * Math.cos(theta);
        const y = r * Math.sin(theta);
        if (firstPoint) {
          ctx.moveTo(x, y);
          firstPoint = false;
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      ctx.restore();
    };

    const drawVesicaPiscis = (
      centerX: number,
      centerY: number,
      size: number,
      rotation: number,
      alpha: number,
      color: string,
      lineWidth: number
    ) => {
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotation);
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;

      // Two overlapping circles
      ctx.beginPath();
      ctx.arc(-size * 0.3, 0, size, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(size * 0.3, 0, size, 0, Math.PI * 2);
      ctx.stroke();

      // Highlight the vesica piscis (almond shape)
      ctx.beginPath();
      ctx.globalAlpha = alpha * 0.3;
      const startAngle = Math.acos(0.3 * size / size);
      ctx.arc(-size * 0.3, 0, size, -startAngle, startAngle);
      ctx.arc(size * 0.3, 0, size, Math.PI - startAngle, Math.PI + startAngle);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();

      ctx.restore();
    };

    const drawPulsingRings = (
      centerX: number,
      centerY: number,
      maxRadius: number,
      alpha: number,
      color: string
    ) => {
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.globalAlpha = alpha;

      for (let i = 0; i < 5; i++) {
        const phase = (t * 0.5 + i * 0.4) % 2;
        const progress = phase / 2;
        const radius = maxRadius * progress;
        const ringAlpha = (1 - progress) * 0.3;

        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.strokeStyle = color;
        ctx.globalAlpha = alpha * ringAlpha;
        ctx.lineWidth = 1.5 * (1 - progress);
        ctx.stroke();
      }

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      const parallaxX = mouseInfluence.x * 15;
      const parallaxY = mouseInfluence.y * 15;

      // Background radial glow
      const bgGrad = ctx.createRadialGradient(
        cx + parallaxX * 0.5, cy + parallaxY * 0.5, 0,
        cx + parallaxX * 0.5, cy + parallaxY * 0.5, Math.max(w, h) * 0.6
      );
      bgGrad.addColorStop(0, 'rgba(16, 185, 129, 0.06)');
      bgGrad.addColorStop(0.3, 'rgba(10, 61, 46, 0.03)');
      bgGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Pulsing rings emanating from center
      drawPulsingRings(
        cx + parallaxX * 0.3, cy + parallaxY * 0.3,
        Math.min(w, h) * 0.45,
        0.6,
        'rgba(16, 185, 129, 0.8)'
      );

      // Layer 1: Vesica Piscis - slow rotation, large, faint
      drawVesicaPiscis(
        cx + parallaxX * 0.2, cy + parallaxY * 0.2,
        Math.min(w, h) * 0.18,
        t * 0.05,
        0.04 + Math.sin(t * 0.3) * 0.02,
        'rgba(212, 168, 67, 0.8)',
        0.6
      );

      // Layer 2: Golden Spiral - medium rotation
      drawGoldenSpiral(
        cx + parallaxX * 0.3, cy + parallaxY * 0.3,
        Math.min(w, h) * 0.35,
        t * 0.08,
        0.06 + Math.sin(t * 0.5 + 1) * 0.03,
        'rgba(34, 211, 238, 0.8)',
        0.7
      );

      // Layer 3: Flower of Life - main pattern, slow rotation
      drawFlowerOfLife(
        cx + parallaxX * 0.4, cy + parallaxY * 0.4,
        Math.min(w, h) * 0.06,
        t * 0.03,
        0.08 + Math.sin(t * 0.4) * 0.03,
        'rgba(16, 185, 129, 0.8)',
        0.8
      );

      // Layer 4: Metatron's Cube - counter-rotation
      drawMetatronsCube(
        cx + parallaxX * 0.5, cy + parallaxY * 0.5,
        Math.min(w, h) * 0.12,
        -t * 0.06,
        0.05 + Math.sin(t * 0.6 + 2) * 0.02,
        'rgba(212, 168, 67, 0.8)',
        0.5
      );

      // Layer 5: Sri Yantra - very slow, deep layer
      drawSriYantra(
        cx + parallaxX * 0.15, cy + parallaxY * 0.15,
        Math.min(w, h) * 0.15,
        t * 0.02,
        0.04 + Math.sin(t * 0.35 + 3) * 0.02,
        'rgba(34, 211, 238, 0.8)',
        0.5
      );

      // Layer 6: Second Flower of Life - larger, fainter, different speed
      drawFlowerOfLife(
        cx + parallaxX * 0.1, cy + parallaxY * 0.1,
        Math.min(w, h) * 0.1,
        -t * 0.015,
        0.03 + Math.sin(t * 0.25 + 4) * 0.015,
        'rgba(110, 231, 183, 0.6)',
        0.4
      );

      // Ambient glow particles
      for (const p of glowParticles) {
        p.angle += p.speed;
        const wobbleX = Math.sin(t * p.drift + p.angle * 3) * 20;
        const wobbleY = Math.cos(t * p.drift + p.angle * 2) * 15;
        const px = cx + Math.cos(p.angle) * p.radius + wobbleX + parallaxX * (p.radius / 300);
        const py = cy + Math.sin(p.angle) * p.radius + wobbleY + parallaxY * (p.radius / 300);

        const pulse = (Math.sin(t * 0.8 + p.angle) + 1) / 2;
        const particleAlpha = p.opacity * (0.5 + pulse * 0.5);

        ctx.beginPath();
        ctx.arc(px, py, p.size * (0.8 + pulse * 0.4), 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 70%, 60%, ${particleAlpha})`;
        ctx.fill();

        // Soft glow around each particle
        if (p.size > 1.5) {
          const glowGrad = ctx.createRadialGradient(px, py, 0, px, py, p.size * 4);
          glowGrad.addColorStop(0, `hsla(${p.hue}, 70%, 60%, ${particleAlpha * 0.3})`);
          glowGrad.addColorStop(1, 'transparent');
          ctx.fillStyle = glowGrad;
          ctx.fillRect(px - p.size * 4, py - p.size * 4, p.size * 8, p.size * 8);
        }
      }

      // Central bindu glow - pulsing
      const binduPulse = (Math.sin(t * 0.7) + 1) / 2;
      const binduSize = 4 + binduPulse * 3;
      const binduGrad = ctx.createRadialGradient(
        cx + parallaxX * 0.4, cy + parallaxY * 0.4, 0,
        cx + parallaxX * 0.4, cy + parallaxY * 0.4, binduSize * 15
      );
      binduGrad.addColorStop(0, `rgba(212, 168, 67, ${0.15 + binduPulse * 0.1})`);
      binduGrad.addColorStop(0.3, `rgba(16, 185, 129, ${0.05 + binduPulse * 0.05})`);
      binduGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = binduGrad;
      ctx.fillRect(0, 0, w, h);

      // Central bright point
      ctx.beginPath();
      ctx.arc(cx + parallaxX * 0.4, cy + parallaxY * 0.4, binduSize, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(240, 215, 140, ${0.3 + binduPulse * 0.2})`;
      ctx.fill();

      t += 0.008;
      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Visibility observer
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

  // Pause animation when not visible
  useEffect(() => {
    if (!isVisible) {
      cancelAnimationFrame(animRef.current);
    }
  }, [isVisible]);

  return (
    <motion.canvas
      ref={canvasRef}
      className={`fixed inset-0 z-0 pointer-events-none ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, ease: 'easeOut' }}
      style={{ width: '100%', height: '100%' }}
    />
  );
}
