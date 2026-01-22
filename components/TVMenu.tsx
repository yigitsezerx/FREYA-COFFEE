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
    <div className="w-screen h-screen bg-black text-white overflow-hidden flex flex-col">
      {/* Üst Bar (Logo ve Başlık) */}
      <div className="h-24 flex items-center justify-between px-12 border-b border-white/10 bg-[#050505] z-20">
        <div className="flex items-center gap-4">
           {/* LOGO BURAYA */}
           <img src="/menacesbrand.png" alt="Logo" className="h-12 w-auto opacity-80" />
           <span className="text-2xl font-serif tracking-[0.2em] uppercase text-amber-200/80">Menace's Coffee</span>
        </div>
        <div className="text-white/40 text-sm tracking-widest">SİPARİŞ VE TESLİMAT NOKTASI</div>
      </div>

      {/* Ana Grid - 3 Kolon */}
      <div className="flex-1 grid grid-cols-3 relative">
        {menuItems.map((item, index) => (
          <div key={index} className="relative h-full w-full border-r border-white/10 last:border-r-0 group">
            
            {/* Arka Plan Videosu */}
            <div className="absolute inset-0 z-0">
               <video 
                 autoPlay muted loop playsInline 
                 className="w-full h-full object-cover brightness-[0.35]"
               >
                 <source src={item.video} type="video/mp4" />
               </video>
               {/* Karartma Gradyanı (Yazı okunsun diye) */}
               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40"></div>
            </div>

            {/* İçerik */}
            <div className="relative z-10 h-full flex flex-col justify-end p-12 pb-24">
              <h2 className="text-5xl font-serif italic mb-4 leading-tight text-white group-hover:text-amber-200 transition-colors duration-500">
                {item.name}
              </h2>
              <p className="text-sm tracking-[0.3em] uppercase text-white/60 mb-8 font-medium">
                {item.description}
              </p>
              
              <div className="flex items-center gap-4">
                <div className="px-6 py-3 bg-amber-200/10 backdrop-blur-md border border-amber-200/20 rounded-lg">
                  <span className="text-3xl font-light text-amber-200">{item.price}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Alt Kayan Yazı (Opsiyonel) */}
      <div className="h-12 bg-amber-900/20 border-t border-white/5 flex items-center overflow-hidden relative">
         <div className="absolute whitespace-nowrap animate-scroll-line text-xs uppercase tracking-[0.4em] text-white/40 w-full text-center">
            Kahvelerimiz günlük taze kavrulur • %100 Arabica Çekirdekleri • Sütlerimiz günlük olarak temin edilir
         </div>
      </div>
    </div>
  );
};

export default TVMenu;