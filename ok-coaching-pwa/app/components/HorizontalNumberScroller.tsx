'use client';

import { useState, useEffect, useRef } from 'react';

interface HorizontalNumberScrollerProps {
  min: number;
  max: number;
  step: number;
  initialValue?: number;
  onChange: (value: number) => void;
  formatValue?: (value: number) => string;
  unit?: string;
}

export default function HorizontalNumberScroller({
  min,
  max,
  step,
  initialValue,
  onChange,
  formatValue = (value) => value.toString(),
  unit
}: HorizontalNumberScrollerProps) {
  const [currentValue, setCurrentValue] = useState(initialValue || min);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const values = Array.from({ length: Math.floor((max - min) / step) + 1 }, 
    (_, i) => min + i * step
  );

  const handleStart = (clientX: number) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(clientX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging || !scrollRef.current) return;
    const x = clientX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleEnd = () => {
    setIsDragging(false);
    if (!scrollRef.current) return;

    const itemWidth = 80;
    const index = Math.round(scrollRef.current.scrollLeft / itemWidth);
    const value = values[index];
    
    if (value !== undefined) {
      setCurrentValue(value);
      onChange(value);
      scrollRef.current.scrollTo({
        left: index * itemWidth,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseMove = (e: MouseEvent) => handleMove(e.clientX);
      const handleGlobalMouseUp = () => handleEnd();

      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('mouseup', handleGlobalMouseUp);

      return () => {
        window.removeEventListener('mousemove', handleGlobalMouseMove);
        window.removeEventListener('mouseup', handleGlobalMouseUp);
      };
    }
  }, [isDragging]);

  useEffect(() => {
    if (scrollRef.current && initialValue) {
      const index = values.findIndex(v => v === initialValue);
      if (index !== -1) {
        scrollRef.current.scrollLeft = index * 80;
      }
    }
  }, []);

  return (
    <div className="relative w-full">
      <div className="absolute left-1/2 -translate-x-1/2 top-0">
        <span className="text-[#00EDFF] text-2xl">▼</span>
      </div>
      
      <div 
        ref={scrollRef}
        className="overflow-x-auto hide-scrollbar py-8"
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        onTouchEnd={handleEnd}
        onMouseDown={(e) => handleStart(e.clientX)}
      >
        <div 
          className="flex items-center"
          style={{ 
            paddingLeft: 'calc(50% - 40px)',
            paddingRight: 'calc(50% - 40px)'
          }}
        >
          {values.map((value) => (
            <div
              key={value}
              className={`w-[80px] flex items-center justify-center select-none transition-all duration-200
                ${value === currentValue ? 'scale-100' : 'scale-95'}
                ${Math.abs(values.indexOf(value) - values.indexOf(currentValue)) <= 2 ? '' : 'opacity-0'}
                ${value === currentValue
                  ? 'text-[48px] font-bold text-white'
                  : Math.abs(values.indexOf(value) - values.indexOf(currentValue)) === 1
                  ? 'text-[32px] text-[#666666]'
                  : 'text-[24px] text-[#444444]'
                }`}
              onClick={() => {
                setCurrentValue(value);
                onChange(value);
                scrollRef.current?.scrollTo({
                  left: values.indexOf(value) * 80,
                  behavior: 'smooth'
                });
              }}
            >
              <div className="flex items-center">
                {formatValue(value)}
                {value === currentValue && unit && (
                  <span className="text-[#00EDFF] ml-2 text-[24px]">{unit}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}