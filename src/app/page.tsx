import { Box, Flex, Spinner } from "@chakra-ui/react"
import { redirect } from 'next/navigation'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
export default async function Page() {
  const { isAuthenticated } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();

  if(!isUserAuthenticated){
    redirect('/api/auth/login?post_login_redirect_url=/dashboard')
  } else {
    redirect('/dashboard')
  }
  
}