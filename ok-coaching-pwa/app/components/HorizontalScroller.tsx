import { useState, useEffect, useRef } from 'react';

interface ScrollerItem {
  id: string | number;
  label: string | number;
}

interface HorizontalScrollerProps {
  items: ScrollerItem[];
  initialItem?: string | number;
  itemWidth?: number;
  onSelect: (item: ScrollerItem) => void;
}

export default function HorizontalScroller({ 
  items, 
  initialItem, 
  itemWidth = 120,
  onSelect 
}: HorizontalScrollerProps) {
  const [selectedId, setSelectedId] = useState<string | number | null>(initialItem || items[0].id);
  const [displayedId, setDisplayedId] = useState<string | number>(initialItem || items[0].id);
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current && containerRef.current && initialItem) {
      const initialIndex = items.findIndex(item => item.id === initialItem);
      const targetScroll = initialIndex * itemWidth;
      scrollRef.current.scrollLeft = targetScroll;
    }
  }, [initialItem, items, itemWidth]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const scrollLeft = e.currentTarget.scrollLeft;
    const index = Math.round(scrollLeft / itemWidth);
    const item = items[index];
    
    if (item && item.id !== displayedId) {
      setDisplayedId(item.id);
      setSelectedId(item.id);
      onSelect(item);
    }
  };

  const handleTouchEnd = () => {
    if (scrollRef.current) {
      const currentScroll = scrollRef.current.scrollLeft;
      const targetIndex = Math.round(currentScroll / itemWidth);
      const targetScroll = targetIndex * itemWidth;
      
      scrollRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });

      const item = items[targetIndex];
      if (item) {
        setSelectedId(item.id);
        setDisplayedId(item.id);
        onSelect(item);
      }
    }
  };

  const handleItemSelect = (item: ScrollerItem) => {
    setSelectedId(item.id);
    setDisplayedId(item.id);
    onSelect(item);
    
    if (scrollRef.current) {
      const targetIndex = items.findIndex(i => i.id === item.id);
      const targetScroll = targetIndex * itemWidth;
      scrollRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative py-8" ref={containerRef}>
      <div className="absolute left-1/2 top-0 -translate-x-1/2">
        <span className="text-[#00EDFF] text-2xl">▼</span>
      </div>
      <div 
        ref={scrollRef}
        className="overflow-x-auto hide-scrollbar"
        onScroll={handleScroll}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="flex items-center" 
          style={{ 
            paddingLeft: `calc(50% - ${itemWidth/2}px)`, 
            paddingRight: `calc(50% - ${itemWidth/2}px)` 
          }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className={`w-[${itemWidth}px] flex items-center justify-center select-none transition-all duration-200
                ${item.id === displayedId ? 'scale-100' : 'scale-95'}
                ${Math.abs(items.findIndex(i => i.id === item.id) - items.findIndex(i => i.id === displayedId)) <= 2 ? '' : 'opacity-0 pointer-events-none'}
                ${item.id === displayedId
                  ? 'text-[64px] font-bold text-white'
                  : Math.abs(items.findIndex(i => i.id === item.id) - items.findIndex(i => i.id === displayedId)) === 1
                  ? 'text-[40px] text-[#666666]'
                  : Math.abs(items.findIndex(i => i.id === item.id) - items.findIndex(i => i.id === displayedId)) === 2
                  ? 'text-[32px] text-[#444444]'
                  : 'text-[20px] text-[#222222]'
                }`}
              onClick={() => handleItemSelect(item)}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}