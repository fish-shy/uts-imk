'use client';

import { useState, useEffect } from 'react';

export const InteractiveBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e:any) => {
      setMousePosition({ 
        x: (e.clientX / window.innerWidth) * 100, 
        y: (e.clientY / window.innerHeight) * 100 
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div 
        className="absolute w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse transition-all duration-300"
        style={{
          left: `${mousePosition.x * 0.02}%`,
          top: `${mousePosition.y * 0.02}%`,
          transform: 'translate(-50%, -50%)'
        }}
      />
      <div 
        className="absolute w-80 h-80 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000 transition-all duration-300"
        style={{
          right: `${mousePosition.x * 0.03}%`,
          bottom: `${mousePosition.y * 0.03}%`,
          transform: 'translate(50%, 50%)'
        }}
      />
    </div>
  );
};
