import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';

interface HeaderProps {
  onNotificationClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNotificationClick }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' });
  };

  return (
    <header className="px-6 pt-14 safe-area-top pb-4 flex justify-between items-start bg-white/50 backdrop-blur-sm sticky top-0 z-50">
      <div>
        <h1 className="text-4xl font-bold text-stone-900">{formatTime(time)}</h1>
        <p className="text-xl text-stone-500 mt-1">{formatDate(time)}</p>
      </div>
      <button 
        onClick={onNotificationClick}
        className="relative p-3 bg-white rounded-2xl shadow-sm border border-stone-100 active:scale-95 transition-transform"
      >
        <Bell size={28} className="text-stone-600" />
        <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
      </button>
    </header>
  );
};
