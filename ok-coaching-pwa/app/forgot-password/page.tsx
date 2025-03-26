'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ForgotPassword() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen p-6 flex flex-col">
        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold mb-2">
              Odkaz odeslán
              <span className="text-[#00EDFF]">.</span>
            </h1>
            <p className="text-[#BCBCBC] text-lg">
              Zkontroluj si svou schránku a pokračuj na základě instrukcí v E-mailu.
            </p>
            <p className="text-[#BCBCBC] mt-4">
              Nezapomeň zkontrolovat složku <span className="text-[#00EDFF]">spam</span>.
            </p>
          </div>

          <Link 
            href="/"
            className="btn-primary w-full py-3 rounded-xl text-center font-semibold mt-6"
          >
            Přihlásit se
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-6 flex flex-col">
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <Link href="/" className="mb-8">
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M19 12H5M5 12L12 19M5 12L12 5" 
              stroke="white" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </Link>

        <div className="mb-8">
          <h1 className="text-2xl mb-1">Zapomenuté heslo?</h1>
          <h2 className="text-3xl font-semibold">
            Pošleme ti odkaz pro obnovu do E-mailu
            <span className="text-[#00EDFF]">.</span>
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-[#BCBCBC] flex items-center">
              E-mail
              <span className="text-[#00EDFF] ml-1">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="BigGains@okcoaching.com"
              className="w-full px-4 py-3 rounded-xl"
              required
            />
          </div>

          <button
            type="submit"
            className="btn-primary w-full py-3 rounded-xl font-semibold mt-6"
          >
            Odeslat odkaz
          </button>
        </form>
      </div>
    </main>
  );
}