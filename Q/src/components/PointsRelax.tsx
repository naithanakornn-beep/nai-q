import { Award, Coffee, ArrowLeft, Play, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../App';
import type { Screen } from '../App';

interface PointsRelaxProps {
  totalPoints: number;
  relaxTime: number;
  onExchange: (points: number, minutes: number) => void;
  onStartRelaxTime: () => void;
  onNavigate: (screen: Screen) => void;
}

const exchangeOptions = [
  { points: 50, minutes: 5, label: '5 min', emoji: '☕' },
  { points: 100, minutes: 10, label: '10 min', emoji: '🍵' },
  { points: 200, minutes: 20, label: '20 min', emoji: '🧘' },
  { points: 400, minutes: 30, label: '30 min', emoji: '🌴' },
];

export function PointsRelax({ 
  totalPoints, 
  relaxTime, 
  onExchange, 
  onStartRelaxTime,
  onNavigate 
}: PointsRelaxProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const textClass = isDark ? 'text-white' : 'text-gray-900';
  const textSecondaryClass = isDark ? 'text-gray-400' : 'text-gray-600';
  const cardBgClass = isDark ? 'bg-gray-700' : 'bg-white';
  const borderClass = isDark ? 'border-gray-600' : 'border-gray-100';

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="p-6 pb-4">
        <button
          onClick={() => onNavigate('home')}
          className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors mb-6"
        >
          <ArrowLeft className={`w-5 h-5 ${textClass}`} />
        </button>
        <h1 className={`text-3xl ${textClass}`}>Rewards</h1>
        <p className={`${textSecondaryClass} mt-2`}>Exchange points for relax time</p>
      </div>

      {/* Total Points Card */}
      <div className="px-6 mb-6">
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-6 shadow-lg"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
              <Award className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-orange-100">Available Points</p>
              <motion.div
                key={totalPoints}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-5xl text-white"
              >
                {totalPoints}
              </motion.div>
            </div>
          </div>
          <p className="text-orange-100">Keep earning to unlock more relax time!</p>
        </motion.div>
      </div>

      {/* Relax Time Balance */}
      <div className="px-6 mb-6">
        <div className={`${cardBgClass} rounded-2xl p-6 shadow-sm border ${borderClass}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center">
                <Coffee className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className={textSecondaryClass}>Relax Time Balance</p>
                <div className={`text-3xl ${textClass}`}>{relaxTime} min</div>
              </div>
            </div>
            {relaxTime > 0 && (
              <button
                onClick={onStartRelaxTime}
                className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition-colors flex items-center gap-2"
              >
                <Play className="w-4 h-4" fill="white" />
                Start
              </button>
            )}
          </div>
          <p className={textSecondaryClass}>Use this time for guilt-free breaks</p>
        </div>
      </div>

      {/* Exchange Options */}
      <div className="px-6 mb-6">
        <h2 className={`${textClass} mb-4`}>Exchange Points</h2>
        <div className="space-y-3">
          {exchangeOptions.map((option, index) => {
            const canAfford = totalPoints >= option.points;

            return (
              <motion.button
                key={option.points}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => canAfford && onExchange(option.points, option.minutes)}
                disabled={!canAfford}
                className={`w-full ${cardBgClass} rounded-2xl p-5 shadow-sm border ${borderClass} transition-all ${
                  canAfford
                    ? 'hover:shadow-md hover:border-orange-200 dark:hover:border-orange-700 cursor-pointer'
                    : 'opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{option.emoji}</div>
                    <div className="text-left">
                      <div className={`text-lg ${textClass} mb-1`}>
                        Get {option.label} relax time
                      </div>
                      <div className="text-orange-600">
                        Cost: {option.points} points
                      </div>
                    </div>
                  </div>
                  <div className={`w-10 h-10 ${canAfford ? 'bg-orange-100 dark:bg-orange-900' : 'bg-gray-100 dark:bg-gray-600'} rounded-xl flex items-center justify-center`}>
                    <Clock className={`w-5 h-5 ${canAfford ? 'text-orange-600 dark:text-orange-400' : 'text-gray-400'}`} />
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Info Box */}
      <div className="px-6">
        <div className="bg-orange-50 dark:bg-orange-900/30 rounded-2xl p-5 border border-orange-100 dark:border-orange-800">
          <p className={`${isDark ? 'text-orange-200' : 'text-gray-700'} leading-relaxed`}>
            💡 <strong>Tip:</strong> Complete more missions to earn points and unlock relax time.
            Use your earned time for breaks without any guilt!
          </p>
        </div>
      </div>
    </div>
  );
}
