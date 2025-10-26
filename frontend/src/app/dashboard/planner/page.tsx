'use client';

import { useState } from 'react';
import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui/sidebar';
import {
  IconHome,
  IconBook,
  IconCalendar,
  IconChartBar,
  IconUser,
  IconSettings,
  IconLogout,
  IconPlus,
  IconX,
  IconTrash,
  IconDeviceFloppy,
  IconFileDownload,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// Sample module data with term availability and prerequisites
const AVAILABLE_MODULES = [
  {
    id: 1,
    code: '50.001',
    name: 'Information Systems & Programming',
    pillar: 'ISTD',
    credits: 4,
    availableTerms: ['Term 1'],
    prerequisites: [],
    corequisites: []
  },
  {
    id: 2,
    code: '50.002',
    name: 'Computation Structures',
    pillar: 'ISTD',
    credits: 4,
    availableTerms: ['Term 2'],
    prerequisites: ['50.001'],
    corequisites: []
  },
  {
    id: 3,
    code: '50.003',
    name: 'Elements of Software Construction',
    pillar: 'ISTD',
    credits: 4,
    availableTerms: ['Term 3'],
    prerequisites: ['50.001'],
    corequisites: []
  },
  {
    id: 4,
    code: '50.004',
    name: 'Introduction to Algorithms',
    pillar: 'ISTD',
    credits: 4,
    availableTerms: ['Term 4', 'Term 5'],
    prerequisites: ['50.001'],
    corequisites: []
  },
  {
    id: 5,
    code: '50.005',
    name: 'Computer System Engineering',
    pillar: 'ISTD',
    credits: 4,
    availableTerms: ['Term 5', 'Term 6'],
    prerequisites: ['50.002'],
    corequisites: []
  },
  {
    id: 6,
    code: '50.034',
    name: 'Introduction to Probability and Statistics',
    pillar: 'ISTD',
    credits: 4,
    availableTerms: ['Term 3', 'Term 4'],
    prerequisites: [],
    corequisites: []
  },
  {
    id: 7,
    code: '50.042',
    name: 'Foundations of Cybersecurity',
    pillar: 'ISTD',
    credits: 4,
    availableTerms: ['Term 6', 'Term 7'],
    prerequisites: ['50.005'],
    corequisites: []
  },
  {
    id: 8,
    code: '50.043',
    name: 'Database and Big Data Systems',
    pillar: 'ISTD',
    credits: 4,
    availableTerms: ['Term 5', 'Term 6'],
    prerequisites: ['50.004'],
    corequisites: []
  },
  {
    id: 9,
    code: '50.012',
    name: 'Networks',
    pillar: 'ISTD',
    credits: 4,
    availableTerms: ['Term 4', 'Term 5', 'Term 6'],
    prerequisites: ['50.002'],
    corequisites: []
  },
  {
    id: 10,
    code: '50.021',
    name: 'Artificial Intelligence',
    pillar: 'ISTD',
    credits: 4,
    availableTerms: ['Term 6', 'Term 7', 'Term 8'],
    prerequisites: ['50.004', '50.034'],
    corequisites: []
  },
];

interface PlannedModule {
  id: number;
  code: string;
  name: string;
  credits: number;
}

interface TermPlan {
  modules: PlannedModule[];
}

const TERMS = ['Term 1', 'Term 2', 'Term 3', 'Term 4', 'Term 5', 'Term 6', 'Term 7', 'Term 8'];

interface TermBox {
  name: string;
  subtitle?: string;
  year: string;
  color: string;
  striped?: boolean;
  isEmpty?: boolean;
}

const SCHEDULE_GRID: (TermBox | null)[][] = [
  // Row 1 - Term 1 (starts in Sep)
  [
    null,
    null,
    null,
    { name: 'Term 1', subtitle: 'Freshmore', year: 'Year 1', color: 'bg-gradient-to-br from-rose-50 to-pink-50', striped: false },
  ],
  // Row 2 - Rest of Year 1
  [
    { name: 'IAP/ UPOP*', year: '', color: 'bg-gradient-to-br from-amber-50 to-yellow-50', striped: true },
    { name: 'Term 2', subtitle: 'Freshmore', year: 'Year 1', color: 'bg-gradient-to-br from-rose-50 to-pink-50', striped: false },
    { name: 'Term 3', subtitle: 'Freshmore', year: 'Year 2', color: 'bg-gradient-to-br from-cyan-50 to-sky-50', striped: false },
    { name: 'Vacation', year: 'Year 2', color: 'bg-gradient-to-br from-violet-50 to-purple-50', striped: true },
  ],
  // Row 3 - Year 2
  [
    { name: 'IAP*', year: '', color: 'bg-gradient-to-br from-sky-50 to-cyan-50', striped: true },
    { name: 'Term 4', subtitle: 'Sophomore', year: 'Year 2', color: 'bg-gradient-to-br from-cyan-50 to-sky-50', striped: false },
    { name: 'Term 5', subtitle: 'Junior', year: 'Year 3', color: 'bg-gradient-to-br from-orange-50 to-amber-50', striped: false },
    { name: 'Vacation/ Internship/ Global Exchange Programme (GEXP)*', year: 'Year 3', color: 'bg-gradient-to-br from-orange-50 to-amber-50', striped: true },
  ],
  // Row 4 - Year 3
  [
    { name: 'IAP*', year: '', color: 'bg-gradient-to-br from-amber-50 to-orange-50', striped: true },
    { name: 'Term 6', subtitle: 'Junior, Internship/ GEXP* / Local exchange#', year: 'Year 3', color: 'bg-gradient-to-br from-orange-50 to-amber-50', striped: false },
    { name: 'Vacation/ Internship/ Summer programme/ UPOP*', year: 'Year 4', color: 'bg-gradient-to-br from-purple-50 to-violet-50', striped: true },
    { name: 'Term 7', subtitle: 'Senior, Capstone', year: 'Year 4', color: 'bg-gradient-to-br from-violet-50 to-purple-50', striped: false },
  ],
  // Row 5 - Year 4
  [
    { name: 'IAP*', year: '', color: 'bg-gradient-to-br from-purple-50 to-indigo-50', striped: true },
    { name: 'Term 8', subtitle: 'Senior, Capstone', year: 'Year 4', color: 'bg-gradient-to-br from-violet-50 to-purple-50', striped: false },
    { name: 'M.Arch structured internship', year: 'M.Arch', color: 'bg-gradient-to-br from-emerald-50 to-teal-50', striped: true },
    { name: 'Term 9', subtitle: 'Master of Architecture (M.Arch)', year: 'M.Arch', color: 'bg-gradient-to-br from-teal-50 to-emerald-50', striped: false },
  ],
  // Row 6 - M.Arch
  [
    null,
    { name: 'Term 10', subtitle: 'Master of Architecture (M.Arch)', year: 'M.Arch', color: 'bg-gradient-to-br from-teal-50 to-emerald-50', striped: false },
    null,
    null,
  ],
];

const getYearBadgeColor = (year: string) => {
  switch (year) {
    case 'Year 1':
      return 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-pink-500/30';
    case 'Year 2':
      return 'bg-gradient-to-r from-cyan-500 to-sky-500 text-white shadow-lg shadow-cyan-500/30';
    case 'Year 3':
      return 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30';
    case 'Year 4':
      return 'bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg shadow-violet-500/30';
    case 'M.Arch':
      return 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg shadow-teal-500/30';
    default:
      return 'bg-gradient-to-r from-gray-500 to-slate-500 text-white';
  }
};

interface PlanConfig {
  name: string;
  pillar: string;
  specialisation: string;
  minors: string[];
}

const PILLARS = ['ISTD', 'EPD', 'ESD', 'ASD'];
const SPECIALISATIONS: Record<string, string[]> = {
  'ISTD': [
    'Artificial Intelligence',
    'Data Analytics',
    'Financial Technology',
    'IOT and Intelligent Systems',
    'Security',
    'Software Engineering',
    'Visual Analytics and Computing'
  ],
  'EPD': ['Product Development', 'Healthcare Design', 'Smart Cities'],
  'ESD': ['Supply Chain Management', 'Aviation', 'Finance'],
  'ASD': ['Sustainable Design', 'Urban Design', 'Advanced Architecture'],
};
const MINORS = ['Digital Humanities', 'Entrepreneurship', 'Computer Science', 'Design', 'Science, Technology and Society'];

export default function PlannerPage() {
  const [open, setOpen] = useState(false);
  const [setupComplete, setSetupComplete] = useState(false);
  const [planConfig, setPlanConfig] = useState<PlanConfig | null>(null);
  const [termPlans, setTermPlans] = useState<Record<string, TermPlan>>({
    'Term 1': { modules: [] },
    'Term 2': { modules: [] },
    'Term 3': { modules: [] },
    'Term 4': { modules: [] },
    'Term 5': { modules: [] },
    'Term 6': { modules: [] },
    'Term 7': { modules: [] },
    'Term 8': { modules: [] },
  });
  const [showModuleSelector, setShowModuleSelector] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const links = [
    {
      label: 'Overview',
      href: '/dashboard',
      icon: <IconHome className="h-5 w-5 shrink-0 text-[#111110]" />,
    },
    {
      label: 'Modules',
      href: '/dashboard/modules',
      icon: <IconBook className="h-5 w-5 shrink-0 text-[#111110]" />,
    },
    {
      label: 'Planner',
      href: '/dashboard/planner',
      icon: <IconCalendar className="h-5 w-5 shrink-0 text-[#111110]" />,
    },
    {
      label: 'Schedule',
      href: '/dashboard/schedule',
      icon: <IconCalendar className="h-5 w-5 shrink-0 text-[#111110]" />,
    },
    {
      label: 'Analytics',
      href: '/dashboard/analytics',
      icon: <IconChartBar className="h-5 w-5 shrink-0 text-[#111110]" />,
    },
    {
      label: 'Profile',
      href: '/dashboard/profile',
      icon: <IconUser className="h-5 w-5 shrink-0 text-[#111110]" />,
    },
    {
      label: 'Settings',
      href: '/dashboard/settings',
      icon: <IconSettings className="h-5 w-5 shrink-0 text-[#111110]" />,
    },
  ];

  const addModuleToTerm = (term: string, module: PlannedModule) => {
    // Check if module is already in this term
    if (termPlans[term].modules.some((m) => m.id === module.id)) {
      return;
    }

    setTermPlans({
      ...termPlans,
      [term]: {
        modules: [...termPlans[term].modules, module],
      },
    });
  };

  const removeModuleFromTerm = (term: string, moduleId: number) => {
    setTermPlans({
      ...termPlans,
      [term]: {
        modules: termPlans[term].modules.filter((m) => m.id !== moduleId),
      },
    });
  };

  const openModuleSelector = (term: string) => {
    setSelectedTerm(term);
    setShowModuleSelector(true);
    setSearchQuery('');
  };

  const closeModuleSelector = () => {
    setShowModuleSelector(false);
    setSelectedTerm(null);
    setSearchQuery('');
  };

  const getTermCredits = (term: string) => {
    return termPlans[term].modules.reduce((sum, module) => sum + module.credits, 0);
  };

  const getTotalCredits = () => {
    return Object.values(termPlans).reduce(
      (sum, plan) => sum + plan.modules.reduce((s, m) => s + m.credits, 0),
      0
    );
  };

  const getAllPlannedModuleIds = () => {
    const ids = new Set<number>();
    Object.values(termPlans).forEach((plan) => {
      plan.modules.forEach((m) => ids.add(m.id));
    });
    return ids;
  };

  const getAllPlannedModuleCodes = () => {
    const codes = new Set<string>();
    Object.values(termPlans).forEach((plan) => {
      plan.modules.forEach((m) => codes.add(m.code));
    });
    return codes;
  };

  const getCompletedModulesBeforeTerm = (term: string) => {
    const termIndex = TERMS.indexOf(term);
    const codes = new Set<string>();

    for (let i = 0; i < termIndex; i++) {
      const t = TERMS[i];
      termPlans[t].modules.forEach((m) => codes.add(m.code));
    }

    return codes;
  };

  const checkPrerequisites = (module: typeof AVAILABLE_MODULES[0], term: string) => {
    const completedCodes = getCompletedModulesBeforeTerm(term);
    const unmetPrereqs = module.prerequisites.filter(prereq => !completedCodes.has(prereq));
    return {
      met: unmetPrereqs.length === 0,
      unmetPrereqs
    };
  };

  const checkCorequisites = (module: typeof AVAILABLE_MODULES[0], term: string) => {
    const completedCodes = getCompletedModulesBeforeTerm(term);
    const currentTermCodes = new Set(termPlans[term].modules.map(m => m.code));

    const unmetCoreqs = module.corequisites.filter(
      coreq => !completedCodes.has(coreq) && !currentTermCodes.has(coreq)
    );

    return {
      met: unmetCoreqs.length === 0,
      unmetCoreqs
    };
  };

  const handleSetupSubmit = (config: PlanConfig) => {
    setPlanConfig(config);
    setSetupComplete(true);
  };

  const filteredModules = selectedTerm ? AVAILABLE_MODULES.filter((module) => {
    const matchesSearch =
      module.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.name.toLowerCase().includes(searchQuery.toLowerCase());
    const isAvailableInTerm = module.availableTerms.includes(selectedTerm);
    return matchesSearch && isAvailableInTerm;
  }) : [];

  const plannedModuleIds = getAllPlannedModuleIds();

  // Show setup form if not completed
  if (!setupComplete) {
    return (
      <div className="flex h-screen w-full overflow-hidden bg-[#fcfbfa]">
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10 bg-white border-r-2 border-[#111110]">
            <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
              {open ? <Logo /> : <LogoIcon />}
              <div className="mt-12 flex flex-col gap-3">
                {links.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </div>
            </div>
            <div className="border-t-2 border-[#111110] pt-4">
              <SidebarLink
                link={{
                  label: 'Logout',
                  href: '/',
                  icon: <IconLogout className="h-5 w-5 shrink-0 text-[#111110]" />,
                }}
              />
            </div>
          </SidebarBody>
        </Sidebar>
        <SetupForm onSubmit={handleSetupSubmit} />
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#fcfbfa]">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10 bg-white border-r-2 border-[#111110]">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-12 flex flex-col gap-3">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div className="border-t-2 border-[#111110] pt-4">
            <SidebarLink
              link={{
                label: 'Logout',
                href: '/',
                icon: <IconLogout className="h-5 w-5 shrink-0 text-[#111110]" />,
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>

      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="border-b-2 border-[#111110] bg-white px-8 py-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-[#111110] uppercase tracking-[0.1em]">
                {planConfig?.name || 'Module Planner'}
              </h1>
              <p className="text-[#111110] opacity-70 mt-2">
                Plan your modules across terms
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-[#111110] uppercase tracking-[0.15em]">
                Total Credits
              </p>
              <p className="text-3xl font-bold text-[#111110]">{getTotalCredits()}</p>
            </div>
          </div>

          {/* Plan Details */}
          {planConfig && (
            <div className="flex flex-wrap gap-2 pt-4 border-t border-[#111110]">
              <span className="px-3 py-1 bg-[#111110] text-white text-xs font-bold uppercase tracking-wider">
                {planConfig.pillar}
              </span>
              <span className="px-3 py-1 border-2 border-[#111110] text-[#111110] text-xs font-bold uppercase tracking-wider">
                {planConfig.specialisation}
              </span>
              {planConfig.minors.map((minor) => (
                <span
                  key={minor}
                  className="px-3 py-1 bg-[#dcbd8e] text-[#111110] text-xs font-bold uppercase tracking-wider"
                >
                  Minor: {minor}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="p-8">
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-6">
            <button className="bg-[#111110] hover:bg-[#dcbd8e] hover:text-[#111110] text-white px-6 py-3 font-bold transition-all duration-200 uppercase tracking-[0.1em] text-xs border-2 border-[#111110] flex items-center gap-2">
              <IconDeviceFloppy className="h-4 w-4" />
              Save Plan
            </button>
            <button className="bg-transparent text-[#111110] px-6 py-3 font-bold border-2 border-[#111110] hover:bg-[#111110] hover:text-white transition-all duration-200 uppercase tracking-[0.1em] text-xs flex items-center gap-2">
              <IconFileDownload className="h-4 w-4" />
              Export PDF
            </button>
            <Link
              href="/dashboard/modules"
              className="bg-transparent text-[#111110] px-6 py-3 font-bold border-2 border-[#111110] hover:bg-[#111110] hover:text-white transition-all duration-200 uppercase tracking-[0.1em] text-xs flex items-center gap-2"
            >
              <IconBook className="h-4 w-4" />
              Browse Modules
            </Link>
          </div>

          {/* Legend */}
          <div className="bg-white border-2 border-[#111110] p-4 mb-8">
            <p className="text-sm text-[#111110] font-semibold">
              <span className="font-bold uppercase tracking-wider">Note:</span> Click on any term box (Term 1-8) in the calendar below to add or manage modules for that term.
            </p>
          </div>

          {/* Academic Calendar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100"
          >
            {/* Column Headers */}
            <div className="grid grid-cols-4 bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800">
              <motion.div
                whileHover={{ backgroundColor: 'rgba(71, 85, 105, 0.3)' }}
                transition={{ duration: 0.2 }}
                className="p-6 border-r border-slate-700"
              >
                <p className="font-semibold text-white text-sm tracking-wide">Before Term Starts</p>
                <p className="text-xs mt-1.5 text-slate-300">Jan</p>
              </motion.div>
              <motion.div
                whileHover={{ backgroundColor: 'rgba(71, 85, 105, 0.3)' }}
                transition={{ duration: 0.2 }}
                className="p-6 border-r border-slate-700"
              >
                <p className="font-semibold text-white text-sm tracking-wide">Trimester 1</p>
                <p className="text-xs mt-1.5 text-slate-300">Jan – Apr</p>
              </motion.div>
              <motion.div
                whileHover={{ backgroundColor: 'rgba(71, 85, 105, 0.3)' }}
                transition={{ duration: 0.2 }}
                className="p-6 border-r border-slate-700"
              >
                <p className="font-semibold text-white text-sm tracking-wide">Trimester 2</p>
                <p className="text-xs mt-1.5 text-slate-300">May – Aug</p>
              </motion.div>
              <motion.div
                whileHover={{ backgroundColor: 'rgba(71, 85, 105, 0.3)' }}
                transition={{ duration: 0.2 }}
                className="p-6"
              >
                <p className="font-semibold text-white text-sm tracking-wide">Trimester 3</p>
                <p className="text-xs mt-1.5 text-slate-300">Sep – Dec</p>
              </motion.div>
            </div>

            {/* Grid Rows */}
            {SCHEDULE_GRID.map((row, rowIdx) => (
              <motion.div
                key={rowIdx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: rowIdx * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="grid grid-cols-4 border-b border-gray-100 last:border-0"
              >
                {row.map((cell, cellIdx) => {
                  const isPlannableTerm = cell?.name.startsWith('Term') && termPlans[cell.name];
                  return (
                    <TermCalendarBox
                      key={`${rowIdx}-${cellIdx}`}
                      term={cell}
                      isLast={cellIdx === 3}
                      onTermClick={isPlannableTerm ? () => openModuleSelector(cell.name) : undefined}
                      moduleCount={isPlannableTerm ? termPlans[cell.name].modules.length : 0}
                      credits={isPlannableTerm ? getTermCredits(cell.name) : 0}
                    />
                  );
                })}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Module Selector Side Panel */}
      {showModuleSelector && selectedTerm && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.3 }}
            onClick={closeModuleSelector}
            className="fixed inset-0 bg-[#111110] bg-opacity-40 z-40"
            style={{ backdropFilter: 'blur(8px)' }}
          />

          {/* Side Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full md:w-[600px] lg:w-[700px] bg-white border-l-4 border-[#111110] z-50 flex flex-col shadow-2xl"
          >
            {/* Panel Header */}
            <div className="border-b-2 border-[#111110] p-6 bg-[#fcfbfa]">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-[#111110] uppercase tracking-[0.1em]">
                    {selectedTerm}
                  </h2>
                  <p className="text-sm text-[#111110] opacity-70 mt-1">
                    Available Modules
                  </p>
                </div>
                <button
                  onClick={closeModuleSelector}
                  className="text-[#111110] hover:bg-[#111110] hover:text-white transition-all p-2 border-2 border-[#111110]"
                >
                  <IconX className="h-5 w-5" />
                </button>
              </div>

              {/* Search */}
              <input
                type="text"
                placeholder="SEARCH MODULES..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border-2 border-[#111110] focus:outline-none focus:border-[#dcbd8e] bg-white text-[#111110] uppercase tracking-wider text-sm font-semibold placeholder:text-[#111110] placeholder:opacity-50"
              />
            </div>

            {/* Currently Planned Modules */}
            {termPlans[selectedTerm].modules.length > 0 && (
              <div className="p-6 border-b-2 border-[#111110] bg-[#fcfbfa]">
                <h3 className="text-sm font-bold text-[#111110] uppercase tracking-[0.15em] mb-3 flex items-center gap-2">
                  <span>Current Modules</span>
                  <span className="px-2 py-1 bg-[#111110] text-white text-xs rounded-full">
                    {termPlans[selectedTerm].modules.length}
                  </span>
                </h3>
                <div className="space-y-2">
                  {termPlans[selectedTerm].modules.map((module) => (
                    <div
                      key={module.id}
                      className="border-2 border-[#111110] p-3 bg-white group hover:bg-[#fcfbfa] transition-colors flex justify-between items-center"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-[#111110] uppercase tracking-[0.15em]">
                          {module.code}
                        </p>
                        <p className="text-xs text-[#111110] mt-1 truncate">{module.name}</p>
                      </div>
                      <button
                        onClick={() => removeModuleFromTerm(selectedTerm, module.id)}
                        className="ml-3 text-[#111110] hover:text-red-600 transition-colors"
                      >
                        <IconTrash className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Module List */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-3">
                {filteredModules.map((module) => {
                  const isInCurrentTerm = termPlans[selectedTerm].modules.some(
                    (m) => m.id === module.id
                  );
                  const prereqCheck = checkPrerequisites(module, selectedTerm);
                  const coreqCheck = checkCorequisites(module, selectedTerm);
                  const canAdd = prereqCheck.met && coreqCheck.met && !isInCurrentTerm;

                  return (
                    <div
                      key={module.id}
                      className={cn(
                        'border-2 border-[#111110] p-4 transition-all',
                        isInCurrentTerm
                          ? 'bg-[#dcbd8e] opacity-60'
                          : canAdd
                          ? 'bg-white hover:bg-[#fcfbfa] cursor-pointer hover:shadow-md'
                          : 'bg-gray-100 opacity-75'
                      )}
                      onClick={() => {
                        if (canAdd) {
                          addModuleToTerm(selectedTerm, {
                            id: module.id,
                            code: module.code,
                            name: module.name,
                            credits: module.credits,
                          });
                        }
                      }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-sm font-bold text-[#111110] uppercase tracking-[0.15em]">
                              {module.code}
                            </p>
                            {isInCurrentTerm && (
                              <span className="px-2 py-0.5 bg-[#111110] text-white text-xs font-bold uppercase">
                                Added
                              </span>
                            )}
                            {!prereqCheck.met && (
                              <span className="px-2 py-0.5 bg-red-600 text-white text-xs font-bold uppercase">
                                Prerequisites Missing
                              </span>
                            )}
                            {prereqCheck.met && !coreqCheck.met && (
                              <span className="px-2 py-0.5 bg-orange-600 text-white text-xs font-bold uppercase">
                                Corequisites Missing
                              </span>
                            )}
                            {canAdd && (
                              <span className="px-2 py-0.5 bg-green-600 text-white text-xs font-bold uppercase">
                                Available
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-[#111110] font-semibold">{module.name}</p>
                        </div>
                        <span className="text-xs font-bold text-[#111110] ml-3">
                          {module.credits} CR
                        </span>
                      </div>

                      {/* Prerequisites */}
                      {module.prerequisites.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-[#111110]">
                          <p className="text-xs font-bold text-[#111110] uppercase tracking-wider mb-2">
                            Prerequisites:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {module.prerequisites.map((prereq) => {
                              const isMet = !prereqCheck.unmetPrereqs.includes(prereq);
                              return (
                                <span
                                  key={prereq}
                                  className={cn(
                                    'px-2 py-1 text-xs font-semibold border',
                                    isMet
                                      ? 'bg-green-100 text-green-800 border-green-300'
                                      : 'bg-red-100 text-red-800 border-red-300'
                                  )}
                                >
                                  {prereq} {isMet ? '✓' : '✗'}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Corequisites */}
                      {module.corequisites.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-[#111110]">
                          <p className="text-xs font-bold text-[#111110] uppercase tracking-wider mb-2">
                            Corequisites:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {module.corequisites.map((coreq) => {
                              const isMet = !coreqCheck.unmetCoreqs.includes(coreq);
                              return (
                                <span
                                  key={coreq}
                                  className={cn(
                                    'px-2 py-1 text-xs font-semibold border',
                                    isMet
                                      ? 'bg-green-100 text-green-800 border-green-300'
                                      : 'bg-orange-100 text-orange-800 border-orange-300'
                                  )}
                                >
                                  {coreq} {isMet ? '✓' : '✗'}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {filteredModules.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-[#111110] font-bold uppercase tracking-wider">No modules available</p>
                  <p className="text-[#111110] opacity-70 text-sm mt-2">
                    {searchQuery ? 'Try a different search term' : `No modules offered in ${selectedTerm}`}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}

const Logo = () => {
  return (
    <Link
      href="/dashboard"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-bold text-[#111110]"
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-bold whitespace-pre text-[#111110] uppercase tracking-[0.15em] text-lg"
      >
        MODSutd
      </motion.span>
    </Link>
  );
};

const LogoIcon = () => {
  return (
    <Link
      href="/dashboard"
      className="relative z-20 flex items-center justify-center py-1 text-sm font-bold text-[#111110] w-full"
    >
      <div className="h-8 w-8 border-2 border-[#111110] bg-[#dcbd8e] flex items-center justify-center shrink-0">
        <span className="text-[#111110] font-bold text-xs">M</span>
      </div>
    </Link>
  );
};

const SetupForm = ({ onSubmit }: { onSubmit: (config: PlanConfig) => void }) => {
  const [planName, setPlanName] = useState('');
  const [selectedPillar, setSelectedPillar] = useState('');
  const [selectedSpecialisation, setSelectedSpecialisation] = useState('');
  const [selectedMinors, setSelectedMinors] = useState<string[]>([]);

  const handleMinorToggle = (minor: string) => {
    if (selectedMinors.includes(minor)) {
      setSelectedMinors(selectedMinors.filter((m) => m !== minor));
    } else {
      if (selectedMinors.length < 2) {
        setSelectedMinors([...selectedMinors, minor]);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (planName && selectedPillar && selectedSpecialisation) {
      onSubmit({
        name: planName,
        pillar: selectedPillar,
        specialisation: selectedSpecialisation,
        minors: selectedMinors,
      });
    }
  };

  const availableSpecialisations = selectedPillar ? SPECIALISATIONS[selectedPillar] || [] : [];

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="border-b-2 border-[#111110] bg-white px-8 py-6">
        <h1 className="text-3xl font-bold text-[#111110] uppercase tracking-[0.1em]">
          Create Module Plan
        </h1>
        <p className="text-[#111110] opacity-70 mt-2">
          Set up your academic pathway
        </p>
      </div>

      <div className="p-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white border-4 border-[#111110] p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Plan Name */}
            <div>
              <label className="block text-sm font-bold text-[#111110] uppercase tracking-[0.15em] mb-3">
                Plan Name *
              </label>
              <input
                type="text"
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
                placeholder="e.g., My ISTD Journey"
                required
                className="w-full px-4 py-3 border-2 border-[#111110] focus:outline-none focus:border-[#dcbd8e] bg-white text-[#111110] font-semibold placeholder:text-[#111110] placeholder:opacity-50"
              />
            </div>

            {/* Pillar */}
            <div>
              <label className="block text-sm font-bold text-[#111110] uppercase tracking-[0.15em] mb-3">
                Pillar *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {PILLARS.map((pillar) => (
                  <button
                    key={pillar}
                    type="button"
                    onClick={() => {
                      setSelectedPillar(pillar);
                      setSelectedSpecialisation('');
                    }}
                    className={cn(
                      'px-4 py-3 border-2 border-[#111110] font-bold uppercase tracking-[0.1em] text-sm transition-all duration-200',
                      selectedPillar === pillar
                        ? 'bg-[#111110] text-white'
                        : 'bg-white text-[#111110] hover:bg-[#fcfbfa]'
                    )}
                  >
                    {pillar}
                  </button>
                ))}
              </div>
            </div>

            {/* Specialisation */}
            {selectedPillar && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <label className="block text-sm font-bold text-[#111110] uppercase tracking-[0.15em] mb-3">
                  Specialisation *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {availableSpecialisations.map((spec) => (
                    <button
                      key={spec}
                      type="button"
                      onClick={() => setSelectedSpecialisation(spec)}
                      className={cn(
                        'px-4 py-3 border-2 border-[#111110] font-semibold text-sm transition-all duration-200 text-left',
                        selectedSpecialisation === spec
                          ? 'bg-[#111110] text-white'
                          : 'bg-white text-[#111110] hover:bg-[#fcfbfa]'
                      )}
                    >
                      {spec}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Minors */}
            <div>
              <label className="block text-sm font-bold text-[#111110] uppercase tracking-[0.15em] mb-2">
                Minors (Optional)
              </label>
              <p className="text-xs text-[#111110] opacity-70 mb-3">
                Select up to 2 minors
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {MINORS.map((minor) => {
                  const isSelected = selectedMinors.includes(minor);
                  const isDisabled = !isSelected && selectedMinors.length >= 2;

                  return (
                    <button
                      key={minor}
                      type="button"
                      onClick={() => handleMinorToggle(minor)}
                      disabled={isDisabled}
                      className={cn(
                        'px-4 py-3 border-2 border-[#111110] font-semibold text-sm transition-all duration-200 text-left',
                        isSelected
                          ? 'bg-[#dcbd8e] text-[#111110] border-[#111110]'
                          : isDisabled
                          ? 'bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed opacity-50'
                          : 'bg-white text-[#111110] hover:bg-[#fcfbfa]'
                      )}
                    >
                      {minor}
                    </button>
                  );
                })}
              </div>
              {selectedMinors.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedMinors.map((minor) => (
                    <span
                      key={minor}
                      className="px-3 py-1 bg-[#dcbd8e] text-[#111110] text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                    >
                      {minor}
                      <button
                        type="button"
                        onClick={() => handleMinorToggle(minor)}
                        className="hover:text-red-600"
                      >
                        <IconX className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={!planName || !selectedPillar || !selectedSpecialisation}
                className="w-full bg-[#111110] hover:bg-[#dcbd8e] hover:text-[#111110] text-white px-6 py-4 font-bold transition-all duration-200 uppercase tracking-[0.1em] text-sm border-2 border-[#111110] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#111110] disabled:hover:text-white"
              >
                Create Plan & Continue
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

const TermCalendarBox = ({
  term,
  isLast,
  onTermClick,
  moduleCount,
  credits,
}: {
  term: TermBox | null;
  isLast: boolean;
  onTermClick?: () => void;
  moduleCount: number;
  credits: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  if (!term) {
    return (
      <div
        className={cn(
          'min-h-[160px] bg-gray-50/50',
          !isLast && 'border-r border-gray-100'
        )}
      />
    );
  }

  const isClickable = !!onTermClick;

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={isClickable ? onTermClick : undefined}
      whileHover={isClickable ? {
        scale: 1.02,
        y: -4,
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
      } : {}}
      className={cn(
        'min-h-[160px] p-6 relative',
        !isLast && 'border-r border-gray-100',
        term.color,
        term.striped && 'relative overflow-hidden',
        isClickable && 'cursor-pointer'
      )}
      style={{
        boxShadow: isHovered && isClickable
          ? '0 20px 40px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)'
          : '0 1px 3px rgba(0, 0, 0, 0.05)',
        transition: 'box-shadow 0.3s ease',
      }}
    >
      {/* Subtle pattern for striped items */}
      {term.striped && (
        <motion.div
          animate={{
            opacity: isHovered ? 0.4 : 0.3,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 8px,
              rgba(0, 0, 0, 0.03) 8px,
              rgba(0, 0, 0, 0.03) 16px
            )`,
          }}
        />
      )}

      {/* Glow effect on hover */}
      {isClickable && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: isHovered ? 0.15 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-br from-white to-transparent pointer-events-none"
        />
      )}

      {/* Year Badge */}
      {term.year && (
        <div className="absolute top-4 right-4">
          <motion.span
            animate={{
              boxShadow: isHovered && isClickable
                ? [
                    '0 0 20px rgba(0, 0, 0, 0.2)',
                    '0 0 30px rgba(0, 0, 0, 0.3)',
                    '0 0 20px rgba(0, 0, 0, 0.2)',
                  ]
                : '0 0 15px rgba(0, 0, 0, 0.15)',
            }}
            transition={{
              boxShadow: {
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
            whileHover={isClickable ? {
              scale: 1.1,
              transition: { duration: 0.2 },
            } : {}}
            className={cn(
              'inline-block px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full',
              getYearBadgeColor(term.year)
            )}
          >
            {term.year}
          </motion.span>
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col h-full relative z-10">
        <motion.h4
          animate={{
            color: isHovered && isClickable ? 'rgb(51, 65, 85)' : 'rgb(71, 85, 105)',
          }}
          transition={{ duration: 0.3 }}
          className={cn(
            "text-base font-bold mb-2 leading-tight",
            term.year ? "pr-16" : ""
          )}
        >
          {term.name}
        </motion.h4>
        {term.subtitle && (
          <motion.p
            animate={{
              color: isHovered && isClickable ? 'rgb(71, 85, 105)' : 'rgb(100, 116, 139)',
            }}
            transition={{ duration: 0.3 }}
            className={cn(
              "text-sm leading-snug",
              term.year ? "pr-16" : ""
            )}
          >
            {term.subtitle}
          </motion.p>
        )}

        {/* Module count and credits for clickable terms */}
        {isClickable && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-auto pt-4"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">
                {moduleCount} {moduleCount === 1 ? 'Module' : 'Modules'}
              </span>
              <span className="font-bold text-slate-800">
                {credits} Credits
              </span>
            </div>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-2 text-xs font-semibold text-slate-600 flex items-center gap-1"
              >
                <IconPlus className="h-3 w-3" />
                Click to add modules
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
