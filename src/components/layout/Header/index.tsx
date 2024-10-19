"use client";

import { useSession } from "next-auth/react";
import React from "react";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { data: session } = useSession()

  return (
    <header className="bg-base-100 shadow-md p-4 flex justify-between items-center">
      <button className="btn btn-ghost lg:hidden" onClick={toggleSidebar}>
        <svg
          className="swap-off fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 512 512">
          <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
        </svg>
      </button>
      <h1 className="text-xl font-bold text-left">Admin Dashboard</h1>
      <div className="dropdown dropdown-bottom dropdown-end">
        <div tabIndex={0} role="button" className="btn w-16 h-16 rounded-full">
          <div className="avatar">
            <div className="w-16 rounded-full">
              {
                session && session.user ?
                <img src={session?.user?.image ?? "https://ui-avatars.com/api/?size=128&name"}/>
                :
                <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
              }
            </div>
          </div>
        </div>
        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
          <li><a>Item 1</a></li>
          <li><a>Item 2</a></li>
        </ul>
      </div>

    </header>
  );
};

export default Header;
