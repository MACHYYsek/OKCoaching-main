import React from 'react';
import Image from 'next/image';
import { format, isSameDay } from 'date-fns';
import WorkoutTracker from './WorkoutTracker';

interface Exercise {
  name: string;
  sets: Array<{
    reps: number;
    rir: number;
  }>;
  image: string;
  muscleGroup: string;
}

interface TrainingDay {
  type: string;
  exercises?: Exercise[];
  message?: string;
}

interface TrainingDetailsProps {
  date: Date;
  isWorkoutStarted: boolean;
  setIsWorkoutStarted: (started: boolean) => void;
  currentExercise: number;
  setCurrentExercise: (index: number) => void;
  currentSet: number;
  setCurrentSet: (set: number) => void;
}

const trainingSchedule: Record<string, TrainingDay> = {
  'MONDAY': {
    type: 'UPPER 1',
    exercises: [
      {
        name: 'Benchpress',
        image: '/exercises/bench.jpg',
        muscleGroup: 'Hrudník',
        sets: [
          { reps: 8, rir: 2 },
          { reps: 8, rir: 0 }
        ]
      },
      {
        name: 'Multipress',
        image: '/exercises/bench.jpg',
        muscleGroup: 'Hrudník',
        sets: [
          { reps: 8, rir: 2 },
          { reps: 8, rir: 0 }
        ]
      }
    ]
  },
  'TUESDAY': {
    type: 'LOWER 1',
    exercises: [
      {
        name: 'Squats',
        image: '/exercises/squat.jpg',
        muscleGroup: 'Nohy',
        sets: [
          { reps: 8, rir: 2 },
          { reps: 8, rir: 0 }
        ]
      }
    ]
  },
  'WEDNESDAY': {
    type: 'REST DAY',
    message: 'Dnes tě trénink nečeká.\n\nUžij si volno.'
  },
  'THURSDAY': {
    type: 'UPPER 2',
    exercises: [
      {
        name: 'Pull-ups',
        image: '/exercises/bench.jpg',
        muscleGroup: 'Záda',
        sets: [
          { reps: 8, rir: 2 },
          { reps: 8, rir: 0 }
        ]
      },
      {
        name: 'Bent Over Rows',
        image: '/exercises/bench.jpg',
        muscleGroup: 'Záda',
        sets: [
          { reps: 10, rir: 2 },
          { reps: 10, rir: 1 },
          { reps: 10, rir: 0 }
        ]
      },
      {
        name: 'Face Pulls',
        image: '/exercises/bench.jpg',
        muscleGroup: 'Ramena',
        sets: [
          { reps: 15, rir: 2 },
          { reps: 15, rir: 1 },
          { reps: 15, rir: 0 }
        ]
      },
      {
        name: 'Lateral Raises',
        image: '/exercises/bench.jpg',
        muscleGroup: 'Ramena',
        sets: [
          { reps: 12, rir: 2 },
          { reps: 12, rir: 1 },
          { reps: 12, rir: 0 }
        ]
      }
    ]
  },
  'FRIDAY': {
    type: 'LOWER 2',
    exercises: [
      {
        name: 'Deadlift',
        image: '/exercises/bench.jpg',
        muscleGroup: 'Nohy/Záda',
        sets: [
          { reps: 8, rir: 2 },
          { reps: 8, rir: 0 }
        ]
      }
    ]
  },
  'SATURDAY': {
    type: 'REST DAY',
    message: 'Dnes tě trénink nečeká.\n\nUžij si volno.'
  },
  'SUNDAY': {
    type: 'REST DAY',
    message: 'Dnes tě trénink nečeká.\n\nUžij si volno.'
  }
};

export default function TrainingDetails({ 
  date,
  isWorkoutStarted,
  setIsWorkoutStarted,
  currentExercise,
  setCurrentExercise,
  currentSet,
  setCurrentSet
}: TrainingDetailsProps) {
  const dayName = format(date, 'EEEE').toUpperCase();
  const isToday = isSameDay(date, new Date());
  const training = trainingSchedule[dayName] || {
    type: 'REST DAY',
    message: 'Dnes tě trénink nečeká.\n\nUžij si volno.'
  };

  if (isWorkoutStarted && training.exercises) {
    return (
      <WorkoutTracker
        exercise={training.exercises[currentExercise]}
        currentSet={currentSet}
        onClose={() => {
          if (currentSet === training.exercises![currentExercise].sets.length) {
            if (currentExercise < training.exercises!.length - 1) {
              setCurrentExercise(currentExercise + 1);
              setCurrentSet(1);
            } else {
              setIsWorkoutStarted(false);
              setCurrentExercise(0);
              setCurrentSet(1);
            }
          } else {
            setCurrentSet(currentSet + 1);
          }
        }}
        exerciseIndex={currentExercise}
        totalExercises={training.exercises.length}
      />
    );
  }

  if (training.type === 'REST DAY') {
    return (
      <div className="text-center py-12">
        <h2 className="text-4xl font-bold mb-8 text-[#00EDFF]">
          {training.type}
        </h2>
        <p className="text-gray-400 whitespace-pre-line text-lg">
          {training.message}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-2 text-[#00EDFF]">
          {training.type}
        </h2>
        <p className="text-gray-400">
          {training.exercises?.length || 0} CVIKŮ
        </p>
      </div>

      <div className="space-y-4 mb-28">
        {training.exercises?.map((exercise, index) => (
          <div key={index} className="bg-[#1A1B1E] rounded-2xl overflow-hidden">
            <div className="relative">
              <div className="aspect-video relative">
                <Image
                  src={exercise.image}
                  alt={exercise.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full">
                {exercise.muscleGroup}
              </div>
              <div className="absolute bottom-4 left-4">
                <div className="text-sm text-[#BCBCBC]">
                  {exercise.sets.length} pracovní série
                </div>
                <div className="text-xl font-semibold">
                  {exercise.name}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isToday && (
        <div className="fixed bottom-24 left-0 right-0 px-4 bg-[#191919] py-4">
          <button 
            className="w-full bg-[#00EDFF] text-black py-4 rounded-xl font-semibold"
            onClick={() => setIsWorkoutStarted(true)}
          >
            Spustit trénink
          </button>
        </div>
      )}
    </div>
  );
}