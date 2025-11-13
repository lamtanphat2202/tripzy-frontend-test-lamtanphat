"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    MapPin,
    Calendar,
    Users,
    Search,
    ArrowRightLeft,
    Bus,
} from "lucide-react";
import Image from "next/image";
import LocationSelect from "@/app/(home)/components/travel-select";

interface SearchFormProps {
    mode?: string;
}

export default function SearchForm({ mode = "bus" }: SearchFormProps) {
    const router = useRouter();
    const [fromLocation, setFromLocation] = useState("hcm");
    const [toLocation, setToLocation] = useState(null);

    // 2. Dữ liệu options (có thể lấy từ API)
    const locationOptions = [
        { value: "hcm", label: "Hồ Chí Minh" },
        { value: "hn", label: "Hà Nội" },
        { value: "dn", label: "Đà Nẵng" },
        // ... các thành phố khác
    ];
    const [formData, setFormData] = useState({
        from: "",
        to: "",
        departureDate: "",
        returnTrip: false,
        returnDate: "",
        passengers: "1",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        const checked =
            type === "checkbox"
                ? (e.target as HTMLInputElement).checked
                : undefined;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSwap = () => {
        setFormData((prev) => ({
            ...prev,
            from: prev.to,
            to: prev.from,
        }));
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        const queryParams = new URLSearchParams({
            mode: mode,
            from: formData.from,
            to: formData.to,
            dep: formData.departureDate,
            ret: formData.returnDate,
            pax: formData.passengers,
        }).toString();

        router.push(`/search?${queryParams}`);
    };

    return (
        <form
            onSubmit={handleSearch}
            className="bg-white rounded-xl shadow-lg pt-2"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-[200px] mb-6 relative px-4">
                {/* FROM */}
                <LocationSelect
                    label="FROM"
                    iconSrc="/bus-select.svg"
                    placeholder="Enter city, terminal..."
                    options={locationOptions}
                    value={fromLocation}
                    onChange={() => setFromLocation}
                />

                {/* Đây là Select "TO" */}
                <LocationSelect
                    label="TO"
                    iconSrc="/bus-select.svg"
                    placeholder="Enter city, terminal..."
                    options={locationOptions}
                    value={toLocation}
                    onChange={() => setToLocation}
                />

                {/* RETURN TRIP */}
                <div className="flex flex-col items-start">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            name="returnTrip"
                            checked={formData.returnTrip}
                            onChange={handleChange}
                            className="w-4 h-4 rounded border-gray-300"
                        />
                        <span className="text-sm font-medium text-gray-700">
                            RETURN TRIP
                        </span>
                    </label>
                </div>

                {/* NO. OF PASSENGERS */}
                <div className="flex flex-col items-start">
                    <label className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                        NO. OF PASSENGERS
                    </label>
                    <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2">
                        <Users size={16} className="text-gray-500" />
                        <select
                            name="passengers"
                            value={formData.passengers}
                            onChange={handleChange}
                            className="flex-1 outline-none text-sm"
                        >
                            {[1, 2, 3, 4, 5, 6].map((num) => (
                                <option key={num} value={num}>
                                    {num}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Return Date (Conditional) */}
            {formData.returnTrip && (
                <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="flex flex-col">
                        <label className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                            RETURN DATE
                        </label>
                        <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2">
                            <Calendar size={16} className="text-gray-500" />
                            <input
                                type="date"
                                name="returnDate"
                                value={formData.returnDate}
                                onChange={handleChange}
                                className="flex-1 outline-none text-sm"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Search Button */}
            <div className="flex justify-center py-20">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-12 rounded-full transition-colors flex items-center gap-2 shadow-md"
                >
                    <Search size={18} />
                    SEARCH
                </button>
            </div>
        </form>
    );
}
