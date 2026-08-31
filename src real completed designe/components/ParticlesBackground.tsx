import React, { useEffect, useRef } from 'react';

interface ParticlesBackgroundProps {
  id?: string;
  className?: string;
  showCapSilhouette?: boolean;
}

export const ParticlesBackground: React.FC<ParticlesBackgroundProps> = ({
  id = 'particles-plexus-canvas',
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

    // Node interface for geometric plexus constellation
    interface PlexusNode {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseRadius: number;
      glow: boolean;
      pulsePhase: number;
      pulseSpeed: number;
      color: string;
    }

    const nodeColors = [
      '#D4AF37', // Vibrant Orange
      '#E8CE8C', // Amber Gold
      '#A8862A', // Deep Orange
      '#EAD9A8'  // Warm Gold Light
    ];

    let nodes: PlexusNode[] = [];
    
    // Calculate density according to screen size
    const calculateNodeCount = () => {
      const area = width * height;
      if (width < 640) return Math.min(45, Math.floor(area / 16000));
      if (width < 1024) return Math.min(70, Math.floor(area / 18000));
      return Math.min(95, Math.floor(area / 17000));
    };

    const linkDistance = width < 768 ? 125 : 155;
    const triangleDistance = width < 768 ? 95 : 120;
    const grabDistance = 200;

    const mouse = {
      x: -9999,
      y: -9999,
      isHovered: false
    };

    const createNode = (initX?: number, initY?: number): PlexusNode => {
      const isGlowNode = Math.random() < 0.28; // 28% of nodes are key anchor nodes with glowing halo
      const rad = isGlowNode ? Math.random() * 2.5 + 3.0 : Math.random() * 1.8 + 1.8;
      const angle = Math.random() * Math.PI * 2;
      const speed = (Math.random() * 0.45 + 0.35) * (width < 768 ? 0.7 : 1);

      return {
        x: initX ?? Math.random() * width,
        y: initY ?? Math.random() * height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: rad,
        baseRadius: rad,
        glow: isGlowNode,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.03 + 0.015,
        color: nodeColors[Math.floor(Math.random() * nodeColors.length)]
      };
    };

    const initNodes = () => {
      nodes = [];
      const count = calculateNodeCount();
      for (let i = 0; i < count; i++) {
        nodes.push(createNode());
      }
    };

    initNodes();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initNodes();
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
      const clickX = e.clientX;
      const clickY = e.clientY;
      // Spawn 3-4 constellation nodes on click
      for (let i = 0; i < 3; i++) {
        nodes.push(createNode(clickX + (Math.random() - 0.5) * 40, clickY + (Math.random() - 0.5) * 40));
        if (nodes.length > 120) {
          nodes.shift();
        }
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    window.addEventListener('click', handleClick);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Subtle Stylized Luxury Cap Silhouette Background Watermark
      if (showCapSilhouette) {
        ctx.save();
        const centerX = width > 1024 ? width * 0.72 : width * 0.5;
        const centerY = height > 800 ? height * 0.42 : height * 0.48;
        const scale = Math.min(width, height) * (width > 1024 ? 0.45 : 0.55);

        // Cap Crown Silhouette Shadow
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
        // Cap profile shape
        ctx.ellipse(centerX, centerY - scale * 0.1, scale * 0.55, scale * 0.42, -0.05, 0, Math.PI * 2);
        ctx.fill();

        // Curved Brim Shadow
        ctx.beginPath();
        ctx.ellipse(centerX - scale * 0.15, centerY + scale * 0.18, scale * 0.65, scale * 0.2, -0.15, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(12, 12, 12, 0.4)';
        ctx.fill();

        ctx.restore();
      }

      const totalNodes = nodes.length;

      // 2. Position Updates & Boundary Wrapping
      for (let i = 0; i < totalNodes; i++) {
        const node = nodes[i];

        node.x += node.vx;
        node.y += node.vy;
        node.pulsePhase += node.pulseSpeed;

        // Wrap boundaries smoothly
        if (node.x < -20) node.x = width + 20;
        else if (node.x > width + 20) node.x = -20;
        if (node.y < -20) node.y = height + 20;
        else if (node.y > height + 20) node.y = -20;
      }

      // 3. Render 3D Triangular Geometric Facets (Plexus Polygons)
      // When 3 nodes are close together, fill the triangle with warm translucent amber mesh
      for (let i = 0; i < totalNodes; i++) {
        for (let j = i + 1; j < totalNodes; j++) {
          const dx1 = nodes[i].x - nodes[j].x;
          const dy1 = nodes[i].y - nodes[j].y;
          const dist1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);

          if (dist1 < triangleDistance) {
            for (let k = j + 1; k < totalNodes; k++) {
              const dx2 = nodes[j].x - nodes[k].x;
              const dy2 = nodes[j].y - nodes[k].y;
              const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

              if (dist2 < triangleDistance) {
                const dx3 = nodes[k].x - nodes[i].x;
                const dy3 = nodes[k].y - nodes[i].y;
                const dist3 = Math.sqrt(dx3 * dx3 + dy3 * dy3);

                if (dist3 < triangleDistance) {
                  // Calculate average opacity for polygon
                  const avgDist = (dist1 + dist2 + dist3) / 3;
                  const triAlpha = (1 - avgDist / triangleDistance) * 0.09;

                  ctx.beginPath();
                  ctx.moveTo(nodes[i].x, nodes[i].y);
                  ctx.lineTo(nodes[j].x, nodes[j].y);
                  ctx.lineTo(nodes[k].x, nodes[k].y);
                  ctx.closePath();
                  ctx.fillStyle = `rgba(212, 175, 55, ${triAlpha})`;
                  ctx.fill();
                }
              }
            }
          }
        }
      }

      // 4. Render Interconnected Geometric Plexus Lines
      for (let i = 0; i < totalNodes; i++) {
        const n1 = nodes[i];

        for (let j = i + 1; j < totalNodes; j++) {
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < linkDistance) {
            const alpha = (1 - dist / linkDistance) * 0.55;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `rgba(212, 175, 55, ${alpha})`;
            ctx.lineWidth = dist < linkDistance * 0.5 ? 1.2 : 0.8;
            ctx.stroke();
          }
        }

        // Mouse Interactive Grab / Proximity Lines
        if (mouse.isHovered) {
          const mdx = n1.x - mouse.x;
          const mdy = n1.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mdist < grabDistance) {
            const mAlpha = (1 - mdist / grabDistance) * 0.85;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(232, 206, 140, ${mAlpha})`;
            ctx.lineWidth = 1.3;
            ctx.stroke();

            // Subtle magnetic drift towards cursor
            n1.x -= (mdx / mdist) * 0.35;
            n1.y -= (mdy / mdist) * 0.35;
          }
        }
      }

      // 5. Render Glowing Vertices (Nodes) with Halos
      for (let i = 0; i < totalNodes; i++) {
        const node = nodes[i];
        const pulse = Math.sin(node.pulsePhase) * 0.4 + 1.0;
        const currentRadius = node.radius * pulse;

        // Outer Glow Halo for Key Anchor Nodes (like in the photo)
        if (node.glow) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, currentRadius * 3.5, 0, Math.PI * 2);
          const haloGrad = ctx.createRadialGradient(
            node.x,
            node.y,
            currentRadius * 0.5,
            node.x,
            node.y,
            currentRadius * 3.5
          );
          haloGrad.addColorStop(0, 'rgba(212, 175, 55, 0.4)');
          haloGrad.addColorStop(0.5, 'rgba(232, 206, 140, 0.15)');
          haloGrad.addColorStop(1, 'rgba(212, 175, 55, 0)');
          ctx.fillStyle = haloGrad;
          ctx.fill();

          // Subtle Outer Ring
          ctx.beginPath();
          ctx.arc(node.x, node.y, currentRadius * 2.2, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(232, 206, 140, 0.35)';
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }

        // Inner Sharp Node Circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        // High-gloss Center Dot
        ctx.beginPath();
        ctx.arc(node.x - currentRadius * 0.25, node.y - currentRadius * 0.25, currentRadius * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
      }

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
