import { DashboardOutlined, OrderedListOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
import React from "react";

export const constantMenuStakeholder: MenuProps['items'] = [
    {
        key: 'home',
        label: 'Dashboard',
        icon: <DashboardOutlined />
    },
    {
        key: 'TaskManagement',
        label: 'Task Management',
        icon: <OrderedListOutlined />

    }
]