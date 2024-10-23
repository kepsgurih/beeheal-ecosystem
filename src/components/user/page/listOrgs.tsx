"use client"

import { listAllOrgServices } from "@/services/org";
import { IOrganization } from "@/types/types";
import React, { useEffect, useState } from "react"
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { toast } from "react-toastify";

export default function OrgList() {

    const [orgs, setOrgs] = useState<IOrganization[]>([])

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
    }, [])

    return (
        <Table className="table table-xs font-mono">
            <Thead>
                <Tr>
                    <Th>Label</Th>
                    <Th>Jumlah Users</Th>
                    <Th>Pemilik</Th>
                    <Th>Tampil di Apps ?</Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {
                    orgs.length > 0 && orgs.map((item: IOrganization) => {
                        return (
                            <Tr key={item._id}>
                                <Td>
                                    {item.label}
                                </Td>
                                <Td>
                                    {item.users.length}
                                </Td>
                                <Td>{item.owner}</Td>
                                <Td>
                                    {item.show ? 'Tampil' : 'Tidak'}
                                </Td>
                                <Th>

                                </Th>
                            </Tr>
                        )
                    })}
            </Tbody>

        </Table>
    )
}