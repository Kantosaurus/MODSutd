'use client';

import { useState, useEffect } from 'react';
import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui/sidebar';
import {
  IconHome,
  IconBook,
  IconCalendar,
  IconChartBar,
  IconUser,
  IconSettings,
  IconLogout,
  IconArrowLeft,
  IconSchool,
  IconTarget,
  IconListCheck,
  IconBookmark,
  IconCertificate,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface ModuleData {
  id: string;
  code: string;
  name: string;
  overview?: string;
  description?: string;
  credits: number;
  prerequisites: Array<{
    id: string;
    code: string;
    name: string;
  }>;
  corequisites: Array<{
    id: string;
    code: string;
    name: string;
  }>;
  learningObjectives?: string;
  measurableOutcomes?: string;
  topicsCovered?: string;
  textbooks?: string;
  deliveryFormat?: string;
  gradingScheme?: string;
  terms?: string;
  professors?: string;
  tags?: string;
}

const GET_COURSE_QUERY = `
  query GetCourse($code: String!) {
    courseByCode(code: $code) {
      id
      code
      name
      overview
      description
      credits
      learningObjectives
      measurableOutcomes
      topicsCovered
      textbooks
      deliveryFormat
      gradingScheme
      terms
      professors
      tags
      prerequisites {
        id
        code
        name
      }
      corequisites {
        id
        code
        name
      }
    }
  }
`;

export default function ModulePage() {
  const params = useParams();
  const code = params.code as string;
  const [open, setOpen] = useState(false);
  const [moduleData, setModuleData] = useState<ModuleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchModule() {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: GET_COURSE_QUERY,
            variables: { code },
          }),
        });

        const result = await response.json();

        if (result.errors) {
          throw new Error(result.errors[0].message);
        }

        if (!result.data.courseByCode) {
          throw new Error('Module not found');
        }

        setModuleData(result.data.courseByCode);
      } catch (err) {
        console.error('Error fetching module:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch module');
      } finally {
        setLoading(false);
      }
    }

    fetchModule();
  }, [code]);

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

  if (loading) {
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
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-12 w-12 border-4 border-[#111110] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-[#111110] font-semibold text-sm">Loading module details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !moduleData) {
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
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="text-center max-w-md">
            <h2 className="text-2xl font-bold text-[#111110] mb-4">Module Not Found</h2>
            <p className="text-[#111110] opacity-70 mb-6">
              {error || "We couldn't find the module you're looking for."}
            </p>
            <Link
              href="/dashboard/modules"
              className="inline-flex items-center gap-2 bg-[#111110] hover:bg-[#dcbd8e] hover:text-[#111110] text-white px-6 py-3 font-semibold transition-all duration-200 text-sm"
            >
              <IconArrowLeft className="h-4 w-4" />
              Back to Modules
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const termsOffered = moduleData.terms
    ? moduleData.terms.split(',').map(t => `Term ${t.trim()}`).join(', ')
    : 'N/A';

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
        {/* Hero Header */}
        <div className="bg-white border-b-2 border-[#111110]">
          <div className="max-w-7xl mx-auto px-8 py-12">
            <Link
              href="/dashboard/modules"
              className="inline-flex items-center gap-2 text-[#111110] hover:text-[#dcbd8e] transition-colors mb-8 font-medium text-sm group"
            >
              <IconArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Modules
            </Link>

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-6xl font-bold text-[#111110] tracking-tight">
                    {moduleData.code}
                  </span>
                  {moduleData.tags && (
                    <span className="px-3 py-1.5 bg-[#111110] text-white text-xs font-bold uppercase tracking-wider">
                      {moduleData.tags}
                    </span>
                  )}
                </div>
                <h1 className="text-3xl font-semibold text-[#111110] leading-tight">
                  {moduleData.name}
                </h1>
                {moduleData.overview && (
                  <p className="text-[#111110] opacity-80 mt-4 text-lg leading-relaxed max-w-3xl">
                    {moduleData.overview}
                  </p>
                )}
              </div>

              <div className="lg:text-right space-y-6">
                <div>
                  <p className="text-sm font-medium text-[#111110] opacity-60 uppercase tracking-wider mb-2">
                    Credits
                  </p>
                  <p className="text-5xl font-bold text-[#111110]">{moduleData.credits}</p>
                </div>
                {moduleData.terms && (
                  <div>
                    <p className="text-sm font-medium text-[#111110] opacity-60 uppercase tracking-wider mb-2">
                      Offered
                    </p>
                    <p className="text-lg font-semibold text-[#111110]">{termsOffered}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-8 py-12 space-y-8">
          {/* Prerequisites and Corequisites */}
          {((moduleData.prerequisites && moduleData.prerequisites.length > 0) ||
            (moduleData.corequisites && moduleData.corequisites.length > 0)) && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {moduleData.prerequisites && moduleData.prerequisites.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-lg border-2 border-[#111110] p-8 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <IconBookmark className="h-6 w-6 text-[#111110]" />
                    <h2 className="text-xl font-bold text-[#111110]">
                      Prerequisites
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {moduleData.prerequisites.map((prereq) => (
                      <Link
                        key={prereq.id}
                        href={`/dashboard/modules/${prereq.code}`}
                        className="group px-4 py-3 bg-[#fcfbfa] border-2 border-[#111110] text-[#111110] font-semibold hover:bg-[#111110] hover:text-white transition-all duration-200"
                      >
                        <div className="text-sm font-bold">{prereq.code}</div>
                        <div className="text-xs opacity-70 group-hover:opacity-100 mt-1">
                          {prereq.name}
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}

              {moduleData.corequisites && moduleData.corequisites.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="bg-white rounded-lg border-2 border-[#111110] p-8 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <IconCertificate className="h-6 w-6 text-[#111110]" />
                    <h2 className="text-xl font-bold text-[#111110]">
                      Corequisites
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {moduleData.corequisites.map((coreq) => (
                      <Link
                        key={coreq.id}
                        href={`/dashboard/modules/${coreq.code}`}
                        className="group px-4 py-3 bg-[#fcfbfa] border-2 border-[#111110] text-[#111110] font-semibold hover:bg-[#111110] hover:text-white transition-all duration-200"
                      >
                        <div className="text-sm font-bold">{coreq.code}</div>
                        <div className="text-xs opacity-70 group-hover:opacity-100 mt-1">
                          {coreq.name}
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {/* Learning Objectives */}
          {moduleData.learningObjectives && (
            <ContentSection
              icon={<IconTarget className="h-6 w-6" />}
              title="Learning Objectives"
              content={moduleData.learningObjectives}
            />
          )}

          {/* Measurable Outcomes */}
          {moduleData.measurableOutcomes && (
            <ContentSection
              icon={<IconListCheck className="h-6 w-6" />}
              title="Measurable Outcomes"
              content={moduleData.measurableOutcomes}
            />
          )}

          {/* Topics Covered */}
          {moduleData.topicsCovered && (
            <ContentSection
              icon={<IconBook className="h-6 w-6" />}
              title="Topics Covered"
              content={moduleData.topicsCovered}
            />
          )}

          {/* Textbooks */}
          {moduleData.textbooks && moduleData.textbooks.trim() !== '' && (
            <ContentSection
              icon={<IconBook className="h-6 w-6" />}
              title="Required Materials"
              content={moduleData.textbooks}
            />
          )}

          {/* Additional Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {moduleData.deliveryFormat && moduleData.deliveryFormat.trim() !== '' && (
              <InfoCard
                icon={<IconSchool className="h-5 w-5" />}
                title="Delivery Format"
                content={moduleData.deliveryFormat}
              />
            )}

            {moduleData.gradingScheme && moduleData.gradingScheme.trim() !== '' && (
              <InfoCard
                icon={<IconCertificate className="h-5 w-5" />}
                title="Grading Scheme"
                content={moduleData.gradingScheme}
              />
            )}

            {moduleData.professors && moduleData.professors.trim() !== '' && (
              <InfoCard
                icon={<IconUser className="h-5 w-5" />}
                title="Instructors"
                content={moduleData.professors}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const ContentSection = ({
  icon,
  title,
  content,
}: {
  icon: React.ReactNode;
  title: string;
  content: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg border-2 border-[#111110] p-8 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="text-[#111110]">{icon}</div>
        <h2 className="text-2xl font-bold text-[#111110]">{title}</h2>
      </div>
      <div className="text-[#111110] leading-relaxed whitespace-pre-wrap prose prose-sm max-w-none">
        {content}
      </div>
    </motion.div>
  );
};

const InfoCard = ({
  icon,
  title,
  content,
}: {
  icon: React.ReactNode;
  title: string;
  content: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg border-2 border-[#111110] p-6 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="text-[#111110]">{icon}</div>
        <h3 className="text-sm font-bold text-[#111110] uppercase tracking-wider">
          {title}
        </h3>
      </div>
      <p className="text-[#111110] leading-relaxed whitespace-pre-wrap">{content}</p>
    </motion.div>
  );
};

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
