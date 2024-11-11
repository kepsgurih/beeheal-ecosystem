"use client";

import { ListOfUsers } from "@/services/user";
import { toast } from "react-toastify";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { SearchOutlined, FilterOutlined, CloseCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { IEmailUser, IUser } from "@/types/types";

export interface modalUser {
  show: boolean;
  id: string;
}

export default function UserList() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>(""); // Variabel untuk debounced value
  const [showNoOrg, setShowNoOrg] = useState<boolean>(false);

  const filteredUsers = users.length > 0 ? users.filter((user) => {
    const matchesSearch =
      user.emailAddresses.some((email) =>
        email.emailAddress.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );

    // Filter pengguna tanpa organisasi
    const matchesNoOrg = showNoOrg ? !user.privateMetadata.role : true;

    return matchesSearch && matchesNoOrg;
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
      console.error(error, 'src/comps/user/page/listUser')
      toast.error("Terjadi kesalahan pada sistem");
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const toggleNoOrgFilter = () => {
    setShowNoOrg(!showNoOrg);
  };

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm); // Update search term with a delay
    }, 300); // 300 ms debounce delay

    return () => {
      clearTimeout(timer); // Cleanup the timer if searchTerm changes
    };
  }, [searchTerm]); // Only run the effect when searchTerm changes

  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <div className="p-4">
      {/* Search and Filter Bar */}
      <div className="mb-4 flex gap-4 items-center">
        <label className="input input-sm input-bordered flex-1 flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Cari berdasarkan email..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <SearchOutlined />
        </label>

        <button
          onClick={toggleNoOrgFilter}
          className={`btn btn-sm ${showNoOrg ? "btn-primary" : "btn-outline"}`}
          title="Tampilkan pengguna aplikasi"
        >
          <FilterOutlined />
          {showNoOrg ? "Semua User" : "Pengguna App"}
        </button>
      </div>

      {/* User Count Summary */}
      <div className="mb-4 text-sm text-gray-600">
        Total: {filteredUsers.length} pengguna
        {showNoOrg && ` (tanpa organisasi)`}
      </div>

      {filteredUsers.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          {searchTerm || showNoOrg
            ? "Tidak ada pengguna yang sesuai dengan filter"
            : <span className="loading loading-ring loading-lg"></span>}
        </div>
      ) : (
        <Table className="table table-xs">
          <Thead>
            <Tr>
              <Th>Nama Lengkap</Th>
              <Th>Email</Th>
              <Th>Verifikasi ?</Th>
              <Th>Username</Th>
              <Th>Role</Th>
              <Th>Login Terakhir</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredUsers.map((item: IUser) => (
              <Tr key={item.id} className="hover:bg-base-200">
                <Td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={item.imageUrl}
                          alt={`Avatar ${item.firstName} ${item.lastName}`}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{`${item.firstName} ${item.lastName}`}</div>
                    </div>
                  </div>
                </Td>
                <Td>
                  {item.emailAddresses.map((emails: IEmailUser, index) => {
                    return (
                      <p key={index}>{emails.emailAddress}</p>
                    )
                  })}
                </Td>
                <Td>
                  {item.emailAddresses.map((emails: IEmailUser, index) => {
                    return (
                      <p key={index}>{emails.verification.status ? <CheckCircleOutlined style={{ color: "green" }} /> : <CloseCircleOutlined style={{ color: "red" }} />}</p>
                    )
                  })}
                </Td>
                <Td>{item.username}</Td>
                <Td>{item.privateMetadata.role ? item.privateMetadata.role : 'User App'}</Td>
                <Td>
                  {new Date(item.lastActiveAt).toLocaleDateString("en-US") +
                    " " +
                    new Date(item.lastActiveAt).toLocaleTimeString("en-US")}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </div>
  );
}