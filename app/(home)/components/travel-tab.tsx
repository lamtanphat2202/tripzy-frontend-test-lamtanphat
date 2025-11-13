"use client";

import { Bus, Hotel, Plane } from "lucide-react";
import Image from "next/image";

interface TravelTabsProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export default function TravelTab({ activeTab, onTabChange }: TravelTabsProps) {
    const tabs = [
        {
            id: "bus",
            label: "Bus & Shuttle",
            icon: "/bus.svg",
            activeClass: "bg-[#EBF9FF]",
        },
        {
            id: "hotel",
            label: "Hotel & Accommodation",
            icon: "/hotel.svg",
            activeClass: "bg-[#F4FFEB]",
        },
        {
            id: "flight",
            label: "Flight",
            icon: "/flight.svg",
            activeClass: "bg-[#EBF4FF]",
        },
    ];

    return (
        <div className="flex justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;

                return (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`flex items-center flex-1 gap-2 px-4 py-3 rounded-lg transition-all font-medium text-sm ${
                            isActive
                                ? `${tab.activeClass}`
                                : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                        }`}
                    >
                        <Image
                            src={tab.icon}
                            alt="tab-icon"
                            width={48}
                            height={48}
                        />
                        {tab.label}
                    </button>
                );
            })}
        </div>
    );
}
