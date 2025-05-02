"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/navigation';

interface Course {
  _id: string;
  courseNumber: string;
  courseTitle: string;
  description: string;
  learningObjectives?: string[];
  deliveryFormat?: string;
  gradingScheme?: string;
  workload?: string;
  credits?: number;
  tags?: string[];
  imageUrl?: string;
}

export default function ModulePage({ params }: { params: { id: string } }) {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`/api/courses/${params.id}`);
        if (!response.ok) throw new Error('Failed to fetch course');
        const data = await response.json();
        setCourse(data);
      } catch (error) {
        console.error('Error fetching course:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [params.id]);

  if (loading) {
    return (
      <main className="min-h-screen">
        <Navigation />
        <div className="pl-64 p-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </main>
    );
  }

  if (!course) {
    return (
      <main className="min-h-screen">
        <Navigation />
        <div className="pl-64 p-8">
          <h1 className="text-2xl font-bold text-red-600">Course not found</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pl-64 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold mb-2 text-neutral-900 dark:text-white">
              {course.courseNumber}: {course.courseTitle}
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
              {course.description}
            </p>

            {course.credits && (
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-white">Credits</h2>
                <p className="text-neutral-600 dark:text-neutral-400">{course.credits} credits</p>
              </div>
            )}

            {course.learningObjectives && course.learningObjectives.length > 0 && (
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-white">Learning Objectives</h2>
                <ul className="list-disc list-inside text-neutral-600 dark:text-neutral-400">
                  {course.learningObjectives.map((objective, index) => (
                    <li key={index}>{objective}</li>
                  ))}
                </ul>
              </div>
            )}

            {course.deliveryFormat && (
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-white">Delivery Format</h2>
                <p className="text-neutral-600 dark:text-neutral-400">{course.deliveryFormat}</p>
              </div>
            )}

            {course.gradingScheme && (
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-white">Grading Scheme</h2>
                <p className="text-neutral-600 dark:text-neutral-400">{course.gradingScheme}</p>
              </div>
            )}

            {course.workload && (
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-white">Workload</h2>
                <p className="text-neutral-600 dark:text-neutral-400">{course.workload}</p>
              </div>
            )}

            {course.tags && course.tags.length > 0 && (
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-white">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {course.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </main>
  );
} 