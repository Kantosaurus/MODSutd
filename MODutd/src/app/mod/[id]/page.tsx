"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FloatingDock } from '@/components/ui/floating-dock';
import { IconHome, IconCalendar, IconBook, IconUser } from '@tabler/icons-react';

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

  const navItems = [
    {
      title: "Home",
      icon: <IconHome className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />,
      href: "/",
    },
    {
      title: "Calendar",
      icon: <IconCalendar className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />,
      href: "/calendar",
    },
    {
      title: "Modules",
      icon: <IconBook className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />,
      href: "/modules",
    },
    {
      title: "Profile",
      icon: <IconUser className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />,
      href: "/profile",
    },
  ];

  useEffect(() => {
    fetch('/sample responses/sample-courses.json')
      .then(response => response.json())
      .then(data => {
        const foundCourse = data.courses.find(
          (c: Course) => c.courseNumber.toLowerCase() === params.id.toLowerCase()
        );
        setCourse(foundCourse || null);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching course:', error);
        setLoading(false);
      });
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#001B3D]">
        <div className="animate-spin rounded-none h-12 w-12 border-4 border-white"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#001B3D] text-white">
        <div className="text-center border-4 border-white p-8">
          <h1 className="text-4xl font-mono mb-4">404</h1>
          <p className="font-mono">MODULE_NOT_FOUND</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-white"
      >
        {/* Header Section */}
        <div className="relative h-[40vh] bg-[#001B3D] text-white overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center z-10"
            >
              <h1 className="text-6xl font-black mb-4">{course.courseTitle}</h1>
              <div className="flex items-center justify-center gap-4">
                {course.credits && (
                  <div className="border-2 border-white px-4 py-1">
                    <p className="font-mono">{course.credits} CREDITS</p>
                  </div>
                )}
                {course.workload && (
                  <div className="border-2 border-white px-4 py-1">
                    <p className="font-mono">{course.workload}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
          <div className="absolute bottom-0 w-full p-8 bg-gradient-to-t from-[#001B3D] to-transparent">
            <h2 className="text-2xl font-mono">{course.courseNumber}</h2>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-6xl mx-auto p-8">
          {/* Description */}
          <div className="mb-16">
            <div className="border-l-8 border-[#001B3D] pl-8">
              <p className="text-xl leading-relaxed">{course.description}</p>
            </div>
          </div>

          {/* Learning Objectives */}
          {course.learningObjectives && course.learningObjectives.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl font-black mb-8 font-mono">LEARNING_OBJECTIVES</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {course.learningObjectives.map((objective, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-[#001B3D] text-white p-6 hover:translate-x-2 transition-transform"
                  >
                    <span className="font-mono text-sm opacity-50">0{index + 1}</span>
                    <p className="mt-2">{objective}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Course Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {course.deliveryFormat && (
              <div className="border-4 border-[#001B3D] p-8">
                <h3 className="font-mono text-lg mb-4">DELIVERY_FORMAT</h3>
                <p>{course.deliveryFormat}</p>
              </div>
            )}
            {course.gradingScheme && (
              <div className="border-4 border-[#001B3D] p-8">
                <h3 className="font-mono text-lg mb-4">GRADING_SCHEME</h3>
                <p>{course.gradingScheme}</p>
              </div>
            )}
          </div>

          {/* Tags */}
          {course.tags && course.tags.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {course.tags.map((tag, index) => (
                <div
                  key={index}
                  className="bg-[#001B3D] text-white px-4 py-2 font-mono text-sm hover:translate-y-[-2px] transition-transform"
                >
                  {tag}
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
      <FloatingDock
        items={navItems}
        desktopClassName="fixed bottom-4 left-1/2 -translate-x-1/2"
        mobileClassName="fixed bottom-4 right-4"
      />
    </>
  );
} 