"use client";
import { cn } from "@/lib/utils";
import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";
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
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<"div">)} />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <>
      <motion.div
        className={cn(
          "h-full px-4 py-4 hidden  md:flex md:flex-col bg-neutral-100 dark:bg-neutral-800 w-[300px] shrink-0",
          className
        )}
        animate={{
          width: animate ? (open ? "300px" : "60px") : "300px",
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        {...props}
      >
        {children}
      </motion.div>
    </>
  );
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  const { open, setOpen } = useSidebar();
  return (
    <>
      <div
        className={cn(
          "h-10 px-4 py-4 flex flex-row md:hidden  items-center justify-between bg-neutral-100 dark:bg-neutral-800 w-full"
        )}
        {...props}
      >
        <div className="flex justify-end z-20 w-full">
          <IconMenu2
            className="text-neutral-800 dark:text-neutral-200"
            onClick={() => setOpen(!open)}
          />
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className={cn(
                "fixed h-full w-full inset-0 bg-white dark:bg-neutral-900 p-10 z-[100] flex flex-col justify-between",
                className
              )}
            >
              <div
                className="absolute right-10 top-10 z-50 text-neutral-800 dark:text-neutral-200"
                onClick={() => setOpen(!open)}
              >
                <IconX />
              </div>
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export const SidebarLink = ({
  link,
  className,
  ...props
}: {
  link: Links;
  className?: string;
}) => {
  const { open, animate } = useSidebar();
  return (
    <a
      href={link.href}
      className={cn(
        "flex items-center justify-start gap-2  group/sidebar py-2",
        className
      )}
      {...props}
    >
      {link.icon}

      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
      >
        {link.label}
      </motion.span>
    </a>
  );
};

interface SidebarProps {
  className?: string;
}

export function SidebarNavigation({ className }: SidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    {
      label: "Home",
      icon: <IconHome className="h-5 w-5" />,
      href: "/dashboard",
    },
    {
      label: "Calendar",
      icon: <IconCalendar className="h-5 w-5" />,
      href: "/calendar",
    },
    {
      label: "Modules",
      icon: <IconBook className="h-5 w-5" />,
      href: "/modules",
    },
    {
      label: "New Plan",
      icon: <IconPlus className="h-5 w-5" />,
      href: "/new-plan",
    },
    {
      label: "Progress",
      icon: <IconChartBar className="h-5 w-5" />,
      href: "/progress",
    },
  ];

  return (
    <motion.div 
      className={cn("fixed left-0 top-0 bottom-0 z-40 flex flex-col bg-neutral-100 dark:bg-neutral-800", className)}
      animate={{
        width: isOpen ? "300px" : "60px",
      }}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="flex flex-col h-full">
        <div className="h-16">
          <motion.div
            initial={false}
            animate={{
              opacity: isOpen ? 1 : 0,
              display: isOpen ? "block" : "none",
            }}
            className="p-4"
          >
            <h1 className="text-xl font-bold text-neutral-900 dark:text-white">MODSutd</h1>
          </motion.div>
        </div>
        
        <nav className="flex-1 px-2 space-y-1">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "flex items-center text-sm font-medium rounded-md transition-colors h-10",
                  isActive
                    ? "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-white"
                    : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
                )}
              >
                <div className={cn(
                  "h-10 flex items-center",
                  isOpen ? "min-w-[60px] justify-start pl-4" : "w-full justify-center"
                )}>
                  {link.icon}
                </div>
                <motion.span
                  animate={{
                    opacity: isOpen ? 1 : 0,
                    width: isOpen ? "auto" : 0,
                    marginLeft: isOpen ? "-8px" : 0,
                  }}
                  className="overflow-hidden whitespace-nowrap"
                >
                  {link.label}
                </motion.span>
              </Link>
            );
          })}
        </nav>
        
        <div className="px-2 mt-auto">
          <Link
            href="/profile"
            className={cn(
              "flex items-center text-sm font-medium rounded-md transition-colors h-10",
              pathname === "/profile"
                ? "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-white"
                : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
            )}
          >
            <div className={cn(
              "h-10 flex items-center",
              isOpen ? "min-w-[60px] justify-start pl-4" : "w-full justify-center"
            )}>
              <IconUser className="h-5 w-5" />
            </div>
            <motion.span
              animate={{
                opacity: isOpen ? 1 : 0,
                width: isOpen ? "auto" : 0,
                marginLeft: isOpen ? "-8px" : 0,
              }}
              className="overflow-hidden whitespace-nowrap"
            >
              Profile
            </motion.span>
          </Link>
        </div>
        
        <div className="p-4 border-t border-gray-200 dark:border-neutral-800">
          <button
            onClick={() => {
              localStorage.removeItem('authToken');
              sessionStorage.removeItem('authToken');
              document.cookie = 'auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
              window.location.href = '/';
            }}
            className="flex items-center w-full text-sm font-medium text-red-600 rounded-md hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 h-10"
          >
            <div className={cn(
              "h-10 flex items-center",
              isOpen ? "min-w-[60px] justify-start pl-4" : "w-full justify-center"
            )}>
              <IconLogout className="h-5 w-5" />
            </div>
            <motion.span
              animate={{
                opacity: isOpen ? 1 : 0,
                width: isOpen ? "auto" : 0,
                marginLeft: isOpen ? "-8px" : 0,
              }}
              className="overflow-hidden whitespace-nowrap"
            >
              Logout
            </motion.span>
          </button>
        </div>
      </div>
    </motion.div>
  );
} 