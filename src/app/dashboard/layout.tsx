import LayoutComponents from '@/components/layout';
import { Metadata } from 'next';
import React from 'react';
import { auth } from '@/auth';

export const metadata: Metadata = {
  title: 'Beeheal - Dashboard'
};

async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (!session) {
    return <div>Not authenticated</div>
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