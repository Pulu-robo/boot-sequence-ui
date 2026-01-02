import React, { useEffect, useRef } from 'react';
import { Database, Shield, Cpu, MessageCircle } from 'lucide-react';

interface Node {
  id: string;
  label: string;
  description: string;
  x: number;
  y: number;
  icon: React.ElementType;
}

interface Connection {
  from: string;
  to: string;
}

const NeuralNetwork: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<{ x: number; y: number; progress: number; connectionIndex: number }[]>([]);

  const nodes: Node[] = [
    { id: 'evidence', label: 'Evidence', description: 'Immutable data objects', x: 0.15, y: 0.5, icon: Database },
    { id: 'risk', label: 'Risk Models', description: 'Uncertainty quantification', x: 0.38, y: 0.25, icon: Shield },
    { id: 'optimizer', label: 'Optimizer', description: 'Decision engine core', x: 0.62, y: 0.5, icon: Cpu },
    { id: 'explainer', label: 'Explainer', description: 'LLM interface layer', x: 0.85, y: 0.5, icon: MessageCircle },
  ];

  const connections: Connection[] = [
    { from: 'evidence', to: 'risk' },
    { from: 'evidence', to: 'optimizer' },
    { from: 'risk', to: 'optimizer' },
    { from: 'optimizer', to: 'explainer' },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    connections.forEach((_, index) => {
      for (let i = 0; i < 3; i++) {
        particlesRef.current.push({
          x: 0,
          y: 0,
          progress: (i / 3) + Math.random() * 0.1,
          connectionIndex: index,
        });
      }
    });

    let time = 0;

    const animate = () => {
      const rect = container.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      time += 0.01;

      // Draw connections with glow
      connections.forEach((conn, connIndex) => {
        const fromNode = nodes.find(n => n.id === conn.from)!;
        const toNode = nodes.find(n => n.id === conn.to)!;

        const fromX = fromNode.x * rect.width;
        const fromY = fromNode.y * rect.height;
        const toX = toNode.x * rect.width;
        const toY = toNode.y * rect.height;

        // Curved path
        const midX = (fromX + toX) / 2;
        const midY = (fromY + toY) / 2 - 30;

        // Glow effect
        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.quadraticCurveTo(midX, midY, toX, toY);
        ctx.strokeStyle = `hsla(261, 68%, 77%, ${0.1 + Math.sin(time + connIndex) * 0.05})`;
        ctx.lineWidth = 8;
        ctx.stroke();

        // Main line
        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.quadraticCurveTo(midX, midY, toX, toY);
        ctx.strokeStyle = `hsla(261, 68%, 77%, ${0.3 + Math.sin(time + connIndex) * 0.1})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Dashed overlay
        ctx.beginPath();
        ctx.setLineDash([5, 10]);
        ctx.moveTo(fromX, fromY);
        ctx.quadraticCurveTo(midX, midY, toX, toY);
        ctx.strokeStyle = `hsla(94, 71%, 79%, ${0.4 + Math.sin(time * 2 + connIndex) * 0.2})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Draw and update particles
      particlesRef.current.forEach((particle) => {
        const conn = connections[particle.connectionIndex];
        const fromNode = nodes.find(n => n.id === conn.from)!;
        const toNode = nodes.find(n => n.id === conn.to)!;

        const fromX = fromNode.x * rect.width;
        const fromY = fromNode.y * rect.height;
        const toX = toNode.x * rect.width;
        const toY = toNode.y * rect.height;

        const midX = (fromX + toX) / 2;
        const midY = (fromY + toY) / 2 - 30;

        // Quadratic bezier point calculation
        const t = particle.progress;
        const x = (1 - t) * (1 - t) * fromX + 2 * (1 - t) * t * midX + t * t * toX;
        const y = (1 - t) * (1 - t) * fromY + 2 * (1 - t) * t * midY + t * t * toY;

        // Draw particle with glow
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 8);
        gradient.addColorStop(0, 'hsla(94, 71%, 79%, 0.8)');
        gradient.addColorStop(0.5, 'hsla(261, 68%, 77%, 0.4)');
        gradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'hsla(94, 71%, 79%, 1)';
        ctx.fill();

        // Update particle position
        particle.progress += 0.005;
        if (particle.progress > 1) {
          particle.progress = 0;
        }
      });

      // Draw node glows
      nodes.forEach((node, index) => {
        const x = node.x * rect.width;
        const y = node.y * rect.height;
        const pulseScale = 1 + Math.sin(time * 2 + index) * 0.1;

        // Outer glow
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 60 * pulseScale);
        gradient.addColorStop(0, 'hsla(261, 68%, 77%, 0.3)');
        gradient.addColorStop(0.5, 'hsla(261, 68%, 77%, 0.1)');
        gradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(x, y, 60 * pulseScale, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[400px] md:h-[500px]">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      {/* Node overlays with icons and labels */}
      {nodes.map((node, index) => (
        <div
          key={node.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-target group"
          style={{
            left: `${node.x * 100}%`,
            top: `${node.y * 100}%`,
          }}
        >
          {/* Node container */}
          <div className="relative flex flex-col items-center">
            {/* Icon circle */}
            <div 
              className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-card border-2 border-primary/50 flex items-center justify-center group-hover:border-secondary transition-all duration-300 group-hover:scale-110"
              style={{
                boxShadow: '0 0 30px hsla(261, 68%, 77%, 0.3), inset 0 0 20px hsla(261, 68%, 77%, 0.1)',
              }}
            >
              {/* Spinning ring */}
              <div 
                className="absolute inset-[-4px] rounded-full border border-dashed border-primary/30 animate-spin"
                style={{ animationDuration: '10s' }}
              />
              
              <node.icon className="w-6 h-6 md:w-8 md:h-8 text-primary group-hover:text-secondary transition-colors duration-300" />
            </div>
            
            {/* Label */}
            <div className="mt-3 text-center">
              <p className="text-xs md:text-sm font-semibold text-foreground whitespace-nowrap">
                {node.label}
              </p>
              <p className="text-[10px] md:text-xs text-muted-foreground max-w-[100px] md:max-w-[120px] hidden md:block">
                {node.description}
              </p>
            </div>

            {/* Tooltip on hover */}
            <div className="absolute bottom-full mb-2 px-3 py-2 bg-card border border-border rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-10 md:hidden">
              <p className="text-xs text-muted-foreground">{node.description}</p>
            </div>
          </div>
        </div>
      ))}

      {/* Data flow legend */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-card/80 backdrop-blur-sm px-4 py-2 rounded-sm border border-border/50">
        <span className="text-xs text-muted-foreground font-mono">DATA FLOW</span>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <div className="w-8 h-px bg-gradient-to-r from-primary to-secondary" />
          <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
      </div>
    </div>
  );
};

export default NeuralNetwork;
