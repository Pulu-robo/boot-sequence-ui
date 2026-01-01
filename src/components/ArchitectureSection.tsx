import React from 'react';
import { Database, Shield, Cpu, MessageCircle, ArrowRight } from 'lucide-react';

const ArchitectureSection: React.FC = () => {
  const components = [
    { id: 'evidence', label: 'Evidence', icon: Database, description: 'Immutable data objects' },
    { id: 'risk', label: 'Risk Models', icon: Shield, description: 'Uncertainty quantification' },
    { id: 'optimizer', label: 'Optimizer', icon: Cpu, description: 'Decision engine core' },
    { id: 'explainer', label: 'Explainer', icon: MessageCircle, description: 'LLM interface layer' },
  ];

  return (
    <section id="architecture" className="relative py-24 px-6 md:px-16 bg-card/50">
      {/* Section header */}
      <div className="max-w-6xl mx-auto mb-16">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-px bg-secondary" />
          <span className="text-xs text-secondary font-mono tracking-wider">SYSTEM ARCHITECTURE</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Engineered for{' '}
          <span className="text-secondary">Seriousness</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl">
          A modular architecture where each component has a clear responsibility.
          The explainer is optional — AXIOM works without it.
        </p>
      </div>

      {/* Architecture diagram */}
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(261, 68%, 77%)" stopOpacity="0.5" />
                <stop offset="100%" stopColor="hsl(94, 71%, 79%)" stopOpacity="0.5" />
              </linearGradient>
            </defs>
          </svg>

          {/* Component boxes */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-4">
            {components.map((comp, index) => (
              <React.Fragment key={comp.id}>
                <div className="cursor-target group relative bg-card border border-border hover:border-primary transition-all duration-300 rounded-sm p-6 flex flex-col items-center text-center">
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-sm" />
                  
                  <div className="relative z-10">
                    <comp.icon className="w-8 h-8 text-primary mb-3 group-hover:text-secondary transition-colors duration-300" />
                    <h3 className="font-semibold text-foreground mb-1">{comp.label}</h3>
                    <p className="text-xs text-muted-foreground">{comp.description}</p>
                  </div>

                  {/* Active indicator */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Arrow between components */}
                {index < components.length - 1 && (
                  <div className="hidden md:flex absolute items-center justify-center" style={{
                    left: `${(index + 1) * 25 - 2}%`,
                    top: '50%',
                    transform: 'translateY(-50%)'
                  }}>
                    <ArrowRight className="w-4 h-4 text-primary/50" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Data flow indicator */}
          <div className="mt-8 flex items-center justify-center gap-2">
            <span className="text-xs text-muted-foreground font-mono">DATA FLOW</span>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <div className="w-8 h-px bg-gradient-to-r from-primary to-secondary" />
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="mt-12 p-4 border border-dashed border-muted-foreground/30 rounded-sm">
          <p className="text-sm text-muted-foreground text-center">
            <span className="text-primary font-mono">Note:</span> The Explainer (LLM) is an optional interface layer.
            Remove it and the decision engine continues to function.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ArchitectureSection;
