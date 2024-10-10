import React from 'react';
import {
  Box,
  VStack,
  Link as ChakraLink,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  Flex,
  useBreakpointValue,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { SidebarItemProps, SidebarProps } from '@/types/types';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import logo from '@/assets/img/iconBee.png';
import AvatarSide from './avatarSide';
import { constantMenuStakeholder } from '@/constant/menu';

const SidebarItem = ({ icon, children, href, ...rest }: SidebarItemProps & { href: string }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link href={href} passHref legacyBehavior>
      <ChakraLink style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
        <Flex
          align="center"
          p="2"
          my={1}
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          bg={isActive ? '#007AFF' : 'transparent'}
          color={isActive ? 'white' : 'inherit'}
          _hover={{
            bg: '#007AFF',
            color: 'white',
          }}
          {...rest}
        >
          {React.cloneElement(icon as React.ReactElement, {
            style: {
              color: isActive ? 'white' : '#007AFF',
              transition: 'color 0.2s',
            },
            className: 'sidebar-icon'
          })}
          <Box ml="4">{children}</Box>
        </Flex>
      </ChakraLink>
    </Link>
  );
};

const SidebarContent = () => {
  const color = useColorModeValue('#141515', 'white');
  
  return (
    <VStack align="stretch" spacing={0}>
      <Box borderBottom={'2px'} borderColor={'#E9EBF0'} borderBottomWidth={'0.5'}>
        <Flex mx={8} alignItems={'center'} justify={'left'} py={5}>
          <Image src={logo} alt='' style={{ width: 30 }} />
          <div>
            <Text fontWeight={'bold'} textColor={color} fontSize={12}>
              BeeHeal
            </Text>
            <Text fontWeight={'light'} textColor={color} fontSize={12}>
              Ecosystem
            </Text>
          </div>
        </Flex>
      </Box>
      <AvatarSide />
      <Box mt={5}>
        <style jsx global>{`
          .sidebar-icon {
            transition: color 0.2s;
          }
          .chakra-link:hover .sidebar-icon {
            color: white !important;
          }
        `}</style>
        {constantMenuStakeholder
          .filter((item) => item && item.notShow !== true)
          .map((item) => (
            <SidebarItem
              key={item.key}
              fontWeight={'500'}
              icon={item.icon}
              href={item.href}
            >
              <Text fontSize={'11'} pr={'10px'} fontWeight={'600'}>
                {item.label}
              </Text>
            </SidebarItem>
          ))}
      </Box>
    </VStack>
  );
};

const SideMenuLayout = ({ isOpen, onClose }: SidebarProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const bgColor = useColorModeValue('white', 'rgb(15 23 42)');

  if (isMobile) {
    return (
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size={'xs'}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody>
              <SidebarContent />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
  }

  return (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="100"
      overflowX="hidden"
      overflowY="auto"
      bg={bgColor}
      boxShadow={'xl'}
      borderColor="#03346E"
      borderRightWidth={{ base: '1px', md: '0' }}
      display={{ base: 'none', md: 'block' }}
    >
      <SidebarContent />
    </Box>
  );
};

export default SideMenuLayout;