'use client'

import React from 'react'
import Navigation from '@/components/navigation'
import HomeDashboard from '@/components/home-dashboard'

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full">
      <Navigation />
      <main className="flex-1 w-full md:pl-[60px]">
        <HomeDashboard />
      </main>
    </div>
  )
} 