import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';

interface RegistrationScreenProps {
  onRegister: (data: { name: string; birthDate: string; standard: string }) => void;
  onDemoAccess: () => void;
  onBack?: () => void;
}

export const RegistrationScreen = ({ onRegister, onDemoAccess, onBack }: RegistrationScreenProps) => {
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    standard: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.birthDate && formData.standard) {
      onRegister(formData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-secondary flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Back Button */}
        {onBack && (
          <div className="flex justify-start mb-4">
            <Button 
              onClick={onBack}
              variant="outline"
              className="bg-white/20 border-white/30 text-secondary-foreground hover:bg-white/30"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
          </div>
        )}
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-secondary-foreground mb-2">
            🌟 नया छात्र 🌟
          </h1>
          <p className="text-lg text-secondary-foreground/80">
            आइए आपको जानते हैं!
          </p>
        </div>

        {/* Registration Form */}
        <Card className="card-playful mb-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-fun text-card-foreground mb-2">
                👤 आपका नाम (Your Name)
              </label>
              <Input
                type="text"
                placeholder="अपना नाम लिखें..."
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="text-lg p-4 rounded-xl border-2 border-border focus:border-primary"
                required
              />
            </div>

            <div>
              <label className="block text-fun text-card-foreground mb-2">
                🎂 जन्मदिन (Birth Date)
              </label>
              <Input
                type="date"
                value={formData.birthDate}
                onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                className="text-lg p-4 rounded-xl border-2 border-border focus:border-primary"
                required
              />
            </div>

            <div>
              <label className="block text-fun text-card-foreground mb-2">
                📚 कक्षा (Standard)
              </label>
              <Select 
                value={formData.standard} 
                onValueChange={(value) => setFormData({ ...formData, standard: value })}
              >
                <SelectTrigger className="text-lg p-4 rounded-xl border-2 border-border">
                  <SelectValue placeholder="अपनी कक्षा चुनें..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kg">KG (किंडरगार्टन)</SelectItem>
                  <SelectItem value="1st">1st Standard</SelectItem>
                  <SelectItem value="2nd">2nd Standard</SelectItem>
                  <SelectItem value="3rd">3rd Standard</SelectItem>
                  <SelectItem value="4th">4th Standard</SelectItem>
                  <SelectItem value="5th">5th Standard</SelectItem>
                  <SelectItem value="6th">6th Standard</SelectItem>
                  <SelectItem value="7th">7th Standard</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              type="submit" 
              className="btn-primary w-full text-xl py-6"
            >
              ✅ पंजीकरण करें
            </Button>
          </form>
        </Card>

        {/* Demo Access */}
        <div className="text-center">
          <p className="text-secondary-foreground/80 mb-4">
            पहले देखना चाहते हैं?
          </p>
          <Button 
            onClick={onDemoAccess}
            variant="outline"
            className="btn-fun w-full text-lg py-4"
          >
            🎮 Free Demo Lesson
          </Button>
        </div>

        {/* Fun decorations */}
        <div className="absolute top-16 left-8 text-3xl bounce-soft">🎨</div>
        <div className="absolute top-24 right-8 text-2xl float-gentle">📖</div>
        <div className="absolute bottom-32 left-12 text-3xl bounce-soft delay-100">✏️</div>
      </div>
    </div>
  );
};