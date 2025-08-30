import { useState } from 'react';
import { Card } from '@/components/ui/card';

interface BeadProps {
  value: number;
  isActive: boolean;
  isUpper: boolean;
  onToggle: () => void;
}

const Bead = ({ value, isActive, isUpper, onToggle }: BeadProps) => {
  const beadColors = {
    5: 'bg-destructive', // Red for 5s
    1: 'bg-primary'      // Blue for 1s
  };

  return (
    <div
      onClick={onToggle}
      className={`
        w-8 h-8 rounded-full cursor-pointer transition-all duration-300 shadow-lg
        ${beadColors[value as keyof typeof beadColors]} 
        ${isActive 
          ? (isUpper ? 'translate-y-6' : '-translate-y-6') + ' shadow-2xl scale-110' 
          : isUpper ? 'translate-y-2' : '-translate-y-2'
        }
        ${isActive ? 'ring-4 ring-yellow-400' : 'hover:scale-105'}
      `}
      title={`${value} का bead`}
      style={{
        transform: isActive 
          ? isUpper 
            ? 'translateY(24px) scale(1.1)' // Perfect alignment with center line from above
            : 'translateY(-24px) scale(1.1)' // Perfect alignment with center line from below
          : isUpper
            ? 'translateY(8px)' // Rest position away from line (above)
            : 'translateY(-8px)' // Rest position away from line (below)
      }}
    />
  );
};

interface ColumnProps {
  columnIndex: number;
  value: number;
  onChange: (columnIndex: number, newValue: number) => void;
}

const AbacusColumn = ({ columnIndex, value, onChange }: ColumnProps) => {
  const [upperBead, setUpperBead] = useState(false);
  const [lowerBeads, setLowerBeads] = useState([false, false, false, false]);

  const toggleUpperBead = () => {
    const newUpper = !upperBead;
    setUpperBead(newUpper);
    
    const lowerValue = lowerBeads.filter(b => b).length;
    const newValue = (newUpper ? 5 : 0) + lowerValue;
    onChange(columnIndex, newValue);
  };

  const toggleLowerBead = (index: number) => {
    const newLowerBeads = [...lowerBeads];
    
    if (!newLowerBeads[index]) {
      // Activate this bead and all previous ones
      for (let i = 0; i <= index; i++) {
        newLowerBeads[i] = true;
      }
    } else {
      // Deactivate this bead and all following ones
      for (let i = index; i < newLowerBeads.length; i++) {
        newLowerBeads[i] = false;
      }
    }
    
    setLowerBeads(newLowerBeads);
    
    const upperValue = upperBead ? 5 : 0;
    const lowerValue = newLowerBeads.filter(b => b).length;
    const newValue = upperValue + lowerValue;
    onChange(columnIndex, newValue);
  };

  // Calculate place value
  const placeValue = Math.pow(10, columnIndex);
  const placeLabel = placeValue >= 1000 ? `${placeValue/1000}k` : placeValue.toString();

  return (
    <div className="flex flex-col items-center space-y-2 p-2">
      {/* Place value label */}
      <div className="text-xs font-semibold text-muted-foreground bg-muted px-2 py-1 rounded">
        {placeLabel}
      </div>
      
      {/* Upper section (5s) */}
      <div className="h-20 flex flex-col justify-end items-center pb-2">
        <Bead
          value={5}
          isActive={upperBead}
          isUpper={true}
          onToggle={toggleUpperBead}
        />
      </div>

      {/* Center line (answer line) */}
      <div className="w-12 h-1 bg-foreground rounded-full shadow-lg relative z-10"></div>

      {/* Lower section (1s) */}
      <div className="h-32 flex flex-col justify-start items-center pt-2 space-y-1">
        {lowerBeads.map((isActive, index) => (
          <Bead
            key={index}
            value={1}
            isActive={isActive}
            isUpper={false}
            onToggle={() => toggleLowerBead(index)}
          />
        ))}
      </div>

      {/* Column value display */}
      <div className="text-lg font-bold text-primary bg-primary/10 px-2 py-1 rounded">
        {value * placeValue}
      </div>
    </div>
  );
};

interface AbacusScaleProps {
  totalValue: number;
  onValueChange: (value: number) => void;
  columns?: number;
}

export const AbacusScale = ({ totalValue, onValueChange, columns = 4 }: AbacusScaleProps) => {
  const [columnValues, setColumnValues] = useState<number[]>(new Array(columns).fill(0));

  const handleColumnChange = (columnIndex: number, newValue: number) => {
    const newColumnValues = [...columnValues];
    newColumnValues[columnIndex] = newValue;
    setColumnValues(newColumnValues);

    // Calculate total value
    const total = newColumnValues.reduce((sum, value, index) => {
      return sum + (value * Math.pow(10, index));
    }, 0);
    
    onValueChange(total);
  };

  return (
    <Card className="card-playful bg-gradient-to-b from-yellow-50 to-orange-50">
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold text-foreground mb-2">
          🧮 Abacus Scale
        </h3>
        <div className="text-3xl font-bold text-primary bg-primary/10 inline-block px-6 py-2 rounded-xl">
          Total: {totalValue}
        </div>
      </div>

      <div className="flex justify-center items-center space-x-4 overflow-x-auto">
        {Array.from({ length: columns }, (_, index) => (
          <AbacusColumn
            key={index}
            columnIndex={index}
            value={columnValues[index]}
            onChange={handleColumnChange}
          />
        ))}
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-muted-foreground">
          💡 टिप: ऊपर के लाल beads = 5, नीचे के नीले beads = 1
        </p>
      </div>
    </Card>
  );
};