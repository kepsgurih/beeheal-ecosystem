import { DashboardOutlined, OrderedListOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";

export const constantMenuStakeholder = [
    {
        key: 'home',
        label: 'Dashboard',
        href: '/dashboard',
        notShow: false,
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
        notShow: false,
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

    },
    {
        key: 'userManagement',
        label: 'User Management',
        href: '/dashboard/user',
        notShow: false,
        hasChild: true,
        icon: <UserOutlined />,
        breadcrumb: [
            {
                key: 0,
                title: 'Home',
                value: '/dashboard/'
            },
            {
                key: 1,
                title: 'board',
                value: '/dashboard/user'
            }
        ],
        child: [
            {
                key: 0,
                title: 'Manage User',
                value: '/dashboard/user/list'
            },
            {
                key: 1,
                title: 'Manage Group',
                value: '/dashboard/user/group'
            }
        ]

    },
    {
        key: 'me',
        label: 'Profile',
        href: '/dashboard/me',
        icon: <UserOutlined />,
        notShow: true,
        breadcrumb: [
            {
                key: 0,
                title: 'Home',
                value: '/dashboard/'
            },
            {
                key: 1,
                title: 'Profile',
                value: '/dashboard/me'
            }
        ]

    }
]