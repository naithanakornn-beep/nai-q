import { Home, ListTodo, Award, BarChart3, Settings } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../App';
import type { Screen } from '../App';

interface BottomNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export function BottomNav({ currentScreen, onNavigate }: BottomNavProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const navItems = [
    { screen: 'home' as Screen, icon: Home, label: 'Home' },
    { screen: 'missions' as Screen, icon: ListTodo, label: 'Missions' },
    { screen: 'points' as Screen, icon: Award, label: 'Points' },
    { screen: 'stats' as Screen, icon: BarChart3, label: 'Stats' },
    { screen: 'settings' as Screen, icon: Settings, label: 'Settings' },
  ];

  const bgClass = isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';

  return (
    <div className={`fixed bottom-0 left-0 right-0 ${bgClass} border-t max-w-md mx-auto z-30`}>
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map(({ screen, icon: Icon, label }) => {
          const isActive = currentScreen === screen;

          return (
            <button
              key={screen}
              onClick={() => onNavigate(screen)}
              className="relative flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-colors flex-1"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-orange-100 dark:bg-orange-900/30 rounded-xl"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <Icon
                className={`w-6 h-6 relative z-10 transition-colors ${
                  isActive
                    ? 'text-orange-600 dark:text-orange-400'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span
                className={`text-xs relative z-10 transition-colors ${
                  isActive
                    ? 'text-orange-600 dark:text-orange-400'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
