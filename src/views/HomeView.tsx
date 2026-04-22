import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Video, Heart, Activity, Thermometer, Sun, Newspaper, ChevronRight, Lightbulb, Lock, CheckCircle, MessageCircle, Image as ImageIcon, Sparkles, Brain, Smile, Meh, Frown, PhoneCall } from 'lucide-react';

interface HomeViewProps {
  onSOS: () => void;
  onMedicationDetail: () => void;
  onGameEntry: () => void;
  onGalleryOpen: () => void;
  onCallOpen: () => void;
  onSmartHomeOpen: () => void;
  onTasksComplete: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onSOS, onMedicationDetail, onGameEntry, onGalleryOpen, onCallOpen, onSmartHomeOpen, onTasksComplete }) => {
  const [showReply, setShowReply] = useState(false);
  const [replySent, setReplySent] = useState(false);
  const [mood, setMood] = useState<string | null>(null);
  const [moodFeedback, setMoodFeedback] = useState<string | null>(null);
  const [tasks, setTasks] = useState([
    { id: 1, name: '晨练', done: true },
    { id: 2, name: '喝水', done: true },
    { id: 3, name: '服药', done: false },
    { id: 4, name: '午睡', done: false }
  ]);
  const [medsTaken, setMedsTaken] = useState(false);
  
  const familyPhotos = [
    { id: 1, url: 'https://picsum.photos/seed/family1/300/200', caption: '孙女的小学毕业礼' },
    { id: 2, url: 'https://picsum.photos/seed/family2/300/200', caption: '周末郊游合照' },
    { id: 3, url: 'https://picsum.photos/seed/family3/300/200', caption: '大儿子送的生日蛋糕' },
  ];

  const handleMoodSelect = (id: string, label: string) => {
    setMood(id);
    const feedbackMap: Record<string, string> = {
      good: '太棒了！保持这份好心情，祝您一天愉快！',
      neutral: '挺不错的，平平淡淡也是福，喝杯茶放松下吧。',
      bad: '别难过，张大爷。给孩子们打个电话聊聊，或者听听曲子？',
    };
    setMoodFeedback(feedbackMap[id] || `很高兴您今天感觉${label}！`);
    setTimeout(() => setMoodFeedback(null), 4000);
  };

  const toggleTask = (id: number) => {
    const newTasks = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
    setTasks(newTasks);
    
    // Check if all tasks are done
    if (newTasks.every(t => t.done)) {
      onTasksComplete();
    }
  };

  const handleSendReply = (text: string) => {
    setReplySent(true);
    setTimeout(() => {
      setShowReply(false);
      setReplySent(false);
    }, 2000);
  };

  return (
    <div className="px-6 pb-64 space-y-8">
      {/* SOS Button - Moved to Top */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onSOS}
        className="w-full bg-red-600 text-white p-6 rounded-[32px] shadow-xl shadow-red-100 flex items-center justify-center gap-4 border-2 border-red-500 relative overflow-hidden mt-2"
      >
        <div className="relative z-10 flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-full">
            <Phone size={32} fill="currentColor" />
          </div>
          <span className="text-3xl font-black tracking-wider">紧急呼救</span>
        </div>
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute inset-0 bg-white rounded-full"
        />
      </motion.button>

      {/* Warm Greeting & Weather - Redesigned */}
      <section className="space-y-4">
        <div className="flex items-end justify-between px-2">
          <div>
            <h2 className="text-xl font-black text-stone-900 tracking-tight">
              早安，张大爷
            </h2>
            <p className="text-stone-500 font-bold text-sm mt-1">今天是 3月6日 · 惊蛰</p>
          </div>
          <div className="text-right">
            <p className="text-stone-400 font-bold text-xs uppercase tracking-widest">北京 · 晴</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-[40px] text-white shadow-xl shadow-blue-100 relative overflow-hidden">
          <div className="relative z-10 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                <Sun size={32} className="text-amber-300" fill="currentColor" />
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black tracking-tighter">24°</span>
                  <span className="text-blue-100 font-bold">晴</span>
                </div>
                <p className="text-blue-50 font-bold text-sm">空气优 · 适宜晨练</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-sm flex items-center gap-2 text-xs">
                <Thermometer size={14} />
                <span className="font-bold">18° / 26°</span>
              </div>
              <div className="bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-sm flex items-center gap-2 text-xs">
                <Activity size={14} />
                <span className="font-bold">紫外线: 中等</span>
              </div>
            </div>
          </div>
          <Sun size={120} className="absolute -right-6 -bottom-6 text-white/5 opacity-10" />
        </div>
      </section>

      {/* Care Message - Enhanced with Quick Reply */}
      <section className="bg-gradient-to-br from-rose-50 to-orange-50 p-6 rounded-[40px] border border-rose-100/50 shadow-sm relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Heart size={20} className="text-rose-500" fill="currentColor" />
              <h3 className="text-lg font-black text-stone-900">亲情留言</h3>
            </div>
            <span className="text-stone-400 font-bold text-xs">10分钟前</span>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-[32px] border border-rose-100/50 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <img src="https://picsum.photos/seed/daughter/100/100" alt="avatar" className="w-12 h-12 rounded-full border-2 border-white shadow-sm" referrerPolicy="no-referrer" />
                <span className="text-stone-900 font-black text-lg">小女儿 张美玲</span>
              </div>
              
              <div className="bg-rose-50/40 p-5 rounded-2xl border border-rose-100/30 mb-5">
                <p className="text-stone-800 font-bold text-lg leading-relaxed">
                  “爸，今天降温了，出门记得加件外套。晚点给您视频！”
                </p>
              </div>

              <AnimatePresence mode="wait">
                {!showReply ? (
                  <motion.button 
                    key="reply-btn"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowReply(true)}
                    className="w-full bg-rose-500 text-white py-4 rounded-2xl text-lg font-black shadow-lg shadow-rose-100 flex items-center justify-center gap-2 active:scale-95 transition-transform"
                  >
                    <MessageCircle size={24} />
                    <span>回复留言</span>
                  </motion.button>
                ) : (
                  <motion.div 
                    key="reply-panel"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    {replySent ? (
                      <div className="py-4 text-center text-emerald-600 font-black flex items-center justify-center gap-2">
                        <CheckCircle size={24} />
                        <span>回复已发送</span>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        {['知道了', '好孩子', '放心吧', '想你了'].map((text) => (
                          <button
                            key={text}
                            onClick={() => handleSendReply(text)}
                            className="bg-stone-50 border border-stone-100 py-3 rounded-xl font-black text-stone-700 active:bg-rose-500 active:text-white transition-colors"
                          >
                            {text}
                          </button>
                        ))}
                        <button
                          onClick={() => setShowReply(false)}
                          className="col-span-2 py-2 text-stone-400 font-bold text-sm"
                        >
                          取消
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        <div className="absolute -right-8 -top-8 text-rose-100/10">
          <Heart size={200} fill="currentColor" />
        </div>
      </section>

      {/* Mood Tracker - Emotional Design */}
      <section className="bg-white p-6 rounded-[40px] shadow-sm border border-stone-100 relative">
        <h3 className="text-xl font-bold text-stone-800 mb-4 text-center">您今天心情怎么样？</h3>
        <div className="flex justify-around">
          {[
            { id: 'good', icon: Smile, label: '开心', color: 'text-emerald-500', bg: 'bg-emerald-50' },
            { id: 'neutral', icon: Meh, label: '一般', color: 'text-amber-500', bg: 'bg-amber-50' },
            { id: 'bad', icon: Frown, label: '难过', color: 'text-rose-500', bg: 'bg-rose-50' },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = mood === item.id;
            return (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleMoodSelect(item.id, item.label)}
                className={`flex flex-col items-center gap-2 p-4 rounded-3xl transition-all ${
                  isActive ? `${item.bg} ${item.color} ring-2 ring-current` : 'text-stone-400'
                }`}
              >
                <Icon size={40} strokeWidth={isActive ? 2.5 : 2} />
                <span className="font-bold">{item.label}</span>
              </motion.button>
            );
          })}
        </div>
        <AnimatePresence>
          {moodFeedback && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-stone-800 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg z-20 whitespace-nowrap"
            >
              {moodFeedback}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Daily Blessing - Emotional Design */}
      <section className="bg-gradient-to-r from-amber-50 to-orange-50 p-8 rounded-[40px] border border-amber-100 text-center relative overflow-hidden">
        <div className="relative z-10">
          <Sparkles className="text-amber-500 mx-auto mb-3" size={32} />
          <h3 className="text-xl font-bold text-amber-900 mb-2">每日福语</h3>
          <p className="text-amber-800 text-lg italic leading-relaxed">
            “心宽一寸，路宽一丈。保持好心情，就是最好的养生。”
          </p>
        </div>
        <div className="absolute left-0 top-0 opacity-10">
          <Sun size={100} />
        </div>
      </section>

      {/* Brain Game Entry */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={onGameEntry}
        className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-6 rounded-[40px] shadow-lg shadow-purple-100 flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-2xl">
            <Brain size={36} />
          </div>
          <div className="text-left">
            <h3 className="text-2xl font-bold">益智乐园</h3>
            <p className="text-purple-100">动动脑筋，越活越年轻</p>
          </div>
        </div>
        <ChevronRight size={32} className="text-white/50" />
      </motion.button>

      {/* Family Photo Wall - Emotional Design */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <ImageIcon className="text-blue-500" size={24} />
            亲情相册
          </h3>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-blue-600 font-bold text-lg active:opacity-60"
          >
            上传照片
          </motion.button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-2 px-2">
          {familyPhotos.map((photo) => (
            <motion.div 
              key={photo.id}
              whileTap={{ scale: 0.98 }}
              className="flex-shrink-0 w-64 bg-white p-3 rounded-[32px] shadow-sm border border-stone-100"
            >
              <div className="h-40 rounded-2xl overflow-hidden mb-3">
                <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <p className="text-stone-800 font-bold text-center px-2 truncate">{photo.caption}</p>
            </motion.div>
          ))}
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onGalleryOpen}
            className="flex-shrink-0 w-32 bg-stone-50 border-2 border-dashed border-stone-200 rounded-[32px] flex flex-col items-center justify-center gap-2 text-stone-400"
          >
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
              <ImageIcon size={24} />
            </div>
            <span className="font-bold">更多</span>
          </motion.button>
        </div>
      </section>

      {/* Daily Check-in - Gamified/Emotional */}
      <section className="bg-emerald-50 p-6 rounded-[40px] border border-emerald-100 relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-emerald-900 flex items-center gap-2">
            <Sparkles size={24} className="text-emerald-500" />
            今日成就
          </h3>
          <div className="bg-white px-3 py-1 rounded-full text-emerald-600 font-bold text-sm shadow-sm">
            已坚持 12 天
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {tasks.map((task) => (
            <motion.button 
              key={task.id} 
              whileTap={{ scale: 0.9 }}
              onClick={() => toggleTask(task.id)}
              className="flex flex-col items-center gap-2"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${task.done ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-100' : 'bg-white text-stone-300 border border-stone-100'}`}>
                <CheckCircle size={28} />
              </div>
              <span className={`font-bold text-sm ${task.done ? 'text-emerald-700' : 'text-stone-400'}`}>{task.name}</span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Smart Home Controls */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <Lightbulb className="text-amber-500" size={24} />
            居家智能
          </h3>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onSmartHomeOpen}
            className="bg-stone-100 px-4 py-2 rounded-xl text-stone-500 font-bold text-lg active:bg-stone-200 transition-colors"
          >
            查看全部
          </motion.button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <motion.div 
            whileTap={{ scale: 0.98 }}
            onClick={onSmartHomeOpen}
            className="bg-white p-5 rounded-[32px] shadow-sm border border-stone-100 flex items-center justify-between active:bg-stone-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
                <Lightbulb size={24} />
              </div>
              <span className="font-bold">客厅灯</span>
            </div>
            <div className="w-12 h-6 bg-emerald-500 rounded-full relative">
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
            </div>
          </motion.div>
          <motion.div 
            whileTap={{ scale: 0.98 }}
            onClick={onSmartHomeOpen}
            className="bg-white p-5 rounded-[32px] shadow-sm border border-stone-100 flex items-center justify-between active:bg-stone-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                <Lock size={24} />
              </div>
              <span className="font-bold">门锁</span>
            </div>
            <span className="text-emerald-500 font-bold">已锁</span>
          </motion.div>
        </div>
      </section>

      {/* Quick Family Contacts - Redesigned to 2 columns for better clarity */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <Heart className="text-red-500" fill="currentColor" size={24} />
            亲情通话
          </h3>
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={onCallOpen}
            className="text-blue-600 font-bold text-lg"
          >
            更多家人
          </motion.button>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {[
            { name: '大儿子', avatar: 'son', color: 'bg-blue-50 text-blue-600', relation: '长子' },
            { name: '小女儿', avatar: 'daughter', color: 'bg-rose-50 text-rose-600', relation: '次女' },
          ].map((member, i) => (
            <motion.div 
              key={i}
              whileTap={{ scale: 0.95 }}
              onClick={onCallOpen}
              className="bg-white p-6 rounded-[48px] shadow-sm border border-stone-100 flex flex-col items-center gap-4 active:bg-stone-50 transition-colors"
            >
              <div className="relative">
                <img 
                  src={`https://picsum.photos/seed/${member.avatar}/150/150`} 
                  alt={member.name} 
                  className="w-24 h-24 rounded-full border-4 border-white shadow-md" 
                  referrerPolicy="no-referrer" 
                />
                <div className="absolute -bottom-1 -right-1 bg-emerald-500 w-6 h-6 rounded-full border-2 border-white" />
              </div>
              <div className="text-center">
                <p className="font-black text-2xl text-stone-900">{member.name}</p>
                <p className="text-stone-400 font-bold text-sm mb-3">{member.relation}</p>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto ${member.color} shadow-inner`}>
                  <Phone size={24} fill="currentColor" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Medication Reminder */}
      <motion.section 
        className={`p-6 rounded-[40px] border transition-all duration-500 ${medsTaken ? 'bg-emerald-50 border-emerald-100' : 'bg-amber-50 border-amber-100'}`}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-2xl font-bold ${medsTaken ? 'text-emerald-900' : 'text-amber-900'}`}>
            {medsTaken ? '今日用药已完成' : '今日用药'}
          </h3>
          <motion.button 
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={onMedicationDetail}
            className={`flex items-center gap-1 font-bold ${medsTaken ? 'text-emerald-700' : 'text-amber-700'}`}
          >
            详情 <ChevronRight size={20} />
          </motion.button>
        </div>
        <div className="space-y-3">
          <div className="bg-white p-5 rounded-3xl flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${medsTaken ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                {medsTaken ? <CheckCircle size={28} /> : <Thermometer size={28} />}
              </div>
              <div>
                <p className="font-bold text-xl">氨氯地平</p>
                <p className="text-stone-500">11:00 饭前服用</p>
              </div>
            </div>
            <button 
              onClick={() => setMedsTaken(!medsTaken)}
              className={`px-6 py-3 rounded-2xl font-bold shadow-lg transition-all active:scale-95 ${medsTaken ? 'bg-emerald-500 text-white shadow-emerald-100' : 'bg-amber-500 text-white shadow-amber-100'}`}
            >
              {medsTaken ? '撤销' : '吃药'}
            </button>
          </div>
        </div>
      </motion.section>
    </div>
  );
};
