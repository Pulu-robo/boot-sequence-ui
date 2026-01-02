import React, { useState } from 'react';
import BootSequence from '@/components/BootSequence';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import ArchitectureSection from '@/components/ArchitectureSection';
import Footer from '@/components/Footer';
import TargetCursor from '@/components/ui/TargetCursor';
import PixelBlast from '@/components/ui/PixelBlast';

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

      {/* PixelBlast Background - Full Screen */}
      {showContent && (
        <div 
          className="fixed inset-0" 
          style={{ 
            width: '100vw', 
            height: '100vh',
            top: 0,
            left: 0,
            zIndex: 0
          }}
        >
          <PixelBlast
            color="#B19EEF"
            pixelSize={4}
            variant="square"
            patternScale={1.5}
            patternDensity={0.7}
            enableRipples={true}
            rippleIntensityScale={2.5}
            rippleThickness={0.08}
            rippleSpeed={0.4}
            speed={0.2}
            transparent={true}
            edgeFade={0}
            antialias={false}
          />
        </div>
      )}

      {/* Main content */}
      {showContent && (
        <div className="animate-fade-in relative" style={{ zIndex: 10 }}>
          {/* Scanline overlay */}
          <div className="fixed inset-0 pointer-events-none scanlines" style={{ zIndex: 50 }} />
          
          {/* Navigation */}
          <div className="relative pointer-events-auto" style={{ zIndex: 40 }}>
            <Navigation />
          </div>

          {/* Main sections */}
          <main className="relative pointer-events-auto" style={{ zIndex: 20 }}>
            <HeroSection />
            <FeaturesSection />
            <ArchitectureSection />
          </main>

          {/* Footer */}
          <div className="relative pointer-events-auto" style={{ zIndex: 20 }}>
            <Footer />
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
