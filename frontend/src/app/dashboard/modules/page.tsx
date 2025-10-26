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
  IconSearch,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// Sample module data
const MODULES = [
  {
    id: 1,
    code: '50.001',
    name: 'Information Systems & Programming',
    pillar: 'ISTD',
    credits: 4,
    term: 'Term 1',
    prerequisites: [],
    description: 'Introduction to information systems and programming fundamentals using Python.',
  },
  {
    id: 2,
    code: '50.002',
    name: 'Computation Structures',
    pillar: 'ISTD',
    credits: 4,
    term: 'Term 2',
    prerequisites: ['50.001'],
    description: 'Digital systems, Boolean algebra, combinational and sequential circuits.',
  },
  {
    id: 3,
    code: '50.003',
    name: 'Elements of Software Construction',
    pillar: 'ISTD',
    credits: 4,
    term: 'Term 3',
    prerequisites: ['50.001'],
    description: 'Software engineering principles, design patterns, and testing methodologies.',
  },
  {
    id: 4,
    code: '50.004',
    name: 'Introduction to Algorithms',
    pillar: 'ISTD',
    credits: 4,
    term: 'Term 4',
    prerequisites: ['50.001'],
    description: 'Algorithm design, analysis, sorting, searching, and graph algorithms.',
  },
  {
    id: 5,
    code: '50.005',
    name: 'Computer System Engineering',
    pillar: 'ISTD',
    credits: 4,
    term: 'Term 5',
    prerequisites: ['50.002'],
    description: 'Operating systems, processes, memory management, and file systems.',
  },
  {
    id: 6,
    code: '50.034',
    name: 'Introduction to Probability and Statistics',
    pillar: 'ISTD',
    credits: 4,
    term: 'Term 3',
    prerequisites: [],
    description: 'Probability theory, statistical inference, and data analysis.',
  },
  {
    id: 7,
    code: '50.042',
    name: 'Foundations of Cybersecurity',
    pillar: 'ISTD',
    credits: 4,
    term: 'Term 6',
    prerequisites: ['50.005'],
    description: 'Cryptography, network security, and secure system design.',
  },
  {
    id: 8,
    code: '50.043',
    name: 'Database and Big Data Systems',
    pillar: 'ISTD',
    credits: 4,
    term: 'Term 5',
    prerequisites: ['50.004'],
    description: 'Relational databases, SQL, NoSQL, and distributed data processing.',
  },
];

const PILLARS = ['All', 'ISTD', 'EPD', 'ESD', 'ASD'];
const TERMS = ['All', 'Term 1', 'Term 2', 'Term 3', 'Term 4', 'Term 5', 'Term 6'];

export default function ModulesPage() {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPillar, setSelectedPillar] = useState('All');
  const [selectedTerm, setSelectedTerm] = useState('All');

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

  const filteredModules = MODULES.filter((module) => {
    const matchesSearch =
      module.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPillar = selectedPillar === 'All' || module.pillar === selectedPillar;
    const matchesTerm = selectedTerm === 'All' || module.term === selectedTerm;
    return matchesSearch && matchesPillar && matchesTerm;
  });

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
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-[#111110] uppercase tracking-[0.1em]">
                Explore Modules
              </h1>
              <p className="text-[#111110] opacity-70 mt-2">
                Browse all available academic modules
              </p>
            </div>
            <Link
              href="/dashboard/planner"
              className="bg-[#111110] hover:bg-[#dcbd8e] hover:text-[#111110] text-white px-6 py-3 font-bold transition-all duration-200 uppercase tracking-[0.1em] text-xs border-2 border-[#111110]"
            >
              Go to Planner
            </Link>
          </div>
        </div>

          <div className="p-8">
            {/* Search and Filters */}
            <div className="bg-white border-4 border-[#111110] p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Search Bar */}
                <div className="md:col-span-6">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="SEARCH MODULES..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-3 pl-12 border-2 border-[#111110] focus:outline-none focus:border-[#dcbd8e] bg-white text-[#111110] uppercase tracking-wider text-sm font-semibold placeholder:text-[#111110] placeholder:opacity-50"
                    />
                    <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#111110]" />
                  </div>
                </div>

                {/* Pillar Filter */}
                <div className="md:col-span-3">
                  <select
                    value={selectedPillar}
                    onChange={(e) => setSelectedPillar(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-[#111110] focus:outline-none focus:border-[#dcbd8e] bg-white text-[#111110] uppercase tracking-wider text-sm font-semibold cursor-pointer"
                  >
                    {PILLARS.map((pillar) => (
                      <option key={pillar} value={pillar}>
                        {pillar === 'All' ? 'All Pillars' : pillar}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Term Filter */}
                <div className="md:col-span-3">
                  <select
                    value={selectedTerm}
                    onChange={(e) => setSelectedTerm(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-[#111110] focus:outline-none focus:border-[#dcbd8e] bg-white text-[#111110] uppercase tracking-wider text-sm font-semibold cursor-pointer"
                  >
                    {TERMS.map((term) => (
                      <option key={term} value={term}>
                        {term}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-sm font-bold text-[#111110] uppercase tracking-[0.15em]">
                {filteredModules.length} Module{filteredModules.length !== 1 ? 's' : ''} Found
              </p>
            </div>

            {/* Module Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredModules.map((module) => (
                <ModuleCard key={module.id} module={module} />
              ))}
            </div>

            {filteredModules.length === 0 && (
              <div className="bg-white border-4 border-[#111110] p-12 text-center">
                <p className="text-[#111110] font-bold uppercase tracking-wider">
                  No modules found
                </p>
                <p className="text-[#111110] opacity-70 mt-2">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </div>
        </div>
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

interface Module {
  id: number;
  code: string;
  name: string;
  pillar: string;
  credits: number;
  term: string;
  prerequisites: string[];
  description: string;
}

const ModuleCard = ({ module }: { module: Module }) => {
  return (
    <div className="bg-white border-4 border-[#111110] p-6 hover:bg-[#fcfbfa] transition-colors">
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-xl font-bold text-[#111110] uppercase tracking-[0.1em]">
            {module.code}
          </h3>
          <span className="px-2 py-1 border border-[#111110] text-[#111110] text-xs font-bold uppercase tracking-wider">
            {module.pillar}
          </span>
        </div>
        <h4 className="text-sm text-[#111110] font-semibold">{module.name}</h4>
      </div>

      <p className="text-sm text-[#111110] opacity-70 mb-4 leading-relaxed">
        {module.description}
      </p>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t-2 border-[#111110]">
        <div>
          <p className="text-xs font-bold text-[#111110] uppercase tracking-[0.15em] mb-1">
            Credits
          </p>
          <p className="text-sm text-[#111110]">{module.credits}</p>
        </div>
        <div>
          <p className="text-xs font-bold text-[#111110] uppercase tracking-[0.15em] mb-1">
            Term
          </p>
          <p className="text-sm text-[#111110]">{module.term}</p>
        </div>
      </div>

      {module.prerequisites.length > 0 && (
        <div className="mt-4 pt-4 border-t-2 border-[#111110]">
          <p className="text-xs font-bold text-[#111110] uppercase tracking-[0.15em] mb-2">
            Prerequisites
          </p>
          <div className="flex flex-wrap gap-2">
            {module.prerequisites.map((prereq) => (
              <span
                key={prereq}
                className="px-2 py-1 bg-[#fcfbfa] border border-[#111110] text-[#111110] text-xs font-semibold"
              >
                {prereq}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
