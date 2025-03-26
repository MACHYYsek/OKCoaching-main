'use client';

import { FaArrowLeft } from 'react-icons/fa';
import { useState } from 'react';

interface StepNineProps {
  formData: any;
  setFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const goals = [
  {
    id: 'lose',
    title: 'Zhubnout tuk',
    description: 'Snížit tělesný tuk při zachování svalové hmoty'
  },
  {
    id: 'maintain',
    title: 'Udržovat váhu a nabírat svaly',
    description: 'Udržet současnou váhu a zlepšit tělesnou kompozici'
  },
  {
    id: 'gain',
    title: 'Nabrat celkovou hmotu',
    description: 'Zvýšit celkovou tělesnou hmotnost a nabrat svaly'
  }
];

export default function StepNine({ formData, setFormData, onNext, onBack }: StepNineProps) {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedGoal) {
      setFormData({
        ...formData,
        goal: selectedGoal
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
        <span className="text-[#BCBCBC]">6/7</span>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">
          Jaký je tvůj cíl na následující 3 měsíce
          <span className="text-[#00EDFF]">?</span>
        </h1>
        <p className="text-[#BCBCBC]">
          Svůj cíl můžeš kdykoliv změnit v nastavení. Případně se ti znovu po 3 měsících
          připomeneme, jestli směřujeme správným směrem.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
        <div className="flex-1 space-y-4">
          {goals.map((goal) => (
            <button
              key={goal.id}
              type="button"
              className={`w-full p-6 rounded-xl text-left transition-all ${
                selectedGoal === goal.id 
                  ? 'bg-[#00EDFF] text-black' 
                  : 'bg-[#222223] text-white'
              }`}
              onClick={() => setSelectedGoal(goal.id)}
            >
              <h3 className="text-xl font-semibold mb-2">{goal.title}</h3>
              <p className={`${
                selectedGoal === goal.id ? 'text-black/70' : 'text-[#BCBCBC]'
              }`}>
                {goal.description}
              </p>
            </button>
          ))}
        </div>

        <button
          type="submit"
          disabled={!selectedGoal}
          className={`w-full py-4 rounded-xl font-semibold transition-colors mt-8 ${
            selectedGoal ? 'bg-[#00EDFF] text-black' : 'bg-[#222223] text-white cursor-not-allowed'
          }`}
        >
          Pokračovat
        </button>
      </form>
    </div>
  );
}