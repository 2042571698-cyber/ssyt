import React from 'react';
import { motion } from 'motion/react';
import { Home, HeartPulse, ShoppingBag, User } from 'lucide-react';
import { cn } from '../lib/utils';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', label: '首页', icon: Home },
    { id: 'health', label: '健康', icon: HeartPulse },
    { id: 'services', label: '服务', icon: ShoppingBag },
    { id: 'profile', label: '我的', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 flex justify-around items-center h-24 safe-area-bottom z-50 px-2 pb-2">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <motion.button
            key={tab.id}
            whileTap={{ scale: 0.9 }}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex flex-col items-center justify-center flex-1 h-full min-w-0 transition-colors",
              isActive ? "text-elder-primary" : "text-stone-400"
            )}
          >
            <div className="flex-shrink-0">
              <Icon size={28} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className={cn("text-xs md:text-sm mt-1 font-bold whitespace-nowrap", isActive ? "opacity-100" : "opacity-80")}>
              {tab.label}
            </span>
          </motion.button>
        );
      })}
    </nav>
  );
};
