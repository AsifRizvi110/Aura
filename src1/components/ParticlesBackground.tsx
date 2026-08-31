import React, { useEffect, useRef } from 'react';

interface ParticlesBackgroundProps {
  id?: string;
  className?: string;
  showCapSilhouette?: boolean;
}

export const ParticlesBackground: React.FC<ParticlesBackgroundProps> = ({
  id = 'particles-stitch-canvas',
  className = '',
  showCapSilhouette = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let animationFrameId: number;
    let time = 0;

    // A single embroidery thread: a gently undulating path across the canvas,
    // rendered as a running stitch (dashed) line with a travelling needle glint.
    interface StitchThread {
      baseY: number;
      amplitude: number;
      wavelength: number;
      phase: number;
      phaseSpeed: number;
      thickness: number;
      opacity: number;
      dash: [number, number];
      needleT: number;
      needleSpeed: number;
      color: string;
    }

    const threadColors = [
      '212, 175, 55',  // gold
      '232, 206, 140', // light warm gold
      '168, 134, 42'   // deep gold
    ];

    let threads: StitchThread[] = [];
    let burstStitches: { x: number; y: number; angle: number; life: number }[] = [];

    const mouse = { x: -9999, y: -9999, isHovered: false };

    const pathY = (thread: StitchThread, x: number) => {
      return (
        thread.baseY +
        Math.sin(x / thread.wavelength + thread.phase) * thread.amplitude
      );
    };

    const initThreads = () => {
      threads = [];
      const count = width < 640 ? 4 : width < 1024 ? 6 : 8;
      for (let i = 0; i < count; i++) {
        threads.push({
          baseY: (height / (count + 1)) * (i + 1) + (Math.random() - 0.5) * 60,
          amplitude: Math.random() * 40 + 25,
          wavelength: Math.random() * 220 + 260,
          phase: Math.random() * Math.PI * 2,
          phaseSpeed: (Math.random() * 0.15 + 0.05) * 0.01,
          thickness: Math.random() * 0.7 + 0.6,
          opacity: Math.random() * 0.18 + 0.1,
          dash: [Math.random() * 4 + 7, Math.random() * 4 + 5],
          needleT: Math.random(),
          needleSpeed: Math.random() * 0.0006 + 0.0003,
          color: threadColors[Math.floor(Math.random() * threadColors.length)]
        });
      }
    };

    initThreads();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initThreads();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.isHovered = true;
    };

    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
      mouse.isHovered = false;
    };

    const handleClick = (e: MouseEvent) => {
      // Spawn a small cluster of stitch marks at the click point,
      // like a hand-stitched accent being placed on fabric.
      const cx = e.clientX;
      const cy = e.clientY;
      for (let i = 0; i < 5; i++) {
        const angle = (Math.PI / 5) * i - Math.PI / 2.5;
        burstStitches.push({
          x: cx + Math.cos(angle) * 14 * i,
          y: cy + Math.sin(angle) * 14 * i,
          angle,
          life: 1
        });
      }
      if (burstStitches.length > 80) {
        burstStitches.splice(0, burstStitches.length - 80);
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    window.addEventListener('click', handleClick);

    const drawStitchLine = (thread: StitchThread) => {
      const step = 10;
      ctx.beginPath();
      ctx.setLineDash(thread.dash);
      ctx.lineDashOffset = -time * 0.4;
      ctx.lineWidth = thread.thickness;
      ctx.strokeStyle = `rgba(${thread.color}, ${thread.opacity})`;

      let started = false;
      for (let x = -20; x <= width + 20; x += step) {
        let y = pathY(thread, x);

        // Gentle pull toward the cursor, like fabric tension near a touch point.
        if (mouse.isHovered) {
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            const pull = (1 - dist / 160) * 18;
            y -= (dy / (dist || 1)) * pull;
          }
        }

        if (!started) {
          ctx.moveTo(x, y);
          started = true;
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Needle glint travelling along the thread.
      const needleX = thread.needleT * (width + 40) - 20;
      let needleY = pathY(thread, needleX);
      if (mouse.isHovered) {
        const dx = needleX - mouse.x;
        const dy = needleY - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 160) {
          const pull = (1 - dist / 160) * 18;
          needleY -= (dy / (dist || 1)) * pull;
        }
      }

      const glow = ctx.createRadialGradient(needleX, needleY, 0, needleX, needleY, 6);
      glow.addColorStop(0, `rgba(${thread.color}, 0.85)`);
      glow.addColorStop(1, `rgba(${thread.color}, 0)`);
      ctx.beginPath();
      ctx.arc(needleX, needleY, 6, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(needleX, needleY, 1.4, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();

      thread.needleT += thread.needleSpeed;
      if (thread.needleT > 1.05) thread.needleT = -0.05;
    };

    const drawBurstStitches = () => {
      for (let i = burstStitches.length - 1; i >= 0; i--) {
        const s = burstStitches[i];
        const len = 9;
        const alpha = s.life * 0.5;
        ctx.beginPath();
        ctx.moveTo(s.x - Math.cos(s.angle) * len, s.y - Math.sin(s.angle) * len);
        ctx.lineTo(s.x + Math.cos(s.angle) * len, s.y + Math.sin(s.angle) * len);
        ctx.strokeStyle = `rgba(212, 175, 55, ${alpha})`;
        ctx.lineWidth = 1.4;
        ctx.stroke();

        s.life -= 0.006;
        if (s.life <= 0) burstStitches.splice(i, 1);
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 1;

      // Subtle stylised cap silhouette watermark, kept from the original background.
      if (showCapSilhouette) {
        ctx.save();
        const centerX = width > 1024 ? width * 0.72 : width * 0.5;
        const centerY = height > 800 ? height * 0.42 : height * 0.48;
        const scale = Math.min(width, height) * (width > 1024 ? 0.45 : 0.55);

        const capGrad = ctx.createRadialGradient(
          centerX - scale * 0.1,
          centerY - scale * 0.2,
          scale * 0.05,
          centerX,
          centerY,
          scale * 0.8
        );
        capGrad.addColorStop(0, 'rgba(30, 25, 20, 0.35)');
        capGrad.addColorStop(0.5, 'rgba(18, 18, 18, 0.25)');
        capGrad.addColorStop(1, 'rgba(10, 10, 10, 0)');

        ctx.fillStyle = capGrad;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY - scale * 0.1, scale * 0.55, scale * 0.42, -0.05, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(centerX - scale * 0.15, centerY + scale * 0.18, scale * 0.65, scale * 0.2, -0.15, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(12, 12, 12, 0.4)';
        ctx.fill();

        ctx.restore();
      }

      for (let i = 0; i < threads.length; i++) {
        threads[i].phase += threads[i].phaseSpeed;
        drawStitchLine(threads[i]);
      }

      drawBurstStitches();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [id, showCapSilhouette]);

  return (
    <div
      id={id}
      className={`fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
};
