'use client'

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IconEdit, IconTrash, IconPlus } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/navigation';

interface Module {
  code: string;
  title: string;
  description: string;
  courseType: string;
  term: number;
  pillar: string;
  credits: number;
  learningObjectives?: string[];
  deliveryFormat?: string;
  gradingScheme?: string;
  workload?: string;
  imageUrl?: string | null;
}

interface ModPlan {
  id: string;
  name: string;
  pillar: string;
  track: string;
  minors: string[];
  modules: Module[];
  createdAt: string;
  updatedAt: string;
}

export default function ProgressPage() {
  const [plans, setPlans] = useState<ModPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // TODO: Fetch user's mod plans from the backend
    // For now, using mock data
    const mockPlans: ModPlan[] = [
      {
        id: '1',
        name: 'My CSD Plan',
        pillar: 'CSD',
        track: 'Full Stack Development',
        minors: ['Business'],
        modules: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
    setPlans(mockPlans);
    setIsLoading(false);
  }, []);

  const handleEditPlan = (planId: string) => {
    router.push(`/new-plan?edit=${planId}`);
  };

  const handleDeletePlan = async (planId: string) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      // TODO: Implement delete functionality
      setPlans(plans.filter(plan => plan.id !== planId));
    }
  };

  const handleCreateNewPlan = () => {
    router.push('/new-plan');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Mod Plans</h1>
          <button
            onClick={handleCreateNewPlan}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <IconPlus className="h-5 w-5 mr-2" />
            Create New Plan
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{plan.name}</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {plan.pillar} • {plan.track}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditPlan(plan.id)}
                    className="p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    <IconEdit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeletePlan(plan.id)}
                    className="p-2 text-gray-600 hover:text-red-600 transition-colors duration-200"
                  >
                    <IconTrash className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Minors</h3>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {plan.minors.map((minor) => (
                      <span
                        key={minor}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {minor}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700">Modules</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    {plan.modules.length} modules selected
                  </p>
                </div>

                <div className="text-sm text-gray-500">
                  Last updated: {new Date(plan.updatedAt).toLocaleDateString()}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {plans.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">You haven't created any mod plans yet.</p>
            <button
              onClick={handleCreateNewPlan}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <IconPlus className="h-5 w-5 mr-2" />
              Create Your First Plan
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 