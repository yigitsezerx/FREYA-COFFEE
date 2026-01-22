
import React, { useState, useRef, useEffect } from 'react';

interface LogoSquareProps {
  onEasterEggTriggered?: () => void;
}

const LogoSquare: React.FC<LogoSquareProps> = ({ onEasterEggTriggered }) => {
  const [clickCount, setClickCount] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0); // 0 to 1
  const [isLoaded, setIsLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const lastClickRef = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      // Calculate progress: 0 at top, 1 at the end of hero
      const progress = Math.min(scrollY / (viewportHeight * 0.8), 1);
      setScrollProgress(progress);
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

  // Dynamic styles based on scroll
  const opacity = 1 - scrollProgress;
  const scale = 1 - (scrollProgress * 0.4); // Scales down to 60%
  const translateY = scrollProgress * -20; // Moves up slightly as it fades

  return (
    <div 
      onClick={handleClick}
      style={{ 
        opacity: opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        pointerEvents: opacity < 0.1 ? 'none' : 'auto'
      }}
      className="fixed top-0 left-0 z-[60] w-32 h-32 md:w-48 md:h-48 flex items-center justify-center select-none cursor-pointer group transition-all duration-300 ease-out"
    >
      <div className={`relative flex items-center justify-center transition-all duration-1000 transform ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-2'}`}>
        {!imgError ? (
          <img 
            src="freyalogo.png" 
            alt="Freya Logo" 
            onError={() => setImgError(true)}
            className="w-16 h-16 md:w-28 md:h-28 object-contain mix-blend-screen transition-all duration-700 ease-in-out group-hover:brightness-150 group-hover:scale-110 animate-gentle-pulse"
          />
        ) : (
          <div className="font-serif italic text-2xl md:text-3xl tracking-tighter text-white/90 group-hover:text-amber-200 transition-colors duration-700">
            Freya
          </div>
        )}
        
        {/* Ambient Glow on Hover */}
        <div className="absolute inset-0 bg-amber-200/0 group-hover:bg-amber-200/10 blur-[40px] rounded-full transition-all duration-1000 pointer-events-none"></div>
      </div>

      <style>{`
        @keyframes gentle-pulse {
          0% { filter: drop-shadow(0 0 0px rgba(251, 191, 36, 0)); transform: scale(0.95); }
          50% { filter: drop-shadow(0 0 10px rgba(251, 191, 36, 0.2)); transform: scale(1); }
          100% { filter: drop-shadow(0 0 0px rgba(251, 191, 36, 0)); transform: scale(0.95); }
        }
        .animate-gentle-pulse {
          animation: gentle-pulse 4s ease-in-out infinite;
        }
        .group:hover .animate-gentle-pulse {
          animation-duration: 2s;
        }
      `}</style>
    </div>
  );
};

export default LogoSquare;
