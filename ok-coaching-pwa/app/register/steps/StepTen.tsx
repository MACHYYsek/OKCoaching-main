'use client';

import { FaArrowLeft } from 'react-icons/fa';
import { useState } from 'react';
import HorizontalScroller from '@/app/components/HorizontalScroller';

interface StepTenProps {
  formData: any;
  setFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const days = [
  { id: 'ne', label: 'NE' },
  { id: 'po', label: 'PO' },
  { id: 'ut', label: 'UT' },
  { id: 'st', label: 'ST' },
  { id: 'ct', label: 'CT' },
  { id: 'pa', label: 'PA' },
  { id: 'so', label: 'SO' }
];

export default function StepTen({ formData, setFormData, onNext, onBack }: StepTenProps) {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const handleDaySelect = (item: { id: string | number; label: string | number }) => {
    setSelectedDay(String(item.id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDay) {
      setFormData({
        ...formData,
        trackingDay: selectedDay
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
        <span className="text-[#BCBCBC]">7/7</span>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">
          Který den ti vyhovuje nejvíce na zasílání kontrol pro sledování progresu
          <span className="text-[#00EDFF]">?</span>
        </h1>
        <p className="text-[#BCBCBC]">
          Kontroly prosím vždy posílej ráno nalačno, abychom docílí co nejlepšího měření. 
          <span className="text-white"> Je to stěžejní pro optimální úpravu tvého jídelníčku.</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
        <div className="flex-1">
          <HorizontalScroller
            items={days}
            initialItem="ne"
            onSelect={handleDaySelect}
          />
        </div>

        <button
          type="submit"
          disabled={!selectedDay}
          className={`w-full py-4 rounded-xl font-semibold transition-colors mt-8 ${
            selectedDay ? 'bg-[#00EDFF] text-black' : 'bg-[#222223] text-white'
          }`}
        >
          Pokračovat
        </button>
      </form>
    </div>
  );
}