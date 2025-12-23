import { ArrowLeft, Bell, Clock, Award, Coffee, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../App';
import type { Screen } from '../App';

interface NotificationCenterProps {
  onNavigate: (screen: Screen) => void;
}

interface Notification {
  id: string;
  type: 'mission' | 'points' | 'relax' | 'achievement';
  title: string;
  message: string;
  time: string;
  read: boolean;
  action?: {
    label: string;
    screen: Screen;
  };
}

const notifications: Notification[] = [
  {
    id: '1',
    type: 'mission',
    title: 'Mission Reminder',
    message: 'Don\'t forget to complete "React Project Module" today!',
    time: '10 min ago',
    read: false,
    action: { label: 'Start Mission', screen: 'missions' },
  },
  {
    id: '2',
    type: 'achievement',
    title: 'Streak Achievement!',
    message: 'Congratulations! You\'ve maintained a 12-day streak.',
    time: '1 hour ago',
    read: false,
  },
  {
    id: '3',
    type: 'points',
    title: 'Points Low',
    message: 'Only 50 points left. Complete missions to earn more!',
    time: '2 hours ago',
    read: true,
    action: { label: 'View Missions', screen: 'missions' },
  },
  {
    id: '4',
    type: 'relax',
    title: 'Relax Time Available',
    message: 'You have 45 minutes of relax time. Take a break!',
    time: '3 hours ago',
    read: true,
    action: { label: 'Start Break', screen: 'points' },
  },
];

const notificationIcons = {
  mission: Clock,
  points: Award,
  relax: Coffee,
  achievement: Check,
};

const notificationColors = {
  mission: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400',
  points: 'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-400',
  relax: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400',
  achievement: 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400',
};

export function NotificationCenter({ onNavigate }: NotificationCenterProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const textClass = isDark ? 'text-white' : 'text-gray-900';
  const textSecondaryClass = isDark ? 'text-gray-400' : 'text-gray-600';
  const cardBgClass = isDark ? 'bg-gray-700' : 'bg-white';
  const borderClass = isDark ? 'border-gray-600' : 'border-gray-100';

  const unreadCount = notifications.filter(n => !n.read).length;

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
          <h1 className={`text-2xl ${textClass}`}>Notifications</h1>
          <div className="w-10"></div>
        </div>

        {unreadCount > 0 && (
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-orange-500 rounded-full" />
            <span className={textSecondaryClass}>{unreadCount} unread</span>
          </div>
        )}
      </div>

      {/* Notification Settings */}
      <div className="p-6 pb-4">
        <h3 className={`${textClass} mb-4`}>Notification Settings</h3>
        <div className={`${cardBgClass} rounded-2xl shadow-sm border ${borderClass} divide-y ${borderClass}`}>
          {[
            { label: 'Mission Reminders', enabled: true },
            { label: 'Achievement Alerts', enabled: true },
            { label: 'Points Updates', enabled: false },
            { label: 'Relax Time Reminders', enabled: true },
          ].map((setting, index) => (
            <motion.div
              key={setting.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between p-4"
            >
              <div className="flex items-center gap-3">
                <Bell className={`w-5 h-5 ${textSecondaryClass}`} />
                <span className={textClass}>{setting.label}</span>
              </div>
              <button
                className={`w-12 h-7 rounded-full transition-colors relative ${
                  setting.enabled ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <motion.div
                  animate={{ x: setting.enabled ? 20 : 4 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="w-5 h-5 bg-white rounded-full absolute top-1"
                />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Notification List */}
      <div className="px-6 pb-6">
        <h3 className={`${textClass} mb-4`}>Recent</h3>
        <div className="space-y-3">
          {notifications.length > 0 ? (
            notifications.map((notification, index) => {
              const Icon = notificationIcons[notification.type];

              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`${cardBgClass} rounded-2xl p-4 shadow-sm border ${borderClass} ${
                    !notification.read ? 'border-l-4 border-l-orange-500' : ''
                  }`}
                >
                  <div className="flex gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${notificationColors[notification.type]}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className={textClass}>{notification.title}</h4>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
                        )}
                      </div>
                      <p className={`${textSecondaryClass} text-sm mb-2`}>
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className={`${textSecondaryClass} text-xs`}>
                          {notification.time}
                        </span>
                        {notification.action && (
                          <button
                            onClick={() => onNavigate(notification.action!.screen)}
                            className="text-orange-600 dark:text-orange-400 text-sm hover:underline"
                          >
                            {notification.action.label}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className={`${cardBgClass} rounded-2xl p-12 shadow-sm border ${borderClass} text-center`}>
              <div className="text-6xl mb-4">🔔</div>
              <h3 className={`text-xl ${textClass} mb-2`}>No notifications</h3>
              <p className={textSecondaryClass}>You're all caught up!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
