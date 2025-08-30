import { useState } from 'react';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { RegistrationScreen } from '@/components/RegistrationScreen';
import { HomeScreen } from '@/components/HomeScreen';
import { LearnScreen } from '@/components/LearnScreen';
import { PracticeScreen } from '@/components/PracticeScreen';

type Screen = 'welcome' | 'register' | 'home' | 'learn' | 'practice' | 'games' | 'progress' | 'settings';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [userName, setUserName] = useState<string>('');

  const handleGetStarted = () => {
    setCurrentScreen('register');
  };

  const handleRegister = (data: { name: string; birthDate: string; standard: string }) => {
    setUserName(data.name);
    setCurrentScreen('home');
  };

  const handleDemoAccess = () => {
    setUserName('Demo User');
    setCurrentScreen('home');
  };

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleBack = () => {
    setCurrentScreen('home');
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen onGetStarted={handleGetStarted} />;
      
      case 'register':
        return (
          <RegistrationScreen 
            onRegister={handleRegister}
            onDemoAccess={handleDemoAccess}
          />
        );
      
      case 'home':
        return (
          <HomeScreen 
            onNavigate={handleNavigate}
            userName={userName}
          />
        );
      
      case 'learn':
        return <LearnScreen onBack={handleBack} />;
      
      case 'practice':
        return <PracticeScreen onBack={handleBack} />;
      
      default:
        return (
          <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-6">
            <div className="text-center text-white">
              <h1 className="text-3xl font-bold mb-4">
                🚧 Coming Soon! 🚧
              </h1>
              <p className="text-xl mb-6">
                This feature is under development
              </p>
              <button 
                onClick={handleBack}
                className="btn-secondary"
              >
                🏠 Back to Home
              </button>
            </div>
          </div>
        );
    }
  };

  return renderCurrentScreen();
};

export default Index;
