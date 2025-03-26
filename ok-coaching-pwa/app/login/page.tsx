'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password');
        return;
      }

      const from = searchParams.get('from') || '/';
      router.push(from);
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-6 flex flex-col">
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold">
            Přihlásit se
            <span className="text-[#00EDFF]">.</span>
          </h1>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 rounded-xl p-4 mb-6">
            {error}
          </div>
        )}

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
              disabled={isLoading}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="napiš své heslo"
                className="w-full px-4 py-3 rounded-xl"
                required
                disabled={isLoading}
              />
              <button 
                type="button"
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
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

          <div className="flex justify-end">
            <Link href="/forgot-password" className="text-[#00EDFF]">
              Zapomenuté heslo?
            </Link>
          </div>

          <button
            type="submit"
            className="btn-primary w-full py-3 rounded-xl font-semibold mt-6"
            disabled={isLoading}
          >
            {isLoading ? 'Přihlašování...' : 'Přihlásit se'}
          </button>

          <div className="text-center text-[#BCBCBC] mt-4">
            Přihlásit se skrz
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
            Přihlásit se skrz Google
          </button>

          <div className="mt-8 text-center">
            <span className="text-[#BCBCBC]">Nemáš účet? </span>
            <Link href="/register" className="text-[#00EDFF]">
              Registrovat se
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}