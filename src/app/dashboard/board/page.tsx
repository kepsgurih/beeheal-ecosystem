import { AppstoreOutlined, MenuOutlined,  FileDoneOutlined, DashOutlined } from "@ant-design/icons";

export default function Page() {
    return (
        <div className="container mx-auto p-4">
            {/* Top Navigation Bar */}

            <div className="flex flex-wrap items-center gap-4">
                {/* <div className="join bg-white shadow-sm rounded-lg">
                    <button className="join-item btn btn-ghost gap-2 text-gray-600">
                        <AppstoreOutlined />
                        Board View
                    </button>
                    <div className="divider divider-horizontal m-0 h-10"></div>
                    <button className="join-item btn btn-ghost gap-2 text-gray-600">
                        <MenuOutlined />
                        List View
                    </button>
                </div> */}

                <label className="swap swap-rotate">
                    <input type="checkbox" />

                    <div className="swap-on flex align-center items-center bg-base-100 p-2 rounded-xl shadow-xl">
                        <AppstoreOutlined className="text-xl" />

                    </div>

                    <div className="swap-off flex align-center items-center bg-base-100 p-2 rounded-xl shadow-xl">
                        <MenuOutlined className="text-xl" />
                    </div>
                </label>
                <div className="join">
                    <input className="input input-bordered join-item input-sm" placeholder="Cari Task" />
                    <button className="btn join-item rounded-r-full btn-sm btn-primary">Cari</button>
                </div>

            </div>

            {/* Task Section */}
            <div className="mt-5">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                        <h2 className="text-base font-bold">Tugas kamu</h2>
                        <span className="w-6 h-6 rounded-full bg-yellow-100 text-yellow-600 text-xs font-bold flex items-center justify-center">
                            5
                        </span>
                    </div>
                    <button className="btn btn-ghost btn-square">
                        <DashOutlined />
                    </button>
                </div>

                {/* Task Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <div className="card bg-base-100 shadow-sm">
                        <div className="card-body p-4">
                            <div className="card-title text-xs font-bold flex justify-between">
                                <span>{'Page Order and Setting'}</span>
                                <FileDoneOutlined />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}