"use client"

import { ListOfUsers } from "@/services/user"
import { IUser } from "@/types/types"
import { toast } from 'react-toastify';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react"
import ModalGroup from "../modal/group";
import { UpdateUserOrgs } from "@/services/org";

export interface modalUser {
    show: boolean;
    id: string
}

export default function UserList() {
    const [loading, setLoading] = useState<boolean>(true)
    const [users, setUsers] = useState<IUser[]>([])
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [showNoOrg, setShowNoOrg] = useState<boolean>(false)
    const [modalOpen, setModalOpen] = useState<modalUser>({
        show: false,
        id: ''
    })

    // Filter users based on search term and organization filter
    const filteredUsers = users.filter((user) => {
        const matchesSearch = 
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        
        if (showNoOrg) {
            return matchesSearch && (!user.orgsId || user.orgsId === "");
        }
        
        return matchesSearch;
    });

    const getAllUser = async () => {
        try {
            const { data, error } = await ListOfUsers()
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
                setUsers(data)
            }
        } catch (error) {
            toast.error('Terjadi kesalahan pada sistem');
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const showModal = () => {
        toast.warning('Maaf fitur ini masih tahap pengembangan!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    const selectGroup = async (id: string) => {
        setLoading(true)
        try {
            const response = await UpdateUserOrgs(modalOpen.id, id)
            if (!response) {
                toast.error('Error, Terjadi kesalahan pada saat mendapatkan data')
            } else {
                toast.success('Berhasil')
                setModalOpen({ id: '', show: false })
                getAllUser() // Refresh user list after update
            }
        } catch (error) {
            toast.error('Terjadi kesalahan pada sistem')
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const closeGroup = () => {
        setModalOpen({
            show: false,
            id: ''
        })
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    const toggleNoOrgFilter = () => {
        setShowNoOrg(!showNoOrg)
    }

    useEffect(() => {
        getAllUser()
    }, [])

    if (loading) {
        return (
            <div className="bg-base-100 w-full h-[300px] flex-col flex justify-center items-center">
                <div className="loading loading-ring loading-lg"></div>
                <div>Tunggu Sebentar</div>
            </div>
        )
    }

    return (
        <div className="p-4">
            {/* Search and Filter Bar */}
            <div className="mb-4 flex gap-4 items-center">
                <label className="input input-sm input-bordered flex-1 flex items-center gap-2">
                    <input 
                        type="text" 
                        className="grow" 
                        placeholder="Cari berdasarkan nama atau email..." 
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <SearchOutlined />
                </label>
                
                <button 
                    onClick={toggleNoOrgFilter}
                    className={`btn btn-sm ${showNoOrg ? 'btn-primary' : 'btn-outline'}`}
                    title="Tampilkan pengguna tanpa organisasi"
                >
                    <FilterOutlined /> 
                    {showNoOrg ? 'Semua User' : 'Tanpa Organisasi'}
                </button>
            </div>

            {/* User Count Summary */}
            <div className="mb-4 text-sm text-gray-600">
                Total: {filteredUsers.length} pengguna
                {showNoOrg && ` (tanpa organisasi)`}
            </div>

            {filteredUsers.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    {searchTerm || showNoOrg ? 
                        'Tidak ada pengguna yang sesuai dengan filter' : 
                        'Tidak ada pengguna tersedia'}
                </div>
            ) : (
                <Table className="table table-xs">
                    <Thead>
                        <Tr>
                            <Th>Nama Lengkap</Th>
                            <Th>Email</Th>
                            <Th>Verifikasi ?</Th>
                            <Th>Organisasi</Th>
                            <Th>Aksi</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {filteredUsers.map((item: IUser) => (
                            <Tr key={item._id} className="hover:bg-base-200">
                                <Td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={item.image}
                                                    alt={`Avatar ${item.name}`} 
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{item.name}</div>
                                        </div>
                                    </div>
                                </Td>
                                <Td>{item.email}</Td>
                                <Td>
                                    <span className={`badge ${item.emailVerified ? 'badge-success' : 'badge-warning'}`}>
                                        {item.emailVerified ? "Sudah Verifikasi" : "Belum Verifikasi"}
                                    </span>
                                </Td>
                                <Td>
                                    <span className={`${!item.orgsId ? 'text-gray-500' : ''}`}>
                                        {item.orgsId || 'User'}
                                    </span>
                                </Td>
                                <Td>
                                    <button 
                                        onClick={showModal} 
                                        className="btn btn-primary btn-xs"
                                    >
                                        Kirim Email
                                    </button>
                                    <button 
                                        onClick={() => setModalOpen({ show: true, id: item._id })} 
                                        className={`ml-2 btn btn-xs ${item.orgsId ? 'btn-warning' : 'btn-secondary'}`}
                                    >
                                        {item.orgsId ? 'Pindah Grup' : 'Masukan Grup'}
                                    </button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            )}

            <ModalGroup 
                closeGroup={closeGroup} 
                selectGroup={selectGroup} 
                modalOpen={modalOpen} 
            />
        </div>
    )
}