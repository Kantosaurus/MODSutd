'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ModuleFilter from '@/components/modules/module-filter';
import ModuleCard from '@/components/modules/module-card';
import { modules } from '@/data/modules';
import Navigation from '@/components/navigation';

export default function ModulesPage() {
  const [filters, setFilters] = useState({
    courseType: 'all',
    term: 'all',
    pillar: 'all'
  });
  const [searchQuery, setSearchQuery] = useState('');

  const filteredModules = modules.filter(module => {
    // Search filter
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = searchQuery === '' || 
      module.code.toLowerCase().includes(searchLower) ||
      module.title.toLowerCase().includes(searchLower);

    // Other filters
    if (!matchesSearch) return false;
    if (filters.courseType !== 'all' && module.courseType !== filters.courseType) return false;
    if (filters.term !== 'all' && module.term !== parseInt(filters.term)) return false;
    if (filters.pillar !== 'all' && module.pillar !== filters.pillar) return false;
    return true;
  });

  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Modules</h1>
          
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by course number or title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 text-lg text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <ModuleFilter 
            filters={filters}
            onFilterChange={setFilters}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <AnimatePresence mode="popLayout">
              {filteredModules.map((module, index) => (
                <motion.div
                  key={module.code}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                      delay: index * 0.05
                    }
                  }}
                  exit={{ 
                    opacity: 0, 
                    scale: 0.9,
                    transition: {
                      duration: 0.2
                    }
                  }}
                  layout
                >
                  <ModuleCard module={module} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </main>
  );
} 