import { signIn } from "@/auth"
import { GithubOutlined } from "@ant-design/icons"

export default function SignInWithGithub() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("github", { redirectTo: "/dashboard" })
      }}
    >
      <button 
      className="btn btn-block btn-accent"
      type="submit"
      >
        <GithubOutlined />
        Masuk dengan Github
      </button>
    </form>
  )
} 