import React from 'react';
import { CircleCheck, Circle } from 'lucide-react';

interface StepItemProps {
  number: number;
  title: string;
  completed: boolean;
  onToggle: () => void;
}

export function StepItem({ number, title, completed, onToggle }: StepItemProps) {
  return (
    <div 
      onClick={onToggle}
      className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
    >
      <div className="flex-shrink-0">
        {completed ? (
          <CircleCheck className="w-6 h-6 text-blue-500" />
        ) : (
          <Circle className="w-6 h-6 text-gray-400" />
        )}
      </div>
      
      <div className="flex-1">
        <span className="text-sm text-gray-500">Step {number}</span>
        <p className={`text-gray-900 ${completed ? 'line-through text-gray-400' : ''}`}>
          {title}
        </p>
      </div>
    </div>
  );
}
