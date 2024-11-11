// Page.tsx (Server Component)
import { Backlog } from "@/components/board/backlog";
import { CurrentSprint, NextSprint } from "@/components/board/sprint";
import ContainerLayout from "@/components/layout/container";
import { ITask } from "@/types/types";
import { AppstoreOutlined, MenuOutlined } from "@ant-design/icons";

// Fungsi untuk mengambil data dari API
async function fetchTasks() {
    const res = await fetch("http://localhost:3000/api/v1/tasks", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store", // Pastikan data diambil setiap kali
    });
    return res.json();
}

export default async function Page() {
    const tasks = await fetchTasks();

    // Memfilter tasks berdasarkan sprint
    const currentSprintTasks = tasks.filter((task: ITask) => task.sprint === 1);
    const nextSprintTasks = tasks.filter((task: ITask) => task.sprint === 2);
    const backlogTasks = tasks.filter((task: ITask) => task.sprint === 3);

    return (
        <ContainerLayout>
            <div className="flex flex-wrap items-center gap-4 mb-4">
                <label className="swap swap-rotate">
                    <input type="checkbox" />
                    <div className="swap-on flex align-center items-center bg-base-100 p-2 rounded-xl shadow-md">
                        <AppstoreOutlined />
                    </div>
                    <div className="swap-off flex align-center items-center bg-base-100 p-2 rounded-xl shadow-md">
                        <MenuOutlined />
                    </div>
                </label>

                <div className="join">
                    <input className="input input-bordered join-item input-sm" placeholder="Cari Task" />
                    <button className="btn join-item rounded-r-full btn-sm btn-primary">Cari</button>
                </div>
            </div>

            <div role="tablist" className="tabs tabs-bordered mt-2">
                {/* Sprint Tab */}
                <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Sprint Berjalan" defaultChecked />
                <div role="tabpanel" className="tab-content">
                    <CurrentSprint tasks={currentSprintTasks} />
                </div>

                {/* Next Sprint Tab */}
                <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Sprint Selanjutnya" />
                <div role="tabpanel" className="tab-content">
                    <NextSprint tasks={nextSprintTasks} />
                </div>

                {/* Backlog Tab */}
                <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Backlog" />
                <div role="tabpanel" className="tab-content">
                    <Backlog tasks={backlogTasks} />
                </div>
            </div>
        </ContainerLayout>
    );
}
