import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AbacusScale } from './AbacusScale';
import { ArrowLeft, RefreshCw, Timer } from 'lucide-react';

interface PracticeScreenProps {
  onBack: () => void;
}

type PracticeMode = 'fingers' | 'abacus' | 'imagination';

export const PracticeScreen = ({ onBack }: PracticeScreenProps) => {
  const [currentMode, setCurrentMode] = useState<PracticeMode>('fingers');
  const [currentProblem, setCurrentProblem] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(generateQuestion());
  const [userAnswer, setUserAnswer] = useState('');
  const [abacusValue, setAbacusValue] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isActive, setIsActive] = useState(false);
  const [showFeedback, setShowFeedback] = useState<string | null>(null);

  const modes = {
    fingers: {
      title: '👆 Fingers Mode',
      description: 'उंगलियों से गिनती करें',
      problems: 50,
      color: 'bg-gradient-primary'
    },
    abacus: {
      title: '🧮 Abacus Mode', 
      description: 'Abacus पर solve करें',
      problems: 50,
      color: 'bg-gradient-secondary'
    },
    imagination: {
      title: '🧠 Imagination Mode',
      description: 'दिमाग में solve करें',
      problems: 50,
      color: 'bg-gradient-fun'
    }
  };

  function generateQuestion() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operation = Math.random() > 0.5 ? '+' : '-';
    
    if (operation === '+') {
      return {
        question: `${num1} + ${num2}`,
        answer: num1 + num2
      };
    } else {
      // Ensure no negative results
      const larger = Math.max(num1, num2);
      const smaller = Math.min(num1, num2);
      return {
        question: `${larger} - ${smaller}`,
        answer: larger - smaller
      };
    }
  }

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimeUp();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const startPractice = () => {
    setIsActive(true);
    setTimeLeft(30);
    setCurrentProblem(0);
    setScore(0);
    setCurrentQuestion(generateQuestion());
  };

  const handleTimeUp = () => {
    setIsActive(false);
    setShowFeedback('⏰ समय खत्म! Next problem पर जाएं।');
  };

  const checkAnswer = () => {
    const correct = currentMode === 'abacus' 
      ? abacusValue === currentQuestion.answer
      : parseInt(userAnswer) === currentQuestion.answer;

    if (correct) {
      setScore(score + 1);
      setShowFeedback('🎉 सही! बहुत बढ़िया!');
    } else {
      setShowFeedback(`❌ गलत! सही उत्तर: ${currentQuestion.answer}`);
    }

    setTimeout(() => {
      nextProblem();
    }, 2000);
  };

  const nextProblem = () => {
    if (currentProblem < modes[currentMode].problems - 1) {
      setCurrentProblem(currentProblem + 1);
      setCurrentQuestion(generateQuestion());
      setUserAnswer('');
      setAbacusValue(0);
      setTimeLeft(30);
      setShowFeedback(null);
    } else {
      completePractice();
    }
  };

  const completePractice = () => {
    setIsActive(false);
    setShowFeedback(`🏆 Complete! Score: ${score}/${modes[currentMode].problems}`);
  };

  const resetPractice = () => {
    setCurrentProblem(0);
    setScore(0);
    setTimeLeft(30);
    setIsActive(false);
    setUserAnswer('');
    setAbacusValue(0);
    setShowFeedback(null);
    setCurrentQuestion(generateQuestion());
  };

  return (
    <div className="min-h-screen bg-gradient-fun p-6">
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
            ✏️ अभ्यास करें
          </h1>
        </div>

        <Button 
          onClick={resetPractice}
          variant="outline"
          className="bg-white/20 border-white/30 text-white hover:bg-white/30"
        >
          <RefreshCw className="w-5 h-5" />
        </Button>
      </div>

      {/* Mode Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {Object.entries(modes).map(([key, mode]) => (
          <Card 
            key={key}
            className={`card-playful cursor-pointer transition-all ${
              currentMode === key ? 'ring-4 ring-white scale-105' : 'hover:scale-102'
            }`}
            onClick={() => setCurrentMode(key as PracticeMode)}
          >
            <div className={`${mode.color} rounded-2xl p-4 text-center text-white`}>
              <h3 className="text-lg font-bold mb-1">
                {mode.title}
              </h3>
              <p className="text-sm opacity-90 mb-2">
                {mode.description}
              </p>
              <div className="text-xs bg-white/20 rounded-full px-2 py-1">
                {mode.problems} problems
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Practice Area */}
      <Card className="card-playful mb-6">
        <div className="text-center mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-muted-foreground">
              Problem {currentProblem + 1} / {modes[currentMode].problems}
            </div>
            <div className="flex items-center space-x-2 text-primary">
              <Timer className="w-4 h-4" />
              <span className="font-bold">{timeLeft}s</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Score: {score}
            </div>
          </div>

          <div className="text-4xl font-bold text-card-foreground mb-6">
            {currentQuestion.question} = ?
          </div>

          {/* Different input methods based on mode */}
          {currentMode === 'abacus' ? (
            <div className="mb-6">
              <AbacusScale 
                totalValue={abacusValue}
                onValueChange={setAbacusValue}
                columns={2}
              />
            </div>
          ) : (
            <div className="mb-6">
              {currentMode === 'fingers' && (
                <div className="mb-4 text-center">
                  <p className="text-muted-foreground mb-2">
                    👆 उंगलियों पर गिनती करके उत्तर लिखें
                  </p>
                </div>
              )}
              {currentMode === 'imagination' && (
                <div className="mb-4 text-center">
                  <p className="text-muted-foreground mb-2">
                    🧠 दिमाग में calculate करके उत्तर लिखें
                  </p>
                </div>
              )}
              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                className="text-3xl font-bold text-center w-32 p-4 rounded-xl border-2 border-border focus:border-primary"
                placeholder="?"
                disabled={!isActive}
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-4">
            {!isActive ? (
              <Button 
                onClick={startPractice}
                className="btn-primary text-xl py-4 px-8"
              >
                🚀 शुरू करें!
              </Button>
            ) : (
              <Button 
                onClick={checkAnswer}
                className="btn-fun text-xl py-4 px-8"
                disabled={
                  currentMode === 'abacus' 
                    ? abacusValue === 0 
                    : userAnswer === ''
                }
              >
                ✅ Check Answer
              </Button>
            )}
          </div>

          {/* Feedback */}
          {showFeedback && (
            <div className="mt-6 p-4 bg-accent/10 rounded-xl">
              <p className="text-lg font-semibold text-card-foreground">
                {showFeedback}
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="bg-white/20 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-white h-full rounded-full transition-all duration-300"
            style={{ width: `${(currentProblem / modes[currentMode].problems) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};