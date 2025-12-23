import { motion } from 'motion/react';
import { Award, Home, ArrowRight } from 'lucide-react';
import { useTheme } from '../App';

interface TaskCompletedProps {
  pointsEarned: number;
  onNext: () => void;
  onHome: () => void;
}

export function TaskCompleted({ pointsEarned, onNext, onHome }: TaskCompletedProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const textClass = isDark ? 'text-white' : 'text-gray-900';
  const textSecondaryClass = isDark ? 'text-gray-400' : 'text-gray-600';
  const bgGradient = isDark
    ? 'bg-gradient-to-br from-gray-900 via-orange-900 to-gray-900'
    : 'bg-gradient-to-br from-orange-100 via-orange-50 to-white';

  return (
    <div className={`min-h-screen ${bgGradient} flex flex-col items-center justify-center p-8 relative overflow-hidden`}>
      {/* Confetti Animation */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            y: -100, 
            x: Math.random() * 400 - 200,
            opacity: 1,
            rotate: 0
          }}
          animate={{ 
            y: 800, 
            opacity: 0,
            rotate: 360
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: Math.random() * 0.5,
            ease: 'linear',
          }}
          className="absolute w-3 h-3 rounded-full"
          style={{
            backgroundColor: ['#f97316', '#fbbf24', '#10b981', '#3b82f6', '#8b5cf6'][i % 5],
          }}
        />
      ))}

      {/* Trophy Animation */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          type: 'spring', 
          stiffness: 200, 
          damping: 15,
          delay: 0.2 
        }}
        className="text-9xl mb-8"
      >
        🎉
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className={`text-4xl ${textClass} text-center mb-4`}
      >
        Mission Complete!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className={`${textSecondaryClass} text-center mb-8`}
      >
        Great job! You stayed focused and productive.
      </motion.p>

      {/* Points Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          type: 'spring',
          stiffness: 200,
          delay: 0.6 
        }}
        className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-8 shadow-2xl mb-8 w-full max-w-sm"
      >
        <div className="flex items-center justify-center gap-4 mb-4">
          <Award className="w-12 h-12 text-white" />
          <div className="text-center">
            <p className="text-orange-100 mb-1">Points Earned</p>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: 'spring',
                stiffness: 300,
                delay: 0.8 
              }}
              className="text-6xl text-white"
            >
              +{pointsEarned}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Achievement Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg mb-8 w-full max-w-sm`}
      >
        <div className="flex items-center gap-3">
          <div className="text-3xl">🔥</div>
          <div className="flex-1">
            <p className={textClass}>Keep the streak going!</p>
            <p className={`${textSecondaryClass} text-sm`}>12 days in a row</p>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="w-full max-w-sm space-y-3"
      >
        <button
          onClick={onNext}
          className="w-full bg-orange-500 text-white py-4 rounded-2xl shadow-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
        >
          Start Next Mission
          <ArrowRight className="w-5 h-5" />
        </button>

        <button
          onClick={onHome}
          className={`w-full ${isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} py-4 rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2`}
        >
          <Home className="w-5 h-5" />
          Return Home
        </button>
      </motion.div>
    </div>
  );
}
