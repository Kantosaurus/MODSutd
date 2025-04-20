'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

export default function SignupPage() {
  const [name, setName] = useState('')
  const [studentId, setStudentId] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [showGreeting, setShowGreeting] = useState(false)
  const [studentIdError, setStudentIdError] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationError, setVerificationError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [showAnimation, setShowAnimation] = useState(false)
  const [animationCompleted, setAnimationCompleted] = useState(false)

  const studentIdRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmPasswordRef = useRef<HTMLInputElement>(null)

  const [animationData, setAnimationData] = useState(null)
  const [isLoadingAnimation, setIsLoadingAnimation] = useState(false)

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      setCurrentStep(2)
      setTimeout(() => {
        studentIdRef.current?.focus()
      }, 500)
    }
  }

  const handleStudentIdSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Format the student ID
    let formattedId = studentId.trim()
    
    // If it's 4 digits and doesn't start with 100, add 100 in front
    if (formattedId.length === 4 && !formattedId.startsWith('100')) {
      formattedId = '100' + formattedId
      setStudentId(formattedId)
    }
    
    // Validate the student ID
    if (formattedId.length < 7) {
      setStudentIdError('Student ID must be 7 digits')
      return
    }
    
    if (formattedId.length > 7) {
      setStudentIdError('Student ID must be exactly 7 digits')
      return
    }
    
    if (!formattedId.startsWith('100')) {
      setStudentIdError('Student ID must start with 100')
      return
    }
    
    setStudentIdError('')
    setCurrentStep(3)
    setTimeout(() => {
      passwordRef.current?.focus()
    }, 100)
  }

  const handleStudentIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    
    // Only allow digits
    if (/^\d*$/.test(value)) {
      setStudentId(value)
      setStudentIdError('') // Clear error when user types
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password.trim()) {
      if (password !== confirmPassword) {
        setPasswordError('Passwords do not match')
        return
      }
      setIsVerifying(true)
      try {
        const response = await fetch('/api/verify-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ studentId }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.details || data.error || 'Failed to send verification email')
        }

        setShowAnimation(true)
      } catch (error) {
        console.error('Verification error:', error)
        setVerificationError(error instanceof Error ? error.message : 'Failed to send verification email. Please try again.')
      } finally {
        setIsVerifying(false)
      }
    }
  }

  const goBack = (step: number) => {
    setCurrentStep(step)
  }

  useEffect(() => {
    const loadAnimation = async () => {
      setIsLoadingAnimation(true)
      try {
        const response = await fetch('https://lottie.host/149a1f69-ac4b-47ab-8b4c-a9cf7027f417/n4Nd6TOihV.json')
        if (!response.ok) {
          throw new Error('Failed to fetch animation')
        }
        const data = await response.json()
        setAnimationData(data)
      } catch (error) {
        console.error('Error loading animation:', error)
        // Fallback to a simple success message if animation fails
        setShowAnimation(false)
        setShowGreeting(true)
      } finally {
        setIsLoadingAnimation(false)
      }
    }

    if (showAnimation) {
      loadAnimation()
    }
  }, [showAnimation])

  if (showAnimation) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen flex items-center justify-center bg-gray-50"
      >
        <div className="w-64 h-64">
          {isLoadingAnimation ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : animationData ? (
            <Lottie
              animationData={animationData}
              loop={false}
              autoplay
              onComplete={() => {
                setTimeout(() => {
                  setShowAnimation(false)
                  setShowGreeting(true)
                }, 500)
              }}
              style={{ pointerEvents: 'none' }}
            />
          ) : (
            <div className="text-center">
              <p className="text-gray-600">Loading animation...</p>
            </div>
          )}
        </div>
      </motion.div>
    )
  }

  if (showGreeting) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
      >
        <motion.div 
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-md w-full space-y-8"
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center"
          >
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-3xl font-extrabold text-gray-900 space-y-2"
            >
              <div>Hello {name}!</div>
              <div>We're pleased to have you onboard!</div>
            </motion.h2>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-4 text-xl text-gray-600"
            >
              Just a few more steps before we're complete!
            </motion.p>
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-6"
            >
              <p className="text-lg text-gray-600">
                We've sent a verification email to:
              </p>
              <p className="text-lg font-medium text-blue-600 mt-2">
                {studentId}@mymail.sutd.edu.sg
              </p>
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mt-4 text-sm text-gray-500"
              >
                Please check your email and click the verification link to complete your registration.
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
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
                <div className="relative">
                  <input
                    id="student-id"
                    name="studentId"
                    type="text"
                    required
                    ref={studentIdRef}
                    className={`appearance-none relative block w-full px-3 py-2 text-5xl text-gray-900 bg-gray-50 focus:outline-none focus:ring-0 focus:border-0 ${
                      studentIdError ? 'border-red-500 border-2' : ''
                    }`}
                    placeholder="100XXXX"
                    value={studentId}
                    onChange={handleStudentIdChange}
                    maxLength={7}
                  />
                  <AnimatePresence>
                    {studentIdError && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5, x: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.5, x: 20 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <AnimatePresence>
                  {studentIdError && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="mt-2 text-sm text-red-500"
                    >
                      {studentIdError}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.form>
          )}

          {currentStep >= 3 && (
            <>
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2"
                onSubmit={(e) => {
                  e.preventDefault()
                  if (password.trim()) {
                    setCurrentStep(4)
                    setTimeout(() => {
                      confirmPasswordRef.current?.focus()
                    }, 500)
                  }
                }}
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
                    ref={passwordRef}
                    className="appearance-none relative block w-full px-3 py-2 text-5xl text-gray-900 bg-gray-50 focus:outline-none focus:ring-0 focus:border-0"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isVerifying}
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

              {currentStep >= 4 && (
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-4 mt-4"
                  onSubmit={handlePasswordSubmit}
                >
                  <h2 className="text-5xl font-extrabold text-gray-900">
                    Let's confirm again just to be sure:
                  </h2>
                  <div className="w-full relative">
                    <label htmlFor="confirm-password" className="sr-only">
                      Confirm Password
                    </label>
                    <input
                      id="confirm-password"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      ref={confirmPasswordRef}
                      className={`appearance-none relative block w-full px-3 py-2 text-5xl text-gray-900 bg-gray-50 focus:outline-none focus:ring-0 focus:border-0 ${
                        passwordError ? 'border-red-500 border-2' : ''
                      }`}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value)
                        setPasswordError('')
                      }}
                      disabled={isVerifying}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none z-20"
                      style={{ marginTop: '2px' }}
                    >
                      {showConfirmPassword ? (
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
                  {passwordError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-4 text-sm text-red-500 text-center"
                    >
                      {passwordError}
                    </motion.div>
                  )}
                </motion.form>
              )}
            </>
          )}
          {verificationError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 text-sm text-red-500 text-center"
            >
              {verificationError}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
} 