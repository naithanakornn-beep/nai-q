import { TrendingUp, Target, Flame, ArrowLeft, Award, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, Tooltip } from 'recharts';
import { motion } from 'motion/react';
import { useTheme } from '../App';
import type { Screen } from '../App';

interface StatisticsProps {
  streak: number;
  completedMissions: number;
  totalPoints: number;
  focusTimeToday: number;
  onNavigate: (screen: Screen) => void;
}

const weeklyData = [
  { day: 'Mon', hours: 2.5, missions: 4 },
  { day: 'Tue', hours: 3.2, missions: 5 },
  { day: 'Wed', hours: 1.8, missions: 3 },
  { day: 'Thu', hours: 4.1, missions: 6 },
  { day: 'Fri', hours: 3.5, missions: 5 },
  { day: 'Sat', hours: 2.0, missions: 3 },
  { day: 'Sun', hours: 1.5, missions: 2 },
];

const monthlyPoints = [
  { week: 'Week 1', points: 320 },
  { week: 'Week 2', points: 450 },
  { week: 'Week 3', points: 580 },
  { week: 'Week 4', points: 850 },
];

export function Statistics({ 
  streak, 
  completedMissions, 
  totalPoints,
  focusTimeToday,
  onNavigate 
}: StatisticsProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const textClass = isDark ? 'text-white' : 'text-gray-900';
  const textSecondaryClass = isDark ? 'text-gray-400' : 'text-gray-600';
  const cardBgClass = isDark ? 'bg-gray-700' : 'bg-white';
  const borderClass = isDark ? 'border-gray-600' : 'border-gray-100';

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const totalWeeklyHours = weeklyData.reduce((sum, day) => sum + day.hours, 0);
  const productivityScore = Math.min(Math.round((completedMissions / 50) * 100), 100);

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
        <h1 className={`text-3xl ${textClass}`}>Statistics</h1>
        <p className={`${textSecondaryClass} mt-2`}>Track your productivity journey</p>
      </div>

      {/* Key Metrics */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`${cardBgClass} rounded-2xl p-5 shadow-sm border ${borderClass}`}
          >
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-xl flex items-center justify-center mb-3">
              <Flame className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className={`text-3xl ${textClass} mb-1`}>{streak}</div>
            <p className={`${textSecondaryClass} text-sm`}>Day Streak</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`${cardBgClass} rounded-2xl p-5 shadow-sm border ${borderClass}`}
          >
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-xl flex items-center justify-center mb-3">
              <Target className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className={`text-3xl ${textClass} mb-1`}>{completedMissions}</div>
            <p className={`${textSecondaryClass} text-sm`}>Missions Done</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`${cardBgClass} rounded-2xl p-5 shadow-sm border ${borderClass}`}
          >
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-xl flex items-center justify-center mb-3">
              <Award className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className={`text-3xl ${textClass} mb-1`}>{totalPoints}</div>
            <p className={`${textSecondaryClass} text-sm`}>Total Points</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`${cardBgClass} rounded-2xl p-5 shadow-sm border ${borderClass}`}
          >
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-xl flex items-center justify-center mb-3">
              <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className={`text-3xl ${textClass} mb-1`}>{productivityScore}%</div>
            <p className={`${textSecondaryClass} text-sm`}>Productivity</p>
          </motion.div>
        </div>
      </div>

      {/* Weekly Focus Time Chart */}
      <div className="px-6 mb-6">
        <div className={`${cardBgClass} rounded-2xl p-6 shadow-sm border ${borderClass}`}>
          <h3 className={`text-lg ${textClass} mb-4`}>Daily Focus Time (This Week)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#f3f4f6'} />
              <XAxis 
                dataKey="day" 
                stroke={isDark ? '#9ca3af' : '#6b7280'} 
                fontSize={12}
                tick={{ fill: isDark ? '#9ca3af' : '#6b7280' }}
              />
              <YAxis 
                stroke={isDark ? '#9ca3af' : '#6b7280'} 
                fontSize={12}
                tick={{ fill: isDark ? '#9ca3af' : '#6b7280' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? '#374151' : '#ffffff',
                  border: `1px solid ${isDark ? '#4b5563' : '#e5e7eb'}`,
                  borderRadius: '12px',
                  color: isDark ? '#ffffff' : '#000000',
                }}
              />
              <Bar dataKey="hours" fill="#f97316" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className={`${textSecondaryClass} text-sm mt-3 text-center`}>
            Total: {totalWeeklyHours.toFixed(1)} hours this week
          </p>
        </div>
      </div>

      {/* Points Trend Chart */}
      <div className="px-6 mb-6">
        <div className={`${cardBgClass} rounded-2xl p-6 shadow-sm border ${borderClass}`}>
          <h3 className={`text-lg ${textClass} mb-4`}>Points Earned (This Month)</h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={monthlyPoints}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#f3f4f6'} />
              <XAxis 
                dataKey="week" 
                stroke={isDark ? '#9ca3af' : '#6b7280'} 
                fontSize={12}
                tick={{ fill: isDark ? '#9ca3af' : '#6b7280' }}
              />
              <YAxis 
                stroke={isDark ? '#9ca3af' : '#6b7280'} 
                fontSize={12}
                tick={{ fill: isDark ? '#9ca3af' : '#6b7280' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? '#374151' : '#ffffff',
                  border: `1px solid ${isDark ? '#4b5563' : '#e5e7eb'}`,
                  borderRadius: '12px',
                  color: isDark ? '#ffffff' : '#000000',
                }}
              />
              <Line
                type="monotone"
                dataKey="points"
                stroke="#f97316"
                strokeWidth={3}
                dot={{ fill: '#f97316', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <p className={`${textSecondaryClass} text-sm mt-3 text-center`}>
            📈 Growing steadily! +166% vs last month
          </p>
        </div>
      </div>

      {/* Insights */}
      <div className="px-6">
        <h3 className={`${textClass} mb-4`}>Insights</h3>
        <div className="space-y-3">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-green-50 dark:bg-green-900/30 rounded-2xl p-4 border border-green-100 dark:border-green-800"
          >
            <p className={`${isDark ? 'text-green-200' : 'text-green-800'}`}>
              🎯 You're most productive on Thursdays! Keep up the great work.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-blue-50 dark:bg-blue-900/30 rounded-2xl p-4 border border-blue-100 dark:border-blue-800"
          >
            <p className={`${isDark ? 'text-blue-200' : 'text-blue-800'}`}>
              💪 Your longest streak was 18 days. Can you beat that?
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-orange-50 dark:bg-orange-900/30 rounded-2xl p-4 border border-orange-100 dark:border-orange-800"
          >
            <p className={`${isDark ? 'text-orange-200' : 'text-orange-800'}`}>
              ⚡ Learning missions are your favorite - 60% of all tasks!
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
