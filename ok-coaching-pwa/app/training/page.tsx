'use client';

import { useState, useEffect, useRef } from 'react';
import TopBar from '../components/TopBar';
import BottomBar from '../components/BottomBar';
import TrainingCalendar from '../components/TrainingCalendar';
import TrainingDetails from '../components/TrainingDetails';
import WorkoutTracker from '../components/WorkoutTracker';

export default function TrainingPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isWorkoutStarted, setIsWorkoutStarted] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const calendarRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      const scrollContainer = calendarRef.current?.querySelector('.no-scrollbar');
      const todayButton = calendarRef.current?.querySelector('[data-today="true"]');
      
      if (scrollContainer && todayButton) {
        const containerWidth = scrollContainer.clientWidth;
        const buttonWidth = todayButton.clientWidth;
        const buttonLeft = todayButton.getBoundingClientRect().left;
        const containerLeft = scrollContainer.getBoundingClientRect().left;
        
        const scrollLeft = buttonLeft - containerLeft - (containerWidth / 2) + (buttonWidth / 2);
        
        scrollContainer.scrollLeft = scrollLeft;
      }
    }, 100);

    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#191919] text-white pt-16 pb-20">
      {!isWorkoutStarted && <TopBar />}
      
      <div className="p-4">
        {!isWorkoutStarted && (
          <div ref={calendarRef}>
            <TrainingCalendar 
              selectedDate={selectedDate} 
              onDateSelect={setSelectedDate}
            />
          </div>
        )}
        <TrainingDetails
          date={selectedDate}
          isWorkoutStarted={isWorkoutStarted}
          setIsWorkoutStarted={setIsWorkoutStarted}
          currentExercise={currentExercise}
          setCurrentExercise={setCurrentExercise}
          currentSet={currentSet}
          setCurrentSet={setCurrentSet}
        />
      </div>

      <BottomBar />
    </main>
  );
}