import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, Phone, X } from 'lucide-react';

interface SOSModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SOSModal: React.FC<SOSModalProps> = ({ isOpen, onClose }) => {
  const [countdown, setCountdown] = React.useState(5);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen && countdown > 0) {
      timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
    } else if (isOpen && countdown === 0) {
      console.log("SOS Triggered!");
    }
    if (!isOpen) setCountdown(5);
    return () => clearInterval(timer);
  }, [isOpen, countdown]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-red-600 flex flex-col items-center justify-center p-8 text-white"
      >
        <motion.div
          animate={{ x: [0, -5, 5, -5, 5, 0] }}
          transition={{ repeat: Infinity, duration: 0.2 }}
          className="text-center w-full max-w-sm"
        >
          <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
            <AlertTriangle size={64} />
          </div>
          
          <h2 className="text-5xl font-bold mb-4">紧急呼救中</h2>
          <p className="text-2xl opacity-90 mb-12 leading-relaxed">系统将在 {countdown} 秒后自动联系紧急联系人和社区中心</p>
          
          <div className="text-9xl font-black mb-16 tabular-nums">{countdown}</div>
          
          <div className="flex flex-col gap-6 w-full">
            <button 
              className="bg-white text-red-600 py-6 rounded-[32px] text-2xl font-bold flex items-center justify-center gap-3 shadow-2xl active:scale-95 transition-transform"
              onClick={() => console.log("Calling now...")}
            >
              <Phone size={32} fill="currentColor" />
              立即拨打
            </button>
            
            <button 
              className="bg-red-700/50 text-white py-6 rounded-[32px] text-2xl font-bold flex items-center justify-center gap-3 border-2 border-white/30 active:scale-95 transition-transform"
              onClick={onClose}
            >
              <X size={32} />
              误触取消
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
