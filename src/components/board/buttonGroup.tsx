"use client"

import Link from "next/link";

export default function ButtonGroup({ paramsId }: { paramsId: string }) {
    const getValue = (val: string) => {
        switch (val) {
            case "1":
                return 'Current Sprint';
            case "2":
                return 'Next Sprint';
            case "3":
                return 'Completed tasks';
            default:
                return "Loading"
        }
    }
    return (
        <div className="gap-4">
            <div className="dropdown dropdown-bottom">
                <div tabIndex={0} role="button" className="btn m-1 btn-secondary">{getValue(paramsId)}</div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                    <li><Link href={'/dashboard/board/1'}>{getValue("1")}</Link></li>
                    <li><Link href={'/dashboard/board/2'}>{getValue("2")}</Link></li>
                    <li><Link href={'/dashboard/board/3'}>{getValue("3")}</Link></li>
                </ul>
            </div>
            <Link href={'/dashboard/board/new'} className="btn btn-primary">
                New Task
            </Link>
        </div>
    )
}