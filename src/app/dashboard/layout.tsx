import LayoutComponents from '@/components/layout';
import { Metadata } from 'next';
import React from 'react';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Beeheal - Dashboard'
};

async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (!session) {
    redirect('/')
  }

  return (
    <div>
      <LayoutComponents>
        {children}
      </LayoutComponents>
    </div>
  );
}

export default Layout;