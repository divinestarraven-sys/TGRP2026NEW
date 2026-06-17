import { useEffect, useRef } from 'react';

interface Props {
  className?: string;
  nodeCount?: number;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  connections: number[];
  pulse: number;
}

export default function MyceliumNetwork({ className = '', nodeCount = 30 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const nodesRef = useRef<Node[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };
    resize();

    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    const nodes: Node[] = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      connections: [],
      pulse: Math.random() * Math.PI * 2,
    }));

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        if (Math.sqrt(dx * dx + dy * dy) < 150 && Math.random() > 0.5) {
          nodes[i].connections.push(j);
          nodes[j].connections.push(i);
        }
      }
    }
    nodesRef.current = nodes;

    let t = 0;
    const animate = () => {
      const cw = canvas.offsetWidth;
      const ch = canvas.offsetHeight;
      ctx.clearRect(0, 0, cw, ch);

      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > cw) node.vx *= -1;
        if (node.y < 0 || node.y > ch) node.vy *= -1;
        node.pulse += 0.02;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (const j of nodes[i].connections) {
          if (j <= i) continue;
          const pulse = (Math.sin(t + nodes[i].pulse) + 1) / 2;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `hsla(160, 60%, 40%, ${0.06 + pulse * 0.08})`;
          ctx.lineWidth = 0.5 + pulse * 0.5;
          ctx.stroke();

          const midX = (nodes[i].x + nodes[j].x) / 2;
          const midY = (nodes[i].y + nodes[j].y) / 2;
          const dotSize = 1 + pulse * 1.5;
          ctx.beginPath();
          ctx.arc(midX, midY, dotSize, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(47, 70%, 55%, ${0.2 + pulse * 0.3})`;
          ctx.fill();
        }
      }

      for (const node of nodes) {
        const pulse = (Math.sin(t + node.pulse) + 1) / 2;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.5 + pulse, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(160, 70%, 50%, ${0.15 + pulse * 0.2})`;
        ctx.fill();
      }

      t += 0.01;
      animRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animRef.current);
  }, [nodeCount]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full pointer-events-none ${className}`}
    />
  );
}
