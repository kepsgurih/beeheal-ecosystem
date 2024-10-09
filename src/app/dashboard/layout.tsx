import LayoutComponents from '@/components/layout';
import { Metadata } from 'next';
import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import UserDataInitializer from '@/components/userInitialize';

export const metadata: Metadata = {
  title: 'Beeheal - Dashboard'
}

async function getUserData() {
  const cookieStore = cookies();
  const token = cookieStore.get('auth_token');
  if (!token) {
    return {
      data: null,
      error: 'Token tidak ditemukan!'
    }
  }
  const response = await fetch('http://localhost:3000/api/v1/auth/me', {
    headers: {
      'Authorization': `Bearer ${token.value}`
    }
  });
  if (!response.ok) {
    return {
      data: null,
      error: 'Gagal memuat data'
    }
  }
  return {
    data: response.json(),
    error: null
  }
}


async function Layout({ children }: { children: React.ReactNode }) {
  const { data, error } = await getUserData();

  if (error) {
    redirect('/')
  }
  return (
    <LayoutComponents>
      <UserDataInitializer userData={data} error={error} />      
      {children}
    </LayoutComponents>
  )
};

export default Layout;