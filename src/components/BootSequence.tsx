import React, { useState, useEffect } from 'react';

interface BootSequenceProps {
  onComplete: () => void;
}

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'ready' | 'exit'>('loading');

  useEffect(() => {
    const bootLogs = [
      '> Initializing AXIOM core...',
      '> Loading decision modules...',
      '> Calibrating risk models...',
      '> Evidence framework online...',
      '> Operational intelligence ready.',
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < bootLogs.length) {
        setLogs(prev => [...prev, bootLogs[index]]);
        setProgress((index + 1) / bootLogs.length * 100);
        index++;
      } else {
        clearInterval(interval);
        setPhase('ready');
        
        // Wait a moment then exit
        setTimeout(() => {
          setPhase('exit');
          setTimeout(onComplete, 600);
        }, 1500);
      }
    }, 250);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 bg-background z-50 flex flex-col items-center justify-center overflow-hidden transition-opacity duration-500 ${
        phase === 'exit' ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Scanline overlay */}
      <div className="absolute inset-0 scanlines pointer-events-none" />
      
      {/* Boot logs */}
      <div className="absolute top-8 left-8 font-mono text-xs text-muted-foreground space-y-1 opacity-60">
        {logs.map((log, i) => (
          <div 
            key={i} 
            className="animate-fade-in-up"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            {log}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center">
        {/* AXIOM wordmark with glitch effect */}
        <div className={`font-pixel text-5xl md:text-7xl lg:text-8xl text-primary transition-all duration-300 ${
          phase === 'ready' ? 'glitch-text glow-primary scale-110' : 'boot-flicker'
        }`}>
          AXIOM
        </div>
        
        {/* Progress bar */}
        <div className="mt-8 w-64 h-1 bg-muted rounded overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Status text */}
        <p className={`mt-4 text-sm font-mono tracking-wider transition-all duration-300 ${
          phase === 'ready' ? 'text-primary' : 'text-muted-foreground'
        }`}>
          {phase === 'ready' ? (
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              System initialized
            </span>
          ) : (
            <span>
              Initializing operational intelligence
              <span className="cursor-blink">_</span>
            </span>
          )}
        </p>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary/30" />
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-primary/30" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-primary/30" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary/30" />
      
      {/* Decorative grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
    </div>
  );
};

export default BootSequence;
