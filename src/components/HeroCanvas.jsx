import React, { useEffect, useRef } from 'react';

export default function HeroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const size = 380;
    canvas.width = size * window.devicePixelRatio;
    canvas.height = size * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // 3D vertices for an icosahedron & nested tech core
    const t = (1.0 + Math.sqrt(5.0)) / 2.0;
    const rawVertices = [
      [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
      [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
      [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1]
    ];

    // Normalize vertices
    const vertices = rawVertices.map(([x, y, z]) => {
      const len = Math.sqrt(x * x + y * y + z * z);
      return [x / len * 110, y / len * 110, z / len * 110];
    });

    // Inner core vertices (cube)
    const innerRaw = [
      [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
      [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
    ];
    const innerVertices = innerRaw.map(([x, y, z]) => [x * 45, y * 45, z * 45]);

    const innerEdges = [
      [0,1], [1,2], [2,3], [3,0],
      [4,5], [5,6], [6,7], [7,4],
      [0,4], [1,5], [2,6], [3,7]
    ];

    // Outer icosahedron edges
    const edges = [
      [0, 11], [0, 5], [0, 1], [0, 7], [0, 10],
      [1, 5], [5, 11], [11, 10], [10, 7], [7, 1],
      [3, 9], [3, 4], [3, 2], [3, 6], [3, 8],
      [4, 9], [2, 4], [6, 2], [8, 6], [9, 8],
      [4, 5], [5, 9], [8, 1], [1, 9], [7, 8],
      [6, 7], [10, 6], [2, 10], [11, 4], [2, 11]
    ];

    let angleX = 0.006;
    let angleY = 0.008;
    let angleZ = 0.004;

    let rotX = 0;
    let rotY = 0;
    let rotZ = 0;

    let targetRotX = 0;
    let targetRotY = 0;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      targetRotX = (y / rect.height) * 0.8;
      targetRotY = (x / rect.width) * 0.8;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const project = ([x, y, z], rX, rY, rZ) => {
      // Rotation X
      let y1 = y * Math.cos(rX) - z * Math.sin(rX);
      let z1 = y * Math.sin(rX) + z * Math.cos(rX);
      let x1 = x;

      // Rotation Y
      let x2 = x1 * Math.cos(rY) + z1 * Math.sin(rY);
      let z2 = -x1 * Math.sin(rY) + z1 * Math.cos(rY);
      let y2 = y1;

      // Rotation Z
      let x3 = x2 * Math.cos(rZ) - y2 * Math.sin(rZ);
      let y3 = x2 * Math.sin(rZ) + y2 * Math.cos(rZ);
      let z3 = z2;

      const fov = 320;
      const scale = fov / (fov + z3 + 120);
      return {
        x: x3 * scale + size / 2,
        y: y3 * scale + size / 2,
        z: z3,
        scale
      };
    };

    let tick = 0;

    const render = () => {
      ctx.clearRect(0, 0, size, size);
      tick++;

      rotX += angleX + (targetRotX - rotX) * 0.05;
      rotY += angleY + (targetRotY - rotY) * 0.05;
      rotZ += angleZ;

      // Draw outer energy aura
      const grad = ctx.createRadialGradient(size / 2, size / 2, 10, size / 2, size / 2, 160);
      grad.addColorStop(0, 'rgba(0, 240, 255, 0.15)');
      grad.addColorStop(0.5, 'rgba(168, 85, 247, 0.08)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);

      // Project Outer Icosahedron
      const projectedOuter = vertices.map(v => project(v, rotX, rotY, rotZ));

      // Project Inner Core
      const projectedInner = innerVertices.map(v => project(v, -rotX * 1.5, -rotY * 1.5, rotZ * 1.2));

      // Draw Inner Cube Edges (Purple/Pink glow)
      ctx.strokeStyle = 'rgba(236, 72, 153, 0.4)';
      ctx.lineWidth = 1.2;
      innerEdges.forEach(([i, j]) => {
        const p1 = projectedInner[i];
        const p2 = projectedInner[j];
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      // Draw Outer Edges (Electric Cyan glow)
      edges.forEach(([i, j]) => {
        const p1 = projectedOuter[i];
        const p2 = projectedOuter[j];
        const avgZ = (p1.z + p2.z) / 2;
        const alpha = Math.max(0.15, Math.min(0.85, (avgZ + 100) / 200));

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // Draw Glowing Nodes
      projectedOuter.forEach((p, idx) => {
        const pulse = Math.sin(tick * 0.05 + idx) * 1.5;
        const radius = Math.max(2, (p.scale * 3.5) + pulse);

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = '#00f0ff';
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#00f0ff';
        ctx.fill();
        ctx.shadowBlur = 0;

        // Inner bright core
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      });

      // Draw Center Glowing Core
      const corePulse = Math.sin(tick * 0.08) * 4;
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, 12 + corePulse, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(168, 85, 247, 0.8)';
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#a855f7';
      ctx.fill();
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '380px', height: '380px', maxWidth: '100%', margin: '0 auto' }}>
      {/* Decorative Cyber Rings */}
      <div style={{
        position: 'absolute',
        inset: '-10px',
        borderRadius: '50%',
        border: '1px dashed rgba(0, 240, 255, 0.2)',
        animation: 'spin-slow 35s linear infinite',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        inset: '-25px',
        borderRadius: '50%',
        border: '1px solid rgba(168, 85, 247, 0.15)',
        animation: 'spin-slow 45s linear infinite reverse',
        pointerEvents: 'none'
      }} />
      
      {/* Floating Status Badges */}
      <div style={{
        position: 'absolute',
        top: '15px',
        right: '-10px',
        background: 'rgba(10, 15, 28, 0.85)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(0, 240, 255, 0.3)',
        borderRadius: '12px',
        padding: '6px 14px',
        fontSize: '0.75rem',
        fontWeight: '600',
        color: '#00f0ff',
        boxShadow: '0 8px 20px rgba(0, 240, 255, 0.15)',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        zIndex: 2
      }}>
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00f0ff', boxShadow: '0 0 8px #00f0ff' }}></span>
        DSA & Backend Core
      </div>

      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '-15px',
        background: 'rgba(10, 15, 28, 0.85)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(236, 72, 153, 0.3)',
        borderRadius: '12px',
        padding: '6px 14px',
        fontSize: '0.75rem',
        fontWeight: '600',
        color: '#ec4899',
        boxShadow: '0 8px 20px rgba(236, 72, 153, 0.15)',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        zIndex: 2
      }}>
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ec4899', boxShadow: '0 0 8px #ec4899' }}></span>
        Knight Tier (1845)
      </div>

      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          position: 'relative',
          zIndex: 1
        }}
      />
    </div>
  );
}
