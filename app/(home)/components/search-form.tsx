"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Users, Search, ArrowRightLeft, User } from "lucide-react";
import LocationSelect from "@/app/(home)/components/travel-select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { DatePicker, DatePickerProps, InputNumber } from "antd";

interface SearchFormProps {
    mode?: string;
}

export default function SearchForm({ mode = "bus" }: SearchFormProps) {
    const router = useRouter();
    const [fromLocation, setFromLocation] = useState("");
    const [toLocation, setToLocation] = useState("");

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

    const onChange: DatePickerProps["onChange"] = (date, dateString) => {
        console.log(date, dateString);
    };

    return (
        <form onSubmit={handleSearch} className="bg-white rounded-xl shadow-lg">
            {/* SELECT LOCATION */}
            <div className="flex items-end gap-4 px-4 py-4">
                <div className="flex items-end gap-2">
                    {/* FROM LOCATION*/}
                    <LocationSelect
                        label="FROM"
                        options={locationOptions}
                        value={fromLocation}
                        onChange={setFromLocation}
                    />

                    {/* SWAP BUTTON */}
                    <button
                        type="button"
                        onClick={handleSwap}
                        className="h-12 w-12 shadow-md flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                        <ArrowRightLeft size={18} color="#19C0FF" />
                    </button>

                    {/* TO LOCATION */}
                    <LocationSelect
                        label="TO"
                        options={locationOptions}
                        value={toLocation}
                        onChange={setToLocation}
                    />
                </div>

                {/* Select Date */}
                <div className="flex gap-4">
                    {/* DEPARTURE DATE */}
                    <div className="flex flex-col items-start">
                        <label className="text-xs font-normal text-gray-600 mb-1 uppercase tracking-wide">
                            DEPARTURE DATE
                        </label>
                        <DatePicker
                            onChange={onChange}
                            className="min-w-[235px] h-13"
                            placeholder="Select date"
                        />
                    </div>

                    {/* RETURN TRIP */}
                    <div className="flex flex-col items-start">
                        <div className="flex items-center gap-2 mb-1">
                            <Checkbox
                                id="returnTrip"
                                checked={formData.returnTrip}
                                onCheckedChange={(checked) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        returnTrip: checked as boolean,
                                    }))
                                }
                            />
                            <Label
                                htmlFor="returnTrip"
                                className="text-xs font-semibold text-gray-600 uppercase tracking-wide cursor-pointer"
                            >
                                RETURN TRIP
                            </Label>
                        </div>
                        <DatePicker
                            onChange={onChange}
                            className="min-w-[235px] h-13"
                            placeholder="DD / MM / YY "
                            prefix={<Calendar size={15} />}
                            disabled={!formData.returnTrip}
                            suffixIcon={null}
                        />
                    </div>
                </div>

                {/* NO. OF PASSENGERS */}
                <div className="flex flex-col items-start">
                    <label className="text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
                        NO. OF PASSENGER
                    </label>
                    <InputNumber
                        prefix={<User />} // Chèn icon
                        min={1} // Yêu cầu là 'minimum 1'
                        defaultValue={1} // Giá trị mặc định
                        style={{
                            width: 142,
                            height: 52,

                            display: "flex",
                            alignItems: "center",
                        }}
                    />
                </div>
            </div>
            <div className="flex justify-center py-4">
                <button
                    type="button"
                    onClick={handleSearch}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-full transition-colors flex items-center gap-2 shadow-md whitespace-nowrap"
                >
                    <Search size={18} />
                    SEARCH
                </button>
            </div>
            {/* Search Button */}
        </form>
    );
}
