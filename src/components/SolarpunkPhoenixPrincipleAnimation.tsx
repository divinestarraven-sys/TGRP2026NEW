import { useEffect, useRef } from 'react';

type Props = {
  className?: string;
};

type Particle = {
  x: number;
  y: number;
  radius: number;
  speed: number;
  angle: number;
  orbit: number;
  hue: number;
  alpha: number;
  drift: number;
};

type Ember = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  radius: number;
  hue: number;
};

export default function SolarpunkPhoenixPrincipleAnimation({ className = '' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const ctx = context;
    const dpr = window.devicePixelRatio || 1;

    let width = 0;
    let height = 0;
    let time = 0;
    let mouse = { x: 0, y: 0, active: false };

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      width = rect?.width || window.innerWidth;
      height = rect?.height || 620;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      mouse.x = width / 2;
      mouse.y = height / 2;
    };

    resize();

    const particles: Particle[] = Array.from({ length: 120 }, (_, index) => ({
      x: width / 2,
      y: height / 2,
      radius: Math.random() * 1.8 + 0.4,
      speed: Math.random() * 0.008 + 0.002,
      angle: (index / 120) * Math.PI * 2 + Math.random() * 0.4,
      orbit: Math.random() * 220 + 40,
      hue: Math.random() > 0.55 ? 45 : Math.random() > 0.25 ? 145 : 28,
      alpha: Math.random() * 0.45 + 0.15,
      drift: Math.random() * 0.6 + 0.2,
    }));

    const embers: Ember[] = [];

    const spawnEmber = () => {
      if (embers.length > 90) return;

      const centerX = width / 2;
      const centerY = height * 0.54;
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.2;
      const speed = Math.random() * 1.2 + 0.4;

      embers.push({
        x: centerX + (Math.random() - 0.5) * 90,
        y: centerY + Math.random() * 70,
        vx: Math.cos(angle) * speed * 0.35,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: Math.random() * 90 + 70,
        radius: Math.random() * 2.2 + 0.8,
        hue: Math.random() > 0.45 ? 42 : 26,
      });
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('resize', resize);
    canvas.parentElement?.addEventListener('mousemove', handleMouseMove);
    canvas.parentElement?.addEventListener('mouseleave', handleMouseLeave);

    const drawSacredCircle = (
      x: number,
      y: number,
      radius: number,
      alpha: number,
      hue = 45,
      lineWidth = 1
    ) => {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.strokeStyle = `hsla(${hue}, 72%, 62%, ${alpha})`;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    };

    const drawWing = (
      centerX: number,
      centerY: number,
      side: -1 | 1,
      pulse: number
    ) => {
      const featherCount = 11;

      for (let i = 0; i < featherCount; i += 1) {
        const ratio = i / (featherCount - 1);
        const spread = 70 + ratio * 220;
        const lift = Math.sin(ratio * Math.PI) * 90 + ratio * 70;
        const curve = 30 + Math.sin(time * 0.018 + i * 0.45) * 9;

        const startX = centerX + side * 24;
        const startY = centerY - 16 + ratio * 7;
        const cpX = centerX + side * (spread * 0.48);
        const cpY = centerY - lift - curve;
        const endX = centerX + side * spread;
        const endY = centerY - lift * 0.42 + ratio * 88;

        const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
        gradient.addColorStop(0, `hsla(46, 86%, 72%, ${0.48 + pulse * 0.16})`);
        gradient.addColorStop(0.48, `hsla(142, 74%, 58%, ${0.20 + pulse * 0.12})`);
        gradient.addColorStop(1, `hsla(38, 96%, 54%, ${0.08 + pulse * 0.1})`);

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.quadraticCurveTo(cpX, cpY, endX, endY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.6 + (1 - ratio) * 1.2;
        ctx.shadowBlur = 16;
        ctx.shadowColor = `hsla(46, 90%, 62%, ${0.25 + pulse * 0.25})`;
        ctx.stroke();
        ctx.shadowBlur = 0;

        const veinX = centerX + side * (spread * 0.7);
        const veinY = centerY - lift * 0.48 + ratio * 52;

        ctx.beginPath();
        ctx.arc(veinX, veinY, 1.4 + pulse * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${i % 2 === 0 ? 45 : 145}, 85%, 68%, ${0.34 + pulse * 0.22})`;
        ctx.fill();
      }
    };

    const drawVines = (centerX: number, centerY: number, pulse: number) => {
      for (const side of [-1, 1] as const) {
        ctx.beginPath();
        ctx.moveTo(centerX + side * 18, centerY + 120);

        for (let i = 0; i <= 9; i += 1) {
          const y = centerY + 120 - i * 28;
          const x =
            centerX +
            side * (24 + i * 13 + Math.sin(time * 0.02 + i) * 8);

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }

          if (i % 2 === 0) {
            ctx.beginPath();
            ctx.ellipse(
              x + side * 9,
              y - 5,
              6 + pulse * 1.5,
              2.8,
              side * 0.65,
              0,
              Math.PI * 2
            );
            ctx.fillStyle = `hsla(145, 74%, 52%, ${0.16 + pulse * 0.12})`;
            ctx.fill();
          }
        }

        ctx.beginPath();
        ctx.moveTo(centerX + side * 20, centerY + 122);

        for (let i = 0; i <= 10; i += 1) {
          const y = centerY + 122 - i * 28;
          const x =
            centerX +
            side * (20 + i * 15 + Math.sin(time * 0.018 + i * 0.9) * 10);

          ctx.lineTo(x, y);
        }

        ctx.strokeStyle = `hsla(145, 70%, 48%, ${0.22 + pulse * 0.14})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    };

    const animate = () => {
      time += 1;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height * 0.54;
      const pulse = (Math.sin(time * 0.025) + 1) / 2;
      const slowPulse = (Math.sin(time * 0.009) + 1) / 2;

      const bg = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        Math.max(width, height) * 0.72
      );
      bg.addColorStop(0, 'rgba(214, 178, 94, 0.11)');
      bg.addColorStop(0.22, 'rgba(63, 175, 90, 0.08)');
      bg.addColorStop(0.55, 'rgba(15, 46, 43, 0.14)');
      bg.addColorStop(1, 'rgba(5, 10, 8, 0.02)');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      const proximity = mouse.active
        ? Math.max(
            0,
            1 -
              Math.hypot(mouse.x - centerX, mouse.y - centerY) /
                Math.max(width * 0.45, 240)
          )
        : 0;

      drawSacredCircle(centerX, centerY, 66 + slowPulse * 6, 0.18 + proximity * 0.1, 45, 1.1);
      drawSacredCircle(centerX, centerY, 122 + slowPulse * 10, 0.12 + proximity * 0.08, 145, 0.9);
      drawSacredCircle(centerX, centerY, 190 + slowPulse * 16, 0.08 + proximity * 0.06, 45, 0.8);

      for (let i = 0; i < 12; i += 1) {
        const angle = (i / 12) * Math.PI * 2 + time * 0.002;
        const inner = 88;
        const outer = 178 + Math.sin(time * 0.012 + i) * 6;

        ctx.beginPath();
        ctx.moveTo(centerX + Math.cos(angle) * inner, centerY + Math.sin(angle) * inner);
        ctx.lineTo(centerX + Math.cos(angle) * outer, centerY + Math.sin(angle) * outer);
        ctx.strokeStyle = `hsla(${i % 2 === 0 ? 45 : 145}, 78%, 62%, ${0.07 + pulse * 0.05})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      drawWing(centerX, centerY, -1, pulse + proximity * 0.5);
      drawWing(centerX, centerY, 1, pulse + proximity * 0.5);

      const bodyGradient = ctx.createLinearGradient(centerX, centerY - 90, centerX, centerY + 130);
      bodyGradient.addColorStop(0, `hsla(45, 92%, 72%, ${0.72 + pulse * 0.2})`);
      bodyGradient.addColorStop(0.45, `hsla(28, 94%, 55%, ${0.58 + pulse * 0.18})`);
      bodyGradient.addColorStop(1, `hsla(145, 70%, 48%, ${0.28 + pulse * 0.1})`);

      ctx.beginPath();
      ctx.moveTo(centerX, centerY - 118);
      ctx.bezierCurveTo(centerX - 38, centerY - 32, centerX - 24, centerY + 72, centerX, centerY + 132);
      ctx.bezierCurveTo(centerX + 24, centerY + 72, centerX + 38, centerY - 32, centerX, centerY - 118);
      ctx.fillStyle = bodyGradient;
      ctx.shadowBlur = 28;
      ctx.shadowColor = `hsla(42, 95%, 58%, ${0.26 + pulse * 0.18})`;
      ctx.fill();
      ctx.shadowBlur = 0;

      const coreRadius = 23 + pulse * 5 + proximity * 7;
      const coreGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreRadius * 4);
      coreGradient.addColorStop(0, `hsla(48, 100%, 82%, ${0.92})`);
      coreGradient.addColorStop(0.22, `hsla(42, 94%, 58%, ${0.52 + pulse * 0.22})`);
      coreGradient.addColorStop(0.52, `hsla(145, 74%, 48%, ${0.18 + pulse * 0.14})`);
      coreGradient.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.arc(centerX, centerY, coreRadius * 4, 0, Math.PI * 2);
      ctx.fillStyle = coreGradient;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(centerX, centerY, coreRadius, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(45, 100%, 78%, ${0.78 + pulse * 0.2})`;
      ctx.fill();

      drawVines(centerX, centerY, pulse);

      for (const p of particles) {
        p.angle += p.speed;

        const orbitPulse = Math.sin(time * 0.01 + p.drift * 10) * 16;
        const x =
          centerX +
          Math.cos(p.angle) * (p.orbit + orbitPulse) * (width < 720 ? 0.64 : 1);
        const y =
          centerY +
          Math.sin(p.angle * 0.82) * (p.orbit * 0.42 + orbitPulse * 0.4);

        ctx.beginPath();
        ctx.arc(x, y, p.radius * (0.8 + pulse * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 82%, 68%, ${p.alpha * (0.7 + slowPulse * 0.4)})`;
        ctx.fill();
      }

      if (Math.random() < 0.75) spawnEmber();

      for (let i = embers.length - 1; i >= 0; i -= 1) {
        const ember = embers[i];
        ember.life += 1;
        ember.x += ember.vx + Math.sin(time * 0.018 + ember.life * 0.08) * 0.24;
        ember.y += ember.vy;
        ember.vy -= 0.003;

        if (ember.life >= ember.maxLife) {
          embers.splice(i, 1);
          continue;
        }

        const age = ember.life / ember.maxLife;
        const alpha = age < 0.18 ? age / 0.18 : 1 - age;

        ctx.beginPath();
        ctx.arc(ember.x, ember.y, ember.radius * (1 - age * 0.3), 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${ember.hue}, 95%, 66%, ${alpha * 0.55})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = `hsla(${ember.hue}, 95%, 60%, ${alpha * 0.5})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      const vignette = ctx.createRadialGradient(
        centerX,
        centerY,
        Math.min(width, height) * 0.12,
        centerX,
        centerY,
        Math.max(width, height) * 0.7
      );
      vignette.addColorStop(0, 'transparent');
      vignette.addColorStop(1, 'rgba(3, 8, 6, 0.48)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      frameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', resize);
      canvas.parentElement?.removeEventListener('mousemove', handleMouseMove);
      canvas.parentElement?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
    />
  );
}
