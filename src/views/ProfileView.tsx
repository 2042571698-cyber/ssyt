import React from 'react';
import { motion } from 'motion/react';
import { Heart, Star, Award, ShieldCheck, ChevronRight, Phone, Users, CreditCard, Eye, Volume2, Settings, LogOut, Gift } from 'lucide-react';

interface ProfileViewProps {
  onEmergencyContacts: () => void;
  onFamilyMembers: () => void;
  onWallet: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ onEmergencyContacts, onFamilyMembers, onWallet }) => {
  return (
    <div className="px-6 pb-32 space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">个人中心</h2>
        <motion.button 
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          className="p-3 bg-white rounded-2xl shadow-sm border border-stone-100"
        >
          <Settings size={24} className="text-stone-600" />
        </motion.button>
      </div>

      {/* User Info - More Emotional */}
      <div className="relative">
        <div className="bg-white p-8 rounded-[48px] shadow-sm border border-stone-100 relative z-10">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-24 h-24 bg-stone-200 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img 
                src="https://picsum.photos/seed/elder/200/200" 
                alt="User" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-3xl font-bold">张大爷</h3>
              <p className="text-xl text-stone-500 mt-1">138 **** 8888</p>
              <div className="mt-3 flex gap-2">
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <ShieldCheck size={12} />
                  实名认证
                </span>
                <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <Heart size={12} fill="currentColor" />
                  健康绿码
                </span>
              </div>
            </div>
          </div>
          
          {/* Badges/Achievements */}
          <div className="flex justify-around pt-6 border-t border-stone-50">
            <div className="flex flex-col items-center gap-1">
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-1">
                <Award size={24} />
              </div>
              <span className="text-xs font-bold text-stone-500">健康达人</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-1">
                <Star size={24} fill="currentColor" />
              </div>
              <span className="text-xs font-bold text-stone-500">社区之星</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mb-1">
                <Gift size={24} />
              </div>
              <span className="text-xs font-bold text-stone-500">爱心大使</span>
            </div>
          </div>
        </div>
        <div className="absolute -right-4 -bottom-4 w-48 h-48 bg-blue-50 rounded-full -z-0 opacity-50" />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: '我的积分', value: '1280', color: 'text-amber-600' },
          { label: '完成订单', value: '12', color: 'text-blue-600' },
          { label: '参与活动', value: '5', color: 'text-emerald-600' },
        ].map((stat) => (
          <motion.div 
            key={stat.label}
            whileTap={{ scale: 0.95 }}
            className="bg-white p-5 rounded-[32px] text-center border border-stone-100 shadow-sm active:bg-stone-50 transition-colors"
          >
            <p className="text-stone-400 text-sm mb-1">{stat.label}</p>
            <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Menu List - Group 1 */}
      <div className="bg-white rounded-[40px] shadow-sm border border-stone-100 overflow-hidden">
        {[
          { icon: Phone, label: '紧急联系人', count: '3位', color: 'bg-blue-50 text-blue-600', action: onEmergencyContacts },
          { icon: Users, label: '我的家属', color: 'bg-emerald-50 text-emerald-600', action: onFamilyMembers },
          { icon: CreditCard, label: '我的钱包', value: '¥ 256.00', color: 'bg-amber-50 text-amber-600', action: onWallet },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.button 
              key={item.label}
              whileTap={{ backgroundColor: '#f9fafb' }}
              onClick={item.action}
              className={`w-full p-6 flex items-center justify-between ${idx !== 2 ? 'border-b border-stone-50' : ''} transition-colors`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center`}>
                  <Icon size={24} />
                </div>
                <span className="text-2xl font-bold">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.count && <span className="text-stone-400 font-medium">{item.count}</span>}
                {item.value && <span className="text-red-500 font-bold">{item.value}</span>}
                <ChevronRight className="text-stone-300" />
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Accessibility Settings */}
      <div className="bg-white rounded-[40px] shadow-sm border border-stone-100 overflow-hidden">
        <motion.button 
          whileTap={{ backgroundColor: '#f9fafb' }}
          className="w-full p-6 border-b border-stone-50 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center">
              <Eye size={24} />
            </div>
            <span className="text-2xl font-bold">超大字体</span>
          </div>
          <div className="w-14 h-8 bg-emerald-500 rounded-full relative">
            <div className="absolute right-1 top-1 w-6 h-6 bg-white rounded-full shadow-sm" />
          </div>
        </motion.button>
        <motion.button 
          whileTap={{ backgroundColor: '#f9fafb' }}
          className="w-full p-6 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center">
              <Volume2 size={24} />
            </div>
            <span className="text-2xl font-bold">语音播报</span>
          </div>
          <div className="w-14 h-8 bg-stone-200 rounded-full relative">
            <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow-sm" />
          </div>
        </motion.button>
      </div>

      {/* Logout */}
      <motion.button 
        whileHover={{ scale: 1.02, backgroundColor: 'rgba(239, 68, 68, 0.05)' }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-8 flex items-center justify-center gap-3 text-red-500 font-bold text-2xl rounded-[32px] transition-colors"
      >
        <LogOut size={28} />
        退出登录
      </motion.button>

      <div className="text-center text-stone-400 text-lg pb-8">
        颐养家智慧养老 · 守护您的每一天
      </div>
    </div>
  );
};
