'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

interface StepOneProps {
  formData: {
    nickname: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  setFormData: (data: any) => void;
  onNext: () => void;
}

export default function StepOne({ formData, setFormData, onNext }: StepOneProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-semibold">
          Vytvořit účet
          <span className="text-[#00EDFF]">.</span>
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-[#BCBCBC] flex items-center">
            Jméno / Přezdívka
            <span className="text-[#00EDFF] ml-1">*</span>
          </label>
          <input
            type="text"
            value={formData.nickname}
            onChange={(e) => setFormData({...formData, nickname: e.target.value})}
            placeholder="Tvoje_Přezdívka"
            className="w-full px-4 py-3 rounded-xl"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-[#BCBCBC] flex items-center">
            E-mail
            <span className="text-[#00EDFF] ml-1">*</span>
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            placeholder="napiš svůj E-mail"
            className="w-full px-4 py-3 rounded-xl"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-[#BCBCBC] flex items-center">
            Heslo
            <span className="text-[#00EDFF] ml-1">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder="napiš své heslo"
              className="w-full px-4 py-3 rounded-xl"
              required
            />
            <button 
              type="button"
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              <Image
                src="/eye-icon.svg"
                alt="Toggle password visibility"
                width={24}
                height={24}
                priority
              />
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[#BCBCBC] flex items-center">
            Zopakuj heslo
            <span className="text-[#00EDFF] ml-1">*</span>
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              placeholder="znovu napiš své heslo"
              className="w-full px-4 py-3 rounded-xl"
              required
            />
            <button 
              type="button"
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Image
                src="/eye-icon.svg"
                alt="Toggle password visibility"
                width={24}
                height={24}
                priority
              />
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="btn-primary w-full py-3 rounded-xl font-semibold mt-6"
        >
          Registrovat se
        </button>

        <div className="text-center text-[#BCBCBC] mt-4">
          Registrovat se skrz
        </div>

        <button
          type="button"
          className="btn-google w-full py-3 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={true}
        >
          <Image
            src="/google-icon.svg"
            alt="Google"
            width={24}
            height={24}
            priority
          />
          Registrovat se skrz Google
        </button>

        <div className="mt-8 text-center">
          <span className="text-[#BCBCBC]">Už máš účet? </span>
          <Link href="/login" className="text-[#00EDFF]">
            Přihlásit se
          </Link>
        </div>
      </form>
    </>
  );
}