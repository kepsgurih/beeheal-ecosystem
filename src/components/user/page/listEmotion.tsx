"use client";

import { ListOfEmotion } from "@/services/user";
import { toast } from "react-toastify";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { IEmotion } from "@/types/types";
import Image from "next/image";
import anger from '@/assets/img/anger.png'
import sad from '@/assets/img/sad.png'
import fear from '@/assets/img/fear.png'
import neutral from '@/assets/img/neutral.png'
import joy from '@/assets/img/joy.png'


export interface modalUser {
  show: boolean;
  id: string;
}

export default function EmotionList() {
  const [users, setUsers] = useState<IEmotion[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>(""); // Variabel untuk debounced value

  const filteredUsers = users.filter((item) => {
    const matchesSearchTerm = debouncedSearchTerm
      ? item.fullName.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      : true;


    return matchesSearchTerm;
  });
  const getAllUser = async () => {
    try {
      const { data, error } = await ListOfEmotion();
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
        setUsers(data);
      }
    } catch (error) {
      console.error(error, 'src/comps/user/page/listUser')
      toast.error("Terjadi kesalahan pada sistem");
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const showEmotion = (val: number) => {
    switch (val) {
      case 1:
        return (
          <Image src={anger} alt="" width={30} />
        )
      case 2:
        return (
          <Image src={sad} alt="" width={30} />
        )
      case 3:
        return (
          <Image src={fear} alt="" width={30} />
        )
      case 4:
        return (
          <Image src={neutral} alt="" width={30} />
        )
      default:
        return (
          <Image src={joy} alt="" width={30} />
        )
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <div className="p-4">
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

      </div>
      <div className="mb-4 text-sm text-gray-600">
        Total: {filteredUsers.length} pengguna
      </div>

      {filteredUsers.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          {searchTerm
            ? "Tidak ada pengguna yang sesuai dengan filter"
            : <span className="loading loading-ring loading-lg"></span>}
        </div>
      ) : (
        <Table className="table table-xs">
          <Thead>
            <Tr>
              <Th>Nama Lengkap</Th>
              <Th>Emosi</Th>
              <Th>Dibuat</Th>
              <Th>DiUpdate</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredUsers.map((item: IEmotion) => (
              <Tr key={item._id} className="hover:bg-base-200">
                <Td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={item.avatar}
                          alt={`Avatar ${item.fullName}`}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{`${item.fullName}`}</div>
                    </div>
                  </div>
                </Td>
                <Td>
                  {showEmotion(item.emotionType)}
                </Td>
                <Td>
                  {new Date(item.createdDate).toLocaleDateString("en-US") +
                    " " +
                    new Date(item.createdDate).toLocaleTimeString("en-US")}
                </Td>
                <Td>
                  {new Date(item.updatedDate).toLocaleDateString("en-US") +
                    " " +
                    new Date(item.updatedDate).toLocaleTimeString("en-US")}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </div>
  );
}