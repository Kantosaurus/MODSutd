'use client'

import React from 'react'
import Navigation from '@/components/navigation'
import HomeDashboard from '@/components/home-dashboard'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HomeDashboard />
    </main>
  )
} 