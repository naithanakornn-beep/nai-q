import { useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../App';
import type { Category, Difficulty, Mission } from '../App';

interface AddMissionProps {
  onSave: (mission: Omit<Mission, 'id' | 'progress'>) => void;
  onCancel: () => void;
}

export function AddMission({ onSave, onCancel }: AddMissionProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Category>('Learning');
  const [duration, setDuration] = useState(30);
  const [difficulty, setDifficulty] = useState<Difficulty>('Medium');

  const textClass = isDark ? 'text-white' : 'text-gray-900';
  const textSecondaryClass = isDark ? 'text-gray-400' : 'text-gray-600';
  const cardBgClass = isDark ? 'bg-gray-700' : 'bg-white';
  const borderClass = isDark ? 'border-gray-600' : 'border-gray-100';
  const inputBgClass = isDark ? 'bg-gray-600' : 'bg-gray-50';

  const calculatePoints = () => {
    let basePoints = duration;
    if (difficulty === 'Easy') basePoints *= 2;
    if (difficulty === 'Medium') basePoints *= 2.5;
    if (difficulty === 'Hard') basePoints *= 3;
    return Math.round(basePoints);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSave({
      name,
      description,
      category,
      duration,
      difficulty,
      points: calculatePoints(),
    });
  };

  const categories: Category[] = ['Learning', 'Work', 'Self Improvement'];
  const difficulties: Difficulty[] = ['Easy', 'Medium', 'Hard'];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className={`${cardBgClass} border-b ${borderClass} p-6 sticky top-0 z-10`}>
        <div className="flex items-center justify-between">
          <button
            onClick={onCancel}
            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <ArrowLeft className={`w-5 h-5 ${textClass}`} />
          </button>
          <h1 className={`text-2xl ${textClass}`}>Add Mission</h1>
          <div className="w-10"></div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Mission Name */}
        <div>
          <label className={`${textClass} mb-2 block`}>Mission Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Complete React Project"
            className={`w-full ${inputBgClass} ${textClass} px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 border ${borderClass}`}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className={`${textClass} mb-2 block`}>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What needs to be done?"
            rows={4}
            className={`w-full ${inputBgClass} ${textClass} px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 border ${borderClass} resize-none`}
          />
        </div>

        {/* Category */}
        <div>
          <label className={`${textClass} mb-3 block`}>Category</label>
          <div className="grid grid-cols-3 gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`p-3 rounded-xl text-sm transition-all ${
                  category === cat
                    ? 'bg-orange-500 text-white shadow-md scale-105'
                    : `${cardBgClass} ${textSecondaryClass} border ${borderClass}`
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className={`${textClass} mb-3 block`}>Estimated Duration: {duration} min</label>
          <input
            type="range"
            min="5"
            max="180"
            step="5"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full accent-orange-500"
          />
          <div className="flex justify-between mt-2">
            <span className={`${textSecondaryClass} text-sm`}>5 min</span>
            <span className={`${textSecondaryClass} text-sm`}>180 min</span>
          </div>
        </div>

        {/* Difficulty */}
        <div>
          <label className={`${textClass} mb-3 block`}>Difficulty</label>
          <div className="grid grid-cols-3 gap-3">
            {difficulties.map((diff) => {
              const emoji = diff === 'Easy' ? '⚡' : diff === 'Medium' ? '🔥' : '💎';
              return (
                <button
                  key={diff}
                  type="button"
                  onClick={() => setDifficulty(diff)}
                  className={`p-3 rounded-xl text-sm transition-all ${
                    difficulty === diff
                      ? 'bg-orange-500 text-white shadow-md scale-105'
                      : `${cardBgClass} ${textSecondaryClass} border ${borderClass}`
                  }`}
                >
                  <div className="text-2xl mb-1">{emoji}</div>
                  {diff}
                </button>
              );
            })}
          </div>
        </div>

        {/* Points Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 shadow-lg"
        >
          <p className="text-orange-100 text-sm mb-2">Estimated Points Reward</p>
          <div className="text-4xl text-white mb-2">+{calculatePoints()}</div>
          <p className="text-orange-100 text-sm">
            Based on {duration} min × {difficulty} difficulty
          </p>
        </motion.div>

        {/* Save Button */}
        <button
          type="submit"
          disabled={!name.trim()}
          className="w-full bg-orange-500 text-white py-4 rounded-2xl shadow-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Save className="w-5 h-5" />
          Save Mission
        </button>
      </form>
    </div>
  );
}
