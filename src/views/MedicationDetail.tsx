import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Plus, Clock, CheckCircle2, AlertCircle, Info, ChevronRight, Calendar, Bell, Pill } from 'lucide-react';

interface MedicationDetailProps {
  onBack: () => void;
}

export const MedicationDetail: React.FC<MedicationDetailProps> = ({ onBack }) => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [meds, setMeds] = useState([
    { id: '1', name: '阿司匹林', time: '08:00', dosage: '1片', status: 'done', type: '早餐后', desc: '预防心血管疾病，请勿空腹服用。', stock: 12 },
    { id: '2', name: '氨氯地平', time: '11:00', dosage: '1片', status: 'pending', type: '饭前', desc: '降血压药，建议每天固定时间服用。', stock: 5 },
    { id: '3', name: '二甲双胍', time: '18:00', dosage: '2片', status: 'pending', type: '随餐', desc: '降血糖药，请随餐服用以减少胃部不适。', stock: 24 },
  ]);

  const [selectedMed, setSelectedMed] = useState<string | null>(null);

  const toggleMed = (id: string) => {
    setMeds(meds.map(m => m.id === id ? { ...m, status: m.status === 'done' ? 'pending' : 'done' } : m));
  };

  const doneCount = meds.filter(m => m.status === 'done').length;
  const progress = (doneCount / meds.length) * 100;

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-stone-100 p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onBack} 
            className="p-3 bg-white rounded-2xl shadow-sm border border-stone-100"
          >
            <ArrowLeft size={28} />
          </motion.button>
          <h2 className="text-2xl font-bold">我的药箱</h2>
        </div>
        <motion.button 
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg"
        >
          <Plus size={28} />
        </motion.button>
      </div>

      <div className="p-6">

      {/* Progress Card */}
      <div className="bg-white p-8 rounded-[48px] shadow-sm border border-stone-100 mb-8 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-amber-100 rounded-3xl flex items-center justify-center text-amber-600">
              <Clock size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-bold">今日服药进度</h3>
              <p className="text-stone-500 font-medium">已完成 {doneCount} / {meds.length}</p>
            </div>
          </div>
          <div className="w-full bg-stone-100 h-4 rounded-full overflow-hidden mb-2">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="bg-amber-500 h-full transition-all duration-700" 
            />
          </div>
          <p className="text-stone-400 text-sm font-medium">坚持服药，健康常在</p>
        </div>
        <Pill className="absolute -right-8 -bottom-8 text-stone-50" size={160} />
      </div>

      {/* Medication List */}
      <div className="space-y-4">
        {meds.map((med) => (
          <div key={med.id} className="space-y-2">
            <motion.div
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedMed(selectedMed === med.id ? null : med.id)}
              className={`p-6 rounded-[32px] border flex items-center justify-between transition-all duration-300 ${
                med.status === 'done' ? 'bg-emerald-50 border-emerald-100' : 'bg-white border-stone-100 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${
                  med.status === 'done' ? 'bg-emerald-500 text-white' : 'bg-amber-100 text-amber-600'
                }`}>
                  {med.status === 'done' ? <CheckCircle2 size={28} /> : <Bell size={28} />}
                </div>
                <div>
                  <h4 className={`text-xl font-bold ${med.status === 'done' ? 'text-emerald-900' : 'text-stone-900'}`}>
                    {med.name}
                  </h4>
                  <p className={`${med.status === 'done' ? 'text-emerald-600' : 'text-stone-500'} font-medium`}>
                    {med.time} · {med.dosage} · {med.type}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMed(med.id);
                  }}
                  className={`px-6 py-3 rounded-2xl font-bold shadow-lg transition-all active:scale-90 ${
                    med.status === 'done' ? 'bg-emerald-100 text-emerald-600 shadow-none' : 'bg-amber-500 text-white shadow-amber-100'
                  }`}
                >
                  {med.status === 'done' ? '已服' : '吃药'}
                </button>
                <ChevronRight className={`text-stone-300 transition-transform ${selectedMed === med.id ? 'rotate-90' : ''}`} />
              </div>
            </motion.div>
            
            <AnimatePresence>
              {selectedMed === med.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-white/60 backdrop-blur-sm p-6 rounded-[32px] border border-stone-100 mx-2 space-y-4">
                    <div className="flex items-start gap-3">
                      <Info size={20} className="text-blue-500 mt-1 flex-shrink-0" />
                      <p className="text-stone-600 leading-relaxed">{med.desc}</p>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-stone-100">
                      <div className="flex items-center gap-2 text-stone-500">
                        <Calendar size={18} />
                        <span className="font-medium">剩余库存：{med.stock} 片</span>
                      </div>
                      {med.stock < 10 && (
                        <span className="text-red-500 font-bold text-sm bg-red-50 px-2 py-1 rounded-lg">库存不足</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Tips */}
      <div className="mt-12 p-8 bg-blue-50 rounded-[40px] border border-blue-100 flex items-start gap-4">
        <AlertCircle size={32} className="text-blue-500 flex-shrink-0" />
        <div>
          <h4 className="text-xl font-bold text-blue-900 mb-2">用药须知</h4>
          <p className="text-blue-700 leading-relaxed font-medium">
            如果您感到身体不适，请立即停止服药并联系您的主治医生或点击首页的紧急呼救。请勿私自增减药量。
          </p>
        </div>
      </div>
      </div>
    </div>
  );
};
