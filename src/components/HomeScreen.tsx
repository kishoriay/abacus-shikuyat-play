import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import achievements from '@/assets/achievements.jpg';

interface HomeScreenProps {
  onNavigate: (screen: 'learn' | 'practice' | 'games' | 'progress' | 'settings') => void;
  userName?: string;
  isDemo?: boolean;
  onBack?: () => void;
}

export const HomeScreen = ({ onNavigate, userName = 'बच्चे', isDemo = false, onBack }: HomeScreenProps) => {
  const menuItems = [
    {
      id: 'learn' as const,
      title: '📚 Abacus सीखें',
      subtitle: 'नई concepts जानें',
      color: 'btn-primary',
      icon: '🧮'
    },
    {
      id: 'practice' as const,
      title: '✏️ अभ्यास करें',
      subtitle: 'बेहतर बनें',
      color: 'btn-secondary',
      icon: '💪'
    },
    {
      id: 'games' as const,
      title: '🎮 मजेदार गेम',
      subtitle: 'खेल कर सीखें',
      color: 'btn-fun',
      icon: '🎯'
    },
    {
      id: 'progress' as const,
      title: '📊 प्रगति रिपोर्ट',
      subtitle: 'अपना स्कोर देखें',
      color: 'btn-primary',
      icon: '📈'
    },
    {
      id: 'settings' as const,
      title: '⚙️ सेटिंग्स',
      subtitle: 'ऐप customize करें',
      color: 'btn-secondary',
      icon: '🔧'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-fun p-6">
      {/* Back Button for Demo Users */}
      {isDemo && onBack && (
        <div className="flex justify-start mb-4">
          <Button 
            onClick={onBack}
            variant="outline"
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Exit Demo
          </Button>
        </div>
      )}
      
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center items-center mb-4">
          <div className="bounce-soft text-5xl mr-3">👋</div>
          <div>
            <h1 className="text-3xl font-bold text-white">
              नमस्ते, {userName}!
            </h1>
            <p className="text-lg text-white/90">
              आज क्या सीखना चाहेंगे?
            </p>
          </div>
        </div>
      </div>

      {/* Achievement Banner */}
      <Card className="card-playful mb-8 bg-gradient-rainbow text-center">
        <div className="flex items-center justify-center space-x-4">
          <img 
            src={achievements} 
            alt="Achievements" 
            className="w-16 h-16 object-contain"
          />
          <div>
            <h3 className="text-xl font-bold text-white">
              🏆 आज का लक्ष्य
            </h3>
            <p className="text-white/90">
              5 सवाल सही करके एक स्टार जीतें!
            </p>
          </div>
        </div>
      </Card>

      {/* Main Menu */}
      <div className="space-y-4 max-w-md mx-auto">
        {menuItems.map((item, index) => (
          <Card 
            key={item.id}
            className="card-playful hover:scale-105 transition-transform cursor-pointer"
            onClick={() => onNavigate(item.id)}
          >
            <div className="flex items-center space-x-4">
              <div className="text-4xl bounce-soft" style={{ animationDelay: `${index * 0.2}s` }}>
                {item.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-playful text-card-foreground">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">
                  {item.subtitle}
                </p>
              </div>
              <div className="text-2xl text-primary">▶️</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="mt-8 grid grid-cols-3 gap-4 max-w-md mx-auto">
        <Card className="card-playful text-center bg-gradient-primary">
          <div className="text-white">
            <div className="text-2xl font-bold">5</div>
            <div className="text-sm">Lessons</div>
          </div>
        </Card>
        <Card className="card-playful text-center bg-gradient-secondary">
          <div className="text-secondary-foreground">
            <div className="text-2xl font-bold">⭐</div>
            <div className="text-sm">Today's Star</div>
          </div>
        </Card>
        <Card className="card-playful text-center bg-gradient-fun">
          <div className="text-white">
            <div className="text-2xl font-bold">🏆</div>
            <div className="text-sm">Achievement</div>
          </div>
        </Card>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-4 text-3xl bounce-soft">🌟</div>
      <div className="absolute top-32 right-8 text-2xl float-gentle">🎉</div>
      <div className="absolute bottom-24 left-8 text-3xl bounce-soft delay-300">🚀</div>
    </div>
  );
};