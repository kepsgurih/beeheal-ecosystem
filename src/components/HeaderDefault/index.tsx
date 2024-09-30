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
    useToast,
    WrapItem
} from '@chakra-ui/react';
import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { useRouter } from 'next/navigation';
import { signOut } from "supertokens-auth-react/recipe/session";

const HeaderDefaultLayout = () => {
    const toast = useToast()
    const router = useRouter()

    const logout = async () => {
        await signOut()
        toast({
            title: 'Berhasil keluar.',
            description: "Anda akan diarahkan ke halaman masuk.",
            status: 'success',
            duration: 9000,
            isClosable: true,
        })
        router.replace('/')
    }
    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <Box
            as="header"
            bg="teal.500"
            color="white"
            py={4}
            px={10}
            borderBottomLeftRadius={{base:0, md:15}}
            borderBottomRightRadius={{base:0, md:15}}
        >

            <Flex alignItems="center">
                <Flex>
                    <div>
                        <Text size={'small'}>Bee Heal</Text>
                        <Text fontWeight={'bold'}>
                            Ecosystem
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
                        <MenuItem onClick={logout}>Log out</MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
        </Box>
    );
};

export default HeaderDefaultLayout;
