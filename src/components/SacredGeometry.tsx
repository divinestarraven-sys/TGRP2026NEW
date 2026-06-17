import { useEffect, useRef } from 'react';

interface Props {
  size?: number;
  className?: string;
  opacity?: number;
  animated?: boolean;
}

export default function SacredGeometry({ size = 300, className = '', opacity = 0.15, animated = true }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    let rotation = 0;

    const drawFlowerOfLife = (rot: number) => {
      ctx.clearRect(0, 0, size, size);
      const r = size * 0.15;

      const drawCircle = (x: number, y: number) => {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(160, 70%, 50%, ${opacity})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      };

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);

      drawCircle(0, 0);

      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        drawCircle(Math.cos(angle) * r, Math.sin(angle) * r);
      }

      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i + Math.PI / 6;
        drawCircle(Math.cos(angle) * r * 1.73, Math.sin(angle) * r * 1.73);
      }

      for (let i = 0; i < 12; i++) {
        const angle = (Math.PI / 6) * i;
        drawCircle(Math.cos(angle) * r * 2, Math.sin(angle) * r * 2);
      }

      ctx.beginPath();
      ctx.arc(0, 0, r * 3, 0, Math.PI * 2);
      ctx.strokeStyle = `hsla(47, 70%, 55%, ${opacity * 0.5})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();

      ctx.restore();
    };

    if (animated) {
      const animate = () => {
        rotation += 0.001;
        drawFlowerOfLife(rotation);
        animRef.current = requestAnimationFrame(animate);
      };
      animate();
    } else {
      drawFlowerOfLife(0);
    }

    return () => cancelAnimationFrame(animRef.current);
  }, [size, opacity, animated]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: size, height: size }}
    />
  );
}
