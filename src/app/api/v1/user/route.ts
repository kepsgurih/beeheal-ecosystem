import { clerkClient, currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server";

export async function GET() {
    const user = await currentUser()
    const client = await clerkClient()

    const usersList = await client.users.getUserList();

    if (user && user?.privateMetadata?.role === 'admin') {
        return NextResponse.json(usersList, { status: 200 })
    }

    return NextResponse.json({ message: 'Maaf, terjadi kesalahan !' }, { status: 401 })

}