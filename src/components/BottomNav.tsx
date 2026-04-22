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
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 flex justify-around items-center h-18 safe-area-bottom z-50">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <motion.button
            key={tab.id}
            whileTap={{ scale: 0.9 }}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full transition-colors",
              isActive ? "text-elder-primary" : "text-stone-400"
            )}
          >
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span className={cn("text-sm mt-1 font-bold", isActive ? "opacity-100" : "opacity-80")}>
              {tab.label}
            </span>
          </motion.button>
        );
      })}
    </nav>
  );
};
