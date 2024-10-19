import { signIn } from "@/auth"
import { GithubOutlined } from "@ant-design/icons"
import { Button } from "@chakra-ui/react"

export default function SignInWithGithub() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("github", { redirectTo: "/dashboard" })
      }}
    >
      <Button colorScheme="blue" leftIcon={<GithubOutlined />} w={'100%'} type="submit">Masuk dengan GitHub</Button>
    </form>
  )
} 