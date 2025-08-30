import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AbacusScale } from './AbacusScale';
import { ArrowLeft, Play, Pause } from 'lucide-react';

interface LearnScreenProps {
  onBack: () => void;
}

export const LearnScreen = ({ onBack }: LearnScreenProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [abacusValue, setAbacusValue] = useState(0);

  const lessons = [
    {
      title: "Abacus की पहचान",
      description: "Abacus के parts को जानें",
      content: "यह है आपका अबेकस! ऊपर के लाल मोती = 5, नीचे के नीले मोती = 1",
      targetValue: 0,
      animation: "🧮"
    },
    {
      title: "संख्या 1-4 बनाना",
      description: "छोटी संख्या बनाना सीखें",
      content: "नीचे के मोतियों को center line की तरफ move करें। हर मोती = 1",
      targetValue: 3,
      animation: "1️⃣"
    },
    {
      title: "संख्या 5 बनाना",
      description: "5 के लिए ऊपर का मोती use करें",
      content: "ऊपर का लाल मोती center line की तरफ move करें। यह = 5",
      targetValue: 5,
      animation: "5️⃣"
    },
    {
      title: "संख्या 6-9 बनाना",
      description: "5 + छोटी संख्या",
      content: "ऊपर का मोती (5) + नीचे के मोती (1,2,3,4) = 6,7,8,9",
      targetValue: 7,
      animation: "🔢"
    }
  ];

  const currentLesson = lessons[currentStep];

  const nextStep = () => {
    if (currentStep < lessons.length - 1) {
      setCurrentStep(currentStep + 1);
      setAbacusValue(0);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setAbacusValue(0);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-primary p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button 
          onClick={onBack}
          variant="outline"
          className="bg-white/20 border-white/30 text-white hover:bg-white/30"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Button>
        
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">
            📚 Abacus सीखें
          </h1>
          <p className="text-white/80">
            Lesson {currentStep + 1} of {lessons.length}
          </p>
        </div>

        <div className="w-20"></div> {/* Spacer for centering */}
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="bg-white/20 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-white h-full rounded-full transition-all duration-500"
            style={{ width: `${((currentStep + 1) / lessons.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Lesson Content */}
      <Card className="card-playful mb-6">
        <div className="text-center mb-6">
          <div className="text-4xl mb-4 bounce-soft">
            {currentLesson.animation}
          </div>
          <h2 className="text-2xl font-bold text-card-foreground mb-2">
            {currentLesson.title}
          </h2>
          <p className="text-lg text-muted-foreground mb-4">
            {currentLesson.description}
          </p>
          <div className="bg-accent/10 rounded-xl p-4">
            <p className="text-card-foreground font-medium">
              💡 {currentLesson.content}
            </p>
          </div>
        </div>
      </Card>

      {/* Interactive Abacus */}
      <div className="mb-6">
        <AbacusScale 
          totalValue={abacusValue}
          onValueChange={setAbacusValue}
          columns={2}
        />
      </div>

      {/* Target Check */}
      {currentLesson.targetValue > 0 && (
        <Card className="card-playful mb-6 text-center">
          <div className="flex items-center justify-center space-x-4">
            <div>
              <p className="text-fun text-card-foreground">
                🎯 Target: {currentLesson.targetValue}
              </p>
              <p className="text-muted-foreground">
                Current: {abacusValue}
              </p>
            </div>
            {abacusValue === currentLesson.targetValue && (
              <div className="text-2xl bounce-soft">
                ✅ Perfect!
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button 
          onClick={prevStep}
          disabled={currentStep === 0}
          className="btn-secondary"
        >
          ⬅️ Previous
        </Button>

        <div className="flex space-x-2">
          {lessons.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentStep 
                  ? 'bg-white' 
                  : index < currentStep 
                    ? 'bg-white/70' 
                    : 'bg-white/30'
              }`}
            />
          ))}
        </div>

        <Button 
          onClick={nextStep}
          disabled={currentStep === lessons.length - 1}
          className="btn-fun"
        >
          Next ➡️
        </Button>
      </div>

      {/* Completion Message */}
      {currentStep === lessons.length - 1 && (
        <Card className="card-playful mt-6 text-center bg-gradient-secondary">
          <div className="text-secondary-foreground">
            <div className="text-4xl mb-2">🎉</div>
            <h3 className="text-xl font-bold mb-2">
              बधाई हो! Lesson Complete!
            </h3>
            <p className="mb-4">
              अब आप practice में जा सकते हैं!
            </p>
            <Button 
              onClick={onBack}
              className="btn-primary"
            >
              🏠 Home पर जाएं
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};