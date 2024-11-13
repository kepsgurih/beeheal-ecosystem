import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const res = await request.json();
    try {
        if (!res.title) return NextResponse.json({ message: 'Title wajib diisi' }, { status: 401 });
        if (!res.description) return NextResponse.json({ message: 'Description wajib diisi' }, { status: 401 });
        if (!res.position) return NextResponse.json({ message: 'Position wajib diisi' }, { status: 401 });
        if (!res.assigned) return NextResponse.json({ message: 'Assigned wajib diisi' }, { status: 401 });
        if (!res.sprint) return NextResponse.json({ message: 'Sprint wajib diisi' }, { status: 401 });

        const task = await prisma.task.create({
            data: {
                title: res.title,
                description: res.description,
                position: res.position,
                assigned: res.assigned || [],
                owner: res.owner || {},
                sprint: res.sprint,
            },
        });

        return NextResponse.json({ message: 'Task Berhasil disimpan', data: task }, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: 'Maaf, terjadi kesalahan !' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const tasks = await prisma.task.findMany();
        return NextResponse.json(tasks, { status: 200 });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return NextResponse.json({ error: "Error fetching tasks" }, { status: 500 });
    }
}