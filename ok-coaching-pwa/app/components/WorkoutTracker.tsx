import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaPlay, FaPause } from 'react-icons/fa';
import IncompleteSeriesModal from './IncompleteSeriesModal';
import WorkoutCompletionScreen from './WorkoutCompletionScreen';

interface WorkoutTrackerProps {
  exercise: {
    name: string;
    image: string;
    sets: Array<{
      reps: number;
      rir: number;
    }>;
  };
  currentSet: number;
  onClose: () => void;
  exerciseIndex: number;
  totalExercises: number;
}

export default function WorkoutTracker({ 
  exercise, 
  currentSet, 
  onClose,
  exerciseIndex,
  totalExercises
}: WorkoutTrackerProps) {
  const [timer, setTimer] = useState("1:36");
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [selectedSeries, setSelectedSeries] = useState(1);
  const [formData, setFormData] = useState({
    reps: '',
    rir: '',
    weight: ''
  });
  const [showIncompleteModal, setShowIncompleteModal] = useState(false);
  const [incompleteReason, setIncompleteReason] = useState('');
  const [showCompletionScreen, setShowCompletionScreen] = useState(false);

  // Reset form data and incomplete reason when exercise or series changes
  useEffect(() => {
    setFormData({
      reps: '',
      rir: '',
      weight: ''
    });
    setIncompleteReason('');
  }, [exercise, selectedSeries]);

  const handleSeriesSelect = (series: number) => {
    setSelectedSeries(series);
  };

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isSeriesComplete = () => {
    return formData.reps !== '' && formData.rir !== '' && formData.weight !== '';
  };

  const handleContinue = () => {
    if (!isSeriesComplete()) {
      setShowIncompleteModal(true);
      return;
    }
    proceedToNext();
  };

  const proceedToNext = () => {
    const isLastSet = selectedSeries === exercise.sets.length;
    const isLastExercise = exerciseIndex === totalExercises - 1;

    // If this is the last set of the last exercise
    if (isLastSet && isLastExercise) {
      setShowCompletionScreen(true);
      return;
    }

    // If this is the last set but not the last exercise
    if (isLastSet) {
      onClose(); // This will trigger the parent to move to the next exercise
      return;
    }

    // If this is not the last set
    setSelectedSeries(selectedSeries + 1);
  };

  if (showCompletionScreen) {
    return (
      <WorkoutCompletionScreen
        totalWeight={12300}
        personalRecords={6}
        workoutNumber={3}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#191919] flex flex-col">
      {/* Timer */}
      <div className="bg-[#222223] mx-4 mt-4 p-4 rounded-xl">
        <div className="text-[#BCBCBC] text-sm">PŘESTÁVKA</div>
        <div className="flex justify-between items-center">
          <div className="text-4xl font-bold">{timer}</div>
          <div className="flex gap-2">
            <button 
              onClick={toggleTimer}
              className={`p-3 rounded-full ${isTimerRunning ? 'bg-[#333]' : 'bg-[#00EDFF]'}`}
            >
              {isTimerRunning ? (
                <FaPause className={isTimerRunning ? 'text-white' : 'text-black'} />
              ) : (
                <FaPlay className="text-black" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Exercise Video/Image */}
      <div className="relative aspect-video mx-4 mt-4">
        <Image
          src={exercise.image}
          alt={exercise.name}
          fill
          className="object-cover rounded-xl"
          unoptimized
        />
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full">
          Cvik {exerciseIndex + 1}/{totalExercises}
        </div>
        <div className="absolute bottom-4 left-4">
          <div className="text-xl font-semibold">
            {exercise.name}
          </div>
        </div>
      </div>

      {/* Series Selection */}
      <div className="grid grid-cols-2 gap-4 mx-4 mt-4">
        {exercise.sets.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSeriesSelect(index + 1)}
            className={`p-4 rounded-xl text-center transition-colors ${
              selectedSeries === index + 1 ? 'bg-[#00EDFF] text-black' : 'bg-[#222223]'
            }`}
          >
            <div className="text-sm mb-1">SÉRIE {index + 1}</div>
            <div className="text-lg font-bold">8</div>
          </button>
        ))}
      </div>

      {/* Exercise Info Row */}
      <div className="grid grid-cols-4 gap-4 mx-4 mt-4 bg-[#222223] p-4 rounded-xl">
        <div>
          <div className="text-[#00EDFF] text-sm mb-1">Opakování</div>
          <div className="text-lg font-bold">8</div>
        </div>
        <div>
          <div className="text-[#00EDFF] text-sm mb-1">RIR</div>
          <div className="text-lg font-bold">0</div>
        </div>
        <div>
          <div className="text-[#00EDFF] text-sm mb-1">Tempo</div>
          <div className="text-lg font-bold">2.0.0.1</div>
        </div>
        <div>
          <div className="text-[#00EDFF] text-sm mb-1">Pauza</div>
          <div className="text-lg font-bold">3m+</div>
        </div>
      </div>

      {/* Input Fields */}
      <div className="grid grid-cols-3 gap-4 mx-4 mt-4">
        <div>
          <div className="text-sm mb-2">OPAKOVÁNÍ</div>
          <input
            type="number"
            value={formData.reps}
            onChange={(e) => handleInputChange('reps', e.target.value)}
            className="w-full bg-[#222223] rounded-xl p-4 text-center"
            placeholder="-"
          />
        </div>
        <div>
          <div className="text-sm mb-2">RIR</div>
          <input
            type="number"
            value={formData.rir}
            onChange={(e) => handleInputChange('rir', e.target.value)}
            className="w-full bg-[#222223] rounded-xl p-4 text-center"
            placeholder="-"
          />
        </div>
        <div>
          <div className="text-sm mb-2">VÁHA</div>
          <input
            type="number"
            value={formData.weight}
            onChange={(e) => handleInputChange('weight', e.target.value)}
            className="w-full bg-[#222223] rounded-xl p-4 text-center"
            placeholder="-"
          />
        </div>
      </div>

      {/* Continue Button */}
      <div className="mx-4 mt-4 mb-4">
        <button
          onClick={handleContinue}
          className="w-full bg-[#00EDFF] text-black py-4 rounded-xl font-semibold"
        >
          {selectedSeries === exercise.sets.length && exerciseIndex === totalExercises - 1 
            ? 'Dokončit trénink'
            : 'Pokračovat'
          }
        </button>
      </div>

      {/* Incomplete Series Modal */}
      {showIncompleteModal && (
        <IncompleteSeriesModal
          seriesNumber={selectedSeries}
          onClose={() => setShowIncompleteModal(false)}
          onContinue={() => {
            setShowIncompleteModal(false);
            proceedToNext();
          }}
          reason={incompleteReason}
          setReason={setIncompleteReason}
        />
      )}
    </div>
  );
}