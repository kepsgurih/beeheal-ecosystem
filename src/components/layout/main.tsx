"use client"

import React, { useEffect, useState } from "react"

interface mainProps {
    children: React.ReactNode
}

export default function MainLayout({ children }: mainProps) {
    const [dataTheme, setDataTheme] = useState<string | null>(null);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        setDataTheme(savedTheme);
    }, []);

    return (
        <div data-theme={dataTheme?.toString()}>
            {children}
        </div>
    )
}