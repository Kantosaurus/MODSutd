"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import Link from "next/link";

interface Course {
  courseNumber: string;
  courseTitle: string;
  description: string;
  learningObjectives?: string[];
  deliveryFormat?: string;
  gradingScheme?: string;
  workload?: string;
  credits?: number;
}

export default function CourseCard({ courses }: { courses: Course[] }) {
  const [active, setActive] = useState<Course | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-[200]"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active ? (
          <div className="fixed inset-y-0 right-0 flex items-center z-[201]">
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <motion.button
                key={`close-${active.courseNumber}-${id}`}
                layout
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
                className="flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full h-8 w-8 shadow-lg hover:bg-white/90 transition-colors"
                onClick={() => setActive(null)}
              >
                <CloseIcon />
              </motion.button>
              <Link href={`/mod/${active.courseNumber.toLowerCase()}`}>
                <motion.button
                  key={`play-${active.courseNumber}-${id}`}
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
                  className="flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full h-8 w-8 shadow-lg hover:bg-white/90 transition-colors"
                >
                  <PlayIcon />
                </motion.button>
              </Link>
            </div>
            <motion.div
              layoutId={`card-${active.courseNumber}-${id}`}
              ref={ref}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-[400px] h-auto bg-white/80 backdrop-blur-sm overflow-hidden shadow-xl ml-8 mr-16 rounded-2xl"
            >
              <div className="p-6">
                <motion.div>
                  <motion.h3
                    layoutId={`title-${active.courseNumber}-${id}`}
                    className="text-2xl font-bold text-neutral-800 mb-2"
                  >
                    {active.courseNumber} - {active.courseTitle}
                  </motion.h3>
                  <motion.p 
                    layoutId={`description-${active.courseNumber}-${id}`}
                    className="text-neutral-600 text-base leading-relaxed"
                  >
                    {active.description}
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <div className="flex flex-wrap gap-1">
        {courses.map((course) => (
          <motion.div
            layoutId={`card-${course.courseNumber}-${id}`}
            key={course.courseNumber}
            onClick={() => setActive(course)}
            className="text-xs px-2 py-1 bg-white/50 rounded-full cursor-pointer hover:bg-white/70 transition-colors"
          >
            {course.courseNumber} - {course.courseTitle}
          </motion.div>
        ))}
      </div>
    </>
  );
}

const PlayIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <polygon points="5 3 19 12 5 21 5 3" />
    </motion.svg>
  );
};

const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
}; 