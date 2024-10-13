'use client'

import { Avatar, AvatarBadge, Box, Skeleton, Text } from "@chakra-ui/react"
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function AvatarSide() {
    const { data: session } = useSession()

    return (
        <Box onClick={() => redirect('/dashboard/me')} _hover={{ bgColor: '#007AFF', color: 'white' }} py={2} textAlign={'center'} justifyItems={'center'} borderBottom={'2px'} borderColor={'#E9EBF0'} borderBottomWidth={'0.5'}>
            <Skeleton isLoaded={!session || true} width={'50px'} mx={'auto'} borderRadius={50}>
                <Avatar borderColor={'#B8BFCC'} borderWidth={1} src={session?.user?.image ?? "https://i.pravatar.cc/300"}>
                    <AvatarBadge boxSize='1.25em' bg='green.500' />
                </Avatar>
            </Skeleton>

            <Skeleton isLoaded={!session || true} height={'20px'} mx={'auto'}>
                <Text mt={2} fontSize={11} fontWeight={'bold'}>
                    {session?.user?.name ?? ''}
                </Text>
            </Skeleton>
            <Skeleton isLoaded={!session || true} mx={'auto'} height={'20px'}>
                <Text fontSize={11} color={'#B8BFCC'}>
                    BeeHeal Team
                </Text>
            </Skeleton>
        </Box>
    )
}