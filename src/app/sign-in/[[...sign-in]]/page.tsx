import { SignIn } from '@clerk/nextjs'

export default function Page() {
    return (
        <div className='flex h-screen w-screen bg-base-100 justify-center items-center self-center'>
            <SignIn />
        </div>
    )
}