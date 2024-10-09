import SignInForm from "@/components/page/signInForm";
import { Box, Center, Text } from "@chakra-ui/react";
import bg from '@/assets/bg/bg2.jpg';
import logo from '@/assets/img/iconBee.png'
import Image from "next/image";

export default async function SignIn() {
  return (
    <div className="h-screen align-center flex justify-center items-center">
      <div>
        <Image alt="" src={bg} layout="fill" objectFit="cover" quality={100} />
      </div>
      <Box w={'xl'} boxShadow={'xl'} p={4} className="min-h-1/2 w-1/2 bg-blue-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10">
        <div>
          <Center>
            <Image src={logo} alt="" width={60} height={60} />
            <Text fontSize={'xl'} fontWeight={'bold'}>BeeHeal</Text>
          </Center>
          <SignInForm />
        </div>
      </Box>
    </div>
  );
}