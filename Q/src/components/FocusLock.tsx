import { Shield, ArrowLeft, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../App';
import type { Screen } from '../App';

interface FocusLockProps {
  enabled: boolean;
  level: 'Light' | 'Medium' | 'Strict';
  onToggle: (enabled: boolean) => void;
  onLevelChange: (level: 'Light' | 'Medium' | 'Strict') => void;
  onNavigate: (screen: Screen) => void;
}

const levelInfo = {
  Light: {
    description: 'Gentle reminders when you try to open distracting apps',
    apps: ['Social media', 'Games'],
    color: 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-800',
    icon: '🟢',
  },
  Medium: {
    description: 'Blocks most distracting apps with a 5-second bypass option',
    apps: ['Social media', 'Games', 'Video streaming', 'Shopping'],
    color: 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900 dark:text-orange-200 dark:border-orange-800',
    icon: '🟡',
  },
  Strict: {
    description: 'Complete lockdown - no access to distracting apps during missions',
    apps: ['Social media', 'Games', 'Video streaming', 'Shopping', 'Web browsing'],
    color: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900 dark:text-red-200 dark:border-red-800',
    icon: '🔴',
  },
};

export function FocusLock({ enabled, level, onToggle, onLevelChange, onNavigate }: FocusLockProps) {
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
        <h1 className={`text-3xl ${textClass}`}>Focus Lock</h1>
        <p className={`${textSecondaryClass} mt-2`}>Block distractions during missions</p>
      </div>

      {/* Toggle Card */}
      <div className="px-6 mb-6">
        <motion.div
          whileHover={{ scale: 1.01 }}
          className={`${cardBgClass} rounded-2xl p-6 shadow-sm border ${borderClass}`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-14 h-14 ${enabled ? 'bg-orange-100 dark:bg-orange-900' : 'bg-gray-100 dark:bg-gray-600'} rounded-xl flex items-center justify-center transition-colors`}>
                <Shield className={`w-7 h-7 ${enabled ? 'text-orange-600 dark:text-orange-400' : 'text-gray-400'}`} />
              </div>
              <div>
                <h3 className={`text-xl ${textClass}`}>Focus Lock</h3>
                <p className={`${textSecondaryClass} text-sm`}>
                  {enabled ? 'Enabled' : 'Disabled'}
                </p>
              </div>
            </div>
            <button
              onClick={() => onToggle(!enabled)}
              className={`w-16 h-9 rounded-full transition-colors relative ${
                enabled ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <motion.div
                animate={{ x: enabled ? 28 : 4 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="w-7 h-7 bg-white rounded-full absolute top-1"
              />
            </button>
          </div>
          <p className={`${textSecondaryClass} leading-relaxed`}>
            Blocks distracting apps during missions to help you stay focused and productive.
          </p>
        </motion.div>
      </div>

      {/* Level Selection */}
      <div className="px-6 mb-6">
        <h2 className={`${textClass} mb-4`}>Strictness Level</h2>
        <div className="space-y-3">
          {(['Light', 'Medium', 'Strict'] as const).map((lvl, index) => {
            const isSelected = level === lvl;
            const info = levelInfo[lvl];

            return (
              <motion.button
                key={lvl}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => enabled && onLevelChange(lvl)}
                disabled={!enabled}
                className={`w-full text-left ${cardBgClass} rounded-2xl p-5 shadow-sm border-2 transition-all ${
                  enabled
                    ? isSelected
                      ? 'border-orange-500 shadow-md'
                      : `${borderClass} hover:border-orange-200 dark:hover:border-orange-700`
                    : `${borderClass} opacity-50 cursor-not-allowed`
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{info.icon}</span>
                    <h3 className={`text-lg ${textClass}`}>{lvl}</h3>
                  </div>
                  {isSelected && enabled && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center"
                    >
                      <span className="text-white text-sm">✓</span>
                    </motion.div>
                  )}
                </div>
                <p className={`${textSecondaryClass} mb-3`}>{info.description}</p>
                <div className="flex flex-wrap gap-2">
                  {info.apps.map((app) => (
                    <span
                      key={app}
                      className={`px-3 py-1 rounded-full text-sm ${info.color}`}
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Emergency Unlock Option */}
      <div className="px-6 mb-6">
        <div className={`${cardBgClass} rounded-2xl p-5 shadow-sm border ${borderClass}`}>
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            <h3 className={textClass}>Emergency Unlock</h3>
          </div>
          <p className={`${textSecondaryClass} mb-4`}>
            In case of urgent situations, you can unlock Focus Lock. A 10-second countdown will apply.
          </p>
          <div className="flex items-center justify-between">
            <span className={textSecondaryClass}>Allow Emergency Unlock</span>
            <button
              className="w-14 h-8 rounded-full bg-orange-500 relative"
            >
              <div className="w-6 h-6 bg-white rounded-full absolute top-1 right-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="px-6">
        <div className="bg-orange-50 dark:bg-orange-900/30 rounded-2xl p-5 border border-orange-100 dark:border-orange-800">
          <p className={`${isDark ? 'text-orange-200' : 'text-gray-700'} leading-relaxed`}>
            💡 <strong>How it works:</strong> When you start a mission, Focus Lock will restrict
            access to apps based on your selected level. The lock automatically releases when
            your mission timer completes.
          </p>
        </div>
      </div>
    </div>
  );
}
