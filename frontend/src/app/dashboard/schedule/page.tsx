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
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';

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

export default function SchedulePage() {
  const [open, setOpen] = useState(false);

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
      label: 'Tracks',
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
        <div className="bg-white px-8 py-8 border-b border-gray-100">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
              Academic Calendar
            </h1>
            <p className="text-slate-600 mt-2 text-lg">
              SUTD 4-Year Program Structure
            </p>
          </div>
        </div>

        <div className="p-8 max-w-7xl mx-auto">
          {/* Schedule Grid */}
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
                {row.map((cell, cellIdx) => (
                  <TermBox key={`${rowIdx}-${cellIdx}`} term={cell} isLast={cellIdx === 3} />
                ))}
              </motion.div>
            ))}
          </motion.div>
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

const TermBox = ({ term, isLast }: { term: TermBox | null; isLast: boolean }) => {
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

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        scale: 1.02,
        y: -4,
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
      }}
      className={cn(
        'min-h-[160px] p-6 relative cursor-pointer',
        !isLast && 'border-r border-gray-100',
        term.color,
        term.striped && 'relative overflow-hidden'
      )}
      style={{
        boxShadow: isHovered
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: isHovered ? 0.15 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-gradient-to-br from-white to-transparent pointer-events-none"
      />

      {/* Year Badge */}
      {term.year && (
        <div className="absolute top-4 right-4">
          <motion.span
            animate={{
              boxShadow: isHovered
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
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.2 },
            }}
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
            color: isHovered ? 'rgb(51, 65, 85)' : 'rgb(71, 85, 105)',
          }}
          transition={{ duration: 0.3 }}
          className="text-base font-bold mb-2 leading-tight"
        >
          {term.name}
        </motion.h4>
        {term.subtitle && (
          <motion.p
            animate={{
              color: isHovered ? 'rgb(71, 85, 105)' : 'rgb(100, 116, 139)',
            }}
            transition={{ duration: 0.3 }}
            className="text-sm leading-snug"
          >
            {term.subtitle}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};
