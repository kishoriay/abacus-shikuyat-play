import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import abacusHero from '@/assets/abacus-hero.jpg';
import mascot from '@/assets/mascot-character.jpg';

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

export const WelcomeScreen = ({ onGetStarted }: WelcomeScreenProps) => {
  const [showMascot, setShowMascot] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowMascot(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-primary flex flex-col items-center justify-center p-6 text-center">
      {/* App Title */}
      <div className="mb-8">
        <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">
          Abacus Shikuyat
        </h1>
        <p className="text-xl text-white/90 font-medium">
          मजेदार गणित सीखें! • Learn Math with Fun!
        </p>
      </div>

      {/* Animated Abacus */}
      <div className="relative mb-8">
        <div className="bounce-soft">
          <img 
            src={abacusHero} 
            alt="Colorful Abacus" 
            className="w-64 h-48 object-contain drop-shadow-2xl rounded-2xl"
          />
        </div>
        
        {/* Mascot Character */}
        {showMascot && (
          <div className="absolute -right-16 -top-8 float-gentle">
            <img 
              src={mascot} 
              alt="Learning Mascot" 
              className="w-24 h-24 object-contain drop-shadow-lg"
            />
          </div>
        )}
      </div>

      {/* Welcome Message */}
      <div className="mb-10 max-w-md">
        <h2 className="text-2xl font-bold text-white mb-4">
          🌟 गणित के जादूगर बनो! 🌟
        </h2>
        <p className="text-lg text-white/90 leading-relaxed">
          Abacus की मदद से तेज़ी से गणित सीखें और अपने दोस्तों को चौंकाएं!
        </p>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4 w-full max-w-xs">
        <Button 
          onClick={onGetStarted}
          className="btn-secondary w-full text-xl py-6 font-bold shadow-2xl hover:shadow-fun"
        >
          🚀 चलो शुरू करें!
        </Button>
        
        <p className="text-sm text-white/80">
          Ages 5-12 • सभी उम्र के बच्चों के लिए
        </p>
      </div>

      {/* Fun decorative elements */}
      <div className="absolute top-10 left-10 text-4xl animate-pulse">⭐</div>
      <div className="absolute top-20 right-16 text-3xl animate-pulse delay-100">🎯</div>
      <div className="absolute bottom-20 left-20 text-4xl animate-pulse delay-200">🏆</div>
      <div className="absolute bottom-16 right-12 text-3xl animate-pulse delay-300">🎉</div>
    </div>
  );
};