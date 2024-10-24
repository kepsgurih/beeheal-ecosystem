import { SearchOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { listAllOrgServices } from "@/services/org";
import { IOrganization } from "@/types/types";

interface ModalGroupProps {
    modalOpen: {
        show: boolean;
        userId?: string;
    };
    selectGroup: (id: string) => void;
    closeGroup: () => void;
}

export default function ModalGroup({ modalOpen, selectGroup, closeGroup }: ModalGroupProps) {
    const [orgs, setOrgs] = useState<IOrganization[]>([]);
    const [valueOrgs, setValueOrgs] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>('');

    // Filter organizations based on search term
    const filteredOrgs = orgs.filter((org) =>
        org.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getAll = async () => {
        try {
            const { data, error } = await listAllOrgServices();
            if (error) {
                toast.error('Error, Terjadi kesalahan pada saat mendapatkan data', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            } else {
                setOrgs(data);
            }
        } catch (error) {
            toast.error('Terjadi kesalahan pada sistem');
            console.log(error)
        }
    };

    // Reset states when modal closes
    useEffect(() => {
        if (!modalOpen.show) {
            setSearchTerm('');
            setValueOrgs('');
        }
    }, [modalOpen.show]);

    useEffect(() => {
        if (modalOpen.show) {
            getAll();
        }
    }, [modalOpen.show]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValueOrgs(e.target.value);
    };

    return (
        <dialog id="modalOpen" className="modal" open={modalOpen.show}>
            <div className="modal-box">
                <h3 className="font-bold text-lg">Manage Grup</h3>
                <div className="py-4">
                    <label className="input input-bordered flex items-center gap-2">
                        <input
                            type="text"
                            className="grow"
                            placeholder="Cari Grup"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <SearchOutlined />
                    </label>

                    <div className="mt-10 max-h-64 bg-base-200 p-2 rounded overflow-auto">
                        {filteredOrgs.length === 0 ? (
                            <div className="text-center py-4 text-gray-500">
                                {searchTerm ? 'Tidak ada grup yang sesuai' : 'Tidak ada grup tersedia'}
                            </div>
                        ) : (
                            filteredOrgs.map((item) => (
                                <div className="form-control" key={item._id}>
                                    <label className="label cursor-pointer hover:bg-base-300 rounded-lg">
                                        <span className="label-text">{item.label}</span>
                                        <input
                                            type="radio"
                                            name="select"
                                            value={item._id}
                                            checked={valueOrgs === item._id}
                                            onChange={handleRadioChange}
                                            className="radio checked:bg-blue-500"
                                        />
                                    </label>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="modal-action">
                    <button
                        className="btn"
                        onClick={closeGroup}
                    >
                        Close
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={() => selectGroup(valueOrgs)}
                        disabled={valueOrgs === ""}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </dialog>
    );
}