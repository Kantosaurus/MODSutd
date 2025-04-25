import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

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

interface ModuleCardProps {
  module: Module;
}

export default function ModuleCard({ module }: ModuleCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/mod/${module.code}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg"
      onClick={handleClick}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-gray-900">{module.code}</h3>
          <span className="px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">
            {module.credits} Credits
          </span>
        </div>
        
        <h4 className="text-lg font-medium text-gray-800 mb-4">{module.title}</h4>
        
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 text-sm font-medium rounded-full bg-gray-100 text-gray-800">
            {module.courseType}
          </span>
          <span className="px-3 py-1 text-sm font-medium rounded-full bg-gray-100 text-gray-800">
            Term {module.term}
          </span>
          <span className="px-3 py-1 text-sm font-medium rounded-full bg-gray-100 text-gray-800">
            {module.pillar}
          </span>
        </div>
      </div>
    </motion.div>
  );
} 