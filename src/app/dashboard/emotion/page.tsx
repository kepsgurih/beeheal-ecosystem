import EmotionList from "@/components/user/page/listEmotion";
import { Suspense } from "react";

export default function User() {
    return (
        <div className="card bg-base-100 w-full">
            <Suspense fallback={<p>Loading User</p>}>
                <EmotionList />
            </Suspense>
        </div>
    )
}
