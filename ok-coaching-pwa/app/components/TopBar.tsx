'use client';

import { useState } from 'react';
import { FaChartBar, FaTrophy, FaBell } from 'react-icons/fa';
import Achievements from './Achievements';

export default function TopBar() {
  const [showAchievements, setShowAchievements] = useState(false);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bg-[#191919]/95 backdrop-blur-md p-4 flex justify-between items-center z-50 border-b border-[#222223]">
        <button className="w-10 h-10 rounded-full flex items-center justify-center bg-[#222223] shadow-lg">
          <FaChartBar className="w-5 h-5" />
        </button>
        
        <div className="flex gap-4">
          <button 
            className="w-10 h-10 rounded-full flex items-center justify-center bg-[#222223] shadow-lg"
            onClick={() => setShowAchievements(true)}
          >
            <FaTrophy className="w-5 h-5" />
          </button>
          
          <button className="w-10 h-10 rounded-full flex items-center justify-center bg-[#222223] shadow-lg relative">
            <FaBell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#00EDFF] rounded-full"></span>
          </button>
        </div>
      </div>

      {showAchievements && (
        <Achievements onClose={() => setShowAchievements(false)} />
      )}
    </>
  );
}