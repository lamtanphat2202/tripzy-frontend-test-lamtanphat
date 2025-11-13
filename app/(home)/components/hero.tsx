"use client";

import SearchForm from "@/app/(home)/components/search-form";
import TravelTab from "@/app/(home)/components/travel-tab";
import Image from "next/image";
import { useState } from "react";

export default function HeroSection() {
    const [activeTab, setActiveTab] = useState("bus");

    return (
        <div className="bg-gradient-to-b from-[#F5F8FF] to-[#DBF5FF] py-[30px] text-center">
            <div className="max-w-[1170px] mx-auto relative">
                {/* Logo */}
                <div className="flex items-center gap-2 mb-6">
                    <Image
                        src="/emergency.svg"
                        alt="logo"
                        width={28.83}
                        height={30}
                    />
                    <h1 className="text-2xl font-bold text-[#19C0FF] font-sans text-center">
                        Tripzy
                    </h1>
                </div>

                {/* Main Heading */}
                <h2 className="text-4xl font-semibold text-gray-800 mb-2 mt-[133px] font-sans">
                    Travel Smarter, Not Harder
                </h2>

                {/* Tagline */}
                <p className="text-gray-600 text-base pb-[177px] font-normal">
                    Make every trip effortless. Tripzy lets you book rides and
                    plan journeys with ease
                </p>

                <div className="absolute w-full top-70 bg-white rounded-lg shadow-sm">
                    <TravelTab
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                    />

                    <div className="mt-8">
                        {activeTab === "bus" && <SearchForm />}
                        {activeTab === "hotel" && (
                            <div className="text-center py-16 text-gray-500">
                                <p className="text-lg">No data</p>
                            </div>
                        )}
                        {activeTab === "flight" && (
                            <div className="text-center py-16 text-gray-500">
                                <p className="text-lg">No data</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
