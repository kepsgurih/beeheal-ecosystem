// components/board/backlog.tsx

import { ITask, IUserSimpleEmail } from "@/types/types";

export function Backlog({ tasks }: { tasks: ITask[] }) {
    return (
        <div className="overflow-y-auto flex-1 max-h-[calc(100vh-250px)] mt-10">
            <div className="space-y-4">
                {tasks.map(task => (
                    <div key={task.id} className="card bg-base-100 shadow-md flex gap-4 p-4">
                        <div className="flex-1">
                            <h2 className="card-title">{task.title}</h2>
                            <p>{task.description}</p>
                            <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                                {task.assigned?.map((user: IUserSimpleEmail, index: number) => (
                                    <div className="avatar" key={index}>
                                        <div className="w-12">
                                            <img src={user.avatar || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} alt={user.name} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="card-actions justify-end">
                            <div className="badge badge-outline">Selesai</div>
                            <div className="badge badge-outline badge-secondary">TASK-{task.id}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}