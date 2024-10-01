'use client'

import { Avatar, AvatarBadge, Box, Text } from "@chakra-ui/react"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function AvatarSide() {
    const { user } = useKindeBrowserClient();

    return (
        <Box py={2} textAlign={'center'} justifyItems={'center'} borderBottom={'2px'} borderColor={'#E9EBF0'} borderBottomWidth={'0.5'}>
            <Avatar borderColor={'#B8BFCC'} borderWidth={1} src={'https://gravatar.com/avatar/1ced9de4617fee08be373014d6ec8c2865bb55bdaae0480a2c0c28a4367d14bd?d=blank&size=200'}>
                <AvatarBadge boxSize='1.25em' bg='green.500' />
            </Avatar>
            <Text mt={2} fontSize={11} fontWeight={'bold'}>
                {user && user.given_name ? user.given_name : ''}
            </Text>
            <Text fontSize={11} color={'#B8BFCC'}>
                BeeHeal Team
            </Text>
        </Box>
    )
}