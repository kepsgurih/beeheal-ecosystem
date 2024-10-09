'use client'

import { RootState } from "@/redux/store";
import { Avatar, AvatarBadge, Box, Skeleton, Text } from "@chakra-ui/react"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function AvatarSide() {
    const user = useSelector((state: RootState) => state.auth.data);

    const [isLoading, setLoading] = useState(true)
    const navigate = useRouter()

    useEffect(() => {
        if (user) {
            setLoading(false)
        }
    }, [user])



    return (
        <Box onClick={() => navigate.push('/dashboard/me')} _hover={{ bgColor: '#007AFF', color: 'white' }} py={2} textAlign={'center'} justifyItems={'center'} borderBottom={'2px'} borderColor={'#E9EBF0'} borderBottomWidth={'0.5'}>
            <Skeleton isLoaded={isLoading || true} width={'50px'} mx={'auto'} borderRadius={50}>
                <Avatar borderColor={'#B8BFCC'} borderWidth={1} src={user && user.avatar ? user.avatar : 'https://gravatar.com/avatar/1ced9de4617fee08be373014d6ec8c2865bb55bdaae0480a2c0c28a4367d14bd?d=blank&size=200'}>
                    <AvatarBadge boxSize='1.25em' bg='green.500' />
                </Avatar>
            </Skeleton>

            <Skeleton isLoaded={isLoading || true} height={'20px'} mx={'auto'}>
                <Text mt={2} fontSize={11} fontWeight={'bold'}>
                    {user && user.name ? user.name : ''}
                </Text>
            </Skeleton>
            <Skeleton isLoaded={isLoading || true} mx={'auto'} height={'20px'}>
                <Text fontSize={11} color={'#B8BFCC'}>
                    BeeHeal Team
                </Text>
            </Skeleton>
        </Box>
    )
}