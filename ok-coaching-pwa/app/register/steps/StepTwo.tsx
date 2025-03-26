'use client';

import Image from 'next/image';
import { useState } from 'react';

const groups = [
  {
    id: 1,
    name: 'Středně pokročilý',
    description: 'Lorem ipsum dolor sit amet, conse ctetuer adipiscing elit. Mauris metus Ut tempus purus at lorem. Etiam egestas wisi a erat. Pellentesque habitant morbi.',
    image: '/bear.jpg'
  },
  {
    id: 2,
    name: 'Středně Nakročilý',
    description: 'Lorem ipsum dolor sit amet, conse ctetuer adipiscing elit. Mauris metus Ut tempus purus at lorem. Etiam egestas wisi a erat. Pellentesque habitant morbi.',
    image: '/bear.jpg'
  },
];

interface StepTwoProps {
  formData: any;
  setFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepTwo({ formData, setFormData, onNext, onBack }: StepTwoProps) {
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(formData.selectedGroup);
  const currentGroup = groups[currentGroupIndex];

  const handleNext = () => {
    if (currentGroupIndex < groups.length - 1) {
      setCurrentGroupIndex(currentGroupIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentGroupIndex > 0) {
      setCurrentGroupIndex(currentGroupIndex - 1);
    }
  };

  const handleSelect = () => {
    setSelectedGroupId(currentGroup.id);
    setFormData({ ...formData, selectedGroup: currentGroup.id });
  };

  const handleContinue = () => {
    if (selectedGroupId !== null) {
      onNext();
    }
  };

  return (
    <>
      <button onClick={onBack} className="mb-8">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-semibold">Vyber si svou skupinu<span className="text-[#00EDFF]">.</span></h1>
        <p className="text-[#BCBCBC] mt-2">V budoucnu ji lze změnit</p>
      </div>

      <div className="flex justify-center gap-2 mb-4">
        {groups.map((_, index) => (
          <div
            key={index}
            className={`h-1 w-8 transition-all ${index === currentGroupIndex ? 'bg-[#00EDFF]' : 'bg-[#222223]'}`}
          />
        ))}
      </div>

      <div className="aspect-video rounded-xl overflow-hidden mb-4">
        <Image src={currentGroup.image} alt={currentGroup.name} width={400} height={300} className="w-full h-full object-cover" />
      </div>
      
      <h2 className="text-2xl font-semibold mb-4">{currentGroup.name}</h2>
      <p className="text-[#BCBCBC] mb-8">{currentGroup.description}</p>
      
      <div className="flex justify-between items-center mb-8">
        <button onClick={handlePrevious} disabled={currentGroupIndex === 0} className="p-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 19L8 12L15 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <button
          className={`px-8 py-2 rounded-xl flex items-center gap-2 transition-colors ${selectedGroupId === currentGroup.id ? 'bg-[#00EDFF] text-black' : 'bg-[#222223] text-white'}`}
          onClick={handleSelect}
        >
          {selectedGroupId === currentGroup.id ? 'Vybráno' : 'Vybrat'}
        </button>

        <button onClick={handleNext} disabled={currentGroupIndex === groups.length - 1} className="p-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 5L16 12L9 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <button
        onClick={handleContinue}
        disabled={selectedGroupId === null}
        className={`w-full py-3 rounded-xl font-semibold transition-colors ${selectedGroupId !== null ? 'bg-[#00EDFF] text-black' : 'bg-[#222223] text-white cursor-not-allowed'}`}
      >
        Pokračovat
      </button>
    </>
  );
}