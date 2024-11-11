import { Backlog } from "@/components/board/backlog";
import { CurrentSprint, NextSprint } from "@/components/board/sprint";
import ContainerLayout from "@/components/layout/container";
import { AppstoreOutlined, MenuOutlined } from "@ant-design/icons";

export default async function Page() {
    return (
        <ContainerLayout>
            <div className="flex flex-wrap items-center gap-4 mb-4">
                {/* Toggle View */}
                <label className="swap swap-rotate">
                    <input type="checkbox" />
                    <div className="swap-on flex align-center items-center bg-base-100 p-2 rounded-xl shadow-md">
                        <AppstoreOutlined />
                    </div>
                    <div className="swap-off flex align-center items-center bg-base-100 p-2 rounded-xl shadow-md">
                        <MenuOutlined />
                    </div>
                </label>

                {/* Search */}
                <div className="join">
                    <input className="input input-bordered join-item input-sm" placeholder="Cari Task" />
                    <button className="btn join-item rounded-r-full btn-sm btn-primary">Cari</button>
                </div>
            </div>

            <div role="tablist" className="tabs tabs-bordered mt-2">
                {/* Sprint Tab */}
                <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Sprint Berjalan" defaultChecked />
                <div role="tabpanel" className="tab-content">
                    <CurrentSprint />
                </div>

                {/* Next Sprint Tab */}
                <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Sprint Selanjutnya" />
                <div role="tabpanel" className="tab-content">
                    <NextSprint />
                </div>

                {/* Backlog Tab */}
                <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Backlog" />
                <div role="tabpanel" className="tab-content">
                    <Backlog />
                </div>
            </div>
        </ContainerLayout>
    );
}
