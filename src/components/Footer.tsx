import React from 'react';
import { Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative py-16 px-6 md:px-16 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo and tagline */}
          <div className="text-center md:text-left">
            <a href="#hero" className="font-pixel text-xl text-primary glow-primary cursor-target">
              AXIOM
            </a>
            <p className="mt-2 text-sm text-muted-foreground max-w-xs">
              Operational intelligence, not opinions.
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-target flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <Github size={20} />
              <span className="text-sm">GitHub</span>
            </a>
            
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              <span>v0.1-alpha</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} AXIOM. All rights reserved.
          </p>
          
          {/* Decorative element */}
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 bg-primary rounded-full" />
            <div className="w-1 h-1 bg-secondary rounded-full" />
            <div className="w-1 h-1 bg-accent rounded-full" />
          </div>
        </div>
      </div>

      {/* Corner decoration */}
      <div className="absolute bottom-4 right-4 opacity-20">
        <div className="font-pixel text-[8px] text-primary tracking-widest">
          AXIOM
        </div>
      </div>
    </footer>
  );
};

export default Footer;
