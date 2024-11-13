import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const { id } = await request.json();

    if (!id) {
        return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    try {
        const existingTask = await prisma.task.findUnique({
            where: { id: Number(id) },
        });
        if (!existingTask) {
            return NextResponse.json({ error: "Task not found" }, { status: 404 });
        }
        await prisma.task.delete({
            where: { id: Number(id) },
        });
        return NextResponse.json({ message: 'Task berhasil dihapus' }, { status: 200 });
    } catch (error) {
        console.error("Error deleting task:", error);
        return NextResponse.json({ error: "Error deleting task" }, { status: 500 });
    }
}
