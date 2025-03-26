import { FaHome, FaDumbbell, FaUtensils, FaComments, FaUser } from 'react-icons/fa';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomBar() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#191919] p-4 z-50 border-t border-[#222223]">
      <div className="flex justify-between items-center px-8">
        <Link href="/" className={pathname === '/' ? 'text-[#00EDFF]' : 'text-white'}>
          <FaHome className="w-6 h-6" />
        </Link>
        
        <Link href="/training" className={pathname === '/training' ? 'text-[#00EDFF]' : 'text-white'}>
          <FaDumbbell className="w-6 h-6" />
        </Link>
        
        <div className="text-[#666666] cursor-not-allowed">
          <FaUtensils className="w-6 h-6" />
        </div>
        
        <div className="text-[#666666] cursor-not-allowed">
          <FaComments className="w-6 h-6" />
        </div>
        
        <Link href="/profile" className={pathname === '/profile' ? 'text-[#00EDFF]' : 'text-white'}>
          <FaUser className="w-6 h-6" />
        </Link>
      </div>
    </div>
  );
}