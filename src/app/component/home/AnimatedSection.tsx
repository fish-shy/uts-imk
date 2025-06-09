'use client';

import { useState, useEffect } from 'react';
import { ReactNode } from 'react';

export const AnimatedSection = ({ children, className = "" } : {children: ReactNode, className: string}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}>
      {children}
    </div>
  );
};