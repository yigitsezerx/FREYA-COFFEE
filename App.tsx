import React, { useEffect, useState, useRef } from 'react';
import LogoSquare from './components/LogoSquare';
import Navigation from './components/Navigation';
import CoffeeBeanRain from './components/CoffeeBeanRain';
import { generateCoffeeStory } from './services/geminiService';
import { CoffeeStory } from './types';

const App: React.FC = () => {
  const [story, setStory] = useState<CoffeeStory | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoOpacity, setVideoOpacity] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [triggerRain, setTriggerRain] = useState(0);
  const [parallaxY, setParallaxY] = useState(0);
  const [loadingText, setLoadingText] = useState("Hikayenizi yazıyoruz...");
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const storyImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchStory = async () => {
      // Not: Servis dosyasında prompt'u Türkçe yapmayı unutma
      const data = await generateCoffeeStory();
      setStory(data);
      setLoading(false);
    };
    fetchStory();

    const phrases = ["Kahvenizi hasat ediyoruz...", "Kahvenizi kavuruyoruz...", "Kahvenizi demliyoruz...", "Kahve kremanızı mükemmelleştiriyoruz..."];
    let phraseIdx = 0;
    const phraseInterval = setInterval(() => {
      phraseIdx = (phraseIdx + 1) % phrases.length;
      setLoadingText(phrases[phraseIdx]);
    }, 1500);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
      if (storyImageRef.current) {
        const rect = storyImageRef.current.getBoundingClientRect();
        const speed = 0.2;
        const offset = (window.innerHeight - rect.top) * speed;
        setParallaxY(offset);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(phraseInterval);
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setVideoOpacity(1), 100);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  const togglePlayback = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setVideoOpacity(0.2); 
      } else {
        videoRef.current.play();
        setVideoOpacity(1);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEasterEgg = () => {
    setTriggerRain(prev => prev + 1);
  };

  return (
    <div className="bg-black text-white selection:bg-amber-200/30">
      <LogoSquare onEasterEggTriggered={handleEasterEgg} />
      <Navigation />
      
      {triggerRain > 0 && <CoffeeBeanRain key={triggerRain} />}

      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 left-8 z-50 p-4 rounded-full border border-white/10 bg-black/40 backdrop-blur-md transition-all duration-500 hover:border-amber-200/50 group ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <svg className="w-5 h-5 text-white/50 group-hover:text-amber-200 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>

      {/* Hero Section */}
      <section id="hero" className="relative w-screen h-screen overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute inset-0 z-0 bg-black">
          <video 
            ref={videoRef}
            autoPlay 
            muted 
            loop 
            playsInline
            style={{ opacity: videoOpacity }}
            className="w-full h-full object-cover brightness-[0.35] transition-opacity duration-1000 ease-in-out"
            poster="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1920"
          >
            <source src="/extraction.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black opacity-90 pointer-events-none"></div>
        </div>

        <div className="relative z-10 w-full h-full px-8 md:px-24 flex flex-col md:flex-row items-center justify-between pointer-events-none max-w-7xl mx-auto">
          <div className="w-full md:w-3/4 lg:w-3/5 flex flex-col justify-center space-y-6 pointer-events-auto mt-20 md:mt-0">
            {!loading && story ? (
              <div className="max-w-4xl">
                <span className="text-amber-200/80 uppercase tracking-[0.6em] text-[10px] md:text-xs mb-6 block animate-fade-in opacity-0">
                  Freya'nın Ruhu
                </span>
                <h2 className="text-4xl md:text-6xl lg:text-8xl font-serif italic mb-8 leading-[1.1] animate-fade-in delay-200 opacity-0 tracking-tight">
                  {story.heading}
                </h2>
                <p className="text-base md:text-xl font-light text-white/80 max-w-lg leading-relaxed border-l border-amber-200/20 pl-8 animate-fade-in delay-400 opacity-0">
                  {story.subtext}
                </p>
              </div>
            ) : (
              <div className="space-y-8 max-w-2xl">
                <div>
                   <span className="text-white/20 uppercase tracking-[0.4em] text-[10px] mb-4 block animate-pulse">
                    {loadingText}
                  </span>
                  <div className="h-16 md:h-24 w-full bg-white/5 animate-pulse rounded-sm"></div>
                </div>
                <div className="space-y-3 pl-8 border-l border-white/5">
                  <div className="h-3 w-full bg-white/5 animate-pulse rounded-full"></div>
                  <div className="h-3 w-5/6 bg-white/5 animate-pulse delay-75 rounded-full"></div>
                </div>
              </div>
            )}
          </div>
          
          <div className="hidden lg:flex w-1/4 flex-col justify-center items-end text-right space-y-12 pointer-events-auto">
            {!loading && story && (
              <div className="animate-fade-in delay-700 opacity-0">
                <h3 className="text-[10px] uppercase tracking-[0.4em] text-white/30 mb-3">Atmosfer</h3>
                <p className="text-base italic font-serif text-amber-100/30 leading-relaxed">
                  "{story.poeticDetail}"
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="absolute bottom-40 right-10 md:right-18 lg:right-24 z-20 hidden md:flex flex-col items-center">
          <div className="w-[1px] h-32 md:h-48 bg-white/5 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-amber-200/30 animate-scroll-line"></div>
          </div>
        </div>

        <div className="absolute bottom-12 left-8 md:left-auto md:right-24 z-20 animate-fade-in delay-1000 opacity-0 pointer-events-auto">
          <button 
            onClick={togglePlayback} 
            className="flex items-center space-x-4 text-[10px] uppercase tracking-[0.3em] text-white/50 hover:text-white transition-all duration-300 group"
          >
            <span>{isPlaying ? 'Duraklat' : 'Oynat'}</span>
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-amber-200/40 transition-colors">
              {isPlaying ? (
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
              ) : (
                <svg className="w-3 h-3 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              )}
            </div>
          </button>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="min-h-screen bg-[#080808] py-32 px-8 md:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 md:mb-32">
            <h2 className="text-4xl md:text-6xl font-serif italic mb-6">Önerdiklerimiz</h2>
            <div className="h-px w-20 bg-amber-200/30"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-0">
            {/* Coffee Item 1 */}
            <div className="group cursor-pointer border-b lg:border-b-0 lg:border-r border-white/5 pb-16 lg:pb-0 lg:pr-12 transition-all duration-700 animate-fade-in opacity-0 delay-100">
              <div className="aspect-[4/5] overflow-hidden mb-8 bg-white/5 relative">
                <img src="https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-1000 ease-out" alt="Coffee" />
              </div>
              <h3 className="text-xl md:text-2xl font-serif mb-3 group-hover:text-amber-200 transition-colors">Yirgacheffe Pour Over</h3>
              <p className="text-[10px] tracking-[0.3em] text-white/40 uppercase mb-4 font-medium">Floral • Citrus • Tea-like</p>
              <p className="text-sm font-light text-white/60 leading-relaxed max-w-xs">Hand-selected beans from Ethiopia's high altitude farms, roasted in our light Nordic style.</p>
            </div>

            {/* Coffee Item 2 */}
            <div className="group cursor-pointer border-b lg:border-b-0 lg:border-r border-white/5 py-16 lg:py-0 lg:px-12 transition-all duration-700 animate-fade-in opacity-0 delay-300">
              <div className="aspect-[4/5] overflow-hidden mb-8 bg-white/5 relative">
                <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-1000 ease-out" alt="Espresso" />
              </div>
              <h3 className="text-xl md:text-2xl font-serif mb-3 group-hover:text-amber-200 transition-colors">Signature Espresso</h3>
              <p className="text-[10px] tracking-[0.3em] text-white/40 uppercase mb-4 font-medium">Dark Chocolate • Stone Fruit</p>
              <p className="text-sm font-light text-white/60 leading-relaxed max-w-xs">Our house blend, balanced for a rich body and lingering sweetness.</p>
            </div>

            {/* Dessert Item */}
            <div className="group cursor-pointer pt-16 lg:pt-0 lg:pl-12 transition-all duration-700 animate-fade-in opacity-0 delay-500">
              <div className="aspect-[4/5] overflow-hidden mb-8 bg-white/5 relative">
                <img src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-1000 ease-out" alt="Pastry" />
              </div>
              <h3 className="text-xl md:text-2xl font-serif mb-3 group-hover:text-amber-200 transition-colors">Cardamom Brioche</h3>
              <p className="text-[10px] tracking-[0.3em] text-white/40 uppercase mb-4 font-medium">Buttery • Aromatic • Sweet</p>
              <p className="text-sm font-light text-white/60 leading-relaxed max-w-xs">Freshly baked with organic spices and premium cultured butter.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section id="story" className="min-h-screen bg-black flex flex-col lg:flex-row items-center justify-center overflow-hidden">
        <div className="w-full lg:w-1/2 py-24 px-8 md:px-24">
          <div className="max-w-xl mx-auto lg:ml-auto lg:mr-0">
            <span className="text-amber-200/70 uppercase tracking-[0.5em] text-[10px] mb-8 block font-medium">Hikayemiz</span>
            <h2 className="text-5xl md:text-7xl font-serif italic mb-12 leading-[1.2] tracking-tight">Huzurlu Anların <br/>Mimarı</h2>
            <div className="space-y-8 text-lg font-light text-white/80 leading-[1.8] tracking-wide">
              <p>Freya basit bir inançla doğdu: Kahve sadece bir içecek değil; toprağa bir dokunuş, bir ritüel ve kendinle baş başa kaldığın o özel andır.</p>
              <p>Volkanik toprakların bereketini, İskandinav kavurma sanatının inceliğiyle buluşturuyoruz. Amacımız, doğaya duyduğumuz saygıyı fincanınızdaki her notada hissettirmek.</p>
            </div>
          </div>
        </div>
        <div ref={storyImageRef} className="w-full lg:w-1/2 h-[50vh] lg:h-screen relative overflow-hidden">
           <img src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=1200" className="w-full h-[120%] object-cover brightness-[0.4] transition-all duration-1000 absolute left-0" style={{ transform: `translateY(${parallaxY}px)` }} alt="Coffee Harvest" />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-[#050505] py-32 px-8 md:px-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-24">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif italic mb-10">Bizi ziyaret edin</h2>
            <div className="space-y-6 text-[11px] md:text-xs tracking-[0.3em] text-white/40 uppercase font-medium">
              <p className="hover:text-white transition-all duration-300">Tam adres buraya yazılacak, Istanbul</p>
              <p>Haftaiçi — 09:00 — 00:00</p>
              <p>Haftasonu — 09:00 — 00:00</p>
            </div>
          </div>

          <div className="flex flex-col items-end text-right w-full md:w-auto">
            <h2 className="text-3xl md:text-4xl font-serif italic mb-10">Bize ulaşın</h2>
            <a href="mailto:iletisim@freyacoffee.com" className="text-xl md:text-3xl text-white/70 hover:text-amber-200 transition-all duration-500 border-b border-white/10 pb-4 block">
              hello@freyacoffee.com
            </a>
            <div className="flex flex-col items-end mt-16 space-y-2">
              <a 
                href="https://www.instagram.com/freya.coffeee" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center space-x-3 text-[10px] uppercase tracking-[0.4em] text-white/30 font-medium hover:text-amber-200 transition-all duration-300 group"
              >
                <svg className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[9px] uppercase tracking-[0.5em] text-white/20 font-medium">
          <p>© 2026 Freya Coffee. Tüm hakları saklıdır.</p>
          
          <div className="mt-8 md:mt-0 flex items-center justify-center">
            {/* LOGOMARK DEĞİŞİKLİĞİ BURADA YAPILDI */}
            <img 
               src="/logomark.png" 
               alt="Freya Signature" 
               className="h-10 w-auto opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700 cursor-pointer"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
