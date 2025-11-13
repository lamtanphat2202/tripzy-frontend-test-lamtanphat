"use client";

import type React from "react";
import { Select } from 'antd';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Calendar, Users, Search, ArrowRightLeft } from "lucide-react";

interface SearchFormProps {
    mode?: string;
}

export default function SearchForm({ mode = "bus" }: SearchFormProps) {
    const router = useRouter();
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6 relative">
                {/* FROM */}
                <div className="flex flex-col items-start flex-1">
                    <label className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                        FROM
                    </label>
                    <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2">
                 <Select
    showSearch
    style={{ width: 200 }}
    placeholder="Search to Select"
    optionFilterProp="label"
    filterSort={(optionA, optionB) =>
      (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
    }
    options={[
      {
        value: '1',
        label: 'Not Identified',
      },
      {
        value: '2',
        label: 'Closed',
      },
      {
        value: '3',
        label: 'Communicated',
      },
      {
        value: '4',
        label: 'Identified',
      },
      {
        value: '5',
        label: 'Resolved',
      },
      {
        value: '6',
        label: 'Cancelled',
      },
    ]}
  />
                    </div>
                </div>

                {/* TO */}
                <div className="flex flex-col items-start flex-1">
                    <label className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                        TO
                    </label>
                    <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2">
                        <MapPin size={16} className="text-gray-500" />
                        <input
                            type="text"
                            name="to"
                            placeholder="Arrival city"
                            value={formData.to}
                            onChange={handleChange}
                            className="flex-1 outline-none text-sm placeholder-gray-400"
                        />
                    </div>
                </div>

                <div className="hidden lg:flex items-end justify-center absolute left-1/3 top-1/2 transform -translate-y-1/2 -translate-x-1/2">
                    <button
                        type="button"
                        onClick={handleSwap}
                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-md transition-colors"
                        title="Swap FROM and TO"
                    >
                        <ArrowRightLeft size={18} />
                    </button>
                </div>

                {/* DEPARTURE DATE */}
                <div className="flex flex-col items-start flex-1">
                    <label className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                        DEPARTURE DATE
                    </label>
                    <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2">
                        <Calendar size={16} className="text-gray-500" />
                        <input
                            type="date"
                            name="departureDate"
                            value={formData.departureDate}
                            onChange={handleChange}
                            className="flex-1 outline-none text-sm"
                        />
                    </div>
                </div>

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
            <div className="flex justify-center">
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
