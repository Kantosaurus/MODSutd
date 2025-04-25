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
  IconPlus,
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
      title: "New Plan",
      icon: (
        <IconPlus className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/new-plan",
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
        // Clear authentication state from client storage
        // Even though we use MongoDB on the server, we store the auth token in the client
        localStorage.removeItem('authToken');
        sessionStorage.removeItem('authToken');
        
        // Clear any auth cookies if they exist
        // Setting expiration date to Jan 1, 1970 (Unix epoch) effectively expires the cookie immediately
        document.cookie = 'auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        
        // Redirect to home page
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