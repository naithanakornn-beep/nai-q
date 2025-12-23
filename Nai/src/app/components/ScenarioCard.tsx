import React from 'react';
import { Card } from './Card';
import { Button } from './Button';
import { CirclePlay } from 'lucide-react';

interface ScenarioCardProps {
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  onStart: () => void;
}

export function ScenarioCard({ title, description, difficulty, onStart }: ScenarioCardProps) {
  const difficultyColors = {
    Beginner: 'bg-green-100 text-green-700',
    Intermediate: 'bg-yellow-100 text-yellow-700',
    Advanced: 'bg-red-100 text-red-700'
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <h3 className="text-gray-900">{title}</h3>
          <span className={`px-3 py-1 rounded-full text-xs ${difficultyColors[difficulty]}`}>
            {difficulty}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm">{description}</p>
        
        <div className="flex justify-end">
          <Button variant="primary" onClick={onStart}>
            <div className="flex items-center gap-2">
              <CirclePlay className="w-4 h-4" />
              <span>Start</span>
            </div>
          </Button>
        </div>
      </div>
    </Card>
  );
}
