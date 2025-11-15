import Image from "next/image";
import Link from "next/link";
import React from "react";

interface HomeLayoutProps {
    children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
    return (
        <div>
            {" "}
            <div className="bg-gradient-to-b from-[#F5F8FF] to-[#DBF5FF] py-[30px] h-[500px]">
                <div className="max-w-[1170px] mx-auto relative">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 mb-6">
                        <Image
                            src="/emergency.svg"
                            alt="logo"
                            width={28.83}
                            height={30}
                        />
                        <h1 className="text-2xl font-bold text-[#19C0FF] font-sans text-center">
                            Tripzy
                        </h1>
                    </Link>
                    {children}
                </div>
            </div>
        </div>
    );
}
