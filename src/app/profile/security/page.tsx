'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ProfileNavbar } from '@/components/profile-navbar';

export default function SecurityPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement password change functionality
    console.log('Changing password...');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ProfileNavbar />
      
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Security Settings</h1>
          
          <Card className="p-6">
            <form onSubmit={handleChangePassword} className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Change Password</h2>
                <p className="text-sm text-muted-foreground">
                  Ensure your account is using a strong password to stay secure.
                </p>
              </div>

              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>

              <Button type="submit">Update Password</Button>
            </form>
          </Card>

          <Card className="p-6 mt-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Two-Factor Authentication</h2>
              <p className="text-sm text-muted-foreground">
                Add additional security to your account using two-factor authentication.
              </p>
              <Button variant="outline">Enable 2FA</Button>
            </div>
          </Card>

          <Card className="p-6 mt-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-destructive">Danger Zone</h2>
              <p className="text-sm text-muted-foreground">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <Button variant="destructive">Delete Account</Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
} 