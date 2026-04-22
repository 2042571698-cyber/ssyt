import React from 'react';
import { motion } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Heart, Activity, Footprints, ChevronRight, Droplets, Moon, ShieldCheck, Stethoscope } from 'lucide-react';

const data = [
  { 时间: '06:00', 数值: 68 },
  { 时间: '09:00', 数值: 75 },
  { 时间: '12:00', 数值: 82 },
  { 时间: '15:00', 数值: 74 },
  { 时间: '18:00', 数值: 70 },
  { 时间: '21:00', 数值: 66 },
];

export const HealthView: React.FC = () => {
  return (
    <div className="px-6 pb-64 space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">健康报告</h2>
        <div className="bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2">
          <ShieldCheck size={18} />
          今日状态：优
        </div>
      </div>

      {/* Vital Cards Grid */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { icon: Heart, label: '心率', value: '72', unit: '次/分', color: 'text-red-500', fill: true },
          { icon: Activity, label: '血压', value: '120/80', unit: 'mmHg', color: 'text-blue-500' },
          { icon: Droplets, label: '血糖', value: '5.6', unit: 'mmol/L', color: 'text-amber-600', fill: true },
          { icon: Moon, label: '睡眠', value: '7.5', unit: '小时', color: 'text-indigo-500', fill: true },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <motion.div 
              key={item.label}
              whileTap={{ scale: 0.95 }}
              className="bg-white p-6 rounded-[32px] shadow-sm border border-stone-100 active:bg-stone-50 transition-colors"
            >
              <div className={`flex items-center gap-2 ${item.color} mb-2`}>
                <Icon size={20} fill={item.fill ? 'currentColor' : 'none'} />
                <span className="font-bold">{item.label}</span>
              </div>
              <div className="text-3xl font-black">{item.value}</div>
              <div className="text-stone-500">{item.unit}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Doctor's Advice - Emotional/Caring */}
      <motion.section 
        whileTap={{ scale: 0.98 }}
        className="bg-blue-50 p-6 rounded-[40px] border border-blue-100 relative overflow-hidden active:bg-blue-100/50 transition-colors"
      >
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center">
              <Stethoscope size={28} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-blue-900">医生嘱托</h3>
              <p className="text-blue-600 text-sm">来自：王医生 · 社区卫生站</p>
            </div>
          </div>
          <p className="text-blue-800 leading-relaxed font-medium text-lg">
            “张大爷，最近血压控制得不错！春季风大，出门记得戴口罩，早晚温差大，注意保暖。坚持每天散步30分钟，对心脏很有好处。”
          </p>
        </div>
        <div className="absolute -right-6 -bottom-6 text-blue-100/50">
          <Stethoscope size={120} />
        </div>
      </motion.section>

      {/* Steps Card */}
      <motion.div 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="bg-emerald-600 text-white p-8 rounded-[40px] shadow-lg shadow-emerald-100 cursor-pointer"
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-emerald-100 text-lg">今日步数</p>
            <h3 className="text-5xl font-black">5,842</h3>
          </div>
          <div className="bg-white/20 p-3 rounded-2xl">
            <Footprints size={32} />
          </div>
        </div>
        <div className="w-full bg-white/20 h-3 rounded-full overflow-hidden">
          <div className="bg-white h-full w-[73%]"></div>
        </div>
        <p className="mt-4 text-emerald-50 font-medium">距离目标 8,000 步还差 2,158 步</p>
      </motion.div>

      {/* Heart Rate Chart */}
      <section className="bg-white p-6 rounded-[32px] shadow-sm border border-stone-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">心率趋势</h3>
          <motion.button 
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.9 }}
            className="text-stone-400"
          >
            <ChevronRight />
          </motion.button>
        </div>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
              <XAxis dataKey="时间" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#999' }} />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Line 
                type="monotone" 
                dataKey="数值" 
                stroke="#E11D48" 
                strokeWidth={4} 
                dot={{ r: 6, fill: '#E11D48', strokeWidth: 0 }}
                activeDot={{ r: 8, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
};
