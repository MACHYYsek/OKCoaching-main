import { format, addDays, subDays, isSameDay } from 'date-fns';
import { cs } from 'date-fns/locale';
import { useEffect, useRef } from 'react';

interface TrainingCalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

const getDayName = (date: Date) => {
  const dayName = format(date, 'EE', { locale: cs }).toUpperCase();
  return dayName === 'NE' ? 'NE' : dayName;
};

export default function TrainingCalendar({ selectedDate, onDateSelect }: TrainingCalendarProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const today = new Date();
  const weekAgo = subDays(today, 7);
  const weekAhead = addDays(today, 7);
  
  const dates = [];
  let currentDate = weekAgo;
  
  while (currentDate <= weekAhead) {
    dates.push(currentDate);
    currentDate = addDays(currentDate, 1);
  }

  useEffect(() => {
    if (scrollRef.current) {
      const todayIndex = dates.findIndex(date => isSameDay(date, today));
      if (todayIndex !== -1) {
        const scrollContainer = scrollRef.current;
        const itemWidth = 80; // Width of each date button including gap
        const containerWidth = scrollContainer.clientWidth;
        const scrollPosition = (todayIndex * itemWidth) - (containerWidth / 2) + (itemWidth / 2);
        
        scrollContainer.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });
      }
    }
  }, []);

  return (
    <div className="mb-8">
      <div className="bg-[#191919] p-4">
        <div 
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide no-scrollbar"
        >
          {dates.map((date) => {
            const isSelected = isSameDay(date, selectedDate);
            const isToday = isSameDay(date, today);
            
            return (
              <button
                key={date.toISOString()}
                onClick={() => onDateSelect(date)}
                data-today={isToday}
                className={`flex-shrink-0 w-16 rounded-xl p-3 transition-colors ${
                  isSelected 
                    ? 'bg-[#00EDFF] text-black' 
                    : isToday
                    ? 'bg-[#222223]'
                    : 'bg-[#222223]'
                }`}
              >
                <div className="text-sm mb-1">{getDayName(date)}</div>
                <div className="text-xl font-bold">
                  {format(date, 'd')}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}