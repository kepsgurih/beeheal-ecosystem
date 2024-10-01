import React from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";

interface BreadcrumbItemProps {
    key: number;
    title: string;
    value: string;
}

interface BreadcrumbLayoutProps {
    data: BreadcrumbItemProps[];
}

export default function BreadCrumbLayout({ data }: BreadcrumbLayoutProps) {
    return (
        <Breadcrumb fontSize={11} color={'#718096'}>
            {data && data.length > 0 ? (
                data.map((item) => (
                    <BreadcrumbItem key={item.key}>
                        <BreadcrumbLink href={item.value}>{item.title}</BreadcrumbLink>
                    </BreadcrumbItem>
                ))
            ) : null}
        </Breadcrumb>
    );
}