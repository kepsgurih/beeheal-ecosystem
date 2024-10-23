"use client";

import ThemeDropdown from "@/components/themeSelector";
import { constantMenuStakeholder } from "@/constant/menu";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { data: session } = useSession()
  const pathname = usePathname()
  const header = constantMenuStakeholder.filter(item => item.href === pathname)[0]

  return (
    <header className="bg-base-100 shadow-md p-2 flex justify-between items-center">
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
      <div>
        <h1 className="font-bold text-md">{header?.label}</h1>
        <div className="breadcrumbs text-sm hidden md:block">
          <ul>
            {
              header && header?.breadcrumb.map((item) => {
                return (
                  <li key={item.key}><Link href={item.value}>{item.title}</Link></li>
                )
              })
            }
          </ul>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <ThemeDropdown />
        <div className="dropdown dropdown-bottom dropdown-end">
          <div tabIndex={0} role="button">
            <div className="avatar">
              <div className="w-12 rounded-full">
                {
                  session && session.user ?
                    <img src={session?.user?.image ?? "https://ui-avatars.com/api/?size=128&name"} />
                    :
                    <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                }
              </div>
            </div>
          </div>
          <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
            <li>
              <div className="flex flex-col items-start text-left mb-4">
                <div className="font-bold">
                  {session && session.user.name}
                </div>
                <div className="text-sm">
                {session && session.user.email}
                </div>
              </div>
            </li>
            <li>
              <button className="btn btn-block btn-warning" onClick={() => signOut()}>Sign Out</button>
            </li>
          </ul>
        </div>
      </div>

    </header>
  );
};

export default Header;
