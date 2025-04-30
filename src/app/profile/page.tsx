'use client';

import { useState, ChangeEvent } from 'react';
import { User } from '@/types/user';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navigation from '@/components/navigation';
import { Switch } from '@/components/ui/switch';

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    pillar: '',
    year: '',
  });
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    weeklyDigest: false,
    courseUpdates: true,
  });
  const [preferences, setPreferences] = useState({
    darkMode: false,
    language: 'English',
    timezone: 'Asia/Singapore',
  });

  // Mock user data - replace with actual user data from your auth system
  const mockUser: User = {
    id: '1004561',
    studentId: '1004561',
    password: 'password123',
    name: 'John Doe',
    pillar: 'ASD',
    year: 2,
    term: 4,
    emailVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const handleEdit = () => {
    setIsEditing(true);
    setFormData({
      name: mockUser.name,
      email: `${mockUser.studentId}@sutd.edu.sg`,
      pillar: mockUser.pillar,
      year: mockUser.year.toString(),
    });
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    setIsEditing(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePreferenceChange = (key: keyof typeof preferences, value: string | boolean) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Profile</h1>
          
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>

            <TabsContent value="account">
              <Card className="p-6">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold">Account Information</h2>
                    {!isEditing ? (
                      <Button onClick={handleEdit}>Edit Profile</Button>
                    ) : (
                      <Button onClick={handleSave}>Save Changes</Button>
                    )}
                  </div>

                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Full Name</Label>
                      {isEditing ? (
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <p className="text-lg">{mockUser.name}</p>
                      )}
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="studentId">Student ID</Label>
                      <p className="text-lg">{mockUser.studentId}</p>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="pillar">Pillar</Label>
                      {isEditing ? (
                        <Input
                          id="pillar"
                          value={formData.pillar}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <p className="text-lg">{mockUser.pillar}</p>
                      )}
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="year">Year</Label>
                      {isEditing ? (
                        <Input
                          id="year"
                          value={formData.year}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <p className="text-lg">{mockUser.year}</p>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-6">Security Settings</h2>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-medium">Change Password</h3>
                      <p className="text-sm text-gray-500">Update your password regularly to keep your account secure</p>
                    </div>
                    <Button variant="outline">Change Password</Button>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                    <Button variant="outline">Enable 2FA</Button>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-medium">Login History</h3>
                      <p className="text-sm text-gray-500">View your recent login activity</p>
                    </div>
                    <Button variant="outline">View History</Button>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-6">Notification Settings</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">Email Notifications</h3>
                      <p className="text-sm text-gray-500">Receive notifications via email</p>
                    </div>
                    <Switch
                      checked={notifications.emailNotifications}
                      onCheckedChange={() => handleNotificationChange('emailNotifications')}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">Push Notifications</h3>
                      <p className="text-sm text-gray-500">Receive push notifications in your browser</p>
                    </div>
                    <Switch
                      checked={notifications.pushNotifications}
                      onCheckedChange={() => handleNotificationChange('pushNotifications')}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">Weekly Digest</h3>
                      <p className="text-sm text-gray-500">Get a weekly summary of your activities</p>
                    </div>
                    <Switch
                      checked={notifications.weeklyDigest}
                      onCheckedChange={() => handleNotificationChange('weeklyDigest')}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">Course Updates</h3>
                      <p className="text-sm text-gray-500">Get notified about course changes and announcements</p>
                    </div>
                    <Switch
                      checked={notifications.courseUpdates}
                      onCheckedChange={() => handleNotificationChange('courseUpdates')}
                    />
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="preferences">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-6">Preferences</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">Dark Mode</h3>
                      <p className="text-sm text-gray-500">Switch between light and dark theme</p>
                    </div>
                    <Switch
                      checked={preferences.darkMode}
                      onCheckedChange={(checked) => handlePreferenceChange('darkMode', checked)}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="language">Language</Label>
                    <select
                      id="language"
                      className="w-full p-2 border rounded-md"
                      value={preferences.language}
                      onChange={(e) => handlePreferenceChange('language', e.target.value)}
                    >
                      <option value="English">English</option>
                      <option value="Chinese">Chinese</option>
                      <option value="Malay">Malay</option>
                      <option value="Tamil">Tamil</option>
                    </select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <select
                      id="timezone"
                      className="w-full p-2 border rounded-md"
                      value={preferences.timezone}
                      onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
                    >
                      <option value="Asia/Singapore">Singapore (GMT+8)</option>
                      <option value="UTC">UTC</option>
                      <option value="America/New_York">New York (GMT-5)</option>
                      <option value="Europe/London">London (GMT+0)</option>
                    </select>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
} 