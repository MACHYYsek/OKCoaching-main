'use client';

import { format, isSameDay } from 'date-fns';
import { cs } from 'date-fns/locale';
import Link from 'next/link';
import TopBar from './components/TopBar';
import BottomBar from './components/BottomBar';
import WeightGraph from './components/WeightGraph';
import StatisticsCard from './components/StatisticsCard';
import NotificationSystem from './components/NotificationSystem';

export default function Home() {
  // Mock user's check day (Sunday)
  const checkDay = 0; // 0 = Sunday
  const today = new Date();
  const isCheckDay = today.getDay() === checkDay;

  return (
    <main className="min-h-screen bg-[#191919] text-white pt-16 pb-20">
      <TopBar />
      <NotificationSystem />
      
      <div className="p-4">
        <div className="mb-2">{format(today, 'EEEE', { locale: cs })}</div>
        <h1 className="text-4xl font-bold mb-1">
          Dnes je <span className="text-[#00EDFF]">Upper 1</span>.
        </h1>
        <h2 className="text-4xl font-bold mb-8">MAKE IT COUNT!</h2>

        <div className="mb-8">
          <h3 className="mb-4">Graf tělesné hmotnosti</h3>
          <div className="bg-[#222223] rounded-xl p-4">
            <WeightGraph />
          </div>
        </div>

        {/* <div className="grid grid-cols-4 gap-4 mb-8">
          <StatisticsCard value="-2.4KG" label="BW" />
          <StatisticsCard value="+10KG" label="BENCH" />
          <StatisticsCard value="+2" label="PULLUPS" />
          <StatisticsCard value="+17.5KG" label="SQUAT" />
        </div> */}

        <div className="mb-8">
          <Link 
            href={isCheckDay ? "/check" : "#"}
            className={`block ${isCheckDay ? '' : 'pointer-events-none'}`}
          >
            <div className={`rounded-xl p-4 ${isCheckDay ? 'bg-[#00EDFF]' : 'bg-[#222223]'}`}>
              <div className="flex justify-between items-center mb-1">
                <h3 className={isCheckDay ? 'text-black' : 'text-white'}>Týdenní kontrola</h3>
                <span className={`text-sm px-2 py-1 rounded ${
                  isCheckDay 
                    ? 'bg-black text-white' 
                    : 'bg-[#333] text-[#BCBCBC]'
                }`}>
                  {isCheckDay ? 'Dnes' : 'za 6 dní'}
                </span>
              </div>
              <p className={isCheckDay ? 'text-black/70' : 'text-[#BCBCBC]'}>
                V neděli ráno nalačno.
              </p>
            </div>
          </Link>
        </div>

        <div>
          <h3 className="mb-4">Oznámení</h3>
          <div className="bg-[#222223] rounded-xl p-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-gray-600"></div>
              <div>
                <div className="font-semibold">Ondřej Kartousek</div>
                <div className="text-[#00EDFF]">Hlavní Trenér</div>
              </div>
              <div className="ml-auto text-sm text-gray-400">
                10.3.2025 - 18:40
              </div>
            </div>
            <p className="text-gray-300">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Curabitur ligula sapien, pulvinar a vestibulum quis, facilisis 
              vel sapien.
            </p>
          </div>
        </div>
      </div>

      <BottomBar />
    </main>
  );
}