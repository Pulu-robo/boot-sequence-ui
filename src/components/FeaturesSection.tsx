import React from 'react';
import PixelTransition from '@/components/ui/PixelTransition';
import { 
  Target, 
  FileCheck, 
  AlertTriangle, 
  ShieldCheck, 
  Layers, 
  MessageSquare 
} from 'lucide-react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  detail: string;
}

const features: Feature[] = [
  {
    icon: <Target className="w-8 h-8" />,
    title: 'Decision Optimization Engine',
    description: 'AXIOM does not predict outcomes — it evaluates actions.',
    detail: 'Every recommendation is the result of explicit economic trade-offs, uncertainty penalties, and safety constraints. No black-box predictions.'
  },
  {
    icon: <FileCheck className="w-8 h-8" />,
    title: 'No Decision Without Evidence',
    description: 'Every decision is backed by immutable evidence objects.',
    detail: 'No evidence means no action — by design. Each decision chain is fully traceable and auditable.'
  },
  {
    icon: <AlertTriangle className="w-8 h-8" />,
    title: 'Risk With Bounds, Not Guesswork',
    description: 'AXIOM outputs expected gain and uncertainty.',
    detail: 'Optimism is penalized. Confidence is earned through rigorous uncertainty quantification and bounded risk assessment.'
  },
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    title: 'Safe by Default',
    description: 'AXIOM can choose to do nothing.',
    detail: 'When evidence is weak or novelty is high, abstention protects the business. Safety is a feature, not a constraint.'
  },
  {
    icon: <Layers className="w-8 h-8" />,
    title: 'No Feedback Loops',
    description: 'Realtime decisions never retrain models.',
    detail: 'Learning happens slowly, offline, and with human approval. This separation prevents dangerous self-reinforcing cycles.'
  },
  {
    icon: <MessageSquare className="w-8 h-8" />,
    title: 'Language Without Control',
    description: 'LLMs explain decisions — they never make them.',
    detail: 'Remove the explainer and AXIOM still works. Language is an interface layer, not the decision engine.'
  }
];

const FeatureCard: React.FC<{ feature: Feature; index: number }> = ({ feature, index }) => {
  const firstContent = (
    <div className="absolute inset-0 p-6 flex flex-col">
      <div className="text-primary mb-4">
        {feature.icon}
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        {feature.title}
      </h3>
      <p className="text-sm text-muted-foreground flex-1">
        {feature.description}
      </p>
      <div className="mt-4 text-xs text-primary font-mono">
        [ HOVER FOR MORE ]
      </div>
    </div>
  );

  const secondContent = (
    <div className="absolute inset-0 p-6 flex flex-col bg-card/95 backdrop-blur-sm">
      <div className="text-secondary mb-4">
        {feature.icon}
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-3">
        {feature.title}
      </h3>
      <p className="text-sm text-foreground leading-relaxed flex-1">
        {feature.detail}
      </p>
      <div className="mt-4 flex items-center gap-2">
        <span className="text-xs font-mono text-muted-foreground">0{index + 1}</span>
        <div className="flex-1 h-px bg-primary/30" />
      </div>
    </div>
  );

  return (
    <PixelTransition
      firstContent={firstContent}
      secondContent={secondContent}
      gridSize={10}
      pixelColor="hsl(261, 68%, 77%)"
      animationStepDuration={0.4}
      aspectRatio="120%"
      className="cursor-target"
    />
  );
};

const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="relative py-24 px-6 md:px-16">
      {/* Section header */}
      <div className="max-w-6xl mx-auto mb-16">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-px bg-primary" />
          <span className="text-xs text-primary font-mono tracking-wider">CORE FEATURES</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Not Prediction.{' '}
          <span className="text-primary">Decision.</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl">
          AXIOM is built on principles that distinguish it from traditional ML systems.
          Every feature exists for a reason — engineering seriousness, not hype.
        </p>
      </div>

      {/* Feature grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <FeatureCard key={feature.title} feature={feature} index={index} />
        ))}
      </div>

      {/* Bottom decoration */}
      <div className="max-w-6xl mx-auto mt-16 flex items-center justify-center gap-4">
        <div className="w-2 h-2 bg-primary rounded-full animate-pulse-glow" />
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
        <div className="w-2 h-2 bg-primary rounded-full animate-pulse-glow" />
      </div>
    </section>
  );
};

export default FeaturesSection;
