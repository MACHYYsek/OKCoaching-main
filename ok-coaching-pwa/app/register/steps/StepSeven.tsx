'use client';

import { FaArrowLeft } from 'react-icons/fa';
import { useState } from 'react';
import NumberScroller from '@/app/components/NumberScroller';

interface StepSevenProps {
  formData: any;
  setFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepSeven({ formData, setFormData, onNext, onBack }: StepSevenProps) {
  const [selectedAge, setSelectedAge] = useState<number>(20);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData({
      ...formData,
      age: selectedAge
    });
    onNext();
  };

  return (
    <div className="min-h-screen bg-[#191919] flex flex-col p-6">
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack}>
          <FaArrowLeft className="w-6 h-6" />
        </button>
        <span className="text-[#BCBCBC]">4/7</span>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">
          Kolik ti je let
          <span className="text-[#00EDFF]">?</span>
        </h1>
        <p className="text-[#BCBCBC]">
          Tvůj věk potřebujeme znát pro vypočtení správného denního příjmu.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <NumberScroller
            min={15}
            max={100}
            step={1}
            initialValue={20}
            onChange={setSelectedAge}
            unit="let"
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 rounded-xl font-semibold bg-[#00EDFF] text-black mt-8"
        >
          Pokračovat
        </button>
      </form>
    </div>
  );
}