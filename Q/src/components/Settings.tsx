import { Bell, Award, Shield, Palette, ChevronRight, ArrowLeft } from 'lucide-react';
import type { Screen } from '../App';

interface SettingsProps {
  focusLockLevel: 'Light' | 'Medium' | 'Strict';
  onNavigate: (screen: Screen) => void;
}

export function Settings({ focusLockLevel, onNavigate }: SettingsProps) {
  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="p-6 pb-4">
        <button
          onClick={() => onNavigate('home')}
          className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="text-3xl text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Customize your experience</p>
      </div>

      {/* Settings Groups */}
      <div className="px-6 space-y-6">
        {/* Rewards Section */}
        <div>
          <h3 className="text-gray-700 mb-3 px-2">Rewards</h3>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <button className="w-full p-5 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Award className="w-5 h-5 text-orange-600" />
                </div>
                <div className="text-left">
                  <div className="text-gray-900">Edit Points Reward</div>
                  <div className="text-gray-600 text-sm">Customize points per mission</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Notifications Section */}
        <div>
          <h3 className="text-gray-700 mb-3 px-2">Notifications</h3>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <button className="w-full p-5 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Bell className="w-5 h-5 text-orange-600" />
                </div>
                <div className="text-left">
                  <div className="text-gray-900">Mission Reminders</div>
                  <div className="text-gray-600 text-sm">Daily at 9:00 AM</div>
                </div>
              </div>
              <div className="w-11 h-6 bg-orange-500 rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
              </div>
            </button>
            
            <button className="w-full p-5 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Bell className="w-5 h-5 text-orange-600" />
                </div>
                <div className="text-left">
                  <div className="text-gray-900">Break Reminders</div>
                  <div className="text-gray-600 text-sm">Every 2 hours</div>
                </div>
              </div>
              <div className="w-11 h-6 bg-orange-500 rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
              </div>
            </button>

            <button className="w-full p-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Bell className="w-5 h-5 text-orange-600" />
                </div>
                <div className="text-left">
                  <div className="text-gray-900">Achievement Alerts</div>
                  <div className="text-gray-600 text-sm">Celebrate milestones</div>
                </div>
              </div>
              <div className="w-11 h-6 bg-gray-300 rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5"></div>
              </div>
            </button>
          </div>
        </div>

        {/* Focus Section */}
        <div>
          <h3 className="text-gray-700 mb-3 px-2">Focus</h3>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <button
              onClick={() => onNavigate('focus')}
              className="w-full p-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-orange-600" />
                </div>
                <div className="text-left">
                  <div className="text-gray-900">Focus Lock Level</div>
                  <div className="text-gray-600 text-sm">Currently: {focusLockLevel}</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Appearance Section */}
        <div>
          <h3 className="text-gray-700 mb-3 px-2">Appearance</h3>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <button className="w-full p-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Palette className="w-5 h-5 text-orange-600" />
                </div>
                <div className="text-left">
                  <div className="text-gray-900">App Theme</div>
                  <div className="text-gray-600 text-sm">Light mode</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-orange-50 rounded-2xl p-5 border border-orange-100">
          <p className="text-gray-700 text-center leading-relaxed">
            <strong>Time Guardian</strong> v1.0.0<br />
            Your productivity companion
          </p>
        </div>
      </div>
    </div>
  );
}
