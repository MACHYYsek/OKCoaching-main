'use client';

import { useState, useEffect, useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';

interface NumberScrollerProps {
  min: number;
  max: number;
  step: number;
  initialValue?: number;
  onChange: (value: number) => void;
  formatValue?: (value: number) => string;
  unit?: string;
}

export default function NumberScroller({
  min,
  max,
  step,
  initialValue,
  onChange,
  formatValue = (value) => value.toString(),
  unit
}: NumberScrollerProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentValue, setCurrentValue] = useState(initialValue || min);
  const [startValue, setStartValue] = useState(initialValue || min);
  const containerRef = useRef<HTMLDivElement>(null);
  const sensitivity = 0.5; // Lower value means more sensitive scrolling

  const snapToValue = (value: number) => {
    const snappedValue = Math.round(value / step) * step;
    return Math.min(max, Math.max(min, snappedValue));
  };

  const [spring, api] = useSpring(() => ({
    y: 0,
    config: { tension: 300, friction: 32 }
  }));

  useEffect(() => {
    if (!isDragging) {
      api.start({ y: 0 });
    }
  }, [isDragging, api]);

  const handleStart = (clientY: number) => {
    setIsDragging(true);
    setStartY(clientY);
    setStartValue(currentValue);
  };

  const handleMove = (clientY: number) => {
    if (!isDragging) return;

    const deltaY = (startY - clientY) * sensitivity;
    const valueChange = (deltaY / 100) * (max - min) * step;
    const newValue = snapToValue(startValue + valueChange);

    if (newValue !== currentValue) {
      setCurrentValue(newValue);
      onChange(newValue);
    }

    api.start({ y: deltaY });
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientY);
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientY);
  };

  useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseMove = (e: MouseEvent) => handleMove(e.clientY);
      const handleGlobalMouseUp = () => handleEnd();

      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('mouseup', handleGlobalMouseUp);

      return () => {
        window.removeEventListener('mousemove', handleGlobalMouseMove);
        window.removeEventListener('mouseup', handleGlobalMouseUp);
      };
    }
  }, [isDragging]);

  // Generate visible numbers
  const visibleNumbers = [-2, -1, 0, 1, 2].map(offset => {
    const value = snapToValue(currentValue + offset * step);
    return {
      value,
      visible: value >= min && value <= max,
      offset
    };
  });

  return (
    <div 
      ref={containerRef}
      className="relative h-[300px] select-none touch-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={isDragging ? handleMouseMove : undefined}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
    >
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 pointer-events-none">
        <div className="relative h-[60px]">
          {/* Center line indicator */}
          <div className="absolute left-0 right-0 h-[2px] bg-[#00EDFF] top-1/2 -translate-y-1/2" />
          
          {/* Numbers */}
          {visibleNumbers.map(({ value, visible, offset }) => (
            visible && (
              <animated.div
                key={value}
                style={{
                  ...spring,
                  y: spring.y.to(y => {
                    const baseOffset = offset * 60;
                    return baseOffset + (isDragging ? y : 0);
                  })
                }}
                className={`absolute left-0 right-0 h-[60px] flex items-center justify-center
                  ${offset === 0 ? 'text-[48px] font-bold text-white' : 
                    Math.abs(offset) === 1 ? 'text-[32px] text-[#666666]' :
                    'text-[24px] text-[#444444]'}`}
              >
                <div className="flex items-center">
                  {formatValue(value)}
                  {offset === 0 && unit && (
                    <span className="text-[#00EDFF] ml-2 text-[24px]">{unit}</span>
                  )}
                </div>
              </animated.div>
            )
          ))}
        </div>
      </div>
    </div>
  );
}