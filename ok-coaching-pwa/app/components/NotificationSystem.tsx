import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

interface Notification {
  id: string;
  avatar?: string;
  title: string;
  message: string;
  time: string;
}

export default function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      avatar: '/jan-kozeluh.jpg',
      title: 'Jan Koželuh',
      message: 'Jan liked your post! 🔥',
      time: '18:40'
    },
    {
      id: '2',
      title: 'Nový trénink',
      message: 'Tvůj trénink na zítra je připraven!',
      time: '17:30'
    },
    {
      id: '3',
      title: 'Připomenutí',
      message: 'Nezapomeň si zapsat váhu!',
      time: '16:15'
    }
  ]);

  useEffect(() => {
    const timers = notifications.map(notification => {
      return setTimeout(() => {
        setNotifications(prev => 
          prev.filter(n => n.id !== notification.id)
        );
      }, 10000);
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className="bg-[#222223] rounded-xl p-4 shadow-lg animate-slideIn flex items-start gap-3"
          onClick={() => removeNotification(notification.id)}
        >
          {notification.avatar && (
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <img
                src={notification.avatar}
                alt={notification.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <p className="font-semibold truncate">{notification.title}</p>
              <span className="text-sm text-gray-400 ml-2">{notification.time}</span>
            </div>
            <p className="text-sm text-gray-300 mt-1">{notification.message}</p>
          </div>
          <button
            className="p-1 hover:text-[#00EDFF] transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              removeNotification(notification.id);
            }}
          >
            <FaTimes />
          </button>
        </div>
      ))}
    </div>
  );
}