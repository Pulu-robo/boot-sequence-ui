import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection: React.FC = () => {
  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 pt-24 pb-16"
    >
      {/* Subtle pixel grid background */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />

      {/* Gradient orb */}
      <div 
        className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)'
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl">
        {/* AXIOM wordmark */}
        <h1 className="font-pixel text-5xl md:text-7xl lg:text-8xl text-primary glitch-text glow-primary mb-6">
          AXIOM
        </h1>

        {/* Full form */}
        <p className="text-xl md:text-2xl lg:text-3xl text-foreground font-light leading-relaxed mb-4">
          <span className="text-primary font-medium">A</span>xiomatic{' '}
          <span className="text-primary font-medium">X</span>ecution &{' '}
          <span className="text-primary font-medium">I</span>nference{' '}
          <span className="text-primary font-medium">O</span>ptimization{' '}
          <span className="text-primary font-medium">M</span>odel
        </p>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12">
          Operational Reasoning & Intelligence Optimization.
          <br />
          Decision systems that evaluate actions, not predict outcomes.
        </p>

        {/* CTA Button */}
        <Button
          variant="hero"
          size="lg"
          className="cursor-target group"
          onClick={() => {
            const featuresSection = document.getElementById('features');
            if (featuresSection) {
              featuresSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          <span>Explore AXIOM</span>
          <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
        </Button>

        {/* Decorative line */}
        <div className="mt-16 flex items-center gap-4">
          <div className="w-16 h-px bg-gradient-to-r from-primary to-transparent" />
          <span className="text-xs text-muted-foreground font-mono tracking-wider">
            SCROLL TO EXPLORE
          </span>
        </div>
      </div>

      {/* Corner brackets */}
      <div className="absolute bottom-8 right-8 hidden md:block">
        <div className="w-24 h-24 border-r-2 border-b-2 border-primary/20" />
      </div>
    </section>
  );
};

export default HeroSection;
