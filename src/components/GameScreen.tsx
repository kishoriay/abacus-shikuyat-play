import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Timer, Star } from 'lucide-react';

interface GameScreenProps {
  onBack: () => void;
}

export const GameScreen = ({ onBack }: GameScreenProps) => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'finished'>('menu');
  const [currentQuestion, setCurrentQuestion] = useState(generateQuestion());
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [questionCount, setQuestionCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [balloons, setBalloons] = useState<Array<{id: number, value: number, x: number, y: number}>>([]);

  function generateQuestion() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operation = Math.random() > 0.5 ? '+' : '-';
    
    if (operation === '+') {
      return {
        question: `${num1} + ${num2}`,
        answer: num1 + num2,
        options: generateOptions(num1 + num2)
      };
    } else {
      const larger = Math.max(num1, num2);
      const smaller = Math.min(num1, num2);
      return {
        question: `${larger} - ${smaller}`,
        answer: larger - smaller,
        options: generateOptions(larger - smaller)
      };
    }
  }

  function generateOptions(correctAnswer: number) {
    const options = [correctAnswer];
    while (options.length < 4) {
      const option = correctAnswer + Math.floor(Math.random() * 10) - 5;
      if (option >= 0 && !options.includes(option)) {
        options.push(option);
      }
    }
    return options.sort(() => Math.random() - 0.5);
  }

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameState === 'playing' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setGameState('finished');
    }
    return () => clearInterval(interval);
  }, [gameState, timeLeft]);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setTimeLeft(60);
    setQuestionCount(0);
    setStreak(0);
    setCurrentQuestion(generateQuestion());
  };

  const handleAnswer = (selectedAnswer: number) => {
    const isCorrect = selectedAnswer === currentQuestion.answer;
    
    if (isCorrect) {
      setScore(score + 10 + (streak * 2)); // Bonus for streak
      setStreak(streak + 1);
      // Add celebration balloon
      setBalloons(prev => [...prev, {
        id: Date.now(),
        value: 10 + (streak * 2),
        x: Math.random() * 200,
        y: Math.random() * 100
      }]);
    } else {
      setStreak(0);
    }

    setQuestionCount(questionCount + 1);
    
    if (questionCount < 19) { // 20 questions max
      setTimeout(() => {
        setCurrentQuestion(generateQuestion());
        setBalloons([]); // Clear balloons
      }, 1000);
    } else {
      setTimeout(() => {
        setGameState('finished');
      }, 1000);
    }
  };

  const getPerformanceMessage = () => {
    const percentage = (score / (20 * 10)) * 100;
    if (percentage >= 90) return "🏆 Superstar! आप तो गणित के राजा हैं!";
    if (percentage >= 75) return "⭐ बहुत बढ़िया! Keep it up!";
    if (percentage >= 50) return "👍 अच्छा! थोड़ा और practice करें!";
    return "💪 कोई बात नहीं! Practice करते रहें!";
  };

  if (gameState === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-fun p-6">
        <div className="flex items-center justify-between mb-6">
          <Button 
            onClick={onBack}
            variant="outline"
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-white">🎮 मजेदार गेम</h1>
          <div className="w-20"></div>
        </div>

        <Card className="card-playful text-center max-w-md mx-auto">
          <div className="mb-6">
            <div className="text-6xl mb-4">🎯</div>
            <h2 className="text-3xl font-bold text-card-foreground mb-4">
              Math Balloon Pop!
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              60 सेकंड में जितने सवाल हो सके उतने solve करें!
            </p>
          </div>

          <div className="bg-accent/10 rounded-xl p-4 mb-6">
            <h3 className="text-lg font-semibold text-card-foreground mb-2">
              🎮 कैसे खेलें:
            </h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• सही जवाब पर 10 points मिलेंगे</li>
              <li>• Streak bonus: लगातार सही = extra points!</li>
              <li>• 60 seconds में maximum score बनाएं</li>
            </ul>
          </div>

          <Button 
            onClick={startGame}
            className="btn-primary text-xl py-6 px-8"
          >
            🚀 Game शुरू करें!
          </Button>
        </Card>
      </div>
    );
  }

  if (gameState === 'playing') {
    return (
      <div className="min-h-screen bg-gradient-fun p-6 relative overflow-hidden">
        {/* Game Header */}
        <div className="flex justify-between items-center mb-6 relative z-10">
          <div className="text-white text-center">
            <div className="text-2xl font-bold">{score}</div>
            <div className="text-sm">Score</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 text-white mb-2">
              <Timer className="w-5 h-5" />
              <span className="text-2xl font-bold">{timeLeft}</span>
            </div>
            <div className="text-white text-sm">Question {questionCount + 1}/20</div>
          </div>

          <div className="text-white text-center">
            <div className="text-2xl font-bold">🔥{streak}</div>
            <div className="text-sm">Streak</div>
          </div>
        </div>

        {/* Question */}
        <Card className="card-playful text-center mb-6 relative z-10">
          <div className="text-4xl font-bold text-card-foreground mb-6">
            {currentQuestion.question} = ?
          </div>

          {/* Answer Options */}
          <div className="grid grid-cols-2 gap-4">
            {currentQuestion.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(option)}
                className="btn-secondary text-2xl py-6 hover:scale-105 transition-transform"
              >
                {option}
              </Button>
            ))}
          </div>
        </Card>

        {/* Floating Balloons/Stars */}
        {balloons.map((balloon) => (
          <div
            key={balloon.id}
            className="absolute text-2xl font-bold text-yellow-400 animate-bounce pointer-events-none"
            style={{ 
              left: `${balloon.x}px`, 
              top: `${balloon.y + 200}px`,
              animation: 'float-up 2s ease-out forwards'
            }}
          >
            +{balloon.value} 🎈
          </div>
        ))}

        {/* Decorative elements */}
        <div className="absolute top-20 left-4 text-4xl bounce-soft">🌟</div>
        <div className="absolute top-32 right-8 text-3xl float-gentle">🎉</div>
        <div className="absolute bottom-24 left-8 text-4xl bounce-soft delay-100">🚀</div>
        <div className="absolute bottom-16 right-12 text-3xl float-gentle delay-200">⭐</div>
      </div>
    );
  }

  // Game finished
  return (
    <div className="min-h-screen bg-gradient-secondary p-6">
      <Card className="card-playful text-center max-w-md mx-auto">
        <div className="mb-6">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-card-foreground mb-4">
            Game Over!
          </h2>
          
          <div className="bg-primary/10 rounded-xl p-4 mb-4">
            <div className="text-4xl font-bold text-primary mb-2">{score}</div>
            <div className="text-lg text-card-foreground">Final Score</div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-accent/10 rounded-xl p-3">
              <div className="text-2xl font-bold text-accent">{questionCount}</div>
              <div className="text-sm text-muted-foreground">Questions</div>
            </div>
            <div className="bg-destructive/10 rounded-xl p-3">
              <div className="text-2xl font-bold text-destructive">🔥{streak}</div>
              <div className="text-sm text-muted-foreground">Best Streak</div>
            </div>
          </div>

          <div className="bg-gradient-rainbow rounded-xl p-4 mb-6">
            <p className="text-white font-semibold">
              {getPerformanceMessage()}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <Button 
            onClick={startGame}
            className="btn-primary w-full text-lg py-4"
          >
            🔄 फिर से खेलें
          </Button>
          
          <Button 
            onClick={onBack}
            variant="outline"
            className="w-full text-lg py-4"
          >
            🏠 Home पर जाएं
          </Button>
        </div>
      </Card>
    </div>
  );
};

// Add this CSS animation to your global styles
const styles = `
  @keyframes float-up {
    0% { transform: translateY(0) scale(1); opacity: 1; }
    100% { transform: translateY(-100px) scale(1.2); opacity: 0; }
  }
`;