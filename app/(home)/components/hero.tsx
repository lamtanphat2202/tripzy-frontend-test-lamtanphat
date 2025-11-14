"use client";

import SearchForm from "@/app/(home)/components/search-form";
import TravelTab from "@/app/(home)/components/travel-tab";
import Image from "next/image";
import { useState } from "react";

export default function HeroSection() {
    const [activeTab, setActiveTab] = useState("bus");

    return (
        <div className="text-center">
            {/* Main Heading */}
            <h2 className="text-4xl font-semibold text-gray-800 mb-2 mt-[133px] font-sans">
                Travel Smarter, Not Harder
            </h2>
            {/* Tagline */}
            <p className="text-gray-600 text-base pb-[177px] font-normal">
                Make every trip effortless. Tripzy lets you book rides and plan
                journeys with ease
            </p>

            <div className="absolute w-full top-70 bg-white rounded-lg shadow-sm">
                <TravelTab activeTab={activeTab} onTabChange={setActiveTab} />

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
    );
}
