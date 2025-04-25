import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconCalendar,
  IconChartBar,
  IconHome,
  IconSettings,
  IconUser,
  IconBook,
  IconLogout,
} from "@tabler/icons-react";
import { useRouter } from 'next/navigation';

export default function FloatingDockDemo() {
  const router = useRouter();
  
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/dashboard",
    },
    {
      title: "Calendar",
      icon: (
        <IconCalendar className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/calendar",
    },
    {
      title: "Modules",
      icon: (
        <IconBook className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/modules",
    },
    {
      title: "Progress",
      icon: (
        <IconChartBar className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/progress",
    },
    {
      title: "Profile",
      icon: (
        <IconUser className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/profile",
    },
    {
      title: "Logout",
      icon: (
        <IconLogout className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/",
      onClick: () => {
        // TODO: Implement logout logic
        router.push('/');
      },
    },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <FloatingDock items={links} />
    </div>
  );
} 