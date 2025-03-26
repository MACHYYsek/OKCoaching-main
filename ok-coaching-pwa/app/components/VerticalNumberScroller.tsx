'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { FaPlay } from 'react-icons/fa';

interface VerticalNumberScrollerProps {
  min: number;
  max: number;
  step: number;
  initialValue: number;
  onChange: (value: number) => void;
  unit: string;
}

const VerticalNumberScroller = ({
  min,
  max,
  step,
  initialValue,
  onChange,
  unit,
}: VerticalNumberScrollerProps) => {
  const numbers = useMemo(() => {
    return Array.from({ length: Math.floor((max - min) / step) + 1 }, (_, i) => min + i * step);
  }, [min, max, step]);

  const [selectedValue, setSelectedValue] = useState(initialValue);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemHeight = useRef(50); // Default item height
  const isScrolling = useRef(false);

  useEffect(() => {
    if (containerRef.current) {
      const firstItem = containerRef.current.querySelector('.scroller-item');
      if (firstItem) {
        itemHeight.current = (firstItem as HTMLElement).offsetHeight;
      }
      
      const initialIndex = numbers.indexOf(initialValue);
      if (initialIndex !== -1) {
        setTimeout(() => {
          containerRef.current?.scrollTo({
            top: initialIndex * itemHeight.current,
            behavior: 'auto',
          });
        }, 100);
      }
    }
  }, [initialValue, numbers]);

  const handleScroll = () => {
    if (!containerRef.current || !itemHeight.current || isScrolling.current) return;
    
    isScrolling.current = true;
    setTimeout(() => {
      isScrolling.current = false;
      const scrollTop = containerRef.current!.scrollTop;
      const index = Math.round(scrollTop / itemHeight.current);
      const selected = numbers[Math.min(Math.max(index, 0), numbers.length - 1)];

      if (selected !== selectedValue) {
        setSelectedValue(selected);
        onChange(selected);
      }

      containerRef.current!.scrollTo({
        top: index * itemHeight.current,
        behavior: 'smooth',
      });
    }, 100);
  };

  const getNumberStyle = (number: number) => {
    const index = numbers.indexOf(number);
    const selectedIndex = numbers.indexOf(selectedValue);
    const distance = Math.abs(index - selectedIndex);

    return {
      fontSize: `${4.5 - distance * 0.6}rem`,
      opacity: 1 - distance * 0.25,
      color: distance === 0 ? '#FFFFFF' : '#BCBCBC',
      fontWeight: distance === 0 ? 'bold' : 'normal',
      padding: '10px 0',
    };
  };

  return (
    <div className="relative h-80 w-48 mx-auto touch-none">
      {/* Arrow indicator */}
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10">
        <FaPlay className="text-[#00EDFF] text-2xl rotate-180" />
      </div>
      
      <div
        ref={containerRef}
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
        onScroll={handleScroll}
        style={{ scrollSnapType: 'y mandatory', scrollBehavior: 'smooth' }}
      >
        <div className="relative py-32 flex flex-col items-center">
          {numbers.map((number) => (
            <div
              key={number}
              className="scroller-item h-16 snap-center flex items-center justify-center transition-all duration-300"
              style={getNumberStyle(number)}
            >
              {number} {number === selectedValue && <span className="text-[#00EDFF] text-lg ml-3">{unit}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VerticalNumberScroller;