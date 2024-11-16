"use client";
import { useRouter } from "next/navigation";
import { ITask, IUserSimpleEmail } from "@/types/types";
import { locationTask } from "@/constant/board/group";

export const SprintContent = ({ tasks }: { title: string; tasks: ITask[] }) => {
    const router = useRouter()
    const count = (val: number) => {
        const tas = tasks.filter((task) => task.position === val)
        return tas.length
    }

    const priority = (val: number) => {
        if (val === 3) {
            return "primary"
        } else if (val === 2) {
            return "warning"
        } else {
            return "ghost"
        }
    }
    const priorityName = (val: number) => {
        if (val === 3) {
            return "High"
        } else if (val === 2) {
            return "Medium"
        } else {
            return "Low"
        }
    }

    return (
        <div className="pt-10 pb-10">
            <div className="flex flex-col md:flex-row gap-4">
                {
                    locationTask.map((item) => {
                        return (
                            <div key={item.id} className="w-full md:w-1/3">
                                <>
                                    <h3 className="text-lg font-semibold mb-3">{item.name}<div className={`badge badge-${item.color} badge-outline`}>{count(item.id)}</div></h3>
                                    <div className="space-y-4">
                                        {tasks.filter((task) => task.position === item.id).map((task) => (

                                            <div key={task.id} className={`bg-base-100 shadow-md`} onClick={() => router.push('/dashboard/board/view/' + task.id)}>
                                                <div className="card-body">
                                                    <h2 className="card-title">{task.title}</h2>
                                                    {/* Avatar Group */}
                                                    <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                                                        {task.assigned?.map((user: IUserSimpleEmail, index: number) => (
                                                            <div className="avatar" key={index}>
                                                                <div className="w-8">
                                                                    <img src={user.avatar || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} alt={user.name} />
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className={`badge badge-${priority(task.priority || 1)} badge-outline`}>{priorityName(task.priority || 1)}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};