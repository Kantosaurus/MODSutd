'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setError('Invalid reset link. Please request a new password reset.');
    }
  }, [token]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation ResetPassword($token: String!, $newPassword: String!) {
              resetPassword(token: $token, newPassword: $newPassword) {
                success
                message
              }
            }
          `,
          variables: {
            token,
            newPassword: formData.newPassword
          }
        }),
      });

      const result = await response.json();
      if (result.errors) {
        setError(result.errors[0].message);
      } else {
        setSuccess(true);
        setTimeout(() => {
          router.push('/');
        }, 3000);
      }
    } catch {
      setError('Network error. Please try again.');
    }

    setLoading(false);
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-[#fcfbfa] flex items-center justify-center p-4">
        <div className="bg-white border-4 border-[#111110] max-w-md w-full p-12 text-center">
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto border-4 border-red-600 flex items-center justify-center">
              <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                <path strokeLinecap="square" strokeLinejoin="miter" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 18.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-[#111110] mb-6 uppercase tracking-[0.1em]">Invalid Reset Link</h2>
          <p className="text-[#111110] opacity-70 mb-8 leading-relaxed">
            This password reset link is invalid or has expired. Please request a new password reset.
          </p>
          <Link href="/" className="inline-block bg-[#111110] hover:bg-[#dcbd8e] hover:text-[#111110] text-white px-8 py-4 font-bold transition-all duration-200 uppercase tracking-[0.15em] text-sm border-2 border-[#111110]">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#fcfbfa] flex items-center justify-center p-4">
        <div className="bg-white border-4 border-[#111110] max-w-md w-full p-12 text-center">
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto border-4 border-green-600 flex items-center justify-center bg-green-50">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                <path strokeLinecap="square" strokeLinejoin="miter" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-[#111110] mb-6 uppercase tracking-[0.1em]">Password Reset Successful</h2>
          <p className="text-[#111110] opacity-70 mb-8 leading-relaxed">
            Your password has been successfully reset. You will be redirected to the home page in a few seconds.
          </p>
          <Link href="/" className="inline-block bg-[#111110] hover:bg-[#dcbd8e] hover:text-[#111110] text-white px-8 py-4 font-bold transition-all duration-200 uppercase tracking-[0.15em] text-sm border-2 border-[#111110]">
            Continue to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfbfa] flex items-center justify-center p-4">
      <div className="bg-white border-4 border-[#111110] max-w-md w-full p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#111110] mb-3 uppercase tracking-[0.1em]">Reset Your Password</h2>
          <p className="text-[#111110] opacity-70">Enter your new password below</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-600 text-red-800">
            <p className="text-sm font-semibold uppercase tracking-wider">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="newPassword" className="block text-xs font-bold text-[#111110] mb-2 uppercase tracking-[0.15em]">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              required
              minLength={6}
              className="w-full px-4 py-3 border-2 border-[#111110] focus:outline-none focus:border-[#dcbd8e] bg-white text-[#111110] transition-colors"
            />
          </div>

          <div className="mb-8">
            <label htmlFor="confirmPassword" className="block text-xs font-bold text-[#111110] mb-2 uppercase tracking-[0.15em]">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              minLength={6}
              className="w-full px-4 py-3 border-2 border-[#111110] focus:outline-none focus:border-[#dcbd8e] bg-white text-[#111110] transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#111110] hover:bg-[#dcbd8e] hover:text-[#111110] disabled:bg-gray-400 text-white py-4 px-4 font-bold transition-all duration-200 uppercase tracking-[0.15em] text-sm border-2 border-[#111110] mb-6"
          >
            {loading ? 'Resetting Password...' : 'Reset Password'}
          </button>

          <div className="text-center">
            <Link href="/" className="text-[#111110] hover:text-[#dcbd8e] text-xs uppercase tracking-[0.1em] font-semibold">
              Back to Home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ResetPassword() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#fcfbfa] flex items-center justify-center p-4">
        <div className="bg-white border-4 border-[#111110] max-w-md w-full p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-6 border-4 border-[#111110] border-t-transparent animate-spin"></div>
          <p className="text-[#111110] uppercase tracking-[0.15em] font-semibold text-sm">Loading...</p>
        </div>
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}