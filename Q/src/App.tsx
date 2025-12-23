import { useState, createContext, useContext } from 'react';
import { OnboardingFlow } from './components/OnboardingFlow';
import { HomeDashboard } from './components/HomeDashboard';
import { MissionList } from './components/MissionList';
import { AddMission } from './components/AddMission';
import { MissionDetail } from './components/MissionDetail';
import { FocusTimer } from './components/FocusTimer';
import { TaskCompleted } from './components/TaskCompleted';
import { PointsRelax } from './components/PointsRelax';
import { RelaxTimer } from './components/RelaxTimer';
import { FocusLock } from './components/FocusLock';
import { NotificationCenter } from './components/NotificationCenter';
import { Statistics } from './components/Statistics';
import { ProfileSettings } from './components/ProfileSettings';
import { BottomNav } from './components/BottomNav';

export type Screen = 
  | 'onboarding'
  | 'home'
  | 'missions'
  | 'add-mission'
  | 'mission-detail'
  | 'focus-timer'
  | 'task-completed'
  | 'points'
  | 'relax-timer'
  | 'focus-lock'
  | 'notifications'
  | 'stats'
  | 'settings';

export type Category = 'Learning' | 'Work' | 'Self Improvement';
export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type Theme = 'light' | 'dark';

export interface Mission {
  id: string;
  name: string;
  description: string;
  category: Category;
  duration: number; // in minutes
  difficulty: Difficulty;
  points: number;
  progress: number; // 0-100
  completed?: boolean;
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [theme, setTheme] = useState<Theme>('light');
  
