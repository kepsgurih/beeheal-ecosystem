import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

  export async function GET(request: Request, { params }: { params: Promise<{ sprint: string }> }) {
  const sprint= (await params).sprint;
  if (!sprint) return NextResponse.json({ error: "sprint is required" }, { status: 400 });

  try {
    const tasks = await prisma.task.findMany({
      where: { sprint: Number(sprint) },
    });
    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error("Error fetching tasks by sprint:", error);
    return NextResponse.json({ error: "Error fetching tasks by sprint" }, { status: 500 });
  }
}
