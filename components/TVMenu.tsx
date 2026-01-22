import React from 'react';

const TVMenu: React.FC = () => {
  const menuItems = [
    {
      name: "Köpüklü Cappuccino",
      description: "Kadifemsi • Sütlü • Dengeli",
      price: "120 ₺",
      video: "/cappucino.mp4"
    },
    {
      name: "İmza Espresso",
      description: "Yoğun • Güçlü • Karamel",
      price: "90 ₺",
      video: "/espresso.mp4"
    },
    {
      name: "San Sebastian",
      description: "Akışkan • Kremamsı",
      price: "180 ₺",
      video: "/cheesecake.mp4"
    }
  ];

  return (
    <div className="w-screen h-screen bg-black text-white overflow-hidden flex flex-col font-sans">
      
      {/* ÜST HEADER (Logo Ortalanmış) */}
      <div className="h-32 shrink-0 flex flex-col items-center justify-center border-b border-white/10 bg-[#050505] z-20 relative">
         <div className="flex items-center gap-3">
           <img src="/freyalogo.png" alt="Logo" className="h-16 w-auto opacity-90" />
           <span className="text-3xl font-serif tracking-[0.2em] uppercase text-amber-200/90">Freya Coffee</span>
         </div>
         <div className="text-white/40 text-[10px] tracking-[0.6em] mt-2 uppercase">Ürünler</div>
      </div>

      {/* ANA LİSTE (Alt Alta Dizilim) */}
      <div className="flex-1 flex flex-col relative">
        {menuItems.map((item, index) => (
          <div key={index} className="relative flex-1 w-full border-b border-white/10 last:border-b-0 group overflow-hidden">
            
            {/* Arka Plan Videosu */}
            <div className="absolute inset-0 z-0">
               <video 
                 autoPlay muted loop playsInline 
                 className="w-full h-full object-cover brightness-[0.4] scale-110 group-hover:scale-100 transition-transform duration-[20s] ease-linear"
               >
                 <source src={item.video} type="video/mp4" />
               </video>
               {/* Karartma (Soldan Sağa) - Yazılar solda olduğu için */}
               <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent"></div>
            </div>

            {/* İçerik */}
            <div className="relative z-10 h-full flex flex-row items-center justify-between px-8 md:px-12">
              
              {/* Sol Taraf: İsim ve Açıklama */}
              <div className="flex flex-col justify-center max-w-[70%]">
                <h2 className="text-4xl md:text-5xl font-serif italic mb-3 leading-tight text-white group-hover:text-amber-200 transition-colors duration-500">
                  {item.name}
                </h2>
                <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-white/60 font-medium">
                  {item.description}
                </p>
              </div>
              
              {/* Sağ Taraf: Fiyat */}
              <div className="flex flex-col items-end">
                <div className="px-5 py-2 md:px-8 md:py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg group-hover:border-amber-200/30 transition-colors">
                  <span className="text-3xl md:text-4xl font-light text-amber-200">{item.price}</span>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* ALT KAYAN YAZI (Footer) */}
      <div className="h-16 shrink-0 bg-amber-900/20 border-t border-white/5 flex items-center overflow-hidden relative z-20">
         <div className="absolute whitespace-nowrap animate-scroll-line text-sm uppercase tracking-[0.4em] text-white/50 w-full text-center font-medium">
            Kahvelerimiz günlük taze kavrulur • %100 Arabica Çekirdekleri • Sütlerimiz günlük olarak temin edilir • Freya Coffee Experience
         </div>
      </div>
    </div>
  );
};

export default TVMenu;

