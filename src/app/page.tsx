"use client"

import { useUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default function Page() {
  const { user } = useUser()

  if (!user) {
    return redirect('/sign-in')
  }

  return redirect('/dashboard')
}