'use client';

import { useState } from 'react';

export default function Home() {
  const [activeModal, setActiveModal] = useState<'login' | 'register' | 'forgot' | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
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

  const handleSubmit = async (e: React.FormEvent, type: 'login' | 'register' | 'forgot') => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (type === 'register') {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }
        
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `
              mutation Register($email: String!, $password: String!, $name: String!) {
                register(email: $email, password: $password, name: $name) {
                  token
                  user {
                    id
                    email
                    name
                  }
                }
              }
            `,
            variables: {
              email: formData.email,
              password: formData.password,
              name: formData.name
            }
          }),
        });

        const result = await response.json();
        if (result.errors) {
          setError(result.errors[0].message);
        } else {
          localStorage.setItem('token', result.data.register.token);
          alert('Registration successful!');
          setActiveModal(null);
          resetForm();
        }
      } else if (type === 'login') {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `
              mutation Login($email: String!, $password: String!) {
                login(email: $email, password: $password) {
                  token
                  user {
                    id
                    email
                    name
                  }
                }
              }
            `,
            variables: {
              email: formData.email,
              password: formData.password
            }
          }),
        });

        const result = await response.json();
        if (result.errors) {
          setError(result.errors[0].message);
        } else {
          localStorage.setItem('token', result.data.login.token);
          alert('Login successful!');
          setActiveModal(null);
          resetForm();
        }
      } else if (type === 'forgot') {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `
              mutation RequestPasswordReset($email: String!) {
                requestPasswordReset(email: $email) {
                  success
                  message
                  token
                }
              }
            `,
            variables: {
              email: formData.email
            }
          }),
        });

        const result = await response.json();
        if (result.errors) {
          setError(result.errors[0].message);
        } else {
          alert(result.data.requestPasswordReset.message);
          if (result.data.requestPasswordReset.token) {
            console.log('Reset token (dev only):', result.data.requestPasswordReset.token);
          }
          setActiveModal(null);
          resetForm();
        }
      }
    } catch {
      setError('Network error. Please try again.');
    }

    setLoading(false);
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      name: '',
      confirmPassword: ''
    });
    setError('');
  };

  const closeModal = () => {
    setActiveModal(null);
    resetForm();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                MODSutd
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setActiveModal('login')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors">
                Login
              </button>
              <button 
                onClick={() => setActiveModal('register')}
                className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg transition-colors">
                Register
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Welcome to <span className="text-indigo-600 dark:text-indigo-400">MODSutd</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            A modern platform for managing academic modules and student data at Singapore University of Technology and Design
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button 
              onClick={() => setActiveModal('register')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors">
              Get Started
            </button>
            <button className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 px-8 py-3 rounded-lg text-lg font-medium border border-gray-300 dark:border-gray-600 transition-colors">
              Learn More
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Course Management</h3>
              <p className="text-gray-600 dark:text-gray-300">Efficiently manage course information, prerequisites, and academic requirements.</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Student Tracking</h3>
              <p className="text-gray-600 dark:text-gray-300">Track student enrollments, progress, and academic achievements.</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Smart Recommendations</h3>
              <p className="text-gray-600 dark:text-gray-300">AI-powered course recommendations based on prerequisites and academic history.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      {activeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {activeModal === 'login' && 'Login'}
                {activeModal === 'register' && 'Sign Up'}
                {activeModal === 'forgot' && 'Reset Password'}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 rounded">
                {error}
              </div>
            )}

            <form onSubmit={(e) => handleSubmit(e, activeModal)}>
              {activeModal === 'register' && (
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
              )}

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              {activeModal !== 'forgot' && (
                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
              )}

              {activeModal === 'register' && (
                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                {loading ? 'Loading...' : 
                  activeModal === 'login' ? 'Login' :
                  activeModal === 'register' ? 'Sign Up' : 'Send Reset Link'
                }
              </button>

              {activeModal === 'login' && (
                <div className="mt-4 text-center">
                  <button
                    type="button"
                    onClick={() => setActiveModal('forgot')}
                    className="text-indigo-600 hover:text-indigo-500 text-sm"
                  >
                    Forgot your password?
                  </button>
                </div>
              )}

              <div className="mt-4 text-center">
                {activeModal === 'login' ? (
                  <p className="text-gray-600 dark:text-gray-400">
                    Don&apos;t have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setActiveModal('register')}
                      className="text-indigo-600 hover:text-indigo-500 font-medium"
                    >
                      Sign up
                    </button>
                  </p>
                ) : activeModal === 'register' ? (
                  <p className="text-gray-600 dark:text-gray-400">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setActiveModal('login')}
                      className="text-indigo-600 hover:text-indigo-500 font-medium"
                    >
                      Login
                    </button>
                  </p>
                ) : (
                  <p className="text-gray-600 dark:text-gray-400">
                    Remember your password?{' '}
                    <button
                      type="button"
                      onClick={() => setActiveModal('login')}
                      className="text-indigo-600 hover:text-indigo-500 font-medium"
                    >
                      Login
                    </button>
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600 dark:text-gray-300">
            <p>&copy; 2024 MODSutd. Built with Next.js, TypeScript, and Tailwind CSS.</p>
            <p className="mt-2">Powered by PostgreSQL and Neo4j Graph Database.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
