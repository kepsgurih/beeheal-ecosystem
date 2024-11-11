import LayoutComponents from '@/components/layout';
import { Metadata } from 'next';
import React from 'react';
import { redirect } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';
import { currentUser } from '@clerk/nextjs/server'
import { SignOutButton } from '@clerk/nextjs';

export const metadata: Metadata = {
  title: 'Beeheal - Dashboard'
};

async function Layout({ children }: { children: React.ReactNode }) {
  const user = await currentUser()

  if (!user) {
    redirect('/')
  } else {
    if (user?.privateMetadata.role === 'admin' || user?.privateMetadata.role === 'stakeholder') {
      return (
        <LayoutComponents>
          {children}
        </LayoutComponents>
      );
    } else {
      return (
        <div className='w-full bg-base-200 h-screen items-center align-center justify-center flex'>
          <div className='bg-base-100 p-3 md:w-2/4 w-full m-2'>
            <div className='text-3xl font-bold font-sans text-center'>
              403
            </div>
            <div className='text-center font-mono'>
              Anda tidak dapat mengakses halaman ini ! Hubungi Administrator untuk informasi lebih lanjut
            </div>
            <div>
              <SignOutButton redirectUrl='/'>
                <button className='btn btn-error text-center btn-block text-base-100 mt-5' type="submit">Sign Out</button>
              </SignOutButton>
            </div>
          </div>
        </div>
      )
    }
  }

}

export default Layout;