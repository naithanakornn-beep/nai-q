import { useState } from 'react';
import { Clock, Award, Coffee, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface OnboardingFlowProps {
  onComplete: () => void;
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState(0);

  const screens = [
    {
      icon: Clock,
      title: 'Welcome to Time Guardian',
      description: 'Organize your time and focus better on what matters most. Complete missions, stay productive, and achieve your goals.',
      color: 'bg-orange-500',
    },
    {
      icon: Award,
      title: 'Earn Points',
      description: 'Complete missions to earn points. The more focused you are, the more points you collect!',
      color: 'bg-purple-500',
    },
    {
      icon: Coffee,
      title: 'Unlock Relax Time',
      description: 'Use your points to unlock guilt-free relax time. Balance productivity with well-deserved breaks.',
      color: 'bg-green-500',
    },
  ];

  const currentScreen = screens[step];
  const Icon = currentScreen.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex flex-col">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="flex-1 flex flex-col items-center justify-center p-8"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mb-12"
          >
            <div className={`w-32 h-32 ${currentScreen.color} rounded-3xl flex items-center justify-center shadow-2xl relative`}>
              <Icon className="w-16 h-16 text-white" strokeWidth={2} />
              <div className={`absolute -bottom-3 -right-3 w-12 h-12 ${currentScreen.color} opacity-50 rounded-full`}></div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl text-gray-900 text-center mb-6 px-4"
          >
            {currentScreen.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center text-gray-600 leading-relaxed mb-12 max-w-sm px-4"
          >
            {currentScreen.description}
          </motion.p>

          {/* Progress Dots */}
          <div className="flex gap-2 mb-8">
            {screens.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === step
                    ? 'w-8 bg-orange-500'
                    : 'w-2 bg-gray-300'
                }`}
              ></div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Bottom Button */}
      <div className="p-8">
        {step < screens.length - 1 ? (
          <button
            onClick={() => setStep(step + 1)}
            className="w-full bg-orange-500 text-white py-4 rounded-2xl shadow-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={onComplete}
            className="w-full bg-orange-500 text-white py-4 rounded-2xl shadow-lg hover:bg-orange-600 transition-colors"
          >
            Get Started
          </button>
        )}
        
        {step < screens.length - 1 && (
          <button
            onClick={onComplete}
            className="w-full text-gray-500 py-3 mt-3 hover:text-gray-700 transition-colors"
          >
            Skip
          </button>
        )}
      </div>
    </div>
  );
}
