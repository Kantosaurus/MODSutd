"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import Link from "next/link";
import { IconX, IconPlus, IconExternalLink } from "@tabler/icons-react";

interface Module {
  id: string;
  code: string;
  name: string;
  credits: number;
  pillar: string;
  availableTerms: string[];
  prerequisites: string[];
  corequisites: string[];
  overview?: string;
  description?: string;
}

interface ModuleExpandableCardProps {
  modules: Module[];
  onAddModule?: (module: Module) => void;
  showAddButton?: boolean;
  term?: string;
}

export default function ModuleExpandableCard({
  modules,
  onAddModule,
  showAddButton = true,
  term,
}: ModuleExpandableCardProps) {
  const [active, setActive] = useState<Module | null>(null);
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

  const handleAddModule = (module: Module) => {
    if (onAddModule) {
      onAddModule(module);
      setActive(null);
    }
  };

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-[110]"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active ? (
          <div className="fixed inset-0 grid place-items-center z-[120]">
            <motion.button
              key={`button-close-${active.code}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-2 right-2 items-center justify-center bg-white border-2 border-[#111110] rounded-full h-8 w-8 hover:bg-[#111110] hover:text-white transition-colors"
              onClick={() => setActive(null)}
            >
              <IconX className="h-5 w-5" />
            </motion.button>
            <motion.div
              layoutId={`card-${active.code}-${id}`}
              ref={ref}
              className="w-full max-w-[600px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white border-4 border-[#111110] sm:rounded-lg overflow-hidden"
            >
              {/* Header */}
              <div className="bg-[#111110] text-white p-6">
                <motion.div
                  layoutId={`code-${active.code}-${id}`}
                  className="text-xs font-bold uppercase tracking-[0.2em] text-[#dcbd8e] mb-2"
                >
                  {active.code}
                </motion.div>
                <motion.h3
                  layoutId={`title-${active.code}-${id}`}
                  className="text-xl font-bold uppercase tracking-wider"
                >
                  {active.name}
                </motion.h3>
                <div className="flex gap-3 mt-3 text-xs">
                  <span className="px-2 py-1 bg-white text-[#111110] font-bold rounded">
                    {active.credits} Credits
                  </span>
                  <span className="px-2 py-1 bg-[#dcbd8e] text-[#111110] font-bold rounded">
                    {active.pillar}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4 text-sm"
                >
                  {/* Overview */}
                  {active.overview && (
                    <div>
                      <h4 className="font-bold text-[#111110] uppercase tracking-wider text-xs mb-2">
                        Overview
                      </h4>
                      <p className="text-[#111110] leading-relaxed">
                        {active.overview}
                      </p>
                    </div>
                  )}

                  {/* Prerequisites */}
                  {active.prerequisites && active.prerequisites.length > 0 && (
                    <div>
                      <h4 className="font-bold text-[#111110] uppercase tracking-wider text-xs mb-2">
                        Prerequisites
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {active.prerequisites.map((prereq, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded border border-red-300"
                          >
                            {prereq}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Corequisites */}
                  {active.corequisites && active.corequisites.length > 0 && (
                    <div>
                      <h4 className="font-bold text-[#111110] uppercase tracking-wider text-xs mb-2">
                        Corequisites
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {active.corequisites.map((coreq, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded border border-yellow-300"
                          >
                            {coreq}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Available Terms */}
                  <div>
                    <h4 className="font-bold text-[#111110] uppercase tracking-wider text-xs mb-2">
                      Available Terms
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {active.availableTerms.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded border border-blue-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Footer Actions */}
              <div className="border-t-2 border-[#111110] p-4 bg-[#fcfbfa] flex gap-3">
                {showAddButton && onAddModule && (
                  <motion.button
                    layoutId={`button-add-${active.code}-${id}`}
                    onClick={() => handleAddModule(active)}
                    className="flex-1 px-4 py-3 text-sm font-bold uppercase tracking-wider bg-[#111110] text-white border-2 border-[#111110] hover:bg-[#dcbd8e] hover:border-[#dcbd8e] hover:text-[#111110] transition-all"
                  >
                    <IconPlus className="inline h-4 w-4 mr-2" />
                    Add to {term || "Plan"}
                  </motion.button>
                )}
                <Link
                  href={`/dashboard/modules/${active.code}`}
                  className="flex items-center justify-center px-4 py-3 text-sm font-bold uppercase tracking-wider bg-white text-[#111110] border-2 border-[#111110] hover:bg-[#111110] hover:text-white transition-all"
                >
                  <IconExternalLink className="h-4 w-4 mr-2" />
                  View Details
                </Link>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      {/* Module Cards List */}
      <div className="w-full space-y-2">
        {modules.map((module) => (
          <motion.div
            layoutId={`card-${module.code}-${id}`}
            key={`card-${module.code}-${id}`}
            onClick={() => setActive(module)}
            className="p-3 flex justify-between items-center bg-white border-2 border-[#111110] hover:bg-[#fcfbfa] hover:border-[#dcbd8e] rounded cursor-pointer transition-all group"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <motion.h3
                  layoutId={`code-${module.code}-${id}`}
                  className="font-bold text-[#111110] text-xs uppercase tracking-[0.15em]"
                >
                  {module.code}
                </motion.h3>
                <span className="px-1.5 py-0.5 bg-[#111110] text-white text-[9px] font-bold rounded">
                  {module.credits}CR
                </span>
              </div>
              <motion.p
                layoutId={`title-${module.code}-${id}`}
                className="text-xs text-[#111110] mt-1 truncate"
              >
                {module.name}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
