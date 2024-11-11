import PostNewOrgs from "@/components/user/post/newOrg";

export default async function HeaderListOrgs() {
    return (
        <div className="drawer drawer-end">
            <div className="flex justify-between items-center">
                <div className="font-xl font-sans">
                    Manajemen Grup
                </div>
                <div>
                    <div className="drawer drawer-end">
                        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content">
                            {/* Page content here */}
                            <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary">Buat Baru</label>
                        </div>
                        <div className="drawer-side z-50">
                            <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                            <div className="bg-base-200 text-base-content min-h-full w-80 p-4">
                                <PostNewOrgs />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}