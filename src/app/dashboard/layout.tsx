import LayoutComponents from '@/components/layout';
import { Metadata } from 'next';
import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import UserDataInitializer from '@/components/userInitialize';

export const metadata: Metadata = {
  title: 'Beeheal - Dashboard'
};

async function getUserData() {
  const cookieStore = cookies();
  const token = cookieStore.get('auth_token');

  if (!token) {
    return {
      data: null,
      error: 'Token tidak ditemukan!'
    };
  }

  try {
    const response = await fetch(`${process.env.PUBLIC_URL as string}api/v1/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token.value}`
      },
      next: { revalidate: 0 } // Disable cache for this request
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const dataUser = await response.json();
    return {
      data: dataUser,
      error: null
    };
  } catch (error) {
    console.error('Error fetching user data:', error);
    return {
      data: null,
      error: 'Gagal memuat data'
    };
  }
}

async function Layout({ children }: { children: React.ReactNode }) {
  const { data, error } = await getUserData();

  if (error) {
    console.error('Error in Layout:', error);
    redirect('/');
  }

  return (
    <LayoutComponents>
      <UserDataInitializer userData={data} error={error} />
      {children}
    </LayoutComponents>
  );
}

export default Layout;