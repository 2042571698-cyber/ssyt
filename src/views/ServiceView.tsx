import React from 'react';
import { motion } from 'motion/react';
import { Utensils, Home, HeartPulse, Sparkles, ChevronRight, Clock, MapPin, Users, Calendar, Star } from 'lucide-react';

const services = [
  { id: 'meal', title: '助餐服务', icon: Utensils, color: 'bg-orange-500', lightColor: 'bg-orange-50', textColor: 'text-orange-600', desc: '营养均衡 送餐上门' },
  { id: 'clean', title: '助洁服务', icon: Sparkles, color: 'bg-blue-500', lightColor: 'bg-blue-50', textColor: 'text-blue-600', desc: '居家保洁 环境整理' },
  { id: 'nurse', title: '助医服务', icon: HeartPulse, color: 'bg-red-500', lightColor: 'bg-red-50', textColor: 'text-red-600', desc: '陪诊就医 代取药品' },
  { id: 'care', title: '助浴服务', icon: Home, color: 'bg-emerald-500', lightColor: 'bg-emerald-50', textColor: 'text-emerald-600', desc: '专业护理 安全助浴' },
];

interface ServiceViewProps {
  onSelectService: (id: string) => void;
  onShowHistory: () => void;
}

export const ServiceView: React.FC<ServiceViewProps> = ({ onSelectService, onShowHistory }) => {
  return (
    <div className="px-6 pb-48 space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-stone-900">生活服务</h2>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onShowHistory}
          className="bg-white p-3 rounded-2xl shadow-sm border border-stone-100 text-stone-500 flex items-center gap-2 active:opacity-60"
        >
          <Clock size={20} />
          <span className="font-bold">订单</span>
        </motion.button>
      </div>

      {/* Featured Services Grid */}
      <div className="grid grid-cols-2 gap-4">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <motion.button 
              key={service.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectService(service.id)}
              className={`${service.lightColor} p-5 rounded-[40px] border border-white shadow-sm flex flex-col items-start gap-4 text-left relative overflow-hidden group`}
            >
              <div className={`${service.color} text-white p-4 rounded-2xl shadow-lg`}>
                <Icon size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-stone-900">{service.title}</h3>
                <p className={`${service.textColor} text-sm font-medium mt-1`}>{service.desc}</p>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-10 group-active:scale-110 transition-transform">
                <Icon size={80} />
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Community Events - Redesigned */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-stone-900">社区活动</h3>
          <button className="text-blue-600 font-bold">全部活动</button>
        </div>
        
        <div className="space-y-4">
          <motion.div 
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-[40px] shadow-sm border border-stone-100 overflow-hidden"
          >
            <div className="h-48 relative">
              <img 
                src="https://picsum.photos/seed/calligraphy/800/400" 
                alt="Event" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                火热报名中
              </div>
            </div>
            <div className="p-6">
              <h4 className="text-2xl font-bold mb-3 text-stone-900">长者书法交流会</h4>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-stone-500">
                  <Calendar size={18} className="text-blue-500" />
                  <span className="font-medium">本周六下午 14:30 - 16:30</span>
                </div>
                <div className="flex items-center gap-2 text-stone-500">
                  <MapPin size={18} className="text-red-500" />
                  <span className="font-medium">社区活动中心 2 楼多功能厅</span>
                </div>
                <div className="flex items-center gap-2 text-stone-500">
                  <Users size={18} className="text-emerald-500" />
                  <span className="font-medium">已报名 24/30 人</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-stone-200">
                      <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="user" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-stone-100 flex items-center justify-center text-stone-400 text-xs font-bold">
                    +20
                  </div>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold text-lg shadow-lg shadow-blue-100"
                >
                  立即报名
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Health Lecture Card - Improved */}
          <motion.div 
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-[40px] shadow-sm border border-stone-100 overflow-hidden"
          >
            <div className="h-48 relative">
              <img 
                src="https://picsum.photos/seed/health/800/400" 
                alt="Lecture" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                健康讲座
              </div>
            </div>
            <div className="p-6">
              <h4 className="text-2xl font-bold mb-3 text-stone-900">春季养生与饮食健康</h4>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-stone-500">
                  <Calendar size={18} className="text-blue-500" />
                  <span className="font-medium">下周一上午 09:00 - 11:00</span>
                </div>
                <div className="flex items-center gap-2 text-stone-500">
                  <MapPin size={18} className="text-red-500" />
                  <span className="font-medium">社区卫生服务站 3 楼会议室</span>
                </div>
                <div className="flex items-center gap-2 text-stone-500">
                  <HeartPulse size={18} className="text-rose-500" />
                  <span className="font-medium">主讲人：王医生 (全科主任)</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-stone-400 font-bold">
                  已报名 <span className="text-emerald-500">45</span> 人
                </div>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onSelectService('lecture')}
                  className="bg-emerald-600 text-white px-8 py-3 rounded-2xl font-bold text-lg shadow-lg shadow-emerald-100"
                >
                  预约讲座
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service Ratings / Trust Section - More Padding */}
      <section className="bg-stone-50 p-8 rounded-[48px] border border-stone-100 mb-12">
        <div className="flex items-center gap-3 mb-4">
          <Star className="text-amber-500" fill="currentColor" size={24} />
          <h3 className="text-xl font-bold text-stone-900">服务承诺</h3>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-stone-900 font-black text-xl">100%</div>
            <div className="text-stone-500 text-xs font-bold mt-1">实名认证</div>
          </div>
          <div className="border-x border-stone-200">
            <div className="text-stone-900 font-black text-xl">24h</div>
            <div className="text-stone-500 text-xs font-bold mt-1">响应保障</div>
          </div>
          <div>
            <div className="text-stone-900 font-black text-xl">4.9</div>
            <div className="text-stone-500 text-xs font-bold mt-1">综合评分</div>
          </div>
        </div>
      </section>
    </div>
  );
};
