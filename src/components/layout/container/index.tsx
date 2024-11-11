import React from "react";

interface containerProps {
    children: React.ReactNode;
}

export default function ContainerLayout({ children }: containerProps) {
    return (
        <div className="container mx-auto p-4 h-screen flex flex-col">
            {children}
        </div>
    );
}
