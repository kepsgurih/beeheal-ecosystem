'use client';

import React, { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import SideMenuLayout from '@/components/layout/sideMenu';
import HeaderLayout from '@/components/layout/Header';

function LayoutComponents({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen)

  return (
    <Flex minHeight="100vh" direction="column">
      <HeaderLayout toggleSidebar={toggleSidebar} />
      <Flex flex={1}>
        <SideMenuLayout isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
        <Box as="main" flex={1} ml={{ base: 0, md: 60 }} p={4}>
          <Box ml={{ base: 0, md: 8 }}>
            {children}
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export default LayoutComponents;