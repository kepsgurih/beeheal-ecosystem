"use client"

import { groupBtn } from "@/constant/board/group";
import { useRouter } from "next/navigation";

export default function ButtonGroup({ paramsId }: { paramsId: string }) {
    const router = useRouter()
    return (
        <div className="join join-vertical lg:join-horizontal">
            {
                groupBtn.map((item, index) => {
                    return (
                        <button key={index} onClick={() => router.push('/dashboard/board/' + item.id)} className={`btn ${paramsId === item.id ? 'btn-primary' : ''} join-item`}>{item.name}</button>
                    )
                })
            }
        </div>
    )
}