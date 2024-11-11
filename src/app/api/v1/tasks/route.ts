import connectMongoDB from "@/lib/mongodb";
import Task from "@/models/tasks";
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { userId } = await auth()
    const res = await request.json()
    try {
        await connectMongoDB()
        // if (userId) {
        if (!res.title) return NextResponse.json({ message: 'Title wajib diisi' }, { status: 401 })
        if (!res.description) return NextResponse.json({ message: 'description wajib diisi' }, { status: 401 })
        if (!res.position) return NextResponse.json({ message: 'position wajib diisi' }, { status: 401 })
        if (!res.assigned) return NextResponse.json({ message: 'assigned wajib diisi' }, { status: 401 })
        if (!res.sprint) return NextResponse.json({ message: 'sprint wajib diisi' }, { status: 401 })

        const data = {
            title: res.title,
            description: res.description,
            position: res.position,
            assigned: res.assigned,
            sprint: res.sprint,
        }
        const tasks = await new Task(data)
        await tasks.save()
        return NextResponse.json({ message: 'Task Berhasil disimpan' }, { status: 200 })
        // } else {
        //     return NextResponse.json({ message: 'Anda Harus login terlebih dahulu !' }, { status: 401 })
        // }
    } catch (e) {
        console.error(e, 'src/app/api/v1/organization')
        return NextResponse.json({ message: 'Maaf, terjadi kesalahan !' }, { status: 401 })
    }
}