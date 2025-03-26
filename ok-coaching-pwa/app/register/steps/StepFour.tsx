'use client';

import { FaArrowLeft } from 'react-icons/fa';
import { useState } from 'react';

interface StepFourProps {
  formData: any;
  setFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepFour({ formData, setFormData, onNext, onBack }: StepFourProps) {
  const [selectedGender, setSelectedGender] = useState<'male' | 'female' | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedGender) {
      setFormData({
        ...formData,
        gender: selectedGender
      });
      onNext();
    }
  };

  const handleGenderSelect = (gender: 'male' | 'female') => {
    setSelectedGender(gender);
  };

  return (
    <div className="min-h-screen flex flex-col p-6">
      <div className="flex items-center justify-between mb-12">
        <button onClick={onBack}>
          <FaArrowLeft className="w-6 h-6" />
        </button>
        <span className="text-[#BCBCBC]">1/7</span>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">
          Řekni mi o sobě víc
          <span className="text-[#00EDFF]">.</span>
        </h1>
        <p className="text-xl text-[#BCBCBC]">
          Jaké je tvé biologické pohlaví?
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
        <div className="flex-1 space-y-6">
          <button
            type="button"
            onClick={() => handleGenderSelect('male')}
            className={`w-40 h-40 mx-auto rounded-full flex flex-col items-center justify-center transition-colors ${
              selectedGender === 'male' ? 'bg-[#00EDFF] text-black' : 'bg-[#222223]'
            }`}
          >
            <svg className="w-12 h-12 mb-2" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
              <path d="M15 14L19 18M19 14L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span className="text-lg">Muž</span>
          </button>

          <button
            type="button"
            onClick={() => handleGenderSelect('female')}
            className={`w-40 h-40 mx-auto rounded-full flex flex-col items-center justify-center transition-colors ${
              selectedGender === 'female' ? 'bg-[#00EDFF] text-black' : 'bg-[#222223]'
            }`}
          >
            <svg className="w-12 h-12 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 9a6 6 0 100 12 6 6 0 000-12zM12 9V3M9 6l3-3 3 3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-lg">Žena</span>
          </button>
        </div>

        <button
          type="submit"
          disabled={!selectedGender}
          className={`w-full py-4 rounded-xl font-semibold transition-colors ${
            selectedGender ? 'bg-[#00EDFF] text-black' : 'bg-[#222223] text-white cursor-not-allowed'
          }`}
        >
          Pokračovat
        </button>
      </form>
    </div>
  );
}