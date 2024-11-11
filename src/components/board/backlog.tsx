// Backlog.tsx
export const Backlog = () => (
    <div className="overflow-y-auto flex-1 max-h-[calc(100vh-250px)]">
        <div className="space-y-4">
            {[4, 5].map((item) => (
                <div key={item} className="card bg-base-100 shadow-md flex items-center gap-4 p-4">
                    <div className="flex-1">
                        <h2 className="card-title">Task {item}</h2>
                        <p>Deskripsi singkat tugas ini.</p>
                    </div>
                    <div className="card-actions justify-end">
                        <div className="badge badge-outline">Backlog</div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);
