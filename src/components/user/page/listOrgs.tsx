"use client"

import { ListOfUsers } from "@/services/user"
import { IUser } from "@/types/types"
import { ChevronDownIcon } from "@chakra-ui/icons"
import {
    Button,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useToast
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"

export default function OrgList() {
    const toast = useToast()
    const [users, setUsers] = useState<IUser[]>([])

    const getAllUser = async () => {
        const { data, error } = await ListOfUsers()
        if (error) {
            toast({
                title: 'Error',
                description: 'Terjadi kesalahan saat mendapatkan semua user',
                status: 'error',
                duration: 5000,
                isClosable: true
            })
        } else {
            setUsers(data)
        }
    }

    useEffect(() => {
        getAllUser()
    }, [])

    return (
        <TableContainer>
            <Table variant='simple' size={'sm'}>
                <TableCaption>Read Only</TableCaption>
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Name</Th>
                        <Th>Email</Th>
                        <Th>Email Verified ?</Th>
                        <Th>Action</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        users.length > 0 && users.map((item: IUser) => {
                            return (
                                <Tr>
                                    <Td>{item._id}</Td>
                                    <Td>{item.name}</Td>
                                    <Td>{item.email}</Td>
                                    <Td>{item.emailVerified ? "Sudah" : "Belum"}</Td>
                                    <Td>
                                        <Menu>
                                            <MenuButton px={2} colorScheme="blue" size={'small'} as={Button} rightIcon={<ChevronDownIcon />}>
                                                Send Email
                                            </MenuButton>
                                            <MenuList>
                                                <MenuItem>Forgot Password</MenuItem>
                                            </MenuList>
                                        </Menu>
                                    </Td>
                                </Tr>
                            )
                        })
                    }
                </Tbody>
            </Table>
        </TableContainer>
    )
}