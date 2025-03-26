'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';
import DefaultProfilePicture from '@/app/components/DefaultProfilePicture';

export default function EditProfilePage() {
  const router = useRouter();
  const [nickname, setNickname] = useState('Ondřej Kartousek');
  const [bio, setBio] = useState('• Fitness trainer💪\n• app owner👨‍💻\n• Science based lifter🧬');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save the changes to your backend
    router.push('/profile');
  };

  return (
    <main className="min-h-screen bg-[#191919] pb-20">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/profile">
            <FaArrowLeft className="w-6 h-6" />
          </Link>
        </div>

        {/* Profile Picture */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <DefaultProfilePicture name={nickname} size="md" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nickname */}
          <div className="space-y-2">
            <label className="text-[#BCBCBC] flex items-center">
              Přezdívka / jméno
              <span className="text-[#00EDFF] ml-1">*</span>
            </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full bg-[#222223] rounded-xl p-4"
            />
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <label className="text-[#BCBCBC] flex items-center">
              Bio
              <span className="text-[#00EDFF] ml-1">*</span>
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full bg-[#222223] rounded-xl p-4 min-h-[120px] resize-none"
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full bg-[#00EDFF] text-black py-4 rounded-xl font-semibold"
          >
            Uložit změny
          </button>
        </form>
      </div>
    </main>
  );
}