'use client'

import { HeaderProps } from '@/types/types';
import { HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
    Avatar,
    Box,
    Flex,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Spacer,
    Text,
    useColorMode,
} from '@chakra-ui/react';
import BreadCrumbLayout from '../BreadCrumbLayout';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs';
import { constantMenuStakeholder } from '@/constant/menu';
import { usePathname } from 'next/navigation';

const HeaderLayout = ({ toggleSidebar }: HeaderProps) => {
    const { colorMode, toggleColorMode } = useColorMode()
    const pathname = usePathname()
    const header = constantMenuStakeholder.filter(item => item.href === pathname)[0]
    console.log(header)

    return (
        <Box
            as="header"
            py={4}
            px={10}
            ml={{ base: 0, md: 250 }}
            borderRadius={{ base: 0, md: 15 }}
        >

            <Flex alignItems="center">
                <Flex>
                    <IconButton
                        icon={<HamburgerIcon />}
                        onClick={toggleSidebar}
                        variant="ghost"
                        color={colorMode === 'light' ? '#718096' : 'white'}
                        aria-label="Toggle sidebar"
                        display={{ base: 'flex', md: 'none' }}
                        mr={2}
                    />
                    <div>
                        <BreadCrumbLayout data={header?.breadcrumb} />
                        <Text fontWeight={'bold'} fontSize={14}>
                            {header?.label}
                        </Text>
                    </div>
                </Flex>
                <div>

                </div>
                <Spacer />
                <IconButton
                    icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                    onClick={toggleColorMode}
                    variant="ghost"
                    color={colorMode === 'light' ? '#718096' : 'white'}
                    aria-label="Toggle color mode"
                    mr={2}
                />
                <Menu>
                    <MenuButton as={Avatar} size="sm" src="https://bit.ly/broken-link" cursor="pointer" />
                    <MenuList color="black">
                        <MenuItem>
                            <Text fontWeight="bold">John Doe</Text>
                        </MenuItem>
                        <MenuItem>
                            <Text fontSize="sm">john.doe@example.com</Text>
                        </MenuItem>
                        <MenuItem>Profile</MenuItem>
                        <MenuItem>
                            <LogoutLink postLogoutRedirectURL='/'>
                                Log out
                            </LogoutLink>
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
        </Box>
    );
};

export default HeaderLayout;
