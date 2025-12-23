import { useState, useEffect } from 'react';
import { Coffee, X } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../App';

interface RelaxTimerProps {
  relaxTime: number;
  onEnd: () => void;
}

export function RelaxTimer({ relaxTime, onEnd }: RelaxTimerProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [timeLeft, setTimeLeft] = useState(Math.min(relaxTime, 30) * 60); // Max 30 min session

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onEnd]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((Math.min(relaxTime, 30) * 60 - timeLeft) / (Math.min(relaxTime, 30) * 60)) * 100;

  const bgGradient = isDark
    ? 'bg-gradient-to-br from-teal-900 via-green-900 to-emerald-900'
    : 'bg-gradient-to-br from-green-100 via-teal-50 to-blue-100';
  const textClass = isDark ? 'text-white' : 'text-gray-900';

  return (
    <div className={`min-h-screen ${bgGradient} relative overflow-hidden flex flex-col items-center justify-center p-8`}>
      {/* Animated Background Blobs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-20 left-10 w-64 h-64 bg-green-400 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className="absolute bottom-20 right-10 w-80 h-80 bg-teal-400 rounded-full blur-3xl"
      />

      {/* Close Button */}
      <button
        onClick={onEnd}
        className={`absolute top-6 right-6 w-12 h-12 ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-md rounded-full flex items-center justify-center shadow-lg`}
      >
        <X className={`w-6 h-6 ${textClass}`} />
      </button>

      {/* Content */}
      <div className="relative z-10 text-center">
        {/* Icon */}
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="text-8xl mb-8"
        >
          ☕
        </motion.div>

        {/* Title */}
        <h1 className={`text-4xl ${textClass} mb-4`}>Enjoy Your Break</h1>
        <p className={`${isDark ? 'text-green-200' : 'text-gray-600'} mb-12`}>
          You've earned this time. Relax and recharge.
        </p>

        {/* Timer */}
        <div className="mb-12">
          <motion.div
            key={timeLeft}
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            className={`text-7xl ${textClass} mb-4`}
          >
            {formatTime(timeLeft)}
          </motion.div>
          
          {/* Progress Bar */}
          <div className={`w-64 h-2 ${isDark ? 'bg-gray-700' : 'bg-white/50'} rounded-full overflow-hidden mx-auto`}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-green-500"
            />
          </div>
        </div>

        {/* Suggestions */}
        <div className={`${isDark ? 'bg-gray-800/30' : 'bg-white/30'} backdrop-blur-md rounded-3xl p-6 max-w-sm mx-auto`}>
          <h3 className={`${textClass} mb-4`}>Relax Ideas</h3>
          <div className="space-y-3 text-left">
            {[
              { emoji: '🚶', text: 'Take a short walk' },
              { emoji: '💧', text: 'Drink some water' },
              { emoji: '🧘', text: 'Do light stretching' },
              { emoji: '🎵', text: 'Listen to music' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3"
              >
                <span className="text-2xl">{item.emoji}</span>
                <span className={isDark ? 'text-green-200' : 'text-gray-700'}>{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* End Early Button */}
        <button
          onClick={onEnd}
          className={`mt-8 ${isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all`}
        >
          End Break Early
        </button>
      </div>
    </div>
  );
}
