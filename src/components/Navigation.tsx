import React from 'react';
import StaggeredMenu from './StaggeredMenu';
import type { StaggeredMenuItem, StaggeredMenuSocialItem } from './StaggeredMenu';

const menuItems: StaggeredMenuItem[] = [
  { label: 'Architecture', ariaLabel: 'View architecture', link: '#architecture' },
  { label: 'Evidence & Safety', ariaLabel: 'Learn about evidence and safety', link: '#evidence' },
  { label: 'Chat', ariaLabel: 'Go to chat', link: '/chat' },
];

const socialItems: StaggeredMenuSocialItem[] = [
  { label: 'Contact Us', link: '#contact' },
  { label: 'About Devs', link: '/about-devs' },
];

const Navigation: React.FC = () => {
  return (
    <StaggeredMenu
      position="right"
      items={menuItems}
      socialItems={socialItems}
      displaySocials={true}
      displayItemNumbering={true}
      accentColor="#ffa629"
      menuButtonColor="#ebe6ef"
      openMenuButtonColor="#000000"
      changeMenuColorOnOpen={true}
      isFixed={true}
      closeOnClickAway={true}
      colors={['#1a1a1a', '#2a2a2a']}
    />
  );
};

export default Navigation;
