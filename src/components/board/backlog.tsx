// components/board/backlog.tsx

import { ITask } from "@/types/types";

export const Backlog = ({ tasks }: { tasks: ITask[] }) => (
    <div className="overflow-y-auto flex-1 max-h-[calc(100vh-250px)]">
        <div className="space-y-4">
            {tasks.map(task => (
                <div key={task.id} className="card bg-base-100 shadow-md flex items-center gap-4 p-4">
                    <div className="flex-1">
                        <h2 className="card-title">{task.title}</h2>
                        <p>{task.description}</p>
                    </div>
                    <div className="card-actions justify-end">
                        <div className="badge badge-outline">Backlog</div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);
