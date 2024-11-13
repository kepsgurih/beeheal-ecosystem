import NewTaskForm from '@/components/board/newTask';
import React from 'react';

export default async function Page() {
    return (
        <div className="h-screen w-full overflow-hidden bg-base-200">
            <div className="h-full w-full overflow-y-auto p-2 sm:p-4">
                <NewTaskForm />
            </div>
        </div>
    );
};