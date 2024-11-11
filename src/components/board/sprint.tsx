// components/board/sprint.tsx
"use client"; // Menandakan komponen ini menggunakan React Hooks di client

import { useState } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { editTask } from "@/services/tasks"; // Import service untuk update task
import { useRouter } from "next/navigation";
import { ITask, IUserSimpleEmail } from "@/types/types";

export const SprintContent = ({ tasks }: { title: string; tasks: ITask[] }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedTask, setSelectedTask] = useState<ITask | null>(null); // Menyimpan task yang dipilih
    const [newTitle, setNewTitle] = useState("");
    const [newDesc, setNewDesc] = useState("");
    const router = useRouter()

    const handleEditClick = (task: ITask) => {
        setSelectedTask(task); // Set task yang akan diedit
        setNewTitle(task.title);
        setNewDesc(task.description)
        setIsModalVisible(true); // Tampilkan modal
    };

    const handleSave = async () => {
        if (selectedTask) {
            const updatedTask = { ...selectedTask, title: newTitle, description: newDesc };
            await editTask(updatedTask.id, updatedTask);
            router.refresh()
            setIsModalVisible(false); // Tutup modal setelah disimpan
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false); // Tutup modal tanpa menyimpan
    };

    return (
        <div className="overflow-y-auto flex-1 max-h-[calc(100vh-250px)] pt-10">
            <div className="flex flex-col md:flex-row gap-4">
                {/* Todo */}
                <div className="w-full md:w-1/3">
                    <h3 className="text-lg font-semibold mb-3">Todo</h3>
                    <div className="space-y-4">
                        {tasks.filter((task) => task.position === 1).map((task) => (
                            <div key={task.id} className="card bg-base-100 shadow-md" onClick={() => handleEditClick(task)}>
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
                        <button className="btn btn-primary btn-sm w-full mt-2">
                            <PlusCircleOutlined /> Tambah Task
                        </button>
                    </div>
                </div>

                {/* In Progress */}
                <div className="w-full md:w-1/3">
                    <h3 className="text-lg font-semibold mb-3">In Progress</h3>
                    <div className="space-y-4">
                        {tasks.filter((task) => task.position === 2).map((task) => (
                            <div key={task.id} className="card bg-base-100 shadow-md" onClick={() => handleEditClick(task)}>
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
                </div>

                {/* Done */}
                <div className="w-full md:w-1/3">
                    <h3 className="text-lg font-semibold mb-3">Done</h3>
                    <div className="space-y-4">
                        {tasks.filter((task) => task.position === 3).map((task) => (
                            <div key={task.id} className="card bg-base-100 shadow-md" onClick={() => handleEditClick(task)}>
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
                </div>
            </div>

            {/* Modal untuk Edit Task */}
            {isModalVisible && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
                        <div>
                            <label className="block mb-2">Task Title:</label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)} // Mengupdate state title
                            />
                        </div>
                        <div>
                            <label className="block mb-2">Task Desc:</label>
                            <textarea onChange={(e) => setNewDesc(e.target.value)} className="textarea textarea-bordered" placeholder="Bio">{newDesc}</textarea>
                        </div>
                        <div className="modal-action">
                            <button className="btn btn-primary" onClick={handleSave}>
                                Simpan
                            </button>
                            <button className="btn" onClick={handleCancel}>
                                Batal
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export const CurrentSprint = ({ tasks }: { tasks: ITask[] }) => {
    return <SprintContent title="Current Sprint" tasks={tasks} />;
};

export const NextSprint = ({ tasks }: { tasks: ITask[] }) => {
    return <SprintContent title="Next Sprint" tasks={tasks} />;
};
