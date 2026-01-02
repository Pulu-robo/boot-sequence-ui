import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AboutDevs: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </nav>

      {/* Content */}
      <main className="container mx-auto px-6 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-pixel text-4xl md:text-6xl text-primary mb-8">
            About the Developers
          </h1>
          
          <div className="space-y-8">
            <section className="border border-border rounded-lg p-6 bg-background/50">
              <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
              <p className="text-muted-foreground leading-relaxed">
                AXIOM is developed by a team of passionate AI researchers and engineers 
                dedicated to building transparent, reliable, and safe AI systems. Our 
                mission is to create AI that reasons about actions and their consequences 
                rather than simply predicting outcomes.
              </p>
            </section>

            <section className="border border-border rounded-lg p-6 bg-background/50">
              <h2 className="text-2xl font-semibold mb-4">Philosophy</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We believe in:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Operational reasoning over outcome prediction</li>
                <li>Transparency and explainability in AI systems</li>
                <li>Safety and alignment by design</li>
                <li>Evidence-based decision making</li>
              </ul>
            </section>

            <section className="border border-border rounded-lg p-6 bg-background/50">
              <h2 className="text-2xl font-semibold mb-4">Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                Want to learn more or collaborate with us? Feel free to reach out 
                through our contact page or explore our open-source contributions 
                on GitHub.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutDevs;
