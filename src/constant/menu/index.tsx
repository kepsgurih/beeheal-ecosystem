import { DashboardOutlined, OrderedListOutlined } from "@ant-design/icons";
import { Breadcrumb } from "@chakra-ui/react";
import React from "react";

export const constantMenuStakeholder = [
    {
        key: 'home',
        label: 'Dashboard',
        href: '/dashboard',
        icon: <DashboardOutlined />,
        breadcrumb: [
            {
                key: 0,
                title: 'Home',
                value: '/dashboard'
            }
        ]
    },
    {
        key: 'TaskManagement',
        label: 'Task Management',
        href: '/dashboard/board',
        icon: <OrderedListOutlined />,
        breadcrumb: [
            {
                key: 0,
                title: 'Home',
                value: '/dashboard/'
            },
            {
                key: 1,
                title: 'board',
                value: '/dashboard/board'
            }
        ]

    }
]