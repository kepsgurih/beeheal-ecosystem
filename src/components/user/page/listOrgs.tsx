"use client"

import { listAllOrgServices, putOrgServices } from "@/services/org";
import { ListOfUsers } from "@/services/user";
import { IOrganization, IUser, IUserSimple } from "@/types/types";
import { SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react"
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { toast } from "react-toastify";

export default function OrgList() {

    const [orgs, setOrgs] = useState([])

    const [showModal, setShowModal] = useState({
        id: '',
        title: '',
        show: false
    })

    const [search, setSearch] = useState('')
    const [users, setUsers] = useState<IUser[]>([]);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>(""); // Variabel untuk debounced value

    const filteredUsers = users.length > 0 ? users.filter((user) => {
        const matchesSearch =
            user.emailAddresses.some((email) =>
                email.emailAddress.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
            );
        const matchesNoOrg = !user.privateMetadata.role
        return matchesSearch && matchesNoOrg
    }) : []


    const getAllUser = async () => {
        try {
            const { data, error } = await ListOfUsers();
            if (error) {
                toast.error("Error, Terjadi kesalahan pada saat mendapatkan data", {
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
                setUsers(data.data);
            }
        } catch (error) {
            console.error(error, 'src/compos/user/page')
            toast.error("Terjadi kesalahan pada sistem");
        }
    };

    const sendData = async (id: string, userId: string) => {
        const { data, error } = await putOrgServices(id, userId)
        if (error) {
            toast.error(data)
        } else {
            toast.success(data)
        }
    }

    const getAll = async () => {
        const { data, error } = await listAllOrgServices()
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
            setOrgs(data)
        }
    }


    useEffect(() => {
        getAll()
        getAllUser()
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(search);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [search]);

    if (orgs.length === 0) {
        return (
            <div className="w-full h-full flex justify-center">
                <span className="loading loading-ring loading-lg"></span>
            </div>
        )
    }

    return (
        <>
            <Table className="table table-xs font-mono">
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Pemilik</Th>
                        <Th>Member</Th>
                        <Th>Tampilkan di Aplikasi</Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        orgs.map((item: IOrganization) => {
                            return (
                                <Tr key={item._id}>
                                    <Td>{item.label}</Td>
                                    <Td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={item.owner.avatar}
                                                        alt={`Avatar ${item.owner.name}`}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{`${item.owner.name}`}</div>
                                            </div>
                                        </div>
                                    </Td>
                                    <Td>
                                        <div className="collapse" id={item._id} itemID={item._id}>
                                            <input type="checkbox" className="peer" />
                                            <div
                                                className="collapse-title peer-checked:bg-secondary peer-checked:text-secondary-content">
                                                {item.users.length} Orang
                                            </div>
                                            <div
                                                className="collapse-content peer-checked:bg-secondary peer-checked:text-secondary-content">
                                                {
                                                    item.users.map((users: IUserSimple, index) => {
                                                        return (
                                                            <div key={index} className="flex items-center gap-3">
                                                                <div className="avatar">
                                                                    <div className="mask mask-squircle h-12 w-12">
                                                                        <img
                                                                            src={users.avatar}
                                                                            alt={`Avatar ${users.name}`}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="font-bold">{`${users.name}`}</div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </Td>
                                    <Td>
                                        {item.show ? 'Tentu' : 'Tidak'}
                                    </Td>
                                    <Th>
                                        <button className="btn btn-primary btn-sm btn-block" onClick={() => setShowModal({ show: true, id: item._id, title: item.label })}>Ubah Pemilik</button>
                                    </Th>
                                </Tr>
                            )
                        })}
                </Tbody>

            </Table>
            <dialog open={showModal.show} id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog" onClick={() => setShowModal({ show: false, id: '', title: '' })}>
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">{showModal.title}</h3>
                    <div>
                        <div className="mb-4 flex gap-4 items-center">
                            <label className="input input-sm input-bordered flex-1 flex items-center gap-2">
                                <input
                                    type="text"
                                    className="grow"
                                    placeholder="Cari berdasarkan email..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <SearchOutlined />
                            </label>

                        </div>
                        <div>
                            {
                                filteredUsers.length > 0
                                    ?
                                    filteredUsers.map((item, index) => {
                                        return (
                                            <div key={index} className="mb-3">

                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle h-12 w-12">
                                                            <img
                                                                src={item.imageUrl}
                                                                alt={`Avatar ${item.firstName} ${item.lastName}`}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="font-bold">{`${item.firstName} ${item.lastName}`}</div>
                                                    </div>
                                                    <div>
                                                        <button className="btn btn-primary btn-sm" onClick={() => sendData(showModal.id, item.id)}>Kirim</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                    :
                                    null
                            }
                        </div>
                    </div>
                </div>
            </dialog>
        </>
    )
}