
import React, { useEffect, useState } from 'react';

const CoffeeBeanRain: React.FC = () => {
  const [beans, setBeans] = useState<{ id: number; left: string; delay: string; duration: string }[]>([]);

  useEffect(() => {
    const newBeans = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      delay: `${Math.random() * 2}s`,
      duration: `${2 + Math.random() * 3}s`,
    }));
    setBeans(newBeans);

    const timer = setTimeout(() => setBeans([]), 6000);
    return () => clearTimeout(timer);
  }, []);

  if (beans.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {beans.map((bean) => (
        <div
          key={bean.id}
          className="absolute text-2xl"
          style={{
            left: bean.left,
            top: '-50px',
            animation: `fall ${bean.duration} linear ${bean.delay} forwards`,
          }}
        >
          ☕
        </div>
      ))}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default CoffeeBeanRain;
