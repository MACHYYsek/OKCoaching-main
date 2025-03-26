import { useState } from 'react';
import { FaLock, FaArrowLeft } from 'react-icons/fa';
import { IoMdRocket } from 'react-icons/io';
import BottomBar from './BottomBar';

interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  icon: JSX.Element;
  unlocked: boolean;
  available: boolean;
}

const achievements: Achievement[] = [
  {
    id: 'getting-started',
    title: 'Getting started',
    description: 'Úspěšně dokončí registraci do aplikace.',
    progress: 100,
    icon: <IoMdRocket className="w-8 h-8" />,
    unlocked: true,
    available: true
  },
  {
    id: 'consistency',
    title: 'Consistency is the key',
    description: 'Zapiš si 5 tréninkových dní po sobě.',
    progress: 61,
    icon: <FaLock className="w-8 h-8" />,
    unlocked: false,
    available: false
  },
  {
    id: 'first-contact',
    title: 'First contact',
    description: 'Pošli první zprávu do jakékoliv ze skupin.',
    progress: 73,
    icon: <FaLock className="w-8 h-8" />,
    unlocked: false,
    available: false
  },
  {
    id: 'full-focus',
    title: 'Full focus',
    description: 'Zapiš úspěšně všechny trénink po dobu 30ti dní.',
    progress: 7,
    icon: <FaLock className="w-8 h-8" />,
    unlocked: false,
    available: false
  }
];

export default function Achievements({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-[#191919] z-50 flex flex-col">
      <div className="p-4 flex items-center border-b border-[#222223]">
        <button onClick={onClose} className="p-2">
          <FaArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-semibold ml-4">Ocenění</h1>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        {achievements.map((achievement) => (
          <div 
            key={achievement.id}
            className={`bg-[#222223] rounded-xl p-4 flex items-center gap-4 ${
              !achievement.available ? 'opacity-30 filter blur-[2px] pointer-events-none' : ''
            }`}
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
              achievement.unlocked ? 'bg-[#00EDFF] text-black' : 'bg-[#333] text-white'
            }`}>
              {achievement.icon}
            </div>
            
            <div className="flex-1">
              <h3 className="font-semibold mb-1">{achievement.title}</h3>
              <p className="text-sm text-[#BCBCBC] mb-2">{achievement.description}</p>
              <div className="h-1 bg-[#333] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#00EDFF] transition-all duration-300"
                  style={{ width: `${achievement.progress}%` }}
                />
              </div>
              <div className="text-xs text-[#BCBCBC] mt-1">
                {achievement.progress}% Uživatelů
              </div>
            </div>
          </div>
        ))}
      </div>

      <BottomBar />
    </div>
  );
}