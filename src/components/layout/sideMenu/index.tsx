"use client"

import { constantMenuStakeholder } from "@/constant/menu";
import Link from "next/link";
import React from "react";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`shadow-xl fixed inset-y-0 left-0 w-64 bg-base-100 p-4 transition-transform transform lg:static ${isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 z-50`}
    >
      <div className="flex justify-end lg:hidden">
        <button onClick={toggleSidebar} className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <ul className="menu p-4 overflow-y-auto">
        <li className="menu-title">
          <span>Menu</span>
        </li>
        {constantMenuStakeholder
          .filter((item) => item && item.notShow !== true)
          .map((item, index) => (
            <li key={index}>
              <Link href={item.href}>
                {React.cloneElement(item.icon as React.ReactElement, {
                  style: {
                    color: '#007AFF',
                    transition: 'color 0.2s',
                  },
                  className: 'sidebar-icon'
                })}
                {item.label}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Sidebar;
