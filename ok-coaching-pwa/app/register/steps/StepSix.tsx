'use client';

import { FaArrowLeft } from 'react-icons/fa';
import { useState } from 'react';
import HorizontalNumberScroller from '@/app/components/HorizontalNumberScroller';

interface StepSixProps {
  formData: any;
  setFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepSix({ formData, setFormData, onNext, onBack }: StepSixProps) {
  const [selectedWeight, setSelectedWeight] = useState<number>(80.0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData({
      ...formData,
      weight: selectedWeight
    });
    onNext();
  };

  return (
    <div className="min-h-screen bg-[#191919] flex flex-col p-6">
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack}>
          <FaArrowLeft className="w-6 h-6" />
        </button>
        <span className="text-[#BCBCBC]">3/7</span>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">
          Jaká je tvá váha
          <span className="text-[#00EDFF]">?</span>
        </h1>
        <p className="text-[#BCBCBC]">
          Tvá váha hraje klíčovou roli pro sestavení optimálního jídelního plánu.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <HorizontalNumberScroller
            min={40}
            max={200}
            step={0.1}
            initialValue={80}
            onChange={setSelectedWeight}
            formatValue={(value) => value.toFixed(1)}
            unit="kg"
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