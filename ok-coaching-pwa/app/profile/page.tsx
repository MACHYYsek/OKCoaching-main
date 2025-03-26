'use client';

import Link from 'next/link';
import { FaCog } from 'react-icons/fa';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import BottomBar from '../components/BottomBar';
import DefaultProfilePicture from '../components/DefaultProfilePicture';

const stats = [
  { label: 'KG', value: -2.4 },
  { label: 'PR', value: 0 },
  { label: 'DAYS', value: 7 },
  { label: 'KCAL', value: 2100 }
];

export default function ProfilePage() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/login');
  };

  return (
    <main className="min-h-screen bg-[#191919] pb-20">
      <div className="relative">
        {/* Settings Button */}
        <Link href="/settings" className="absolute top-4 right-4 z-10">
          <FaCog className="w-6 h-6 text-white" />
        </Link>

        {/* Profile Info */}
        <div className="pt-8 pb-4 flex flex-col items-center">
          <div className="mb-4">
            <DefaultProfilePicture name="Ondřej Kartousek" size="md" />
          </div>
          <h1 className="text-2xl font-bold mb-1">Ondřej Kartousek</h1>
          <h2 className="text-[#00EDFF] mb-2">ADVANCED GYMBROS</h2>
          <div className="text-center">
            <p className="flex items-center justify-center mb-1">
              Fitness trainer<span className="ml-1">💪</span>
            </p>
            <p className="flex items-center justify-center mb-1">
              app owner<span className="ml-1">👨‍💻</span>
            </p>
            <p className="flex items-center justify-center">
              Science based lifter<span className="ml-1">🧬</span>
            </p>
          </div>
        </div>

        {/* Edit Profile Button */}
        <div className="px-4">
          <Link 
            href="/profile/edit"
            className="block w-full bg-[#222223] text-white py-3 rounded-xl font-semibold text-center"
          >
            Upravit profil
          </Link>
        </div>

        {/* Progress Stats */}
        <div className="mt-8 p-4">
          <h3 className="text-xl mb-4">Progress & Stats</h3>
          <div className="grid grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="bg-[#222223] rounded-xl p-4 text-center">
                <div className="text-xl font-bold mb-1">
                  {stat.value > 0 && '+'}
                  {stat.value}
                </div>
                <div className="text-sm text-[#BCBCBC]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Logout Button */}
        <div className="px-4 mt-8">
          <button 
            onClick={handleSignOut}
            className="w-full bg-[#00EDFF] text-black py-3 rounded-xl font-semibold"
          >
            Odhlásit se
          </button>
        </div>
      </div>

      <BottomBar />
    </main>
  );
}