'use client';

import { FaArrowLeft } from 'react-icons/fa';
import { useState } from 'react';
import HorizontalScroller from '@/app/components/HorizontalScroller';

interface StepEightProps {
  formData: any;
  setFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const activityLevels = [
  {
    level: 1,
    description: 'Žádná aktivita, převážně ležící nebo sedavý způsob života.'
  },
  {
    level: 2,
    description: 'Minimální aktivita, převážně sedavé zaměstnání, žádné nebo minimální cvičení.'
  },
  {
    level: 3,
    description: 'Lehká aktivita, sedavé zaměstnání, 1-3x týdně lehké cvičení.'
  },
  {
    level: 4,
    description: 'Střední aktivita, občasná fyzická práce nebo 3-5x týdně střední cvičení.'
  },
  {
    level: 5,
    description: 'Aktivní životní styl, pravidelné cvičení 4-5x týdně nebo fyzicky náročnější práce.'
  },
  {
    level: 6,
    description: 'Velmi aktivní životní styl, intenzivní cvičení 6-7x týdně nebo fyzicky náročná práce.'
  },
  {
    level: 7,
    description: 'Extrémně aktivní, profesionální sportovec nebo velmi fyzicky náročná práce každý den.'
  }
];

const scrollerItems = activityLevels.map(level => ({
  id: level.level,
  label: level.level
}));

export default function StepEight({ formData, setFormData, onNext, onBack }: StepEightProps) {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [displayedLevel, setDisplayedLevel] = useState(4);

  const handleLevelSelect = (item: { id: string | number; label: string | number }) => {
    const level = Number(item.id);
    setSelectedLevel(level);
    setDisplayedLevel(level);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedLevel) {
      setFormData({
        ...formData,
        activityLevel: selectedLevel
      });
      onNext();
    }
  };

  return (
    <div className="min-h-screen bg-[#191919] flex flex-col p-6">
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack}>
          <FaArrowLeft className="w-6 h-6" />
        </button>
        <span className="text-[#BCBCBC]">5/7</span>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">
          Jaká je tvá průměrná denní aktivita
          <span className="text-[#00EDFF]">?</span>
        </h1>
        <p className="text-[#BCBCBC]">
          Díky ní odhadneme lépe jaký je tvůj momentální kalorický výdej.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
        <div className="flex-1">
          <HorizontalScroller
            items={scrollerItems}
            initialItem={4}
            itemWidth={80}
            onSelect={handleLevelSelect}
          />
        </div>

        <div className="bg-[#222223] rounded-xl p-6 mb-8">
          <p className="text-lg text-center">
            {activityLevels.find(level => level.level === displayedLevel)?.description}
          </p>
        </div>

        <button
          type="submit"
          disabled={!selectedLevel}
          className={`w-full py-4 rounded-xl font-semibold transition-colors ${
            selectedLevel ? 'bg-[#00EDFF] text-black' : 'bg-[#222223] text-white'
          }`}
        >
          Pokračovat
        </button>
      </form>
    </div>
  );
}