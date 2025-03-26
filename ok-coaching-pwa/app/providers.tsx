'use client';

import { SessionProvider } from 'next-auth/react';

interface ProvidersProps {
  children: React.ReactNode;
}

function PWAGuard({ children }: { children: React.ReactNode }) {
  if (typeof window !== 'undefined') {
    const isPWA = window.matchMedia('(display-mode: standalone)').matches || 
                  (window.navigator as any).standalone || 
                  document.referrer.includes('android-app://');
    
    if (!isPWA && process.env.NODE_ENV === 'production') {
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h1 className="text-xl font-bold mb-4">Install the App</h1>
            <p className="text-gray-600">
              This app is designed to work as a Progressive Web App. Please install it to your device
              to continue.
            </p>
            <div className="mt-4">
              <p className="text-sm text-gray-500">
                To install, use your browser&apos;s &quot;Add to Home Screen&quot; or &quot;Install&quot; option.
              </p>
            </div>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <PWAGuard>{children}</PWAGuard>
    </SessionProvider>
  );
}