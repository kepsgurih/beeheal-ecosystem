import logo from '@/assets/img/iconBee.png'
import Image from "next/image";
import SignInWithGithub from "@/components/social/signInWithGithub";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SignInWithGoogle from "@/components/social/signInWithGoogle";
import LoginAnimation from '@/components/layout/animation/login';

export default async function SignIn() {
  const session = await auth();

  if (session?.user?.email) {
    redirect('/dashboard');
  }
  return (
    <div className="h-screen align-center flex justify-center items-center bg-base-200">
      <div className="card glass w-full md:w-1/2 p-5 m-5 shadow-xl z-50">
        <div>
          <Image src={logo} alt="" width={60} height={60} />
          <div>
            <div className="text-2xl text-center font-bold">BeeHeal</div>
          </div>
          <div>
            <div className="text-center text-base-content ">Login ke Ekosistem dengan OAuth</div>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <SignInWithGithub />
            <SignInWithGoogle />
          </div>
        </div>
      </div>
      <LoginAnimation />
    </div>
  );
}