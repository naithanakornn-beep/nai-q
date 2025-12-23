import { useState } from 'react';
import { Plus, ArrowLeft, Filter, Search } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../App';
import type { Mission, Screen, Category, Difficulty } from '../App';

interface MissionListProps {
  missions: Mission[];
  onSelectMission: (mission: Mission) => void;
  onNavigate: (screen: Screen) => void;
}

const tagColors = {
  Learning: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200',
  Work: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200',
  'Self Improvement': 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200',
};

const difficultyEmoji = {
  Easy: '⚡',
  Medium: '🔥',
  Hard: '💎',
};

export function MissionList({ missions, onSelectMission, onNavigate }: MissionListProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const textClass = isDark ? 'text-white' : 'text-gray-900';
  const textSecondaryClass = isDark ? 'text-gray-400' : 'text-gray-600';
  const cardBgClass = isDark ? 'bg-gray-700' : 'bg-white';
  const borderClass = isDark ? 'border-gray-600' : 'border-gray-100';
  const inputBgClass = isDark ? 'bg-gray-600' : 'bg-gray-100';

  const filteredMissions = missions.filter(mission => {
    const matchesCategory = selectedCategory === 'All' || mission.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || mission.difficulty === selectedDifficulty;
    const matchesSearch = mission.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesDifficulty && matchesSearch && !mission.completed;
  });

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className={`${cardBgClass} border-b ${borderClass} p-6 sticky top-0 z-10`}>
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => onNavigate('home')}
            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <ArrowLeft className={`w-5 h-5 ${textClass}`} />
          </button>
          <h1 className={`text-2xl ${textClass}`}>Missions</h1>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`w-10 h-10 flex items-center justify-center rounded-xl ${showFilters ? 'bg-orange-100 dark:bg-orange-900' : 'hover:bg-gray-100 dark:hover:bg-gray-600'} transition-colors`}
          >
            <Filter className={`w-5 h-5 ${showFilters ? 'text-orange-600' : textClass}`} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${textSecondaryClass}`} />
          <input
            type="text"
            placeholder="Search missions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full ${inputBgClass} ${textClass} pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500`}
          />
        </div>

        {/* Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3"
          >
            <div>
              <label className={`${textSecondaryClass} text-sm mb-2 block`}>Category</label>
              <div className="flex flex-wrap gap-2">
                {['All', 'Learning', 'Work', 'Self Improvement'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat as Category | 'All')}
                    className={`px-4 py-2 rounded-xl text-sm transition-colors ${
                      selectedCategory === cat
                        ? 'bg-orange-500 text-white'
                        : `${cardBgClass} ${textSecondaryClass} border ${borderClass}`
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className={`${textSecondaryClass} text-sm mb-2 block`}>Difficulty</label>
              <div className="flex flex-wrap gap-2">
                {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff as Difficulty | 'All')}
                    className={`px-4 py-2 rounded-xl text-sm transition-colors ${
                      selectedDifficulty === diff
                        ? 'bg-orange-500 text-white'
                        : `${cardBgClass} ${textSecondaryClass} border ${borderClass}`
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Mission List */}
      <div className="p-6 space-y-4">
        {filteredMissions.length > 0 ? (
          filteredMissions.map((mission, index) => (
            <motion.div
              key={mission.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onSelectMission(mission)}
              className={`${cardBgClass} rounded-2xl p-5 shadow-sm border ${borderClass} hover:shadow-md transition-all cursor-pointer`}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className={`text-lg ${textClass} flex-1 pr-2`}>{mission.name}</h3>
                <span className="text-orange-600">+{mission.points}</span>
              </div>

              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className={`px-3 py-1 rounded-full text-sm ${tagColors[mission.category]}`}>
                  {mission.category}
                </span>
                <span className={`${textSecondaryClass} text-sm`}>
                  ⏱ {mission.duration} min
                </span>
                <span className={`${textSecondaryClass} text-sm`}>
                  {difficultyEmoji[mission.difficulty]} {mission.difficulty}
                </span>
              </div>

              <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${mission.progress}%` }}
                  transition={{ duration: 0.5, delay: index * 0.05 + 0.2 }}
                  className="h-full bg-orange-500"
                ></motion.div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className={`${cardBgClass} rounded-2xl p-12 shadow-sm border ${borderClass} text-center`}>
            <div className="text-6xl mb-4">🔍</div>
            <h3 className={`text-xl ${textClass} mb-2`}>No missions found</h3>
            <p className={textSecondaryClass}>Try adjusting your filters or add a new mission</p>
          </div>
        )}
      </div>

      {/* Floating Add Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onNavigate('add-mission')}
        className="fixed bottom-24 right-6 w-14 h-14 bg-orange-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-orange-600 transition-colors z-20"
      >
        <Plus className="w-6 h-6" />
      </motion.button>
    </div>
  );
}
