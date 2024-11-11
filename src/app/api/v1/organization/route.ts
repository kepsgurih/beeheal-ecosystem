import connectMongoDB from "@/lib/mongodb";
import Organization from "@/models/organization";
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server";

export async function GET() {
    const { userId } = await auth()
    try {
        if (userId) {
            await connectMongoDB()
            const organization = await Organization.find()
            return NextResponse.json(organization, { status: 200 })
        }
    } catch (e) {
        console.error(e, 'src/app/api/v1/organization')
        return NextResponse.json({ message: 'Maaf, terjadi kesalahan !' }, { status: 401 })
    }
}


export async function POST(request: Request) {
    const user = await currentUser()
    const res = await request.json()
    try {
        await connectMongoDB()
        if (user && user?.privateMetadata?.role === 'admin') {
            const users = [
                {
                    userid: user?.id,
                    avatar: user?.imageUrl,
                    name: user?.fullName
                }
            ]
            const data = { ...res, owner: users[0] }
            const organization = await new Organization(data)
            organization.save()
            return NextResponse.json(organization, { status: 200 })
        }
    } catch (e) {
        console.error(e, 'src/app/api/v1/organization')
        return NextResponse.json({ message: 'Maaf, terjadi kesalahan !' }, { status: 401 })
    }
}

export async function PUT(request: Request) {
    const user = await currentUser()
    const res = await request.json()
    const client = await clerkClient()
    try {
        await connectMongoDB()
        if (user && user?.privateMetadata?.role === 'admin') {
            const organization = await Organization.findById(res.orgId)
            const response = await client.users.getUser(res.userId)
            const users =
            {
                userid: response?.id,
                avatar: response?.imageUrl,
                name: response?.firstName + ' ' + response?.lastName
            }


            organization.owner = users

            await organization.save()
            await client.users.updateUserMetadata(res.userId, {
                privateMetadata: {
                    role: 'stakeholder'
                }
            })
            return NextResponse.json('Berhasil', { status: 200 })
        }
    } catch (e) {
        console.error(e, 'src/app/api/v1/organization')
        return NextResponse.json({ message: 'Maaf, terjadi kesalahan !' }, { status: 401 })
    }
}