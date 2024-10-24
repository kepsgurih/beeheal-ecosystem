import UserList from "@/components/user/page/listUser";
import { Suspense } from "react";

export default function User() {
    return (
        <div className="card bg-base-100 w-full">
            <Suspense fallback={<p>Loading User</p>}>
                <UserList />
            </Suspense>
        </div>
    )
}
