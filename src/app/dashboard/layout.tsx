'use client';

import React, { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import SideMenuLayout from '@/components/layout/sideMenu';
import HeaderLayout from '@/components/layout/Header';
import { SessionAuth } from 'supertokens-auth-react/recipe/session';

function LayoutComponents({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen)
  
  return (
    <SessionAuth>
      <Flex minHeight="100vh" direction="column">
        <HeaderLayout toggleSidebar={toggleSidebar} />
        <Flex flex={1}>
          <SideMenuLayout isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
          <Box as="main" flex={1} ml={{ base: 0, md: 60 }} p={4}>
            {children}
          </Box>
        </Flex>
      </Flex>
    </SessionAuth>
  );
};

export default LayoutComponents;