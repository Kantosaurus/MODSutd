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
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Current Modules"
            value="6"
            description="Active this term"
          />
          <StatCard
            title="Completed"
            value="24"
            description="Total modules"
          />
          <StatCard
            title="Average Grade"
            value="3.8"
            description="Current GPA"
          />
          <StatCard
            title="Credits"
            value="108"
            description="Earned credits"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Modules */}
          <div className="lg:col-span-2">
            <div className="bg-white border-4 border-[#111110] p-8">
              <h2 className="text-2xl font-bold text-[#111110] uppercase tracking-[0.1em] mb-6">
                Current Modules
              </h2>
              <div className="space-y-4">
                <ModuleCard
                  code="50.001"
                  name="Information Systems & Programming"
                  progress={75}
                />
                <ModuleCard
                  code="50.002"
                  name="Computation Structures"
                  progress={60}
                />
                <ModuleCard
                  code="50.003"
                  name="Elements of Software Construction"
                  progress={85}
                />
                <ModuleCard
                  code="50.004"
                  name="Introduction to Algorithms"
                  progress={70}
                />
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="lg:col-span-1">
            <div className="bg-white border-4 border-[#111110] p-8 mb-6">
              <h2 className="text-xl font-bold text-[#111110] uppercase tracking-[0.1em] mb-6">
                Upcoming
              </h2>
              <div className="space-y-4">
                <EventCard
                  title="Algorithms Quiz"
                  date="Tomorrow"
                  time="2:00 PM"
                />
                <EventCard
                  title="Software Project Due"
                  date="Dec 15"
                  time="11:59 PM"
                />
                <EventCard
                  title="Midterm Exam"
                  date="Dec 20"
                  time="9:00 AM"
                />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white border-4 border-[#111110] p-8">
              <h2 className="text-xl font-bold text-[#111110] uppercase tracking-[0.1em] mb-6">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <button className="w-full bg-[#111110] hover:bg-[#dcbd8e] hover:text-[#111110] text-white py-3 px-4 font-bold transition-all duration-200 uppercase tracking-[0.1em] text-xs border-2 border-[#111110]">
                  Enroll Module
                </button>
                <button className="w-full bg-transparent text-[#111110] py-3 px-4 font-bold border-2 border-[#111110] hover:bg-[#111110] hover:text-white transition-all duration-200 uppercase tracking-[0.1em] text-xs">
                  View Schedule
                </button>
                <button className="w-full bg-transparent text-[#111110] py-3 px-4 font-bold border-2 border-[#111110] hover:bg-[#111110] hover:text-white transition-all duration-200 uppercase tracking-[0.1em] text-xs">
                  Check Grades
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-6 bg-white border-4 border-[#111110] p-8">
          <h2 className="text-2xl font-bold text-[#111110] uppercase tracking-[0.1em] mb-6">
            Recent Activity
          </h2>
          <div className="space-y-3">
            <ActivityItem
              action="Submitted assignment"
              module="50.003"
              time="2 hours ago"
            />
            <ActivityItem
              action="Completed quiz"
              module="50.001"
              time="1 day ago"
            />
            <ActivityItem
              action="Enrolled in module"
              module="50.004"
              time="3 days ago"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) => {
  return (
    <div className="bg-white border-4 border-[#111110] p-6 hover:bg-[#fcfbfa] transition-colors">
      <p className="text-xs font-bold text-[#111110] uppercase tracking-[0.15em] mb-2">
        {title}
      </p>
      <p className="text-4xl font-bold text-[#111110] mb-2">{value}</p>
      <p className="text-sm text-[#111110] opacity-70">{description}</p>
    </div>
  );
};

const ModuleCard = ({
  code,
  name,
  progress,
}: {
  code: string;
  name: string;
  progress: number;
}) => {
  return (
    <div className="border-2 border-[#111110] p-4 hover:bg-[#fcfbfa] transition-colors">
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="text-xs font-bold text-[#111110] uppercase tracking-[0.15em]">
            {code}
          </p>
          <p className="text-sm text-[#111110] mt-1">{name}</p>
        </div>
        <span className="text-xs font-bold text-[#111110]">{progress}%</span>
      </div>
      <div className="w-full h-2 bg-[#fcfbfa] border border-[#111110]">
        <div
          className="h-full bg-[#dcbd8e] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

const EventCard = ({
  title,
  date,
  time,
}: {
  title: string;
  date: string;
  time: string;
}) => {
  return (
    <div className="border-2 border-[#111110] p-3 hover:bg-[#fcfbfa] transition-colors">
      <p className="text-sm font-bold text-[#111110] mb-1">{title}</p>
      <div className="flex justify-between text-xs text-[#111110] opacity-70">
        <span>{date}</span>
        <span>{time}</span>
      </div>
    </div>
  );
};

const ActivityItem = ({
  action,
  module,
  time,
}: {
  action: string;
  module: string;
  time: string;
}) => {
  return (
    <div className="flex justify-between items-center border-b-2 border-[#111110] pb-3 last:border-0">
      <div>
        <p className="text-sm font-bold text-[#111110]">{action}</p>
        <p className="text-xs text-[#111110] opacity-70 uppercase tracking-wider mt-1">
          {module}
        </p>
      </div>
      <span className="text-xs text-[#111110] opacity-70">{time}</span>
    </div>
  );
};
