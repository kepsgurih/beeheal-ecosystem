import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    try {
        const task = await prisma.task.findUnique({
            where: { id: Number(id) },
        });
        if (!task) return NextResponse.json({ error: "Task not found" }, { status: 404 });
        return NextResponse.json(task, { status: 200 });
    } catch (error) {
        console.error("Error fetching task by ID:", error);
        return NextResponse.json({ error: "Error fetching task by ID" }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const updates = await request.json();

    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    try {
        // Ambil data lama task dari database
        const existingTask = await prisma.task.findUnique({
            where: { id: Number(id) },
        });

        if (!existingTask) return NextResponse.json({ error: "Task not found" }, { status: 404 });

        // Siapkan data untuk update dengan menggabungkan data lama dan data baru
        const updatedData = {
            title: updates.title ?? existingTask.title,
            description: updates.description ?? existingTask.description,
            position: updates.position ?? existingTask.position,
            assigned: updates.assigned ?? existingTask.assigned,
            owner: updates.owner ?? existingTask.owner,
            sprint: updates.sprint ?? existingTask.sprint,
        };

        // Lakukan update pada database
        const updatedTask = await prisma.task.update({
            where: { id: Number(id) },
            data: updatedData,
        });

        return NextResponse.json({ message: 'Task berhasil diperbarui', data: updatedTask }, { status: 200 });
    } catch (error) {
        console.error("Error updating task:", error);
        return NextResponse.json({ error: "Error updating task" }, { status: 500 });
    }
}