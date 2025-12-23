import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { StepItem } from '../components/StepItem';

export function TrainingPage() {
  // Mock data - in real app, this would come from API based on scenario ID
  const scenario = {
    title: 'Array Manipulation Patterns',
    description: 'In this scenario, you\'ll learn to identify and apply common array manipulation patterns. These patterns are fundamental for solving a wide range of programming problems efficiently.'
  };

  const [steps, setSteps] = useState([
    { id: 1, title: 'Understand the problem constraints and input format', completed: false },
    { id: 2, title: 'Identify if a sliding window pattern applies', completed: false },
    { id: 3, title: 'Consider two-pointer technique for sorted arrays', completed: false },
    { id: 4, title: 'Analyze time and space complexity requirements', completed: false },
    { id: 5, title: 'Test your solution with edge cases', completed: false }
  ]);

  const toggleStep = (id: number) => {
    setSteps(steps.map(step => 
      step.id === id ? { ...step, completed: !step.completed } : step
    ));
  };

  const handleSaveProgress = () => {
    alert('Progress saved! (Mock action)');
  };

  const handleMarkCompleted = () => {
    const allCompleted = steps.every(step => step.completed);
    if (allCompleted) {
      alert('Scenario completed! Well done! (Mock action)');
    } else {
      alert('Please complete all steps before marking as completed.');
    }
  };

  return (
    <Layout title="Training Scenario">
      <div className="max-w-4xl space-y-6">
        {/* Scenario Info */}
        <Card>
          <h3 className="text-gray-900 mb-3">{scenario.title}</h3>
          <p className="text-gray-600">{scenario.description}</p>
        </Card>

        {/* Steps */}
        <Card>
          <h3 className="text-gray-900 mb-4">Step-by-Step Thinking Process</h3>
          <div className="space-y-3">
            {steps.map((step) => (
              <StepItem
                key={step.id}
                number={step.id}
                title={step.title}
                completed={step.completed}
                onToggle={() => toggleStep(step.id)}
              />
            ))}
          </div>
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Button variant="secondary" onClick={handleSaveProgress}>
            Save Progress
          </Button>
          <Button variant="primary" onClick={handleMarkCompleted}>
            Mark as Completed
          </Button>
        </div>
      </div>
    </Layout>
  );
}
