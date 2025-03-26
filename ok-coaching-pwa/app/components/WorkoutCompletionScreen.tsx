import React, { useEffect, useState } from 'react';
import { FaDumbbell } from 'react-icons/fa';
import Link from 'next/link';

interface WorkoutCompletionScreenProps {
  totalWeight: number;
  personalRecords: number;
  workoutNumber: number;
}

export default function WorkoutCompletionScreen({
  totalWeight,
  personalRecords,
  workoutNumber
}: WorkoutCompletionScreenProps) {
  const [displayedWeight, setDisplayedWeight] = useState(0);
  const [displayedPRs, setDisplayedPRs] = useState(0);
  const [displayedWorkout, setDisplayedWorkout] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60; // 60 steps (for 60fps animation)
    const interval = duration / steps;

    const weightIncrement = totalWeight / steps;
    const prIncrement = personalRecords / steps;
    const workoutIncrement = workoutNumber / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      
      if (currentStep <= steps) {
        setDisplayedWeight(Math.round(weightIncrement * currentStep));
        setDisplayedPRs(Math.round(prIncrement * currentStep));
        setDisplayedWorkout(Math.round(workoutIncrement * currentStep));
      } else {
        setDisplayedWeight(totalWeight);
        setDisplayedPRs(personalRecords);
        setDisplayedWorkout(workoutNumber);
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [totalWeight, personalRecords, workoutNumber]);

  return (
    <div className="fixed inset-0 bg-[#191919] flex flex-col items-center justify-center p-4">
      <div className="w-32 h-32 bg-[#00EDFF] rounded-full flex items-center justify-center mb-8">
        <FaDumbbell className="w-16 h-16 text-black" />
      </div>

      <h1 className="text-2xl font-bold mb-2">Trénink dokončen.</h1>
      <h2 className="text-4xl font-bold mb-12">Gratulujeme!</h2>

      <div className="grid grid-cols-3 gap-8 mb-16">
        <div className="text-center">
          <div className="text-[#00EDFF] text-4xl font-bold mb-2">
            {displayedWeight}
          </div>
          <div className="text-sm">Kilogramů</div>
        </div>

        <div className="text-center">
          <div className="text-[#00EDFF] text-4xl font-bold mb-2">
            {displayedPRs}
          </div>
          <div className="text-sm">PR's</div>
        </div>

        <div className="text-center">
          <div className="text-[#00EDFF] text-4xl font-bold mb-2">
            {displayedWorkout}.
          </div>
          <div className="text-sm">Trénink</div>
        </div>
      </div>

      <div className="text-[#00EDFF] text-4xl font-bold mb-8">
        OK<span className="text-white">Coaching</span>
      </div>

      <Link 
        href="/"
        className="bg-[#00EDFF] text-black py-4 px-8 rounded-xl font-semibold"
      >
        Zpět na hlavní stránku
      </Link>
    </div>
  );
}