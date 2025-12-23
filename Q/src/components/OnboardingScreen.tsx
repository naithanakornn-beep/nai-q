import { Clock } from 'lucide-react';

interface OnboardingScreenProps {
  onStart: () => void;
}

export function OnboardingScreen({ onStart }: OnboardingScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-orange-50 to-white">
      {/* Logo/Icon */}
      <div className="mb-8 relative">
        <div className="w-24 h-24 bg-orange-500 rounded-3xl flex items-center justify-center shadow-lg">
          <Clock className="w-12 h-12 text-white" strokeWidth={2} />
        </div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-orange-400 rounded-full"></div>
      </div>

      {/* App Name */}
      <h1 className="text-4xl mb-4 text-gray-900">Time Guardian</h1>

      {/* Tagline */}
      <p className="text-center text-gray-600 mb-12 max-w-xs leading-relaxed">
        Organize your time, stay focused, earn points.
      </p>

      {/* Features */}
      <div className="space-y-4 mb-12 w-full max-w-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-orange-600">✓</span>
          </div>
          <span className="text-gray-700">Complete missions to earn points</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-orange-600">✓</span>
          </div>
          <span className="text-gray-700">Unlock relax time as rewards</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-orange-600">✓</span>
          </div>
          <span className="text-gray-700">Stay focused with mission timer</span>
        </div>
      </div>

      {/* Start Button */}
      <button
        onClick={onStart}
        className="w-full max-w-xs bg-orange-500 text-white py-4 rounded-2xl shadow-lg hover:bg-orange-600 transition-colors"
      >
        Start
      </button>
    </div>
  );
}
