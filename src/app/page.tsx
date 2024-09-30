"use client"

import { Box, Flex, Spinner } from "@chakra-ui/react";
import { redirect, useRouter } from "next/navigation";
import { useSessionContext } from "supertokens-auth-react/recipe/session";

export default function Page() {
  const session = useSessionContext();
  const router = useRouter()

  if (session.loading) {
    return (
      <Flex justify="center" align="center" gap={'middle'} style={{ height: '100vh' }}>
        <Box bgColor={'white'} boxShadow={'lg'} padding={10} borderRadius={10}>
          <Spinner size='xl' />
        </Box>
      </Flex>
    )
  }

  if (session.doesSessionExist === false) {
    router.replace('/auth')
  }

  if (session.userId) {
    router.replace('/dashboard')
  }

  return (
    <Flex direction={'row'} justify="center" align="center" gap={'middle'} style={{ height: '100vh' }}>
      <Box bgColor={'white'} boxShadow={'lg'} padding={10} borderRadius={10}>
        <Spinner size='xl' />
      </Box>
      <div className="text-center">
        Mengarahkan...
      </div>
    </Flex>
  )
}