import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Brain, Trophy, RefreshCw, Star } from 'lucide-react';

export const GameView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [score, setScore] = useState(0);
  const [cards, setCards] = useState<{ id: number; value: string; isFlipped: boolean; isMatched: boolean }[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);

  const symbols = ['🍎', '🍌', '🍇', '🍓', '🍒', '🍍'];

  const initGame = () => {
    const deck = [...symbols, ...symbols]
      .sort(() => Math.random() - 0.5)
      .map((value, index) => ({ id: index, value, isFlipped: false, isMatched: false }));
    setCards(deck);
    setScore(0);
    setFlippedIndices([]);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleCardClick = (index: number) => {
    if (flippedIndices.length === 2 || cards[index].isFlipped || cards[index].isMatched) return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (cards[first].value === cards[second].value) {
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[first].isMatched = true;
          matchedCards[second].isMatched = true;
          setCards(matchedCards);
          setScore(s => s + 10);
          setFlippedIndices([]);
        }, 500);
      } else {
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[first].isFlipped = false;
          resetCards[second].isFlipped = false;
          setCards(resetCards);
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };

  const isWin = cards.length > 0 && cards.every(c => c.isMatched);

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
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Brain className="text-purple-500" />
            益智翻牌
          </h2>
        </div>
        <motion.button 
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          onClick={initGame} 
          className="p-3 bg-white rounded-2xl shadow-sm border border-stone-100"
        >
          <RefreshCw size={28} className="text-stone-600" />
        </motion.button>
      </div>

      <div className="p-6">

      <div className="bg-white p-6 rounded-[40px] shadow-sm border border-stone-100 mb-8 flex justify-between items-center">
        <div>
          <p className="text-stone-500 font-bold">当前得分</p>
          <p className="text-4xl font-black text-purple-600">{score}</p>
        </div>
        <div className="bg-purple-100 p-4 rounded-3xl">
          <Trophy className="text-purple-600" size={32} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {cards.map((card, index) => (
          <motion.button
            key={card.id}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleCardClick(index)}
            className={`h-28 rounded-3xl text-4xl flex items-center justify-center transition-all duration-300 shadow-sm border-2 ${
              card.isFlipped || card.isMatched 
                ? 'bg-white border-purple-200 rotate-y-180' 
                : 'bg-purple-500 border-purple-400 text-white'
            }`}
          >
            {(card.isFlipped || card.isMatched) ? card.value : '?'}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {isWin && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-12 p-8 bg-emerald-50 rounded-[40px] border-2 border-emerald-100 text-center"
          >
            <div className="w-20 h-20 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-100">
              <Star size={40} fill="currentColor" />
            </div>
            <h3 className="text-3xl font-bold text-emerald-900 mb-2">太棒了！</h3>
            <p className="text-emerald-700 text-xl mb-6">您成功完成了挑战，大脑充满活力！</p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={initGame}
              className="bg-emerald-600 text-white px-10 py-4 rounded-2xl font-bold text-xl shadow-lg shadow-emerald-100"
            >
              再玩一次
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
};
