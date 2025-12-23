import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { ScenarioCard } from '../components/ScenarioCard';

export function ScenariosPage() {
  const navigate = useNavigate();

  // Mock data - in real app, this would come from API
  const scenarios = [
    {
      id: 1,
      title: 'Array Manipulation Patterns',
      description: 'Learn fundamental patterns for working with arrays, including sliding windows and two-pointer techniques.',
      difficulty: 'Beginner' as const
    },
    {
      id: 2,
      title: 'Binary Search Variations',
      description: 'Master different variations of binary search including rotated arrays and finding boundaries.',
      difficulty: 'Intermediate' as const
    },
    {
      id: 3,
      title: 'Dynamic Programming Basics',
      description: 'Understand the fundamentals of dynamic programming and memoization strategies.',
      difficulty: 'Intermediate' as const
    },
    {
      id: 4,
      title: 'Graph Traversal Strategies',
      description: 'Explore BFS and DFS techniques for solving graph-based problems efficiently.',
      difficulty: 'Advanced' as const
    },
    {
      id: 5,
      title: 'Recursion and Backtracking',
      description: 'Develop intuition for recursive problem-solving and backtracking algorithms.',
      difficulty: 'Intermediate' as const
    },
    {
      id: 6,
      title: 'Tree Data Structure Patterns',
      description: 'Learn common patterns for binary tree traversal and manipulation.',
      difficulty: 'Beginner' as const
    }
  ];

  const handleStartScenario = (id: number) => {
    navigate(`/training?scenario=${id}`);
  };

  return (
    <Layout title="Scenarios">
      <div className="space-y-6">
        <p className="text-gray-600">
          Choose a scenario to start training your problem-solving skills.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenarios.map((scenario) => (
            <ScenarioCard
              key={scenario.id}
              title={scenario.title}
              description={scenario.description}
              difficulty={scenario.difficulty}
              onStart={() => handleStartScenario(scenario.id)}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
