import { useEffect, useRef } from 'react';

type Props = {
  className?: string;
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
  saturation: number;
  isAsh: boolean;
};

type FlameParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
  isAsh: boolean;
  flicker: number;
};

function PhoenixPrincipleAnimatedSigil({ className = '' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let time = 0;

    const embers: Ember[] = [];
    const flames: FlameParticle[] = [];

    const resize = () => {
      const parent = canvas.parentElement;
      width = parent ? parent.clientWidth : window.innerWidth;
      height = parent ? parent.clientHeight : 680;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const spawnEmber = (cx: number, cy: number) => {
      if (embers.length > 140) return;
      const isAsh = Math.random() < 0.35;
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 2.4;
      const speed = Math.random() * 1.8 + 0.5;
      embers.push({
        x: cx + (Math.random() - 0.5) * 120,
        y: cy + Math.random() * 50 - 20,
        vx: Math.cos(angle) * speed * 0.4 + (Math.random() - 0.5) * 0.3,
        vy: Math.sin(angle) * speed - 0.4,
        life: 0,
        maxLife: isAsh ? Math.random() * 160 + 100 : Math.random() * 90 + 50,
        radius: isAsh ? Math.random() * 1.8 + 0.5 : Math.random() * 3 + 1,
        hue: isAsh ? 25 + Math.random() * 15 : (Math.random() > 0.5 ? 15 + Math.random() * 20 : 35 + Math.random() * 15),
        saturation: isAsh ? 20 + Math.random() * 30 : 85 + Math.random() * 15,
        isAsh,
      });
    };

    const spawnFlame = (cx: number, cy: number) => {
      if (flames.length > 100) return;
      const isAsh = Math.random() < 0.3;
      flames.push({
        x: cx + (Math.random() - 0.5) * 180,
        y: cy + (Math.random() - 0.5) * 160,
        vx: (Math.random() - 0.5) * 0.6,
        vy: -(Math.random() * 0.8 + 0.2),
        life: 0,
        maxLife: isAsh ? Math.random() * 200 + 120 : Math.random() * 80 + 40,
        size: isAsh ? Math.random() * 2 + 0.8 : Math.random() * 5 + 2,
        hue: isAsh ? 20 + Math.random() * 20 : (Math.random() > 0.6 ? 5 + Math.random() * 15 : 30 + Math.random() * 20),
        isAsh,
        flicker: Math.random() * Math.PI * 2,
      });
    };

    /* ── Sacred geometry helpers ── */
    const drawRing = (cx: number, cy: number, r: number, alpha: number, hue: number, lw = 1) => {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = `hsla(${hue}, 75%, 55%, ${alpha})`;
      ctx.lineWidth = lw;
      ctx.stroke();
    };

    const drawFlowerOfLife = (cx: number, cy: number, baseR: number, alpha: number) => {
      const petals = 6;
      for (let i = 0; i < petals; i++) {
        const a = (i / petals) * Math.PI * 2;
        const px = cx + Math.cos(a) * baseR;
        const py = cy + Math.sin(a) * baseR;
        ctx.beginPath();
        ctx.arc(px, py, baseR, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(35, 72%, 52%, ${alpha})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.arc(cx, cy, baseR, 0, Math.PI * 2);
      ctx.strokeStyle = `hsla(35, 72%, 52%, ${alpha})`;
      ctx.lineWidth = 0.7;
      ctx.stroke();
    };

    const drawStarPolygon = (cx: number, cy: number, r: number, points: number, alpha: number, hue: number, rotation = 0) => {
      ctx.beginPath();
      for (let i = 0; i <= points; i++) {
        const a = (i / points) * Math.PI * 2 + rotation;
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `hsla(${hue}, 76%, 56%, ${alpha})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();
    };

    const drawGeometryNode = (cx: number, cy: number, r: number, alpha: number, hue: number) => {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = `hsla(${hue}, 80%, 58%, ${alpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.45, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${hue}, 85%, 65%, ${alpha * 0.6})`;
      ctx.fill();
    };

    /* ── Head (2x larger, tilted sideways, birdlike) ── */
    const drawHead = (cx: number, cy: number, scale: number, pulse: number) => {
      const headY = cy - 80 * scale;
      const headR = 32 * scale;
      const tiltAngle = -0.35;

      ctx.save();
      ctx.translate(cx, headY);
      ctx.rotate(tiltAngle);

      // head glow
      const headGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, headR * 2.5);
      headGlow.addColorStop(0, `hsla(40, 100%, 78%, ${0.55 + pulse * 0.2})`);
      headGlow.addColorStop(0.4, `hsla(25, 95%, 55%, ${0.3 + pulse * 0.15})`);
      headGlow.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(0, 0, headR * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = headGlow;
      ctx.fill();

      // head shape - wider ellipse for birdlike profile
      ctx.beginPath();
      ctx.ellipse(0, 0, headR * 1.15, headR * 0.85, 0, 0, Math.PI * 2);
      const headFill = ctx.createRadialGradient(-4 * scale, -5 * scale, 0, 0, 0, headR);
      headFill.addColorStop(0, `hsla(48, 100%, 80%, ${0.92 + pulse * 0.08})`);
      headFill.addColorStop(0.4, `hsla(35, 96%, 62%, ${0.75})`);
      headFill.addColorStop(0.8, `hsla(18, 92%, 48%, ${0.6})`);
      headFill.addColorStop(1, `hsla(8, 88%, 35%, ${0.45})`);
      ctx.fillStyle = headFill;
      ctx.shadowBlur = 22;
      ctx.shadowColor = `hsla(30, 96%, 58%, ${0.6 + pulse * 0.2})`;
      ctx.fill();
      ctx.shadowBlur = 0;

      // feather texture lines on head
      for (let i = 0; i < 6; i++) {
        const arcAngle = -Math.PI * 0.6 + (i / 5) * Math.PI * 1.2;
        const arcR = headR * (0.5 + i * 0.08);
        ctx.beginPath();
        ctx.arc(0, 0, arcR, arcAngle - 0.3, arcAngle + 0.3);
        ctx.strokeStyle = `hsla(42, 90%, 70%, ${0.2 + pulse * 0.08})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }

      // crest feathers - taller, fiery
      for (let i = 0; i < 7; i++) {
        const cf = i / 6;
        const crX = (cf - 0.5) * headR * 2.2;
        const crY = -headR * 0.75;
        const crH = headR * (0.7 + Math.sin(cf * Math.PI) * 0.8 + Math.sin(time * 0.04 + i * 0.7) * 0.2);
        ctx.beginPath();
        ctx.moveTo(crX, crY);
        ctx.quadraticCurveTo(crX + (cf - 0.5) * 6, crY - crH * 0.55, crX + (cf - 0.5) * 2, crY - crH);
        const crestHue = 10 + i * 7;
        ctx.strokeStyle = `hsla(${crestHue}, 96%, 62%, ${0.7 + pulse * 0.25})`;
        ctx.lineWidth = 1.8 * scale;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `hsla(${crestHue}, 92%, 55%, 0.6)`;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // eye - larger, more expressive bird eye
      const eyeX = headR * 0.35;
      const eyeY = -headR * 0.12;
      // eye ring
      ctx.beginPath();
      ctx.arc(eyeX, eyeY, 5 * scale, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(45, 100%, 88%, 0.95)`;
      ctx.fill();
      // iris
      ctx.beginPath();
      ctx.arc(eyeX + 0.8 * scale, eyeY, 3 * scale, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(25, 95%, 45%, 0.9)`;
      ctx.fill();
      // pupil
      ctx.beginPath();
      ctx.arc(eyeX + 1.2 * scale, eyeY, 1.5 * scale, 0, Math.PI * 2);
      ctx.fillStyle = '#0a0800';
      ctx.fill();
      // eye highlight
      ctx.beginPath();
      ctx.arc(eyeX - 0.5 * scale, eyeY - 1.5 * scale, 1 * scale, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(48, 100%, 92%, 0.9)`;
      ctx.fill();

      // beak - 2x larger, hooked raptor beak
      const beakBase = headR * 0.7;
      const beakLen = headR * 2.2;
      const beakW = headR * 0.55;

      // upper beak - curved hook
      ctx.beginPath();
      ctx.moveTo(beakBase, -beakW * 0.25);
      ctx.bezierCurveTo(
        beakBase + beakLen * 0.4, -beakW * 0.5,
        beakBase + beakLen * 0.8, -beakW * 0.15,
        beakBase + beakLen, beakW * 0.15
      );
      ctx.bezierCurveTo(
        beakBase + beakLen * 0.92, beakW * 0.3,
        beakBase + beakLen * 0.7, beakW * 0.25,
        beakBase + beakLen * 0.5, beakW * 0.1
      );
      ctx.lineTo(beakBase, beakW * 0.08);
      ctx.closePath();
      const beakGrad = ctx.createLinearGradient(beakBase, 0, beakBase + beakLen, 0);
      beakGrad.addColorStop(0, `hsla(38, 92%, 58%, ${0.9 + pulse * 0.1})`);
      beakGrad.addColorStop(0.5, `hsla(28, 88%, 48%, ${0.85})`);
      beakGrad.addColorStop(1, `hsla(18, 82%, 32%, ${0.75})`);
      ctx.fillStyle = beakGrad;
      ctx.fill();

      // lower beak
      ctx.beginPath();
      ctx.moveTo(beakBase, beakW * 0.08);
      ctx.bezierCurveTo(
        beakBase + beakLen * 0.3, beakW * 0.35,
        beakBase + beakLen * 0.5, beakW * 0.25,
        beakBase + beakLen * 0.5, beakW * 0.1
      );
      ctx.lineTo(beakBase, beakW * 0.08);
      ctx.closePath();
      ctx.fillStyle = `hsla(32, 85%, 45%, ${0.8 + pulse * 0.1})`;
      ctx.fill();

      // beak ridge line
      ctx.beginPath();
      ctx.moveTo(beakBase + 2, -beakW * 0.1);
      ctx.bezierCurveTo(
        beakBase + beakLen * 0.4, -beakW * 0.3,
        beakBase + beakLen * 0.75, -beakW * 0.05,
        beakBase + beakLen * 0.95, beakW * 0.15
      );
      ctx.strokeStyle = `hsla(45, 90%, 72%, ${0.4 + pulse * 0.15})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // nostril
      ctx.beginPath();
      ctx.ellipse(beakBase + beakLen * 0.2, -beakW * 0.08, 2 * scale, 1.2 * scale, 0.2, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(20, 60%, 28%, 0.6)`;
      ctx.fill();

      ctx.restore();
    };

    /* ── Neck (half length) ── */
    const drawNeck = (cx: number, cy: number, scale: number, pulse: number) => {
      const neckTop = cy - 68 * scale;
      const neckBot = cy - 48 * scale;
      const neckW = 14 * scale;

      const grad = ctx.createLinearGradient(cx - neckW, neckTop, cx + neckW, neckBot);
      grad.addColorStop(0, `hsla(38, 94%, 65%, ${0.7 + pulse * 0.15})`);
      grad.addColorStop(0.5, `hsla(22, 92%, 50%, ${0.6 + pulse * 0.12})`);
      grad.addColorStop(1, `hsla(10, 88%, 42%, ${0.45 + pulse * 0.1})`);

      ctx.beginPath();
      ctx.moveTo(cx - neckW * 0.5, neckTop);
      ctx.bezierCurveTo(cx - neckW * 0.9, neckTop + 6 * scale, cx - neckW * 0.9, neckBot - 4 * scale, cx - neckW * 0.7, neckBot);
      ctx.lineTo(cx + neckW * 0.7, neckBot);
      ctx.bezierCurveTo(cx + neckW * 0.9, neckBot - 4 * scale, cx + neckW * 0.9, neckTop + 6 * scale, cx + neckW * 0.5, neckTop);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      // feather detail
      for (let i = 0; i < 3; i++) {
        const ny = neckTop + (i / 2) * (neckBot - neckTop);
        ctx.beginPath();
        ctx.moveTo(cx - neckW * 0.6, ny);
        ctx.lineTo(cx + neckW * 0.6, ny);
        ctx.strokeStyle = `hsla(35, 88%, 62%, ${0.22 + pulse * 0.08})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    };

    /* ── Chest / body ── */
    const drawBody = (cx: number, cy: number, scale: number, pulse: number) => {
      const bodyTop = cy - 48 * scale;
      const bodyBot = cy + 80 * scale;

      const bodyGrad = ctx.createLinearGradient(cx - 40 * scale, bodyTop, cx + 40 * scale, bodyBot);
      bodyGrad.addColorStop(0, `hsla(40, 96%, 68%, ${0.78 + pulse * 0.15})`);
      bodyGrad.addColorStop(0.25, `hsla(28, 98%, 55%, ${0.68 + pulse * 0.12})`);
      bodyGrad.addColorStop(0.55, `hsla(15, 94%, 45%, ${0.58 + pulse * 0.1})`);
      bodyGrad.addColorStop(0.85, `hsla(5, 90%, 35%, ${0.45 + pulse * 0.08})`);
      bodyGrad.addColorStop(1, `hsla(0, 80%, 25%, ${0.3})`);

      ctx.beginPath();
      ctx.moveTo(cx, bodyTop);
      ctx.bezierCurveTo(cx - 40 * scale, bodyTop + 20 * scale, cx - 34 * scale, bodyBot - 20 * scale, cx, bodyBot);
      ctx.bezierCurveTo(cx + 34 * scale, bodyBot - 20 * scale, cx + 40 * scale, bodyTop + 20 * scale, cx, bodyTop);
      ctx.closePath();
      ctx.fillStyle = bodyGrad;
      ctx.shadowBlur = 32;
      ctx.shadowColor = `hsla(25, 98%, 52%, ${0.35 + pulse * 0.2})`;
      ctx.fill();
      ctx.shadowBlur = 0;

      // chest flame plumage
      for (let i = 0; i < 8; i++) {
        const t = i / 7;
        const py = bodyTop + t * (bodyBot - bodyTop) * 0.7;
        const hw = (28 - t * 12) * scale;
        ctx.beginPath();
        ctx.moveTo(cx - hw, py);
        ctx.quadraticCurveTo(cx, py + 6 * scale + Math.sin(time * 0.03 + i) * 2, cx + hw, py);
        ctx.strokeStyle = `hsla(${35 - t * 25}, 92%, ${68 - t * 18}%, ${0.32 + pulse * 0.14})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    };

    /* ── Wings ── */
    const drawWings = (cx: number, cy: number, scale: number, pulse: number) => {
      const flapT = Math.sin(time * 0.022);
      const flapAngle = flapT * 0.22;

      for (const side of [-1, 1] as const) {
        const flapY = cy - flapAngle * side * 55 * scale;
        const featherCount = 14;

        for (let i = 0; i < featherCount; i++) {
          const ratio = i / (featherCount - 1);
          const baseSpread = 60 + ratio * 260;
          const lift = Math.sin(ratio * Math.PI) * 110 * scale + ratio * 55 * scale;
          const featherPhase = Math.sin(time * 0.02 + i * 0.35 + (side === -1 ? 0 : Math.PI * 0.1)) * 8 * scale;

          const sx = cx + side * 22 * scale;
          const sy = cy - 8 * scale;
          const cpX = cx + side * baseSpread * 0.45 * scale;
          const cpY = flapY - lift - featherPhase + 10 * scale;
          const ex = cx + side * baseSpread * scale;
          const ey = flapY - lift * 0.35 + ratio * 100 * scale + featherPhase * 0.5;

          const wGrad = ctx.createLinearGradient(sx, sy, ex, ey);
          wGrad.addColorStop(0, `hsla(45, 96%, 72%, ${0.58 + pulse * 0.22})`);
          wGrad.addColorStop(0.3, `hsla(30, 98%, 58%, ${0.42 + pulse * 0.18})`);
          wGrad.addColorStop(0.6, `hsla(15, 94%, 48%, ${0.28 + pulse * 0.14})`);
          wGrad.addColorStop(1, `hsla(5, 88%, 38%, ${0.1 + pulse * 0.06})`);

          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.quadraticCurveTo(cpX, cpY, ex, ey);
          ctx.strokeStyle = wGrad;
          ctx.lineWidth = (2.2 - ratio * 1.0) * scale;
          ctx.shadowBlur = 14;
          ctx.shadowColor = `hsla(25, 95%, 55%, ${0.3 + pulse * 0.25})`;
          ctx.stroke();
          ctx.shadowBlur = 0;

          if (i % 3 === 0) {
            const vaneX = cx + side * baseSpread * 0.7 * scale;
            const vaneY = flapY - lift * 0.5 + ratio * 70 * scale;
            ctx.beginPath();
            ctx.moveTo(cpX, cpY);
            ctx.lineTo(vaneX, vaneY);
            ctx.strokeStyle = `hsla(${i % 2 === 0 ? 40 : 20}, 85%, 60%, ${0.2 + pulse * 0.1})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }

          if (i % 4 === 0) {
            const nodeHue = i % 8 === 0 ? 40 : 15;
            drawGeometryNode(ex, ey, 4 * scale, 0.3 + pulse * 0.2, nodeHue);
          }
        }

        // Wing membrane
        const memGrad = ctx.createLinearGradient(cx, cy, cx + side * 300 * scale, cy - 80 * scale);
        memGrad.addColorStop(0, `hsla(30, 92%, 52%, ${0.08 + pulse * 0.05})`);
        memGrad.addColorStop(0.5, `hsla(10, 88%, 42%, ${0.05 + pulse * 0.04})`);
        memGrad.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.moveTo(cx + side * 22 * scale, cy - 8 * scale);
        ctx.bezierCurveTo(
          cx + side * 120 * scale, cy - 80 * scale,
          cx + side * 220 * scale, cy - 50 * scale,
          cx + side * 300 * scale, cy + 40 * scale
        );
        ctx.bezierCurveTo(
          cx + side * 200 * scale, cy + 80 * scale,
          cx + side * 80 * scale, cy + 60 * scale,
          cx + side * 22 * scale, cy + 30 * scale
        );
        ctx.closePath();
        ctx.fillStyle = memGrad;
        ctx.fill();
      }
    };

    /* ── Tail feathers ── */
    const drawTail = (cx: number, cy: number, scale: number, pulse: number) => {
      const tailCount = 9;
      const tailBase = cy + 78 * scale;

      for (let i = 0; i < tailCount; i++) {
        const ratio = i / (tailCount - 1);
        const spread = (ratio - 0.5) * 200 * scale;
        const length = (80 + Math.sin(ratio * Math.PI) * 60) * scale;
        const curve = Math.sin(time * 0.018 + i * 0.4) * 14 * scale;

        const ex = cx + spread;
        const ey = tailBase + length;
        const cpX = cx + spread * 0.5 + curve;
        const cpY = tailBase + length * 0.55;

        const tailGrad = ctx.createLinearGradient(cx, tailBase, ex, ey);
        tailGrad.addColorStop(0, `hsla(40, 96%, 65%, ${0.58 + pulse * 0.18})`);
        tailGrad.addColorStop(0.35, `hsla(25, 94%, 52%, ${0.45 + pulse * 0.14})`);
        tailGrad.addColorStop(0.65, `hsla(10, 90%, 42%, ${0.3 + pulse * 0.1})`);
        tailGrad.addColorStop(1, `hsla(0, 80%, 30%, ${0.12})`);

        ctx.beginPath();
        ctx.moveTo(cx + (ratio - 0.5) * 18 * scale, tailBase);
        ctx.quadraticCurveTo(cpX, cpY, ex, ey);
        ctx.strokeStyle = tailGrad;
        ctx.lineWidth = (1.8 - Math.abs(ratio - 0.5) * 1.6) * scale;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `hsla(20, 94%, 52%, ${0.28 + pulse * 0.14})`;
        ctx.stroke();
        ctx.shadowBlur = 0;

        if (i % 3 === 0) {
          drawGeometryNode(ex, ey, 3.5 * scale, 0.4 + pulse * 0.2, i % 2 === 0 ? 38 : 12);
        }
      }
    };

    /* ── Alchemical sigil rings ── */
    const drawSigilRings = (cx: number, cy: number, scale: number, pulse: number, slowPulse: number) => {
      const ring1R = (72 + slowPulse * 8) * scale;
      const ring2R = (132 + slowPulse * 12) * scale;
      const ring3R = (200 + slowPulse * 16) * scale;
      const ring4R = (265 + slowPulse * 20) * scale;

      drawRing(cx, cy, ring4R, 0.06 + pulse * 0.03, 35, 0.7);
      drawRing(cx, cy, ring4R + 8 * scale, 0.04 + pulse * 0.02, 15, 0.5);

      const outerNodes = 12;
      for (let i = 0; i < outerNodes; i++) {
        const a = (i / outerNodes) * Math.PI * 2 + time * 0.001;
        const nx = cx + Math.cos(a) * ring4R;
        const ny = cy + Math.sin(a) * ring4R;
        const nodeHue = i % 3 === 0 ? 42 : i % 3 === 1 ? 18 : 8;
        drawGeometryNode(nx, ny, 4 * scale, 0.28 + pulse * 0.15, nodeHue);
      }

      drawRing(cx, cy, ring3R, 0.1 + pulse * 0.05, 20, 0.9);
      for (let i = 0; i < 16; i++) {
        const a = (i / 16) * Math.PI * 2 - time * 0.0015;
        const inner = ring2R * 0.85;
        const outer = ring3R;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(a) * inner, cy + Math.sin(a) * inner);
        ctx.lineTo(cx + Math.cos(a) * outer, cy + Math.sin(a) * outer);
        ctx.strokeStyle = `hsla(${i % 2 === 0 ? 40 : 15}, 78%, 55%, ${0.07 + pulse * 0.04})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }

      drawRing(cx, cy, ring2R, 0.15 + pulse * 0.07, 38, 1.1);
      drawFlowerOfLife(cx, cy, ring2R * 0.36, 0.1 + pulse * 0.05);
      drawRing(cx, cy, ring1R, 0.22 + pulse * 0.1, 42, 1.3);

      drawStarPolygon(cx, cy, ring1R * 0.88, 6, 0.1 + pulse * 0.05, 40, time * 0.003);
      drawStarPolygon(cx, cy, ring1R * 0.88, 6, 0.08 + pulse * 0.04, 15, -time * 0.002 + Math.PI / 6);

      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2 + time * 0.004;
        const r = ring1R * 0.55;
        const nx = cx + Math.cos(a) * r;
        const ny = cy + Math.sin(a) * r;
        drawGeometryNode(nx, ny, 5 * scale, 0.35 + pulse * 0.2, i % 2 === 0 ? 42 : 15);
      }
    };

    /* ── Core light ── */
    const drawCore = (cx: number, cy: number, scale: number, pulse: number) => {
      const r = (20 + pulse * 6) * scale;

      const coreGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 5);
      coreGlow.addColorStop(0, `hsla(48, 100%, 90%, 0.95)`);
      coreGlow.addColorStop(0.12, `hsla(42, 98%, 72%, ${0.75 + pulse * 0.2})`);
      coreGlow.addColorStop(0.35, `hsla(28, 96%, 55%, ${0.4 + pulse * 0.15})`);
      coreGlow.addColorStop(0.6, `hsla(12, 92%, 42%, ${0.15 + pulse * 0.08})`);
      coreGlow.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.arc(cx, cy, r * 5, 0, Math.PI * 2);
      ctx.fillStyle = coreGlow;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(45, 100%, 82%, ${0.88 + pulse * 0.12})`;
      ctx.shadowBlur = 30;
      ctx.shadowColor = `hsla(35, 98%, 60%, 0.75)`;
      ctx.fill();
      ctx.shadowBlur = 0;

      for (let i = 0; i < 4; i++) {
        const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
        const len = r * 2.5;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(a) * len, cy + Math.sin(a) * len);
        ctx.strokeStyle = `hsla(42, 100%, 78%, ${0.45 + pulse * 0.22})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
    };

    /* ── Botanical vines (fire-tinted) ── */
    const drawBotanical = (cx: number, cy: number, scale: number, pulse: number) => {
      for (const side of [-1, 1] as const) {
        ctx.beginPath();
        ctx.moveTo(cx + side * 20 * scale, cy + 85 * scale);
        for (let i = 1; i <= 8; i++) {
          const vx = cx + side * (20 + i * 18 + Math.sin(time * 0.015 + i * 0.7) * 9) * scale;
          const vy = cy + (85 - i * 20) * scale;
          ctx.lineTo(vx, vy);
        }
        ctx.strokeStyle = `hsla(25, 72%, 42%, ${0.28 + pulse * 0.14})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        for (let i = 0; i < 5; i++) {
          const t = i / 4;
          const lx = cx + side * (28 + i * 20 + Math.sin(time * 0.015 + i) * 8) * scale;
          const ly = cy + (75 - i * 22) * scale;
          const la = side * 0.6 + Math.sin(time * 0.012 + i) * 0.12;
          const lw = (6 + Math.sin(t * Math.PI) * 4) * scale;
          const lh = 2.5 * scale;

          ctx.beginPath();
          ctx.ellipse(lx + side * lw * 0.4, ly - lh, lw, lh, la, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(18, 78%, 45%, ${0.2 + pulse * 0.1})`;
          ctx.fill();
        }

        for (let i = 0; i < 6; i++) {
          const gx = cx + side * (30 + i * 25 + Math.sin(time * 0.02 + i * 1.3) * 12) * scale;
          const gy = cy + (60 - i * 18 + Math.cos(time * 0.018 + i) * 6) * scale;
          const gAlpha = (0.3 + Math.sin(time * 0.04 + i * 0.7) * 0.2) * (0.6 + pulse * 0.4);

          ctx.beginPath();
          ctx.arc(gx, gy, 2.5 * scale, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(35, 92%, 62%, ${gAlpha})`;
          ctx.shadowBlur = 10;
          ctx.shadowColor = `hsla(30, 90%, 55%, ${gAlpha * 0.7})`;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
    };

    /* ── Draw flame-shaped particle ── */
    const drawFlameShape = (x: number, y: number, size: number, hue: number, alpha: number, flickerPhase: number) => {
      const flicker = Math.sin(time * 0.08 + flickerPhase) * size * 0.15;
      const h = size * 2.5;
      const w = size * 0.8;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(Math.sin(time * 0.03 + flickerPhase) * 0.15);

      const flameGrad = ctx.createLinearGradient(0, h * 0.3, 0, -h);
      flameGrad.addColorStop(0, `hsla(${hue + 10}, 95%, 70%, ${alpha * 0.1})`);
      flameGrad.addColorStop(0.3, `hsla(${hue}, 98%, 60%, ${alpha * 0.7})`);
      flameGrad.addColorStop(0.6, `hsla(${hue - 5}, 96%, 52%, ${alpha})`);
      flameGrad.addColorStop(1, `hsla(${hue - 15}, 90%, 42%, ${alpha * 0.5})`);

      ctx.beginPath();
      ctx.moveTo(0, h * 0.3);
      ctx.bezierCurveTo(
        -w - flicker, 0,
        -w * 0.6, -h * 0.5,
        0, -h
      );
      ctx.bezierCurveTo(
        w * 0.6, -h * 0.5,
        w + flicker, 0,
        0, h * 0.3
      );
      ctx.closePath();
      ctx.fillStyle = flameGrad;
      ctx.shadowBlur = size * 2;
      ctx.shadowColor = `hsla(${hue}, 95%, 55%, ${alpha * 0.5})`;
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.restore();
    };

    /* ── Draw ash particle ── */
    const drawAshParticle = (x: number, y: number, size: number, alpha: number, drift: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(time * 0.02 + drift);

      ctx.beginPath();
      ctx.ellipse(0, 0, size, size * 0.5, 0, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(25, 30%, 35%, ${alpha * 0.5})`;
      ctx.fill();

      ctx.beginPath();
      ctx.ellipse(0, 0, size * 0.6, size * 0.3, 0, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(20, 20%, 25%, ${alpha * 0.3})`;
      ctx.fill();

      ctx.restore();
    };

    /* ── Main animation loop ── */
    const animate = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height * 0.52;

      const rawScale = Math.min(width, height * 1.1) / 680;
      const scale = Math.max(0.38, Math.min(rawScale, 1.0));

      const pulse = (Math.sin(time * 0.026) + 1) / 2;
      const slowPulse = (Math.sin(time * 0.009) + 1) / 2;

      const breatheScale = 1 + Math.sin(time * 0.011) * 0.012;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(breatheScale, breatheScale);
      ctx.translate(-cx, -cy);

      // Ambient background glow - fire tinted
      const bgGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(width, height) * 0.7);
      bgGlow.addColorStop(0, `rgba(200, 120, 30, 0.12)`);
      bgGlow.addColorStop(0.2, `rgba(150, 60, 15, 0.08)`);
      bgGlow.addColorStop(0.55, `rgba(60, 15, 5, 0.06)`);
      bgGlow.addColorStop(1, 'rgba(5, 5, 3, 0.02)');
      ctx.fillStyle = bgGlow;
      ctx.fillRect(0, 0, width, height);

      // Draw layers
      drawSigilRings(cx, cy, scale, pulse, slowPulse);
      drawBotanical(cx, cy, scale, pulse);
      drawTail(cx, cy, scale, pulse);
      drawWings(cx, cy, scale, pulse);
      drawBody(cx, cy, scale, pulse);
      drawNeck(cx, cy, scale, pulse);
      drawHead(cx, cy, scale, pulse);
      drawCore(cx, cy - 8 * scale, scale, pulse);

      // Flame & ash particles (orbital)
      if (Math.random() < 0.7) spawnFlame(cx, cy);

      for (let i = flames.length - 1; i >= 0; i--) {
        const f = flames[i];
        f.life += 1;
        f.x += f.vx + Math.sin(time * 0.025 + f.flicker) * 0.4;
        f.y += f.vy;
        if (!f.isAsh) f.vy -= 0.01;

        if (f.life >= f.maxLife) {
          flames.splice(i, 1);
          continue;
        }

        const age = f.life / f.maxLife;
        const alpha = age < 0.15 ? age / 0.15 : age > 0.7 ? (1 - age) / 0.3 : 1;

        if (f.isAsh) {
          drawAshParticle(f.x, f.y, f.size * (0.8 + age * 0.3) * scale, alpha * 0.65, f.flicker);
        } else {
          drawFlameShape(f.x, f.y, f.size * (1 - age * 0.5) * scale, f.hue, alpha * 0.6, f.flicker);
        }
      }

      // Embers (rising fire sparks and ash flecks)
      if (Math.random() < 0.9) spawnEmber(cx, cy);

      for (let i = embers.length - 1; i >= 0; i--) {
        const em = embers[i];
        em.life += 1;
        em.x += em.vx + Math.sin(time * 0.02 + em.life * 0.07) * 0.3;
        em.y += em.vy;
        if (!em.isAsh) em.vy -= 0.02;

        if (em.life >= em.maxLife) {
          embers.splice(i, 1);
          continue;
        }

        const age = em.life / em.maxLife;
        const alpha = age < 0.2 ? age / 0.2 : 1 - age;

        if (em.isAsh) {
          drawAshParticle(em.x, em.y, em.radius * scale, alpha * 0.55, em.hue);
        } else {
          ctx.beginPath();
          ctx.arc(em.x, em.y, em.radius * (1 - age * 0.35) * scale, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${em.hue}, ${em.saturation}%, ${65 - age * 30}%, ${alpha * 0.7})`;
          ctx.shadowBlur = 16;
          ctx.shadowColor = `hsla(${em.hue}, 95%, 55%, ${alpha * 0.6})`;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // Vignette
      const vign = ctx.createRadialGradient(
        cx, cy, Math.min(width, height) * 0.1,
        cx, cy, Math.max(width, height) * 0.72
      );
      vign.addColorStop(0, 'transparent');
      vign.addColorStop(1, 'rgba(3, 3, 2, 0.52)');
      ctx.fillStyle = vign;
      ctx.fillRect(0, 0, width, height);

      ctx.restore();

      frameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      aria-hidden="true"
    />
  );
}


export default PhoenixPrincipleAnimatedSigil