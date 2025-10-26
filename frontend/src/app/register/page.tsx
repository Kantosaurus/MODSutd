'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    studentId: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
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
            mutation Register($studentId: String!, $password: String!) {
              register(studentId: $studentId, password: $password) {
                token
                user {
                  id
                  studentId
                }
              }
            }
          `,
          variables: {
            studentId: formData.studentId,
            password: formData.password
          }
        }),
      });

      const result = await response.json();
      if (result.errors) {
        setError(result.errors[0].message);
      } else {
        localStorage.setItem('token', result.data.register.token);
        alert('Registration successful!');
        router.push('/dashboard');
      }
    } catch {
      setError('Network error. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#fcfbfa]">
      {/* Navigation */}
      <nav className="bg-white border-b-2 border-[#111110]">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <Link href="/">
                <h1 className="text-2xl font-bold text-[#111110] tracking-[0.15em] uppercase cursor-pointer hover:text-[#dcbd8e] transition-colors">
                  MODSutd
                </h1>
              </Link>
            </div>
            <div className="flex items-center space-x-6">
              <Link
                href="/login"
                className="text-[#111110] hover:text-[#dcbd8e] transition-colors uppercase tracking-[0.1em] text-sm font-semibold">
                Already have an account?
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Register Form */}
      <main className="flex items-center justify-center px-4 py-16 lg:py-24">
        <div className="bg-white border-4 border-[#111110] max-w-lg w-full p-8 lg:p-12">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-[#111110] uppercase tracking-[0.1em] mb-3">Sign Up</h2>
            <p className="text-[#111110] opacity-70">Create your account to get started</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-600 text-red-800">
              <p className="text-sm font-semibold uppercase tracking-wider">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="studentId" className="block text-xs font-bold text-[#111110] mb-2 uppercase tracking-[0.15em]">
                Student ID
              </label>
              <input
                type="text"
                id="studentId"
                name="studentId"
                value={formData.studentId}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 border-[#111110] focus:outline-none focus:border-[#dcbd8e] bg-white text-[#111110] transition-colors"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-xs font-bold text-[#111110] mb-2 uppercase tracking-[0.15em]">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 border-[#111110] focus:outline-none focus:border-[#dcbd8e] bg-white text-[#111110] transition-colors"
              />
            </div>

            <div className="mb-8">
              <label htmlFor="confirmPassword" className="block text-xs font-bold text-[#111110] mb-2 uppercase tracking-[0.15em]">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 border-[#111110] focus:outline-none focus:border-[#dcbd8e] bg-white text-[#111110] transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#111110] hover:bg-[#dcbd8e] hover:text-[#111110] disabled:bg-gray-400 text-white py-4 px-4 font-bold transition-all duration-200 uppercase tracking-[0.15em] text-sm border-2 border-[#111110] mb-6"
            >
              {loading ? 'Loading...' : 'Sign Up'}
            </button>

            <div className="text-center">
              <p className="text-[#111110] text-sm">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="text-[#111110] hover:text-[#dcbd8e] font-bold uppercase tracking-wider"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t-2 border-[#111110] mt-auto">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-[#111110] text-sm uppercase tracking-[0.15em] font-semibold">
                &copy; 2024 MODSutd
              </p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-[#111110] opacity-70 text-sm">
                Built with Next.js, TypeScript, and Tailwind CSS
              </p>
              <p className="text-[#111110] opacity-70 text-sm mt-1">
                Powered by PostgreSQL and Neo4j Graph Database
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
