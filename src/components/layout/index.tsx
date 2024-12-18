'use client';

import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './sideMenu';
import { ToastContainer } from 'react-toastify';


function LayoutComponents({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      <ToastContainer />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-4 bg-base-300 overflow-hidden">
          {children}
        </main>
      </div>
    </div>

  );
};

export default LayoutComponents;