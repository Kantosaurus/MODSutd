'use client'

import React from 'react'
import Navigation from '@/components/navigation'
import LoginHero from '@/components/login-hero'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <LoginHero />
    </main>
  )
} 