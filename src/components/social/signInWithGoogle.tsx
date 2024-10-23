import { signIn } from "@/auth"
import { GoogleOutlined } from "@ant-design/icons"

export default function SignInWithGoogle() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google", { redirectTo: "/dashboard" })
      }}
    >
      <button
      type="submit"
      className="btn btn-block btn-error"
      >
        <GoogleOutlined />
        Masuk dengan Google
      </button>
    </form>
  )
} 