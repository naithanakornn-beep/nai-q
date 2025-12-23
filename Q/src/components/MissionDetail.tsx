import { ArrowLeft, Play, Edit, Trash2, Lightbulb } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../App';
import type { Mission } from '../App';

interface MissionDetailProps {
  mission: Mission;
  onStart: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onBack: () => void;
}

const tagColors = {
  Learning: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200',
  Work: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200',
  'Self Improvement': 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200',
};

const tips = {
  Learning: [
    'Take notes while studying',
    'Use the Pomodoro technique',
    'Eliminate distractions',
  ],
  Work: [
    'Break down large tasks',
    'Set clear milestones',
    'Use time blocking',
  ],
  'Self Improvement': [
    'Stay consistent',
    'Track your progress',
    'Celebrate small wins',
  ],
};

export function MissionDetail({ mission, onStart, onEdit, onDelete, onBack }: MissionDetailProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const textClass = isDark ? 'text-white' : 'text-gray-900';
  const textSecondaryClass = isDark ? 'text-gray-400' : 'text-gray-600';
  const cardBgClass = isDark ? 'bg-gray-700' : 'bg-white';
  const borderClass = isDark ? 'border-gray-600' : 'border-gray-100';

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className={`${cardBgClass} border-b ${borderClass} p-6`}>
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <ArrowLeft className={`w-5 h-5 ${textClass}`} />
          </button>
          <div className="flex gap-2">
            <button
              onClick={onEdit}
              className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <Edit className={`w-5 h-5 ${textSecondaryClass}`} />
            </button>
            <button
              onClick={onDelete}
              className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
            >
              <Trash2 className="w-5 h-5 text-red-500" />
            </button>
          </div>
        </div>

        <span className={`inline-block px-3 py-1 rounded-full text-sm mb-3 ${tagColors[mission.category]}`}>
          {mission.category}
        </span>
        <h1 className={`text-2xl ${textClass} mb-4`}>{mission.name}</h1>

        {/* Stats */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⏱</span>
            <span className={textSecondaryClass}>{mission.duration} min</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">
              {mission.difficulty === 'Easy' && '⚡'}
              {mission.difficulty === 'Medium' && '🔥'}
              {mission.difficulty === 'Hard' && '💎'}
            </span>
            <span className={textSecondaryClass}>{mission.difficulty}</span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Progress Card */}
        {mission.progress > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${cardBgClass} rounded-2xl p-6 shadow-sm border ${borderClass}`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className={textClass}>Progress</span>
              <span className="text-orange-600">{mission.progress}%</span>
            </div>
            <div className="w-full h-3 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${mission.progress}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-orange-500"
              ></motion.div>
            </div>
          </motion.div>
        )}

        {/* Description */}
        <div className={`${cardBgClass} rounded-2xl p-6 shadow-sm border ${borderClass}`}>
          <h3 className={`${textClass} mb-3`}>Description</h3>
          {mission.description ? (
            <p className={`${textSecondaryClass} leading-relaxed`}>{mission.description}</p>
          ) : (
            <p className={`${textSecondaryClass} italic`}>No description provided</p>
          )}
        </div>

        {/* Points Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 mb-1">Points to Earn</p>
              <div className="text-4xl text-white">+{mission.points}</div>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-3xl">🏆</span>
            </div>
          </div>
        </motion.div>

        {/* Tips Section */}
        <div className={`${cardBgClass} rounded-2xl p-6 shadow-sm border ${borderClass}`}>
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-orange-500" />
            <h3 className={textClass}>Suggested Tips</h3>
          </div>
          <ul className="space-y-2">
            {tips[mission.category].map((tip, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${textSecondaryClass} flex items-start gap-2`}
              >
                <span className="text-orange-500 mt-1">•</span>
                <span>{tip}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Start Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStart}
          className="w-full bg-orange-500 text-white py-4 rounded-2xl shadow-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
        >
          <Play className="w-5 h-5" fill="white" />
          Start Mission
        </motion.button>
      </div>
    </div>
  );
}
