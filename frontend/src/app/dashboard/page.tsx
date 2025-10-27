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

export default function Dashboard() {
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
      <DashboardContent />
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

const DashboardContent = () => {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="border-b-2 border-[#111110] bg-white px-8 py-6">
        <h1 className="text-3xl font-bold text-[#111110] uppercase tracking-[0.1em]">
          Dashboard
        </h1>
        <p className="text-[#111110] opacity-70 mt-2">
          Welcome back to your academic overview
        </p>
      </div>

      <div className="p-8">
        {/* Quick Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/dashboard/modules">
            <div className="bg-white border-4 border-[#111110] p-8 hover:bg-[#fcfbfa] transition-colors cursor-pointer">
              <IconBook className="h-12 w-12 text-[#111110] mb-4" />
              <h2 className="text-2xl font-bold text-[#111110] uppercase tracking-[0.1em] mb-2">
                Browse Modules
              </h2>
              <p className="text-[#111110] opacity-70">
                Explore all 33 available ISTD modules
              </p>
            </div>
          </Link>

          <Link href="/dashboard/planner">
            <div className="bg-white border-4 border-[#111110] p-8 hover:bg-[#fcfbfa] transition-colors cursor-pointer">
              <IconCalendar className="h-12 w-12 text-[#111110] mb-4" />
              <h2 className="text-2xl font-bold text-[#111110] uppercase tracking-[0.1em] mb-2">
                Plan Your Path
              </h2>
              <p className="text-[#111110] opacity-70">
                Design your academic journey term by term
              </p>
            </div>
          </Link>

          <Link href="/dashboard/schedule">
            <div className="bg-white border-4 border-[#111110] p-8 hover:bg-[#fcfbfa] transition-colors cursor-pointer">
              <IconChartBar className="h-12 w-12 text-[#111110] mb-4" />
              <h2 className="text-2xl font-bold text-[#111110] uppercase tracking-[0.1em] mb-2">
                View Schedule
              </h2>
              <p className="text-[#111110] opacity-70">
                Check your upcoming classes and events
              </p>
            </div>
          </Link>
        </div>

        {/* Welcome Section */}
        <div className="mt-8 bg-white border-4 border-[#111110] p-12 text-center">
          <h2 className="text-3xl font-bold text-[#111110] uppercase tracking-[0.1em] mb-4">
            Welcome to MODSutd
          </h2>
          <p className="text-[#111110] opacity-70 text-lg max-w-2xl mx-auto">
            Your comprehensive platform for managing academic modules at SUTD. Browse through modules,
            plan your academic path, and track your progress throughout your journey.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/dashboard/modules"
              className="bg-[#111110] hover:bg-[#dcbd8e] hover:text-[#111110] text-white px-8 py-4 font-bold transition-all duration-200 uppercase tracking-[0.1em] text-sm border-2 border-[#111110]"
            >
              Explore Modules
            </Link>
            <Link
              href="/dashboard/planner"
              className="bg-transparent text-[#111110] px-8 py-4 font-bold border-2 border-[#111110] hover:bg-[#111110] hover:text-white transition-all duration-200 uppercase tracking-[0.1em] text-sm"
            >
              Start Planning
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

