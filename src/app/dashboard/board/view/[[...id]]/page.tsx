import ViewTask from '@/components/board/view';
import React from 'react';

async function fetchTasks(p0: string) {
    const res = await fetch(process.env.PUBLIC_URL + "/api/v1/tasks/" + p0, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store", // Pastikan data diambil setiap kali
    });
    return res.json();
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id
    const paramsId = id?.[0] || '1';
    const tasks = await fetchTasks(paramsId);

    const position = () => {
        if (tasks.position) {
            if (tasks.position === 1) {
                return "Todo"
            } else if (tasks.position === 2) {
                return "In Progress"
            } else {
                return "Done"
            }
        } else {
            return 'Belum Dimulai'
        }
    }

    return (
        <div className="h-screen w-full overflow-hidden bg-base-200">
            <div className="h-full w-full overflow-y-auto p-2 sm:p-4">
                <ViewTask data={tasks} position={position()} />
            </div>
        </div>
    );
};