  // App state
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [totalPoints, setTotalPoints] = useState(850);
  const [relaxTime, setRelaxTime] = useState(45); // minutes
  const [completedToday, setCompletedToday] = useState(3);
  const [focusTimeToday, setFocusTimeToday] = useState(135); // minutes
  const [streak, setStreak] = useState(12);
  const [focusLockEnabled, setFocusLockEnabled] = useState(true);
  const [focusLockLevel, setFocusLockLevel] = useState<'Light' | 'Medium' | 'Strict'>('Medium');
  const [missions, setMissions] = useState<Mission[]>([
    {
      id: '1',
      name: 'Complete React Project Module',
      description: 'Finish the authentication module and test all user flows',
      category: 'Learning',
      duration: 45,
      difficulty: 'Medium',
      points: 120,
      progress: 35,
    },
    {
      id: '2',
      name: 'Morning Workout Session',
      description: 'Complete a full body workout routine with stretching',
      category: 'Self Improvement',
      duration: 30,
      difficulty: 'Easy',
      points: 80,
      progress: 0,
    },
    {
      id: '3',
      name: 'Client Presentation Prep',
      description: 'Prepare slides and talking points for Friday\'s client meeting',
      category: 'Work',
      duration: 60,
      difficulty: 'Hard',
      points: 150,
      progress: 60,
    },
  ]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleCompleteOnboarding = () => {
    setHasOnboarded(true);
    setCurrentScreen('home');
  };

  const handleSelectMission = (mission: Mission) => {
    setSelectedMission(mission);
    setCurrentScreen('mission-detail');
  };

  const handleStartMission = (mission: Mission) => {
    setSelectedMission(mission);
    setCurrentScreen('focus-timer');
  };

  const handleCompleteMission = (points: number, duration: number) => {
    setTotalPoints(prev => prev + points);
    setCompletedToday(prev => prev + 1);
    setFocusTimeToday(prev => prev + duration);
    setCurrentScreen('task-completed');
  };

  const handleAddMission = (mission: Omit<Mission, 'id' | 'progress'>) => {
    const newMission: Mission = {
      ...mission,
      id: Date.now().toString(),
      progress: 0,
    };
    setMissions(prev => [...prev, newMission]);
    setCurrentScreen('missions');
  };

  const handleDeleteMission = (id: string) => {
    setMissions(prev => prev.filter(m => m.id !== id));
    setCurrentScreen('missions');
  };

  const handleExchangePoints = (points: number, minutes: number) => {
    if (totalPoints >= points) {
      setTotalPoints(prev => prev - points);
      setRelaxTime(prev => prev + minutes);
    }
  };

  const handleStartRelaxTime = () => {
    setCurrentScreen('relax-timer');
  };

  const isDark = theme === 'dark';
  const bgClass = isDark ? 'bg-gray-900' : 'bg-gray-50';
  const containerBgClass = isDark ? 'bg-gray-800' : 'bg-white';

  const renderScreen = () => {
    if (!hasOnboarded && currentScreen === 'onboarding') {
      return <OnboardingFlow onComplete={handleCompleteOnboarding} />;
    }

    switch (currentScreen) {
      case 'home':
        return (
          <HomeDashboard
            points={totalPoints}
            completedToday={completedToday}
            focusTimeToday={focusTimeToday}
            missions={missions}
            onNavigate={setCurrentScreen}
            onStartMission={handleStartMission}
          />
        );
      case 'missions':
        return (
          <MissionList
            missions={missions}
            onSelectMission={handleSelectMission}
            onNavigate={setCurrentScreen}
          />
        );
      case 'add-mission':
        return (
          <AddMission
            onSave={handleAddMission}
            onCancel={() => setCurrentScreen('missions')}
          />
        );
      case 'mission-detail':
        return selectedMission ? (
          <MissionDetail
            mission={selectedMission}
            onStart={() => handleStartMission(selectedMission)}
            onEdit={() => {/* TODO */}}
            onDelete={() => handleDeleteMission(selectedMission.id)}
            onBack={() => setCurrentScreen('missions')}
          />
        ) : null;
      case 'focus-timer':
        return selectedMission ? (
          <FocusTimer
            mission={selectedMission}
            onComplete={handleCompleteMission}
            onCancel={() => setCurrentScreen('home')}
            focusLockEnabled={focusLockEnabled}
          />
        ) : null;
      case 'task-completed':
        return (
          <TaskCompleted
            pointsEarned={selectedMission?.points || 0}
            onNext={() => setCurrentScreen('missions')}
            onHome={() => setCurrentScreen('home')}
          />
        );
      case 'points':
        return (
          <PointsRelax
            totalPoints={totalPoints}
            relaxTime={relaxTime}
            onExchange={handleExchangePoints}
            onStartRelaxTime={handleStartRelaxTime}
            onNavigate={setCurrentScreen}
          />
        );
      case 'relax-timer':
        return (
          <RelaxTimer
            relaxTime={relaxTime}
            onEnd={() => setCurrentScreen('home')}
          />
        );
      case 'focus-lock':
        return (
          <FocusLock
            enabled={focusLockEnabled}
            level={focusLockLevel}
            onToggle={setFocusLockEnabled}
            onLevelChange={setFocusLockLevel}
            onNavigate={setCurrentScreen}
          />
        );
      case 'notifications':
        return (
          <NotificationCenter
            onNavigate={setCurrentScreen}
          />
        );
      case 'stats':
        return (
          <Statistics
            streak={streak}
            completedMissions={47}
            totalPoints={totalPoints}
            focusTimeToday={focusTimeToday}
            onNavigate={setCurrentScreen}
          />
        );
      case 'settings':
        return (
          <ProfileSettings
            focusLockLevel={focusLockLevel}
            theme={theme}
            onToggleTheme={toggleTheme}
            onNavigate={setCurrentScreen}
          />
        );
      default:
        return null;
    }
  };

  const showBottomNav = hasOnboarded && 
    !['onboarding', 'focus-timer', 'task-completed', 'relax-timer', 'add-mission', 'mission-detail'].includes(currentScreen);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`min-h-screen ${bgClass} transition-colors duration-300`}>
        <div className={`max-w-md mx-auto ${containerBgClass} min-h-screen shadow-xl relative ${showBottomNav ? 'pb-20' : ''}`}>
          {renderScreen()}
          
          {showBottomNav && (
            <BottomNav currentScreen={currentScreen} onNavigate={setCurrentScreen} />
          )}
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
