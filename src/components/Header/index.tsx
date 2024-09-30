import { HeaderProps } from '@/types/types';
import { HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
    Avatar,
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Flex,
    Heading,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Spacer,
    Text,
    useColorMode,
    WrapItem
} from '@chakra-ui/react';
import { useKindeAuth } from '@kinde-oss/kinde-auth-nextjs';
import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";

const BreadCrumbData = () => {
    return (
        <Breadcrumb fontSize={'smaller'}>
            <BreadcrumbItem>
                <BreadcrumbLink href='#'>Home</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
                <BreadcrumbLink href='#'>Docs</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink href='#'>Breadcrumb</BreadcrumbLink>
            </BreadcrumbItem>
        </Breadcrumb>
    )
}

const HeaderLayout = ({ toggleSidebar }: HeaderProps) => {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <Box
            as="header"
            bg="teal.500"
            color="white"
            py={4}
            px={10}
            ml={{ base: 0, md: 250 }}
            borderRadius={{base:0, md:15}}
        >

            <Flex alignItems="center">
                <Flex>
                    <IconButton
                        icon={<HamburgerIcon />}
                        onClick={toggleSidebar}
                        variant="ghost"
                        color="white"
                        aria-label="Toggle sidebar"
                        display={{ base: 'flex', md: 'none' }}
                        mr={2}
                    />
                    <div>
                        <BreadCrumbData />
                        <Text fontWeight={'bold'}>
                            Dashboard
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
                    color="white"
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
                        <MenuItem><LogoutLink>Log out</LogoutLink></MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
        </Box>
    );
};

export default HeaderLayout;
