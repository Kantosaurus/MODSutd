'use client'

import React from 'react'
import Navbar from '@/components/navbar'
import { SidebarNavigation } from '@/components/ui/sidebar'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()
  
  // Check if user is on the home page (not authenticated)
  const isHomePage = pathname === '/'
  
  if (isHomePage) {
    return <Navbar />
  }
  
  // For authenticated pages, show the sidebar
  return <SidebarNavigation />
} 