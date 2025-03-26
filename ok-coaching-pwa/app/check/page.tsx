'use client';

import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import NumberScroller from '../components/NumberScroller';

export default function CheckPage() {
  const [selectedWeight, setSelectedWeight] = useState<number>(80.0);

  return (
    <main className="min-h-screen bg-[#191919] flex flex-col">
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
            <FaArrowLeft className="w-6 h-6" />
          </Link>
          <span className="text-[#BCBCBC]">1/9</span>
        </div>

        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Váha</h1>
          <p className="text-lg text-[#BCBCBC]">
            Jaká je tvoje váha dnes ráno, nalačno?
          </p>
          <p className="text-lg mt-2">
            Váha je jediný povinný údaj, který od tebe budeme každý týden potřebovat pro správný
            chod aplikace.
          </p>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <NumberScroller
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
          className="w-full py-4 rounded-xl font-semibold bg-[#00EDFF] text-black mt-8"
        >
          Pokračovat
        </button>
      </div>
    </main>
  );
}