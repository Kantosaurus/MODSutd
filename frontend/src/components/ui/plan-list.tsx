"use client";

import { motion } from "framer-motion";
import { IconPlus, IconTrash, IconEdit, IconCalendar } from "@tabler/icons-react";

interface SavedPlan {
  id: string;
  name: string;
  pillar: string;
  specialisation: string;
  minors: string[];
  createdAt: string;
  updatedAt: string;
  moduleCount: number;
  totalCredits: number;
}

interface PlanListProps {
  plans: SavedPlan[];
  onSelectPlan: (planId: string) => void;
  onCreateNew: () => void;
  onDeletePlan: (planId: string) => void;
}

export default function PlanList({ plans, onSelectPlan, onCreateNew, onDeletePlan }: PlanListProps) {
  const handleDelete = (e: React.MouseEvent, planId: string) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this plan? This action cannot be undone.")) {
      onDeletePlan(planId);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfbfa] p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-5xl font-black text-[#111110] uppercase tracking-[0.2em] mb-4">
            My Plans
          </h1>
          <p className="text-[#111110] opacity-70 text-lg">
            Select a plan to continue or create a new one
          </p>
        </motion.div>

        {/* Create New Plan Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onClick={onCreateNew}
          className="w-full mb-8 p-8 border-4 border-dashed border-[#111110] bg-white hover:bg-[#dcbd8e] hover:border-[#dcbd8e] transition-all group"
        >
          <div className="flex items-center justify-center gap-4">
            <IconPlus className="h-8 w-8 text-[#111110]" />
            <span className="text-2xl font-bold text-[#111110] uppercase tracking-[0.15em]">
              Create New Plan
            </span>
          </div>
        </motion.button>

        {/* Plans Grid */}
        {plans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                onClick={() => onSelectPlan(plan.id)}
                className="bg-white border-4 border-[#111110] p-6 hover:bg-[#fcfbfa] hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden"
              >
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#dcbd8e] transform translate-x-8 -translate-y-8 rotate-45 group-hover:translate-x-6 group-hover:-translate-y-6 transition-transform"></div>

                {/* Plan Info */}
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#111110] uppercase tracking-[0.1em] mb-2 truncate">
                        {plan.name}
                      </h3>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="px-2 py-1 bg-[#111110] text-white font-bold uppercase rounded">
                          {plan.pillar}
                        </span>
                        {plan.specialisation && (
                          <span className="px-2 py-1 bg-[#dcbd8e] text-[#111110] font-bold uppercase rounded">
                            {plan.specialisation}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-[#111110] opacity-70 font-semibold">Modules:</span>
                      <span className="text-[#111110] font-bold">{plan.moduleCount}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-[#111110] opacity-70 font-semibold">Credits:</span>
                      <span className="text-[#111110] font-bold">{plan.totalCredits}</span>
                    </div>
                  </div>

                  {/* Minors */}
                  {plan.minors && plan.minors.length > 0 && (
                    <div className="mb-4 pb-4 border-b-2 border-[#111110]">
                      <span className="text-xs text-[#111110] opacity-70 font-semibold uppercase tracking-wider">
                        Minors: {plan.minors.join(', ')}
                      </span>
                    </div>
                  )}

                  {/* Dates */}
                  <div className="flex items-center gap-2 text-xs text-[#111110] opacity-60 mb-4">
                    <IconCalendar className="h-3 w-3" />
                    <span>Updated {new Date(plan.updatedAt).toLocaleDateString()}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectPlan(plan.id);
                      }}
                      className="flex-1 px-4 py-2 bg-[#111110] text-white font-bold uppercase text-xs tracking-wider hover:bg-[#dcbd8e] hover:text-[#111110] transition-all"
                    >
                      <IconEdit className="inline h-3 w-3 mr-2" />
                      Open
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, plan.id)}
                      className="px-4 py-2 border-2 border-[#111110] text-[#111110] font-bold uppercase text-xs tracking-wider hover:bg-red-600 hover:border-red-600 hover:text-white transition-all"
                    >
                      <IconTrash className="inline h-3 w-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center py-16 bg-white border-4 border-[#111110]"
          >
            <p className="text-[#111110] font-bold uppercase tracking-wider text-lg mb-2">
              No Plans Yet
            </p>
            <p className="text-[#111110] opacity-70 mb-6">
              Create your first module plan to get started
            </p>
            <button
              onClick={onCreateNew}
              className="px-6 py-3 bg-[#111110] text-white font-bold uppercase tracking-wider hover:bg-[#dcbd8e] hover:text-[#111110] border-2 border-[#111110] transition-all"
            >
              <IconPlus className="inline h-4 w-4 mr-2" />
              Create Your First Plan
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
