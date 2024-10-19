import { Box, Center, Stack, Text } from "@chakra-ui/react";
import bg from '@/assets/bg/bg2.jpg';
import logo from '@/assets/img/iconBee.png'
import Image from "next/image";
import SignInWithGithub from "@/components/social/signInWithGithub";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SignInWithCredentials from "@/components/social/credentials";
import SignInWithGoogle from "@/components/social/signInWithGoogle";

export default async function SignIn() {
  const session = await auth();

  if (session?.user?.email) {
    redirect('/dashboard');
  }
  return (
    <div className="h-screen align-center flex justify-center items-center">
      <div>
        <Image alt="" src={bg} layout="fill" objectFit="cover" quality={100} />
      </div>
      <Box boxShadow={'xl'} p={4} className="min-h-1/2 md:w-1/4 bg-blue-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10">
        <div>
          <Image src={logo} alt="" width={60} height={60} />
          <Center>
            <Text fontSize={'xl'} fontWeight={'bold'}>BeeHeal</Text>
          </Center>
          <Center>
            <Text>Login ke Ekosistem dengan OAuth</Text>
          </Center>
          <Stack py={5}>
            <SignInWithGithub />
            <SignInWithGoogle />
          </Stack>
        </div>
      </Box>
    </div>
  );
}