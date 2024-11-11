import { PlusCircleOutlined } from "@ant-design/icons";

export const SprintContent = ({ title, tasks }: { title: string, tasks: number[] }) => (
    <div className="overflow-y-auto flex-1 max-h-[calc(100vh-250px)] pt-10">
        <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/3">
                <h3 className="text-lg font-semibold mb-3">{title}</h3>
                <div className="space-y-4">
                    {tasks.map((item) => (
                        <div key={item} className="card bg-base-100 shadow-md">
                            <div className="card-body">
                                <h2 className="card-title">Task {item}</h2>
                                <p>Deskripsi singkat tugas ini.</p>
                                <div className="card-actions justify-end">
                                    <div className="badge badge-outline">Low</div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <button className="btn btn-primary btn-sm w-full mt-2">
                        <PlusCircleOutlined /> Tambah Task
                    </button>
                </div>
            </div>
            <div className="w-full md:w-1/3">
                <h3 className="text-lg font-semibold mb-3">In Progress</h3>
                <div className="space-y-4">
                    {[3].map((item) => (
                        <div key={item} className="card bg-base-100 shadow-md">
                            <div className="card-body">
                                <h2 className="card-title">Task {item}</h2>
                                <p>Deskripsi singkat tugas ini.</p>
                                <div className="card-actions justify-end">
                                    <div className="badge badge-outline">Medium</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-full md:w-1/3">
                <h3 className="text-lg font-semibold mb-3">Done</h3>
                <div className="space-y-4">
                    {[4, 5].map((item) => (
                        <div key={item} className="card bg-base-100 shadow-md">
                            <div className="card-body">
                                <h2 className="card-title">Task {item}</h2>
                                <p>Deskripsi singkat tugas ini.</p>
                                <div className="card-actions justify-end">
                                    <div className="badge badge-outline">High</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

export const CurrentSprint = () => {
    return <SprintContent title="Todo" tasks={[1, 2]} />;
};

export const NextSprint = () => {
    return <SprintContent title="Todo" tasks={[3]} />;
};
