'use client'

import React from 'react'
import Navbar from '@/components/navbar'
import LoginHero from '@/components/login-hero'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <LoginHero />
    </main>
  )
} 