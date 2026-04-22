import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Lightbulb, Thermometer, Lock, Wind, Tv, Coffee, Blinds, Moon, Sun, Power, ChevronRight, Volume2, Sparkles, Snowflake, Flame } from 'lucide-react';

interface SmartHomeViewProps {
  onBack: () => void;
}

export const SmartHomeView: React.FC<SmartHomeViewProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [acTemp, setAcTemp] = useState(24);
  const [isAcOn, setIsAcOn] = useState(true);
  const [acMode, setAcMode] = useState<'cool' | 'heat'>('cool');
  const [devices, setDevices] = useState([
    { id: 'light_living', name: '客厅大灯', icon: Lightbulb, on: true, color: 'text-amber-500', bg: 'bg-amber-50' },
    { id: 'light_bedroom', name: '卧室床头灯', icon: Lightbulb, on: false, color: 'text-amber-500', bg: 'bg-amber-50' },
    { id: 'curtain_living', name: '客厅窗帘', icon: Blinds, on: true, color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 'tv', name: '电视机', icon: Tv, on: false, color: 'text-purple-500', bg: 'bg-purple-50' },
    { id: 'kettle', name: '电热水壶', icon: Coffee, on: false, color: 'text-orange-500', bg: 'bg-orange-50' },
    { id: 'lock', name: '智能门锁', icon: Lock, on: true, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  ]);

  const toggleDevice = (id: string) => {
    setDevices(devices.map(d => d.id === id ? { ...d, on: !d.on } : d));
  };

  const scenes = [
    { name: '睡眠模式', icon: Moon, desc: '关闭所有灯光，空调26度' },
    { name: '离家模式', icon: Power, desc: '关闭电器，开启监控' },
    { name: '用餐模式', icon: Sun, desc: '开启餐厅灯，播放轻音乐' },
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-stone-100 p-6 flex items-center gap-4">
        <button onClick={onBack} className="p-3 bg-white rounded-2xl shadow-sm border border-stone-100 active:scale-95 transition-transform">
          <ArrowLeft size={28} />
        </button>
        <h2 className="text-2xl font-bold">居家智能</h2>
      </div>

      <div className="p-6">
        {/* Environment Status Card */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: '室内温度', value: '24°C', icon: Thermometer, color: 'text-orange-500', bg: 'bg-orange-50' },
          { label: '室内湿度', value: '45%', icon: Wind, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: '空气质量', value: '优', icon: Sparkles, color: 'text-emerald-500', bg: 'bg-emerald-50' },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="bg-white p-4 rounded-[32px] shadow-sm border border-stone-100 flex flex-col items-center gap-2">
              <div className={`p-2 rounded-xl ${item.bg} ${item.color}`}>
                <Icon size={20} />
              </div>
              <span className="text-xs text-stone-400 font-medium">{item.label}</span>
              <span className="text-lg font-black text-stone-900">{item.value}</span>
            </div>
          );
        })}
      </div>

      {/* AC Control Card - Redesigned for better usability */}
      <section className={`p-8 rounded-[48px] text-white shadow-xl mb-8 relative overflow-hidden transition-colors duration-500 ${isAcOn ? (acMode === 'cool' ? 'bg-gradient-to-br from-blue-500 to-indigo-600' : 'bg-gradient-to-br from-orange-500 to-red-600') : 'bg-stone-400'}`}>
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-white/20 rounded-3xl backdrop-blur-md">
                <Wind size={36} />
              </div>
              <div>
                <h3 className="text-2xl font-black">客厅空调</h3>
                <p className="text-white/70 font-bold">{isAcOn ? (acMode === 'cool' ? '制冷中' : '制热中') : '已关闭'}</p>
              </div>
            </div>
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsAcOn(!isAcOn)}
              className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all ${isAcOn ? 'bg-white text-stone-900' : 'bg-white/20 text-white'}`}
            >
              <Power size={32} />
            </motion.button>
          </div>

          {isAcOn && (
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-10 mb-8">
                <motion.button 
                  whileTap={{ scale: 0.8 }}
                  onClick={() => setAcTemp(prev => Math.max(16, prev - 1))}
                  className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-4xl font-black border border-white/20"
                >
                  -
                </motion.button>
                <div className="text-center">
                  <span className="text-8xl font-black tracking-tighter">{acTemp}</span>
                  <span className="text-3xl font-bold ml-1">°C</span>
                </div>
                <motion.button 
                  whileTap={{ scale: 0.8 }}
                  onClick={() => setAcTemp(prev => Math.min(30, prev + 1))}
                  className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-4xl font-black border border-white/20"
                >
                  +
                </motion.button>
              </div>
              
              <div className="grid grid-cols-2 gap-4 w-full">
                <button 
                  onClick={() => setAcMode('cool')}
                  className={`flex items-center justify-center gap-2 py-4 rounded-2xl font-black transition-all ${acMode === 'cool' ? 'bg-white text-blue-600 shadow-lg' : 'bg-white/10 text-white'}`}
                >
                  <Snowflake size={24} /> 制冷
                </button>
                <button 
                  onClick={() => setAcMode('heat')}
                  className={`flex items-center justify-center gap-2 py-4 rounded-2xl font-black transition-all ${acMode === 'heat' ? 'bg-white text-orange-600 shadow-lg' : 'bg-white/10 text-white'}`}
                >
                  <Flame size={24} /> 制热
                </button>
              </div>
            </div>
          )}
        </div>
        <Wind className="absolute -right-12 -bottom-12 text-white/10" size={240} />
      </section>

      {/* Scenes */}
      <h3 className="text-xl font-bold mb-4">场景模式</h3>
      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-2 px-2 mb-8">
        {scenes.map((scene, i) => {
          const Icon = scene.icon;
          return (
            <motion.button
              key={i}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0 w-48 bg-white p-6 rounded-[32px] shadow-sm border border-stone-100 text-left"
            >
              <div className="w-12 h-12 bg-stone-50 text-stone-600 rounded-2xl flex items-center justify-center mb-4">
                <Icon size={24} />
              </div>
              <h4 className="font-bold text-lg mb-1">{scene.name}</h4>
              <p className="text-stone-400 text-sm line-clamp-2">{scene.desc}</p>
            </motion.button>
          );
        })}
      </div>

      {/* Device Grid */}
      <h3 className="text-xl font-bold mb-4">所有设备</h3>
      <div className="grid grid-cols-2 gap-4">
        {devices.map((device) => {
          const Icon = device.icon;
          return (
            <motion.button
              key={device.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleDevice(device.id)}
              className={`p-6 rounded-[32px] shadow-sm border transition-all text-left ${
                device.on ? 'bg-white border-stone-100' : 'bg-stone-50 border-transparent opacity-60'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl ${device.on ? device.bg + ' ' + device.color : 'bg-stone-200 text-stone-400'}`}>
                  <Icon size={28} />
                </div>
                <div className={`w-10 h-5 rounded-full relative transition-colors ${device.on ? 'bg-emerald-500' : 'bg-stone-300'}`}>
                  <motion.div 
                    animate={{ x: device.on ? 20 : 2 }}
                    className="absolute top-1 w-3 h-3 bg-white rounded-full" 
                  />
                </div>
              </div>
              <h4 className="font-bold text-lg">{device.name}</h4>
              <p className={`text-sm font-medium ${device.on ? 'text-emerald-600' : 'text-stone-400'}`}>
                {device.on ? '已开启' : '已关闭'}
              </p>
            </motion.button>
          );
        })}
      </div>
      </div>
    </div>
  );
};
