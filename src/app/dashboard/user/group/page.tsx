"use client"

import HeaderListOrgs from '@/components/user/header/listOrgs';
import OrgList from '@/components/user/page/listOrgs';

export default function UserGroup() {
    return (
        <div className='card bg-base-100 p-5'>
            <div className='mb-5'>
                <HeaderListOrgs />
            </div>
            <OrgList />
        </div>
    )
}