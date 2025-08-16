'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ProfileNavbar } from '@/components/profile-navbar';
import { Switch } from '@/components/ui/switch';

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

export default function NotificationsPage() {
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: 'email-notifications',
      title: 'Email Notifications',
      description: 'Receive email notifications about your account activity.',
      enabled: true,
    },
    {
      id: 'assignment-reminders',
      title: 'Assignment Reminders',
      description: 'Get notified about upcoming assignment deadlines.',
      enabled: true,
    },
    {
      id: 'course-updates',
      title: 'Course Updates',
      description: 'Receive notifications about changes to your enrolled courses.',
      enabled: false,
    },
    {
      id: 'grade-notifications',
      title: 'Grade Notifications',
      description: 'Get notified when new grades are posted.',
      enabled: true,
    },
    {
      id: 'announcements',
      title: 'Announcements',
      description: 'Receive important announcements from your institution.',
      enabled: true,
    },
  ]);

  const handleToggle = (id: string) => {
    setSettings(prev =>
      prev.map(setting =>
        setting.id === id
          ? { ...setting, enabled: !setting.enabled }
          : setting
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ProfileNavbar />
      
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Notification Settings</h1>
          
          <Card className="p-6">
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Manage Notifications</h2>
                <p className="text-sm text-muted-foreground">
                  Choose what notifications you want to receive.
                </p>
              </div>

              <div className="space-y-6">
                {settings.map((setting) => (
                  <div
                    key={setting.id}
                    className="flex items-center justify-between space-x-4"
                  >
                    <div className="space-y-1">
                      <Label
                        htmlFor={setting.id}
                        className="text-base font-medium"
                      >
                        {setting.title}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {setting.description}
                      </p>
                    </div>
                    <Switch
                      id={setting.id}
                      checked={setting.enabled}
                      onCheckedChange={() => handleToggle(setting.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
} 