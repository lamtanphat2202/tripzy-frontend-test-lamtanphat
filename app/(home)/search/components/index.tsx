"use client";

import { useSearchParams } from "next/navigation";

export default function SearchContent() {
    const searchParams = useSearchParams();

    //Get Hook From Param
    const from = searchParams.get("from") || "";
    const to = searchParams.get("to") || "";
    const departureDate = searchParams.get("departureDate") || "";
    const returnDate = searchParams.get("returnDate") || "";
    const passengers = searchParams.get("passengers") || "1";

    return (
        <div className="h-[872px] w-full bg-white mt-[58px] shadow-2xl">
            {/* Search Content */}
            <div className="px-[86px] py-[97px]">
                <div className="flex flex-col space-y-2 text-lg">
                    <p>
                        <strong>From:</strong> {from}
                    </p>
                    <p className="mt-13.5">
                        <strong>To:</strong> {to}
                    </p>
                    <p className="mt-13.5">
                        <strong>Departure Date:</strong> {departureDate}
                    </p>
                    <p className="mt-13.5">
                        <strong>Return Date:</strong> {returnDate}
                    </p>
                    <p className="mt-13.5">
                        <strong>Passengers:</strong> {passengers}
                    </p>
                </div>
            </div>
        </div>
    );
}
