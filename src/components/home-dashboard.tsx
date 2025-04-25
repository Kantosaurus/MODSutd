import React from 'react';
import { motion } from 'framer-motion';
import { IconCalendar, IconBook, IconChartBar, IconClock } from '@tabler/icons-react';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

const StatCard = ({ title, value, icon, color }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-xl shadow-sm p-6"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        {icon}
      </div>
    </div>
  </motion.div>
);

interface RecentActivityProps {
  title: string;
  time: string;
  type: 'calendar' | 'module';
}

const RecentActivity = ({ title, time, type }: RecentActivityProps) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors"
  >
    <div className={`p-2 rounded-full ${
      type === 'calendar' ? 'bg-blue-100' : 'bg-purple-100'
    }`}>
      {type === 'calendar' ? (
        <IconCalendar className="h-5 w-5 text-blue-600" />
      ) : (
        <IconBook className="h-5 w-5 text-purple-600" />
      )}
    </div>
    <div className="flex-1">
      <p className="font-medium">{title}</p>
      <p className="text-sm text-gray-500">{time}</p>
    </div>
    <IconClock className="h-5 w-5 text-gray-400" />
  </motion.div>
);

export default function HomeDashboard() {
  // These would typically come from your backend/state management
  const stats = {
    calendars: 3,
    modulesExplored: 12,
    totalCredits: 36,
    upcomingDeadlines: 2,
  };

  const recentActivities = [
    {
      title: "Created new calendar for Term 5",
      time: "2 hours ago",
      type: "calendar" as const,
    },
    {
      title: "Explored CSD module",
      time: "Yesterday",
      type: "module" as const,
    },
    {
      title: "Updated Term 4 calendar",
      time: "2 days ago",
      type: "calendar" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
          <p className="mt-2 text-gray-600">
            Here's what's happening with your module planning
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Calendars Created"
            value={stats.calendars}
            icon={<IconCalendar className="h-6 w-6 text-blue-600" />}
            color="bg-blue-100"
          />
          <StatCard
            title="Modules Explored"
            value={stats.modulesExplored}
            icon={<IconBook className="h-6 w-6 text-purple-600" />}
            color="bg-purple-100"
          />
          <StatCard
            title="Total Credits"
            value={stats.totalCredits}
            icon={<IconChartBar className="h-6 w-6 text-green-600" />}
            color="bg-green-100"
          />
          <StatCard
            title="Upcoming Deadlines"
            value={stats.upcomingDeadlines}
            icon={<IconClock className="h-6 w-6 text-orange-600" />}
            color="bg-orange-100"
          />
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-2">
            {recentActivities.map((activity, index) => (
              <RecentActivity
                key={index}
                title={activity.title}
                time={activity.time}
                type={activity.type}
              />
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <IconCalendar className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <span className="text-sm font-medium">New Calendar</span>
              </button>
              <button className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                <IconBook className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                <span className="text-sm font-medium">Explore Modules</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 