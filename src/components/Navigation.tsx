import React from 'react';
import StaggeredMenu from './ui/StaggeredMenu';

const menuItems = [
  { label: 'Overview', ariaLabel: 'Go to overview section', link: '#hero' },
  { label: 'How It Works', ariaLabel: 'Learn how it works', link: '#features' },
  { label: 'Architecture', ariaLabel: 'View architecture', link: '#architecture' },
  { label: 'Evidence & Safety', ariaLabel: 'View evidence and safety', link: '#evidence' },
  { label: 'Chat', ariaLabel: 'Chat with AXIOM', link: '/chat', isRoute: true },
  { label: 'GitHub', ariaLabel: 'View on GitHub', link: 'https://github.com', isExternal: true },
];

const socialItems = [
  { label: 'Twitter', link: 'https://twitter.com' },
  { label: 'GitHub', link: 'https://github.com' },
  { label: 'Discord', link: 'https://discord.com' },
];

const Navigation: React.FC = () => {
  return (
    <StaggeredMenu
      items={menuItems}
      socialItems={socialItems}
      position="right"
      accentColor="hsl(var(--primary))"
      menuButtonColor="hsl(var(--foreground))"
      openMenuButtonColor="hsl(var(--foreground))"
      colors={['hsl(var(--primary) / 0.15)', 'hsl(var(--card) / 0.98)']}
      displaySocials={true}
      displayItemNumbering={true}
      isFixed={true}
      closeOnClickAway={true}
    />
  );
};

export default Navigation;
