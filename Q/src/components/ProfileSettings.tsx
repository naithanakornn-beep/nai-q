import { 
  User, 
  Award, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Database,
  Info,
  ChevronRight,
  ArrowLeft,
  Moon,
  Sun
} from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../App';
import type { Screen, Theme } from '../App';

interface ProfileSettingsProps {
  focusLockLevel: 'Light' | 'Medium' | 'Strict';
  theme: Theme;
  onToggleTheme: () => void;
  onNavigate: (screen: Screen) => void;
}

export function ProfileSettings({ 
  focusLockLevel, 
  theme,
  onToggleTheme,
  onNavigate 
}: ProfileSettingsProps) {
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
        <h1 className={`text-3xl ${textClass}`}>Settings</h1>
        <p className={`${textSecondaryClass} mt-2`}>Customize your experience</p>
      </div>

      {/* Profile Card */}
      <div className="px-6 mb-6">
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-6 shadow-lg"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl text-white mb-1">Alex Johnson</h2>
              <p className="text-orange-100">Productivity Champion</p>
            </div>
            <button className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Settings Sections */}
      <div className="px-6 space-y-6">
        {/* Rewards Section */}
        <div>
          <h3 className={`${textSecondaryClass} mb-3 px-2`}>Rewards</h3>
          <div className={`${cardBgClass} rounded-2xl shadow-sm border ${borderClass} overflow-hidden`}>
            <button className="w-full p-5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-xl flex items-center justify-center">
                  <Award className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="text-left">
                  <div className={textClass}>Edit Points Reward</div>
                  <div className={`${textSecondaryClass} text-sm`}>Customize points per mission</div>
                </div>
              </div>
              <ChevronRight className={`w-5 h-5 ${textSecondaryClass}`} />
            </button>
          </div>
        </div>

        {/* Notifications Section */}
        <div>
          <h3 className={`${textSecondaryClass} mb-3 px-2`}>Notifications</h3>
          <div className={`${cardBgClass} rounded-2xl shadow-sm border ${borderClass} divide-y ${borderClass}`}>
            <button
              onClick={() => onNavigate('notifications')}
              className="w-full p-5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-xl flex items-center justify-center">
                  <Bell className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="text-left">
                  <div className={textClass}>Notification Preferences</div>
                  <div className={`${textSecondaryClass} text-sm`}>Manage alerts and reminders</div>
                </div>
              </div>
              <ChevronRight className={`w-5 h-5 ${textSecondaryClass}`} />
            </button>
          </div>
        </div>

        {/* Focus Section */}
        <div>
          <h3 className={`${textSecondaryClass} mb-3 px-2`}>Focus</h3>
          <div className={`${cardBgClass} rounded-2xl shadow-sm border ${borderClass} overflow-hidden`}>
            <button
              onClick={() => onNavigate('focus-lock')}
              className="w-full p-5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="text-left">
                  <div className={textClass}>Focus Lock Level</div>
                  <div className={`${textSecondaryClass} text-sm`}>Currently: {focusLockLevel}</div>
                </div>
              </div>
              <ChevronRight className={`w-5 h-5 ${textSecondaryClass}`} />
            </button>
          </div>
        </div>

        {/* Appearance Section */}
        <div>
          <h3 className={`${textSecondaryClass} mb-3 px-2`}>Appearance</h3>
          <div className={`${cardBgClass} rounded-2xl shadow-sm border ${borderClass} divide-y ${borderClass}`}>
            <div className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-xl flex items-center justify-center">
                  <Palette className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="text-left">
                  <div className={textClass}>App Theme</div>
                  <div className={`${textSecondaryClass} text-sm`}>
                    {isDark ? 'Dark mode' : 'Light mode'}
                  </div>
                </div>
              </div>
              <button
                onClick={onToggleTheme}
                className={`w-16 h-9 rounded-full transition-colors relative ${
                  isDark ? 'bg-gray-600' : 'bg-orange-500'
                }`}
              >
                <motion.div
                  animate={{ x: isDark ? 4 : 28 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="w-7 h-7 bg-white rounded-full absolute top-1 flex items-center justify-center"
                >
                  {isDark ? (
                    <Moon className="w-4 h-4 text-gray-600" />
                  ) : (
                    <Sun className="w-4 h-4 text-orange-500" />
                  )}
                </motion.div>
              </button>
            </div>

            <button className="w-full p-5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-xl flex items-center justify-center">
                  <Globe className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="text-left">
                  <div className={textClass}>Language</div>
                  <div className={`${textSecondaryClass} text-sm`}>English (US)</div>
                </div>
              </div>
              <ChevronRight className={`w-5 h-5 ${textSecondaryClass}`} />
            </button>
          </div>
        </div>

        {/* Data & Backup Section */}
        <div>
          <h3 className={`${textSecondaryClass} mb-3 px-2`}>Data & Backup</h3>
          <div className={`${cardBgClass} rounded-2xl shadow-sm border ${borderClass} divide-y ${borderClass}`}>
            <button className="w-full p-5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-xl flex items-center justify-center">
                  <Database className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="text-left">
                  <div className={textClass}>Backup Data</div>
                  <div className={`${textSecondaryClass} text-sm`}>Export your progress</div>
                </div>
              </div>
              <ChevronRight className={`w-5 h-5 ${textSecondaryClass}`} />
            </button>

            <button className="w-full p-5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-xl flex items-center justify-center">
                  <Database className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="text-left">
                  <div className={textClass}>Restore Data</div>
                  <div className={`${textSecondaryClass} text-sm`}>Import from backup</div>
                </div>
              </div>
              <ChevronRight className={`w-5 h-5 ${textSecondaryClass}`} />
            </button>
          </div>
        </div>

        {/* About Section */}
        <div>
          <h3 className={`${textSecondaryClass} mb-3 px-2`}>About</h3>
          <div className={`${cardBgClass} rounded-2xl shadow-sm border ${borderClass} overflow-hidden`}>
            <button className="w-full p-5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-xl flex items-center justify-center">
                  <Info className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="text-left">
                  <div className={textClass}>About Time Guardian</div>
                  <div className={`${textSecondaryClass} text-sm`}>Version 1.0.0</div>
                </div>
              </div>
              <ChevronRight className={`w-5 h-5 ${textSecondaryClass}`} />
            </button>
          </div>
        </div>

        {/* App Info */}
        <div className="bg-orange-50 dark:bg-orange-900/30 rounded-2xl p-5 border border-orange-100 dark:border-orange-800">
          <p className={`${isDark ? 'text-orange-200' : 'text-gray-700'} text-center leading-relaxed`}>
            <strong>Time Guardian</strong><br />
            Your productivity companion<br />
            Made with ❤️ for focused minds
          </p>
        </div>
      </div>
    </div>
  );
}
