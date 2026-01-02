import React from 'react';
import NeuralNetwork from './ui/NeuralNetwork';

const ArchitectureSection: React.FC = () => {
  return (
    <section id="architecture" className="relative py-24 px-6 md:px-16 bg-card/50">
      {/* Section header */}
      <div className="max-w-6xl mx-auto mb-12">
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

      {/* Neural Network Visualization */}
      <div className="max-w-5xl mx-auto">
        <NeuralNetwork />

        {/* Note */}
        <div className="mt-8 p-4 border border-dashed border-muted-foreground/30 rounded-sm">
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
