// Page.tsx (Server Component)
import { Backlog } from "@/components/board/backlog";
import ButtonGroup from "@/components/board/buttonGroup";
import { SprintContent } from "@/components/board/sprint";
import ContainerLayout from "@/components/layout/container";
import { AppstoreOutlined, MenuOutlined } from "@ant-design/icons";

async function fetchTasks(p0: string) {
    const res = await fetch(process.env.PUBLIC_URL + "/api/v1/tasks/sprint/" + p0, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
    });
    return res.json();
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id
    const paramsId = id?.[0] || '1';
    const tasks = await fetchTasks(paramsId);;

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

            <ButtonGroup paramsId={paramsId} />
            {
                paramsId === '3' ? <Backlog tasks={tasks} /> : <SprintContent title="Current" tasks={tasks} />
            }

        </ContainerLayout>
    );
}
