
import React, { useState } from 'react';
import { NavItem } from '../types';

const navItems: NavItem[] = [
  { label: 'Menü', href: '#menu' },
  { label: 'Hikayemiz', href: '#story' },
  { label: 'İletişim', href: '#contact' },
];

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 right-0 z-[70] p-8 md:p-12">
      <div className="flex flex-col items-end">
        {/* The 3-Dots Button with refined animations */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`w-12 h-12 flex flex-col items-center justify-center space-y-1 group focus:outline-none bg-black/40 backdrop-blur-md rounded-full border transition-all duration-500 shadow-2xl ${
            isOpen ? 'border-amber-200/40 rotate-180' : 'border-white/10 hover:border-amber-200/50'
          }`}
          aria-label="Toggle Menu"
        >
          <span className={`w-1 h-1 rounded-full transition-all duration-500 transform ${
            isOpen ? 'bg-amber-200 scale-[1.5] -translate-y-0.5' : 'bg-white group-hover:bg-amber-200'
          }`}></span>
          <span className={`w-1 h-1 rounded-full transition-all duration-500 transform ${
            isOpen ? 'bg-amber-200 scale-[0.8] opacity-50' : 'bg-white group-hover:bg-amber-200'
          }`}></span>
          <span className={`w-1 h-1 rounded-full transition-all duration-500 transform ${
            isOpen ? 'bg-amber-200 scale-[1.5] translate-y-0.5' : 'bg-white group-hover:bg-amber-200'
          }`}></span>
        </button>

        {/* Expandable Menu Items */}
        <div className={`mt-8 flex flex-col items-end space-y-8`}>
          {navItems.map((item, index) => (
            <a 
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              style={{ 
                transitionDelay: isOpen ? `${index * 120}ms` : '0ms',
              }}
              className={`
                text-sm md:text-base uppercase tracking-[0.4em] font-medium 
                transition-all duration-500 ease-out transform
                px-4 py-2
                hover:scale-110 hover:text-amber-200
                ${isOpen 
                  ? 'opacity-100 translate-y-0 text-white/70' 
                  : 'opacity-0 -translate-y-6 pointer-events-none text-white/0'
                }
              `}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
