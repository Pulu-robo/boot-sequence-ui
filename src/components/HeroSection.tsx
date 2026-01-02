import React from 'react';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import PixelBlast from '@/components/ui/PixelBlast';

const HeroSection: React.FC = () => {
  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 pt-24 pb-16"
    >
      {/* Content */}
      <div className="relative z-50 max-w-4xl mx-auto md:mx-0 md:ml-[10%] pointer-events-auto">
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

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 relative z-50 pointer-events-auto">
          <Link to="/chat" className="pointer-events-auto">
            <Button
              variant="hero"
              size="lg"
              className="cursor-target group pointer-events-auto"
            >
              <MessageSquare className="mr-2 w-5 h-5" />
              <span>Chat with AXIOM</span>
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            className="cursor-target border-border text-muted-foreground hover:text-foreground hover:border-primary/50 pointer-events-auto"
            onClick={() => {
              const featuresSection = document.getElementById('features');
              if (featuresSection) {
                featuresSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <span>Explore Features</span>
          </Button>
        </div>

        {/* Decorative line */}
        <div className="mt-16 flex items-center gap-4">
          <div className="w-16 h-px bg-gradient-to-r from-primary to-transparent" />
          <span className="text-xs text-muted-foreground font-mono tracking-wider">
            SCROLL TO EXPLORE
          </span>
        </div>
      </div>

      {/* Corner brackets */}
      <div className="absolute bottom-8 right-8 hidden md:block pointer-events-none">
        <div className="w-24 h-24 border-r-2 border-b-2 border-primary/20" />
      </div>
    </section>
  );
};

export default HeroSection;
