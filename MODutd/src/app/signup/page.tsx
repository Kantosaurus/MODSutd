'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function SignupPage() {
  const [name, setName] = useState('')
  const [studentId, setStudentId] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [showGreeting, setShowGreeting] = useState(false)

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      setCurrentStep(2)
    }
  }

  const handleStudentIdSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (studentId.trim()) {
      setCurrentStep(3)
    }
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password.trim()) {
      setShowGreeting(true)
    }
  }

  const goBack = (step: number) => {
    setCurrentStep(step)
  }

  if (showGreeting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Hello! Pleased to meet you.
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Your name is: {name}
            </p>
            <p className="mt-2 text-xl text-gray-600">
              Your Student ID is: {studentId}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full">
        <div className="space-y-2">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2"
            onSubmit={handleNameSubmit}
          >
            <h2 className="text-5xl font-extrabold text-gray-900">
              Hello! My name is
            </h2>
            <div className="flex-1">
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-2 text-5xl text-gray-900 bg-gray-50 focus:outline-none focus:ring-blue-500 focus:z-10"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </motion.form>

          {currentStep >= 2 && (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2"
              onSubmit={handleStudentIdSubmit}
            >
              <h2 className="text-5xl font-extrabold text-gray-900">
                and my Student ID is
              </h2>
              <div className="flex-1">
                <label htmlFor="student-id" className="sr-only">
                  Student ID
                </label>
                <input
                  id="student-id"
                  name="studentId"
                  type="text"
                  required
                  className="appearance-none relative block w-full px-3 py-2 text-5xl text-gray-900 bg-gray-50 focus:outline-none focus:ring-blue-500 focus:z-10"
                  placeholder="100XXXX"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                />
              </div>
            </motion.form>
          )}

          {currentStep >= 3 && (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2"
              onSubmit={handlePasswordSubmit}
            >
              <h2 className="text-5xl font-extrabold text-gray-900">
                My password is
              </h2>
              <div className="flex-1 relative">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="appearance-none relative block w-full px-3 py-2 text-5xl text-gray-900 bg-gray-50 focus:outline-none focus:ring-blue-500 focus:z-10 pr-12"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none z-20"
                  style={{ marginTop: '2px' }}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </motion.form>
          )}
        </div>
      </div>
    </div>
  )
} 