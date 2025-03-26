'use client';

import Link from 'next/link';
import { FaArrowLeft, FaRuler, FaBell, FaUserPlus, FaCreditCard, FaTrophy, FaBullhorn, FaQuestionCircle, FaFileContract, FaShieldAlt, FaTrash } from 'react-icons/fa';
import BottomBar from '../components/BottomBar';

const menuItems = [
  { icon: <FaRuler className="w-6 h-6" />, label: 'Jednotky', href: '/settings/units', disabled: true },
  { icon: <FaBell className="w-6 h-6" />, label: 'Upozornění', href: '/settings/notifications', disabled: true },
  { icon: <FaUserPlus className="w-6 h-6" />, label: 'Pozvi přítele', href: '/settings/invite', disabled: true },
  { icon: <FaCreditCard className="w-6 h-6" />, label: 'Členství', href: '/settings/membership', disabled: false },
  { icon: <FaTrophy className="w-6 h-6" />, label: 'Žebříček', href: '/settings/leaderboard', disabled: true },
];

const supportItems = [
  { icon: <FaBullhorn className="w-6 h-6" />, label: 'Zpětná vazba', href: '/settings/feedback' },
  { icon: <FaQuestionCircle className="w-6 h-6" />, label: 'Nápověda & podpora', href: '/settings/support' },
  { icon: <FaFileContract className="w-6 h-6" />, label: 'Smluvní podmínky', href: '/settings/terms' },
  { icon: <FaShieldAlt className="w-6 h-6" />, label: 'Zásady ochrany osobních údajů', href: '/settings/privacy' },
];

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-[#191919] pb-20">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/profile">
            <FaArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-semibold">Nastavení</h1>
          <div className="w-6" /> {/* Spacer for centering */}
        </div>

        {/* Main Menu */}
        <div className="space-y-6 mb-8">
          {menuItems.map((item, index) => (
            item.disabled ? (
              <div
                key={index}
                className="flex items-center gap-4 opacity-50 pointer-events-none p-4"
              >
                {item.icon}
                <span>{item.label}</span>
              </div>
            ) : (
              <Link
                key={index}
                href={item.href}
                className="flex items-center gap-4 p-4"
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            )
          ))}
        </div>

        {/* Support Menu */}
        <div className="space-y-6 mb-8">
          {supportItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="flex items-center gap-4 p-4"
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Delete Account */}
        <Link
          href="/settings/delete-account"
          className="flex items-center gap-4 p-4 text-red-500"
        >
          <FaTrash className="w-6 h-6" />
          <span>Odstranit účet</span>
        </Link>
      </div>

      <BottomBar />
    </main>
  );
}