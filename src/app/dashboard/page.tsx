'use client'

import React from 'react'
import Navigation from '@/components/navigation'
import HomeDashboard from '@/components/home-dashboard'

export default function DashboardPage() {
  return (
    <div className="flex h-screen">
      <Navigation />
      <main className="flex-1 overflow-auto md:ml-[60px] lg:ml-[300px] transition-all duration-300">
        <HomeDashboard />
      </main>
    </div>
  )
} 