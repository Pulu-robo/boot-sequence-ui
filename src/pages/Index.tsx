import React, { useState } from 'react';
import BootSequence from '@/components/BootSequence';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import ArchitectureSection from '@/components/ArchitectureSection';
import Footer from '@/components/Footer';
import TargetCursor from '@/components/ui/TargetCursor';

const Index: React.FC = () => {
  const [showBoot, setShowBoot] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleBootComplete = () => {
    // Fade out boot sequence
    setTimeout(() => {
      setShowBoot(false);
      setShowContent(true);
    }, 500);
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Target cursor - global */}
      <TargetCursor spinDuration={3} hoverDuration={0.3} />

      {/* Boot sequence */}
      {showBoot && (
        <div 
          className={`transition-opacity duration-500 ${showContent ? 'opacity-0' : 'opacity-100'}`}
        >
          <BootSequence onComplete={handleBootComplete} />
        </div>
      )}

      {/* Main content */}
      {showContent && (
        <div className="animate-fade-in">
          {/* Scanline overlay */}
          <div className="fixed inset-0 pointer-events-none scanlines z-50" />
          
          {/* Navigation */}
          <Navigation />

          {/* Main sections */}
          <main>
            <HeroSection />
            <FeaturesSection />
            <ArchitectureSection />
          </main>

          {/* Footer */}
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Index;
