"use client";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { ITask, IUserSimpleEmail } from "@/types/types";
import { locationTask } from "@/constant/board/group";

export const SprintContent = ({ tasks }: { title: string; tasks: ITask[] }) => {
    const router = useRouter()

    return (
        <div className="overflow-y-auto flex-1 max-h-[calc(100vh-250px)] pt-10">
            <div className="flex flex-col md:flex-row gap-4">
                {
                    locationTask.map((item) => {
                        return (
                            <div key={item.id} className="w-full md:w-1/3">
                                <>
                                    <h3 className="text-lg font-semibold mb-3">{item.name}</h3>
                                    <div className="space-y-4">
                                        {tasks.filter((task) => task.position === item.id).map((task) => (

                                            <div key={task.id} className="card bg-base-100 shadow-md" onClick={() => router.push('/dashboard/board/view/' + task.id)}>
                                                <div className="card-body">
                                                    <h2 className="card-title">{task.title}</h2>
                                                    <p>{task.description}</p>
                                                    {/* Avatar Group */}
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
                                            </div>
                                        ))}
                                    </div>
                                    {
                                        item.id === 1 &&
                                        <button className="btn btn-primary btn-sm w-full mt-2">
                                            <PlusCircleOutlined /> Tambah Task
                                        </button>
                                    }
                                </>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};