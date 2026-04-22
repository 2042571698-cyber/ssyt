import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Star, MapPin, Phone, Calendar, ShieldCheck, CheckCircle, Clock, CreditCard, ChevronRight } from 'lucide-react';

interface BookingViewProps {
  serviceId: string;
  onBack: () => void;
}

export const BookingView: React.FC<BookingViewProps> = ({ serviceId, onBack }) => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [step, setStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState('今天');
  const [selectedTime, setSelectedTime] = useState('11:30');

  const serviceDetails: Record<string, any> = {
    meal: { 
      title: '助餐服务', 
      price: '15', 
      unit: '餐',
      rating: 4.9, 
      provider: '社区长者食堂',
      desc: '提供营养均衡的午餐和晚餐，少油少盐，适合老年人口味。',
      options: [
        { id: 'lunch', name: '营养午餐', time: '11:00 - 12:30', price: '15' },
        { id: 'dinner', name: '温馨晚餐', time: '17:00 - 18:30', price: '15' },
        { id: 'combo', name: '全天套餐', time: '午餐+晚餐', price: '28' },
      ]
    },
    clean: { 
      title: '助洁服务', 
      price: '40', 
      unit: '小时',
      rating: 4.8, 
      provider: '阳光家政',
      desc: '专业家政人员上门，提供地面清洁、家具除尘等全方位保洁服务。',
      options: [
        { id: 'basic', name: '基础保洁 (2小时)', time: '日常除尘', price: '80' },
        { id: 'deep', name: '深度保洁 (4小时)', time: '厨卫精洁', price: '150' },
        { id: 'window', name: '擦玻璃服务', time: '全屋玻璃', price: '120' },
      ]
    },
    nurse: { 
      title: '助医服务', 
      price: '60', 
      unit: '次',
      rating: 5.0, 
      provider: '康复中心',
      desc: '专业护理人员陪同就医，包括挂号、取药、诊间陪护等。',
      options: [
        { id: 'half', name: '半天陪诊 (4小时)', time: '挂号+看诊', price: '120' },
        { id: 'full', name: '全天陪诊 (8小时)', time: '全程陪护', price: '220' },
        { id: 'med', name: '代取药服务', time: '送药上门', price: '30' },
      ]
    },
    care: { 
      title: '助浴服务', 
      price: '80', 
      unit: '次',
      rating: 4.7, 
      provider: '专业护理队',
      desc: '为行动不便的老人提供专业的助浴服务，确保安全与舒适。',
      options: [
        { id: 'home', name: '上门助浴', time: '专业设备', price: '80' },
        { id: 'center', name: '中心助浴', time: '专车接送', price: '100' },
      ]
    },
    lecture: {
      title: '健康讲座',
      price: '0',
      unit: '人',
      rating: 5.0,
      provider: '社区卫生服务站',
      desc: '专业医生主讲，分享春季养生与饮食健康知识。',
      options: [
        { id: 'offline', name: '线下参加', time: '现场互动', price: '0' },
        { id: 'online', name: '线上直播', time: '手机观看', price: '0' },
      ]
    },
  };

  const service = serviceDetails[serviceId] || serviceDetails.meal;

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="bg-stone-50 p-6 rounded-[32px] border border-stone-100">
              <h3 className="text-xl font-black mb-2 text-stone-800">第一步：选择服务类型</h3>
              <p className="text-stone-500 font-bold">请选择您需要的具体服务项目</p>
            </div>
            <div className="space-y-4">
              {service.options.map((opt: any) => (
                <motion.button
                  key={opt.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedOption(opt.name);
                    setStep(2);
                  }}
                  className={`w-full p-6 rounded-[32px] border-2 transition-all flex items-center justify-between ${selectedOption === opt.name ? 'border-blue-500 bg-blue-50' : 'border-stone-100 bg-white shadow-sm'}`}
                >
                  <div className="text-left">
                    <p className="text-xl font-black text-stone-900">{opt.name}</p>
                    <p className="text-stone-500 font-bold mt-1">{opt.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-red-600">¥{opt.price}</p>
                    <ChevronRight className="inline text-stone-300 ml-2" />
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="bg-stone-50 p-6 rounded-[32px] border border-stone-100">
              <h3 className="text-xl font-black mb-2 text-stone-800">第二步：选择时间</h3>
              <p className="text-stone-500 font-bold">已选：{selectedOption}</p>
            </div>
            
            <div>
              <h4 className="text-lg font-black mb-4 flex items-center gap-2">
                <Calendar size={20} className="text-blue-500" /> 选择日期
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {['今天', '明天', '周日'].map((day) => (
                  <button 
                    key={day}
                    onClick={() => setSelectedDate(day)}
                    className={`py-5 rounded-2xl font-black text-lg transition-all ${selectedDate === day ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-white border border-stone-100 text-stone-500'}`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-black mb-4 flex items-center gap-2">
                <Clock size={20} className="text-emerald-500" /> 选择具体时间
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {['11:30', '12:00', '12:30', '17:30', '18:00', '18:30'].map((time) => (
                  <button 
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-4 rounded-2xl font-black transition-all ${selectedTime === time ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-100' : 'bg-white border border-stone-100 text-stone-500'}`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={() => setStep(3)}
              className="w-full bg-blue-600 text-white py-6 rounded-[32px] text-2xl font-black shadow-xl shadow-blue-100 mt-8"
            >
              下一步
            </button>
          </motion.div>
        );
      case 3:
        return (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            <div className="bg-emerald-50 p-8 rounded-[48px] border border-emerald-100 text-center">
              <div className="w-20 h-20 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <CheckCircle size={48} />
              </div>
              <h3 className="text-2xl font-black text-emerald-900">确认预约信息</h3>
            </div>

            <div className="bg-white p-8 rounded-[40px] shadow-sm border border-stone-100 space-y-6">
              <div className="flex justify-between items-center border-b border-stone-50 pb-4">
                <span className="text-stone-400 font-bold">服务项目</span>
                <span className="text-stone-900 font-black text-xl">{service.title} - {selectedOption}</span>
              </div>
              <div className="flex justify-between items-center border-b border-stone-50 pb-4">
                <span className="text-stone-400 font-bold">预约时间</span>
                <span className="text-stone-900 font-black text-xl">{selectedDate} {selectedTime}</span>
              </div>
              <div className="flex justify-between items-center border-b border-stone-50 pb-4">
                <span className="text-stone-400 font-bold">服务地址</span>
                <span className="text-stone-900 font-black text-xl">幸福小区 3号楼 502</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-400 font-bold">支付金额</span>
                <span className="text-red-600 font-black text-3xl">¥{service.options.find((o:any) => o.name === selectedOption)?.price}</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setStep(2)}
                className="flex-1 bg-stone-100 text-stone-500 py-6 rounded-[32px] text-xl font-black"
              >
                修改
              </button>
              <button 
                className="flex-[2] bg-emerald-600 text-white py-6 rounded-[32px] text-xl font-black shadow-xl shadow-emerald-100 flex items-center justify-center gap-3"
              >
                <CreditCard size={24} /> 确认支付
              </button>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 p-6 pt-12 safe-area-top flex items-center justify-between bg-white/80 backdrop-blur-lg border-b border-stone-100">
        <div className="flex items-center gap-4">
          <button onClick={step > 1 ? () => setStep(step - 1) : onBack} className="p-3 bg-stone-50 rounded-2xl active:scale-95 transition-transform">
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-2xl font-black text-stone-900">{service.title}</h2>
        </div>
        <div className="flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-full text-amber-600 font-black text-sm">
          <Star size={16} fill="currentColor" />
          <span>{service.rating}</span>
        </div>
      </div>

      <div className="flex-1 p-6 pb-32">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>
    </div>
  );
};
