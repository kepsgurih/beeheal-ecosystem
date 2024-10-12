// 'use client'

// import { auth } from "@/auth";
// import { Avatar, AvatarBadge, Box, Skeleton, Text } from "@chakra-ui/react"
// import { redirect } from "next/navigation";

// export default async function AvatarSide() {
//     const session = await auth()

//     return (
//         <Box onClick={() => redirect('/dashboard/me')} _hover={{ bgColor: '#007AFF', color: 'white' }} py={2} textAlign={'center'} justifyItems={'center'} borderBottom={'2px'} borderColor={'#E9EBF0'} borderBottomWidth={'0.5'}>
//             <Skeleton isLoaded={true} width={'50px'} mx={'auto'} borderRadius={50}>
//                 <Avatar borderColor={'#B8BFCC'} borderWidth={1} src={user && user.avatar ? user.avatar : 'https://gravatar.com/avatar/1ced9de4617fee08be373014d6ec8c2865bb55bdaae0480a2c0c28a4367d14bd?d=blank&size=200'}>
//                     <AvatarBadge boxSize='1.25em' bg='green.500' />
//                 </Avatar>
//             </Skeleton>

//             <Skeleton isLoaded={true} height={'20px'} mx={'auto'}>
//                 <Text mt={2} fontSize={11} fontWeight={'bold'}>
//                     {user && user.name ? user.name : ''}
//                 </Text>
//             </Skeleton>
//             <Skeleton isLoaded={true} mx={'auto'} height={'20px'}>
//                 <Text fontSize={11} color={'#B8BFCC'}>
//                     BeeHeal Team
//                 </Text>
//             </Skeleton>
//         </Box>
//     )
// }
// Todo