import React, { useState } from 'react';
import { gsap } from 'gsap';
import { Menu, X, Github, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
  isChat?: boolean;
}

const navItems: NavItem[] = [
  { label: 'Overview', href: '#hero' },
  { label: 'How It Works', href: '#features' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'Chat with AXIOM', href: '/chat', isChat: true },
  { label: 'GitHub', href: 'https://github.com', isExternal: true },
];

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    
    if (!isOpen) {
      gsap.fromTo(
        '.nav-item',
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.1, duration: 0.4, ease: 'power3.out', delay: 0.2 }
      );
    }
  };

  return (
    <>
      {/* Fixed header */}
      <header className="fixed top-0 left-0 right-0 z-40 p-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="font-pixel text-sm md:text-base text-primary glow-primary cursor-target">
          AXIOM
        </a>

        {/* Menu toggle button */}
        <button
          onClick={toggleMenu}
          className="cursor-target flex items-center gap-2 text-foreground hover:text-primary transition-colors duration-300"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          <span className="text-sm font-medium hidden sm:inline">
            {isOpen ? 'Close' : 'Menu'}
          </span>
          <span className="relative w-6 h-6 flex items-center justify-center">
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </span>
        </button>
      </header>

      {/* Full-screen menu overlay */}
      <div
        className={`fixed inset-0 z-30 transition-all duration-500 ${
          isOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop layers for staggered effect */}
        <div 
          className={`absolute inset-0 bg-primary/10 transition-transform duration-500 ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ transitionDelay: '0ms' }}
        />
        <div 
          className={`absolute inset-0 bg-card/95 backdrop-blur-md transition-transform duration-500 ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ transitionDelay: '100ms' }}
        />

        {/* Menu content */}
        <nav className="relative z-10 h-full flex flex-col justify-center items-end pr-8 md:pr-16">
          <ul className="space-y-6 text-right">
            {navItems.map((item, index) => (
              <li key={item.label} className="nav-item opacity-0">
                {item.isChat ? (
                  <Link
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className="cursor-target group flex items-center justify-end gap-4 text-2xl md:text-4xl font-medium text-primary hover:text-secondary transition-colors duration-300"
                  >
                    <span className="text-sm text-muted-foreground font-mono">
                      0{index + 1}
                    </span>
                    <span className="relative">
                      {item.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full" />
                    </span>
                    <MessageSquare size={24} className="ml-2" />
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="cursor-target group flex items-center justify-end gap-4 text-2xl md:text-4xl font-medium text-foreground hover:text-primary transition-colors duration-300"
                    target={item.isExternal ? '_blank' : undefined}
                    rel={item.isExternal ? 'noopener noreferrer' : undefined}
                  >
                    <span className="text-sm text-muted-foreground font-mono">
                      0{index + 1}
                    </span>
                    <span className="relative">
                      {item.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                    </span>
                    {item.label === 'GitHub' && (
                      <Github size={24} className="ml-2" />
                    )}
                  </a>
                )}
              </li>
            ))}
          </ul>

          {/* Version badge */}
          <div className="mt-12 text-xs text-muted-foreground font-mono">
            v0.1-alpha
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navigation;
