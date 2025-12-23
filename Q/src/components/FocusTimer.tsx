import { useState, useEffect } from 'react';
import { Play, Pause, X, Check, Target, Clock, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../App';
import type { Mission } from '../App';

interface FocusTimerProps {
  mission: Mission;
  onComplete: (points: number, duration: number) => void;
  onCancel: () => void;
  focusLockEnabled: boolean;
}

export function FocusTimer({ mission, onComplete, onCancel, focusLockEnabled }: FocusTimerProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [timeLeft, setTimeLeft] = useState(mission.duration * 60); // in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [showConfirmCancel, setShowConfirmCancel] = useState(false);

  useEffect(() => {
    let interval: number | undefined;

    if (isRunning && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((mission.duration * 60 - timeLeft) / (mission.duration * 60)) * 100;
  const timeSpent = Math.round((mission.duration * 60 - timeLeft) / 60);

  const handleFinish = () => {
    if (progress >= 80 || timeLeft === 0) {
      onComplete(mission.points, timeSpent);
    }
  };

  const handleCancel = () => {
    if (isRunning) {
      setShowConfirmCancel(true);
    } else {
      onCancel();
    }
  };

  const textClass = isDark ? 'text-white' : 'text-gray-900';
  const textSecondaryClass = isDark ? 'text-gray-400' : 'text-gray-600';
  const bgGradient = isDark 
    ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
    : 'bg-gradient-to-br from-orange-50 via-white to-orange-50';

  return (
    <div className={`min-h-screen ${bgGradient} relative overflow-hidden`}>
      {/* Animated Background Pulse */}
      {isRunning && (
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500 rounded-full blur-3xl"
        />
      )}

      {/* Header */}
      <div className="relative z-10 p-6 flex items-center justify-between">
        <button
          onClick={handleCancel}
          className={`w-10 h-10 ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl flex items-center justify-center shadow-md`}
        >
          <X className={`w-5 h-5 ${textClass}`} />
        </button>
        <h2 className={`${textClass} truncate max-w-[200px]`}>{mission.name}</h2>
        <div className="w-10"></div>
      </div>

      {/* Timer Circle */}
      <div className="relative z-10 flex flex-col items-center justify-center py-12">
        <div className="relative w-72 h-72 mb-12">
          {/* Background circle */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="144"
              cy="144"
              r="136"
              fill="none"
              stroke={isDark ? '#374151' : '#f3f4f6'}
              strokeWidth="16"
            />
            {/* Progress circle */}
            <circle
              cx="144"
              cy="144"
              r="136"
              fill="none"
              stroke="#f97316"
              strokeWidth="16"
              strokeDasharray={`${2 * Math.PI * 136}`}
              strokeDashoffset={`${2 * Math.PI * 136 * (1 - progress / 100)}`}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>

          {/* Timer text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <motion.div
                key={timeLeft}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                className={`text-6xl ${textClass} mb-3`}
              >
                {formatTime(timeLeft)}
              </motion.div>
              <div className={textSecondaryClass}>{Math.round(progress)}% complete</div>
            </div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex gap-6 mb-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsRunning(!isRunning)}
            className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center shadow-2xl hover:bg-orange-600 transition-colors"
          >
            {isRunning ? (
              <Pause className="w-9 h-9 text-white" fill="white" />
            ) : (
              <Play className="w-9 h-9 text-white ml-1" fill="white" />
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleFinish}
            disabled={progress < 80 && timeLeft > 0}
            className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-2xl hover:bg-green-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Check className="w-9 h-9 text-white" strokeWidth={3} />
          </motion.button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="relative z-10 px-6 grid grid-cols-2 gap-4 mb-6">
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-4 shadow-md`}>
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-orange-500" />
            <span className={textSecondaryClass}>Today</span>
          </div>
          <div className={`text-2xl ${textClass}`}>3</div>
          <p className={`${textSecondaryClass} text-sm`}>Missions</p>
        </div>

        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-4 shadow-md`}>
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-orange-500" />
            <span className={textSecondaryClass}>Today</span>
          </div>
          <div className={`text-2xl ${textClass}`}>2h 15m</div>
          <p className={`${textSecondaryClass} text-sm`}>Focus Time</p>
        </div>
      </div>

      {/* Focus Lock Indicator */}
      {focusLockEnabled && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 mx-6 bg-orange-100 dark:bg-orange-900 rounded-2xl p-4 flex items-center gap-3"
        >
          <Shield className="w-5 h-5 text-orange-600" />
          <div className="flex-1">
            <p className="text-orange-900 dark:text-orange-100">Focus Lock Active</p>
            <p className="text-orange-700 dark:text-orange-300 text-sm">Distracting apps are blocked</p>
          </div>
        </motion.div>
      )}

      {/* Cancel Confirmation Modal */}
      <AnimatePresence>
        {showConfirmCancel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6"
            onClick={() => setShowConfirmCancel(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-3xl p-6 max-w-sm w-full shadow-2xl`}
            >
              <div className="text-4xl mb-4 text-center">⚠️</div>
              <h3 className={`text-xl ${textClass} mb-3 text-center`}>Cancel Mission?</h3>
              <p className={`${textSecondaryClass} text-center mb-6`}>
                You'll lose your progress. Are you sure you want to quit?
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setShowConfirmCancel(false)}
                  className="py-3 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Continue
                </button>
                <button
                  onClick={onCancel}
                  className="py-3 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-colors"
                >
                  Quit
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
