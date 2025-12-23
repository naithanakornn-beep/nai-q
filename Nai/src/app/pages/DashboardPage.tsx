import React from 'react';
import { Layout } from '../components/Layout';
import { Card } from '../components/Card';
import { BookOpen, CheckCircle, CirclePlay } from 'lucide-react';

export function DashboardPage() {
  // Mock data - in real app, this would come from API
  const stats = {
    totalScenarios: 24,
    completed: 8,
    inProgress: 3
  };

  const recentActivity = [
    { id: 1, title: 'Array Manipulation Patterns', date: '2024-12-22', status: 'completed' },
    { id: 2, title: 'Binary Search Variations', date: '2024-12-21', status: 'in-progress' },
    { id: 3, title: 'Dynamic Programming Basics', date: '2024-12-20', status: 'completed' },
    { id: 4, title: 'Graph Traversal Strategies', date: '2024-12-19', status: 'in-progress' }
  ];

  return (
    <Layout title="Dashboard">
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Scenarios</p>
                <p className="text-gray-900">{stats.totalScenarios}</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-gray-900">{stats.completed}</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <CirclePlay className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-gray-900">{stats.inProgress}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <h3 className="text-gray-900 mb-4">Recent Training Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-500">{activity.date}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs ${
                    activity.status === 'completed'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {activity.status === 'completed' ? 'Completed' : 'In Progress'}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
}
