import { Backlog } from "@/components/board/backlog";
import ButtonGroup from "@/components/board/buttonGroup";
import { SprintContent } from "@/components/board/sprint";

async function fetchTasks(p0: string) {
    const res = await fetch(process.env.PUBLIC_URL + "/api/v1/tasks/sprint/" + p0, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res.json();
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    const paramsId = id?.[0] || "1";
    const tasks = await fetchTasks(paramsId);

    return (
        <div className="h-full overflow-y-scroll">
            <ButtonGroup paramsId={paramsId} />
            {paramsId === "3" ? <Backlog tasks={tasks} /> : <SprintContent title="Current" tasks={tasks} />}
        </div>
    );
}
