import { Target, Clock, Award, TrendingUp, Bell, PlayCircle, Timer, Coffee, BarChart3 } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../App';
import type { Screen, Mission } from '../App';

interface HomeDashboardProps {
  points: number;
  completedToday: number;
  focusTimeToday: number;
  missions: Mission[];
  onNavigate: (screen: Screen) => void;
  onStartMission: (mission: Mission) => void;
}

export function HomeDashboard({ 
  points, 
  completedToday, 
  focusTimeToday,
  missions,
  onNavigate,
  onStartMission
}: HomeDashboardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const activeMissions = missions.filter(m => !m.completed && m.progress < 100);
  const featuredMission = activeMissions[0];

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const textClass = isDark ? 'text-white' : 'text-gray-900';
  const textSecondaryClass = isDark ? 'text-gray-400' : 'text-gray-600';
  const cardBgClass = isDark ? 'bg-gray-700' : 'bg-white';
  const borderClass = isDark ? 'border-gray-600' : 'border-gray-100';

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className={`text-3xl ${textClass} mb-1`}>{getGreeting()}</h1>
            <p className={textSecondaryClass}>Ready to be productive?</p>
          </div>
          <button
            onClick={() => onNavigate('notifications')}
            className={`w-12 h-12 ${cardBgClass} rounded-xl flex items-center justify-center shadow-sm border ${borderClass} relative`}
          >
            <Bell className={`w-5 h-5 ${textSecondaryClass}`} />
            <div className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full"></div>
          </button>
        </div>

        {/* Today's Summary */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`${cardBgClass} rounded-2xl p-4 shadow-sm border ${borderClass}`}
          >
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center mb-2">
              <Target className="w-5 h-5 text-orange-600" />
            </div>
            <div className={`text-2xl ${textClass} mb-1`}>{completedToday}</div>
            <p className={`${textSecondaryClass} text-sm`}>Missions</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`${cardBgClass} rounded-2xl p-4 shadow-sm border ${borderClass}`}
          >
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center mb-2">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
            <div className={`text-2xl ${textClass} mb-1`}>{formatTime(focusTimeToday)}</div>
            <p className={`${textSecondaryClass} text-sm`}>Focus</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`${cardBgClass} rounded-2xl p-4 shadow-sm border ${borderClass}`}
          >
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center mb-2">
              <Award className="w-5 h-5 text-orange-600" />
            </div>
            <div className={`text-2xl ${textClass} mb-1`}>{points}</div>
            <p className={`${textSecondaryClass} text-sm`}>Points</p>
          </motion.div>
        </div>
      </div>

      {/* Points Card */}
      <div className="px-6 mb-6">
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-orange-100 text-sm">Total Points</p>
                <div className="text-4xl text-white">{points}</div>
              </div>
            </div>
            <TrendingUp className="w-8 h-8 text-white opacity-75" />
          </div>
          <p className="text-orange-100">Keep going! You're doing great.</p>
        </motion.div>
      </div>

      {/* Featured Mission or Empty State */}
      <div className="px-6 mb-6">
        {featuredMission ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${cardBgClass} rounded-2xl p-6 shadow-sm border ${borderClass}`}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className={textSecondaryClass}>Up Next</span>
            </div>
            <h3 className={`text-xl ${textClass} mb-3`}>{featuredMission.name}</h3>
            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                {featuredMission.category}
              </span>
              <span className={`${textSecondaryClass} text-sm`}>⏱ {featuredMission.duration} min</span>
              <span className={`${textSecondaryClass} text-sm`}>
                {featuredMission.difficulty === 'Easy' && '⚡'}
                {featuredMission.difficulty === 'Medium' && '🔥'}
                {featuredMission.difficulty === 'Hard' && '💎'}
              </span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-orange-600">+{featuredMission.points} points</span>
              <div className="flex-1 max-w-[100px] h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden ml-4">
                <div
                  className="h-full bg-orange-500 transition-all duration-300"
                  style={{ width: `${featuredMission.progress}%` }}
                ></div>
              </div>
            </div>
            <button
              onClick={() => onStartMission(featuredMission)}
              className="w-full bg-orange-500 text-white py-3 rounded-xl hover:bg-orange-600 transition-colors"
            >
              Start Mission
            </button>
          </motion.div>
        ) : (
          <div className={`${cardBgClass} rounded-2xl p-8 shadow-sm border ${borderClass} text-center`}>
            <div className="text-6xl mb-4">🎯</div>
            <h3 className={`text-xl ${textClass} mb-2`}>No missions yet</h3>
            <p className={`${textSecondaryClass} mb-4`}>Create your first mission to get started</p>
            <button
              onClick={() => onNavigate('add-mission')}
              className="bg-orange-500 text-white px-6 py-2 rounded-xl hover:bg-orange-600 transition-colors"
            >
              Add Mission
            </button>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="px-6">
        <h3 className={`${textClass} mb-4`}>Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate('missions')}
            className={`${cardBgClass} rounded-2xl p-5 shadow-sm border ${borderClass} flex flex-col items-center gap-3 hover:shadow-md transition-shadow`}
          >
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <PlayCircle className="w-6 h-6 text-orange-600" />
            </div>
            <span className={textClass}>Missions</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => featuredMission && onStartMission(featuredMission)}
            className={`${cardBgClass} rounded-2xl p-5 shadow-sm border ${borderClass} flex flex-col items-center gap-3 hover:shadow-md transition-shadow`}
          >
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Timer className="w-6 h-6 text-orange-600" />
            </div>
            <span className={textClass}>Timer</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate('points')}
            className={`${cardBgClass} rounded-2xl p-5 shadow-sm border ${borderClass} flex flex-col items-center gap-3 hover:shadow-md transition-shadow`}
          >
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Coffee className="w-6 h-6 text-orange-600" />
            </div>
            <span className={textClass}>Relax Time</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate('stats')}
            className={`${cardBgClass} rounded-2xl p-5 shadow-sm border ${borderClass} flex flex-col items-center gap-3 hover:shadow-md transition-shadow`}
          >
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-orange-600" />
            </div>
            <span className={textClass}>Stats</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
