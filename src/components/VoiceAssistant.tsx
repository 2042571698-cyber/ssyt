import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mic, Volume2 } from 'lucide-react';

interface VoiceAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed inset-0 z-[110] flex flex-col justify-end"
        >
          <div className="absolute inset-0 bg-black/40" onClick={onClose} />
          
          <div className="relative bg-white rounded-t-[48px] p-8 pb-16 shadow-2xl">
            <div className="w-16 h-1.5 bg-stone-200 rounded-full mx-auto mb-8" />
            
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-blue-200">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <Mic size={48} className="text-white" />
                </motion.div>
              </div>
              
              <h3 className="text-3xl font-bold mb-2">我在听，您请说</h3>
              <p className="text-xl text-stone-500 mb-8 italic">“帮我给大儿子打个电话”</p>
              
              <div className="flex gap-4 w-full">
                <div className="flex-1 bg-stone-100 p-4 rounded-2xl flex items-center gap-3">
                  <Volume2 className="text-blue-600" />
                  <span className="text-lg font-medium">正在识别中...</span>
                </div>
                <button 
                  onClick={onClose}
                  className="p-4 bg-stone-100 rounded-2xl text-stone-400"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
