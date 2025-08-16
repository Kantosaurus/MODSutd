import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Account', href: '/profile' },
  { label: 'Security', href: '/profile/security' },
  { label: 'Notifications', href: '/profile/notifications' },
  { label: 'Preferences', href: '/profile/preferences' },
];

export function ProfileNavbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-200',
        isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant={pathname === item.href ? 'default' : 'ghost'}
                className={cn(
                  'text-sm font-medium transition-colors',
                  pathname === item.href
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
                asChild
              >
                <a href={item.href}>{item.label}</a>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
} 