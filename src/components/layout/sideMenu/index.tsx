import {
  Box,
  VStack,
  Link,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Flex,
  useBreakpointValue,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';
import { DashboardOutlined, OrderedListOutlined } from '@ant-design/icons';
import { SidebarItemProps, SidebarProps } from '@/types/types';
import Image from 'next/image';
import logo from '@/assets/img/iconBee.png'


const SidebarItem = ({ icon, children, ...rest }: SidebarItemProps) => (
  <Link style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
    <Flex
      align="center"
      p="4"
      mx="4"
      borderRadius="lg"
      role="group"
      cursor="pointer"
      _hover={{
        bg: '#007AFF',
        color: 'white',
      }}
      {...rest}
    >
      {icon}
      <Box ml="4">{children}</Box>
    </Flex>
  </Link>
)

const SideMenuLayout = ({ isOpen, onClose }: SidebarProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false })
  const SidebarContent = (
    <VStack align="stretch" spacing={0}>
      <Flex alignItems={'center'} justify={'center'} py={5} borderBottom={'2px'} borderColor={'teal.400'}>
        <Image src={logo} alt='' style={{ width: 30 }} />
        <div>
          <Text fontWeight={'bold'}>
            BeeHeal
          </Text>
          <Text fontWeight={'bold'}>
            Ecosystem
          </Text>
        </div>
      </Flex>
      <Box mt={5}>
        <SidebarItem fontSize={'14'} fontWeight={'600'} icon={<DashboardOutlined className='hover:text-red-900' style={{ color: '#007AFF', fontWeight:'600', fontSize:18 }} />}>Dashboard</SidebarItem>
        <SidebarItem fontSize={'14'} fontWeight={'600'} icon={<OrderedListOutlined style={{ color: '#007AFF', fontWeight:'600', fontSize:18 }} />}>Task Management</SidebarItem>
      </Box>
    </VStack>
  )

  if (isMobile) {
    return (
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody>
              {SidebarContent}
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    )
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
      bg="#fff"
      boxShadow={'xl'}
      borderColor="#03346E"
      borderRightWidth={{ base: '1px', md: '0' }}
      w="60"
      display={{ base: 'none', md: 'block' }}
    >
      {SidebarContent}
    </Box>
  )
};

export default SideMenuLayout;
