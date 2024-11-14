"use client"

import { constantMenuStakeholder } from "@/constant/menu";
import Link from "next/link";
import React from "react";
import iconBee from '@/assets/img/BeeHeal.png'
import Image from "next/image";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const pathname = usePathname()

  return (
    <div
      className={`shadow-xl fixed inset-y-0 left-0 min-w-64 bg-base-100 p-3 transition-transform transform lg:static ${isOpen ? "translate-x-0" : "-translate-x-full"
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
      <div className="flex items-center justify-center border-b-4 border-primary pb-5">

        <div>
        <div>
          <Image src={iconBee} alt="" className="w-16" />
        </div>
          <div className="text-xs font-mono">
            Ecosystem
          </div>
        </div>

      </div>

      <ul className="menu">
        {constantMenuStakeholder
          .filter((item) => item && item.notShow !== true)
          .map((item, index) => {
            if (item.hasChild) {
              return (
                <li key={item.key}>
                  <details open={pathname.startsWith(item.href)}>
                    <summary>
                      {React.cloneElement(item.icon as React.ReactElement, {
                        className: 'mr-3'
                      })}
                      {item.label}
                    </summary>
                    <ul className="bg-base-100">
                      {
                        item.child.map((itemchild) => (
                          <li key={itemchild.key}  className={`${pathname.includes(itemchild.value) ? 'bg-primary text-base-100' : ''} my-2`}>
                            <Link href={itemchild.value} className="active:text-base-100 focus:text-base-100">{itemchild.title}</Link>
                          </li>
                        ))
                      }
                    </ul>
                  </details>
                </li>
              )
            } else {
              return (
                <li key={index} className={`${pathname === item.href ? 'bg-primary text-base-100' : ''} my-2`}>
                  <Link href={item.href} className={`active:text-base-100 focus:text-base-100`}>
                    {React.cloneElement(item.icon as React.ReactElement, {
                      className: 'mr-3'
                    })}
                    {item.label}
                  </Link>
                </li>
              )
            }
          }
          )}
      </ul>
    </div>
  );
};

export default Sidebar;
