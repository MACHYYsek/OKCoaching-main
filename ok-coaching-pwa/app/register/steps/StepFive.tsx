'use client';

import { useState } from 'react';

interface StepFiveProps {
  formData: any;
  setFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepFive({ formData, setFormData, onNext, onBack }: StepFiveProps) {
  const [selectedHeight, setSelectedHeight] = useState<number>(170);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData({
      ...formData,
      height: selectedHeight
    });
    onNext();
  };

  return (
    <div className="min-h-screen bg-[#191919] flex flex-col p-6">
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="text-white">
          ←
        </button>
        <span className="text-[#BCBCBC]">2/7</span>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">
          Jaká je tvá výška
          <span className="text-[#00EDFF]">?</span>
        </h1>
        <p className="text-[#BCBCBC]">
          Pro správné fungování aplikace potřebujeme znát tvou výšku.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="relative w-full max-w-xs">
          <label htmlFor="height" className="block text-[#BCBCBC] text-lg mb-2">
            Výška (cm)
          </label>
          <select
            id="height"
            value={selectedHeight}
            onChange={(e) => setSelectedHeight(Number(e.target.value))}
            className="w-full p-4 bg-[#222223] text-white rounded-xl text-xl outline-none focus:ring-2 focus:ring-[#00EDFF]"
          >
            {Array.from({ length: 81 }, (_, i) => 140 + i).map((num) => (
              <option key={num} value={num}>
                {num} cm
              </option>
            ))}
          </select>
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
