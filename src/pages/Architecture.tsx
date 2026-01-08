import React from 'react';
import Navigation from '@/components/Navigation';
import ArchitectureSection from '@/components/ArchitectureSection';
import Footer from '@/components/Footer';

const Architecture: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Hero header */}
      <section className="pt-32 pb-12 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-secondary" />
            <span className="text-xs text-secondary font-mono tracking-wider">DEEP DIVE</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            System <span className="text-secondary">Architecture</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Explore the modular architecture that powers AXIOM's decision engine. 
            Each component has a clear responsibility, working together to deliver 
            transparent, evidence-based reasoning.
          </p>
        </div>
      </section>

      {/* Architecture visualization */}
      <ArchitectureSection />

      <Footer />
    </div>
  );
};

export default Architecture;
