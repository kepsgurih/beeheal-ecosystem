import { signIn } from "@/auth"
import { GoogleOutlined } from "@ant-design/icons"
import { Button } from "@chakra-ui/react"

export default function SignInWithGoogle() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google", { redirectTo: "/dashboard" })
      }}
    >
      <Button colorScheme="orange" leftIcon={<GoogleOutlined />} w={'100%'} type="submit">Masuk dengan Google</Button>
    </form>
  )
} 