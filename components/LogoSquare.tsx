
import React, { useState, useRef, useEffect } from 'react';

interface LogoSquareProps {
  onEasterEggTriggered?: () => void;
}

const LogoSquare: React.FC<LogoSquareProps> = ({ onEasterEggTriggered }) => {
  const [clickCount, setClickCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const lastClickRef = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      setIsScrolled(scrollY > 50);
      // Hide the logo when we've scrolled past the hero section (minus a small buffer for smooth transition)
      setIsPastHero(scrollY > viewportHeight - 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    const timer = setTimeout(() => setIsLoaded(true), 200);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const handleClick = () => {
    const now = Date.now();
    if (now - lastClickRef.current < 1000) {
      const newCount = clickCount + 1;
      if (newCount >= 5) {
        onEasterEggTriggered?.();
        setClickCount(0);
      } else {
        setClickCount(newCount);
      }
    } else {
      setClickCount(1);
    }
    lastClickRef.current = now;
  };

  return (
    <div 
      onClick={handleClick}
      className={`fixed top-0 left-0 z-[60] flex items-center justify-center transition-all duration-[1200ms] ease-in-out select-none cursor-pointer group ${
        isPastHero 
          ? 'opacity-0 pointer-events-none translate-y-[-20px]' 
          : 'opacity-100 translate-y-0'
      } ${
        isScrolled 
          ? 'w-24 h-24 md:w-32 md:h-32 bg-black/20 backdrop-blur-xl' 
          : 'w-32 h-32 md:w-48 md:h-48 bg-transparent'
      }`}
    >
      {/* Background overlay for scrolled state */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${isScrolled ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent"></div>
      </div>

      {/* Subtle Corner Guides - Fade out faster on scroll */}
      <div className={`absolute inset-10 transition-all duration-700 ${isScrolled ? 'opacity-0 scale-90' : 'opacity-0 scale-100 group-hover:opacity-10'}`}>
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/40"></div>
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/40"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/40"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/40"></div>
      </div>

      <div className={`relative flex items-center justify-center transition-all duration-1000 transform ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-2'}`}>
        {!imgError ? (
          <img 
            src="freyalogo.png" 
            alt="Freya Logo" 
            onError={() => setImgError(true)}
            className={`w-16 h-16 md:w-28 md:h-28 object-contain mix-blend-screen transition-all duration-1000 ease-in-out ${
              isScrolled 
                ? 'scale-[0.45] opacity-70 sepia-[0.5] brightness-110 animate-gentle-pulse' 
                : 'scale-90 brightness-125'
            }`}
          />
        ) : (
          <div className={`font-serif italic text-2xl md:text-3xl tracking-tighter transition-all duration-1000 ${isScrolled ? 'text-amber-100/40 scale-75 animate-gentle-pulse' : 'text-white/90'}`}>
            Freya
          </div>
        )}
        
        {/* Minimal ambient glow */}
        <div className={`absolute inset-0 bg-amber-200/5 blur-[40px] rounded-full transition-opacity duration-1000 pointer-events-none ${isScrolled ? 'opacity-30' : 'opacity-0'}`}></div>
      </div>

      {/* Refined progress accent: Hairline thin, very slow, minimal color */}
      <div 
        className="absolute bottom-0 left-0 h-[0.5px] bg-amber-200/20 transition-all duration-[3000ms] ease-in-out" 
        style={{ width: isScrolled ? '100%' : '0%' }}
      ></div>

      <style>{`
        @keyframes gentle-pulse {
          0% { opacity: 0.6; transform: scale(0.45); }
          50% { opacity: 0.8; transform: scale(0.46); }
          100% { opacity: 0.6; transform: scale(0.45); }
        }
        .animate-gentle-pulse {
          animation: gentle-pulse 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LogoSquare;
