"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Search, ArrowRightLeft } from "lucide-react";
import LocationSelect from "@/app/(home)/components/travel-select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { DatePicker, InputNumber } from "antd";
import Image from "next/image";
import { locations } from "@/lib/data";
import dayjs from "dayjs";
import { SearchFormSchema } from "@/lib/validation";

interface SearchFormProps {
    mode?: string;
}

type FormErrors = Record<string, string | null>;

export default function SearchForm({ mode = "bus" }: SearchFormProps) {
    const router = useRouter();

    const [formData, setFormData] = useState({
        from: null as string | null,
        to: null as string | null,
        departureDate: null as string | null,
        returnTrip: false,
        returnDate: null as string | null,
        passengers: 1,
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleFieldChange = useCallback((field: string, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));

        // Clear Error
        setErrors((prev) => ({
            ...prev,
            [field]: null,
        }));
    }, []);

    const handleSwap = useCallback(() => {
        setFormData((prev) => ({
            ...prev,
            from: prev.to,
            to: prev.from,
        }));

        // Clear Error When Swap
        setErrors((prev) => ({
            ...prev,
            from: null,
            to: null,
        }));
    }, []);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isSubmitting) return;

        setIsSubmitting(true);

        try {
            const validatedData = SearchFormSchema.parse(formData);
            setErrors({});

            // Convert Location Code To Location Name
            const fromLocation = locations.find(
                (loc) => loc.short_code === validatedData.from
            );
            const toLocation = locations.find(
                (loc) => loc.short_code === validatedData.to
            );

            const fromName =
                fromLocation?.english_name || validatedData.from || "";
            const toName = toLocation?.english_name || validatedData.to || "";

            // Build Query Param
            const queryParams = new URLSearchParams({
                mode: mode,
                from: fromName,
                to: toName,
                departureDate: validatedData.departureDate || "",
                returnDate: validatedData.returnDate
                    ? validatedData.returnDate
                    : "No",
                passengers: validatedData.passengers.toString(),
            }).toString();

            // Push Query Param
            router.push(`/search?${queryParams}`);
        } catch (error: any) {
            const newErrors: FormErrors = {};

            if (error.issues) {
                error.issues.forEach((issue: any) => {
                    const field = issue.path[0] as string;
                    newErrors[field] = issue.message;
                });
            }

            setErrors(newErrors);
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <form onSubmit={handleSearch} className="bg-white rounded-xl shadow-lg">
            <div className="flex items-end gap-4 px-4 py-4">
                <div className="flex items-end gap-2">
                    {/* FROM LOCATION */}
                    <div className="flex flex-col relative">
                        <LocationSelect
                            label="FROM"
                            options={locations}
                            value={formData.from}
                            onChange={(value) =>
                                handleFieldChange("from", value)
                            }
                        />
                        {errors.from && (
                            <span className="text-xs block text-red-500 mt-1 absolute top-full left-0">
                                {errors.from}
                            </span>
                        )}
                    </div>

                    {/* SWAP BUTTON */}
                    <button
                        type="button"
                        onClick={handleSwap}
                        className="h-12 w-12 shadow-md flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                        <ArrowRightLeft size={18} color="#19C0FF" />
                    </button>

                    {/* TO LOCATION */}
                    <div className="flex flex-col relative">
                        <LocationSelect
                            label="TO"
                            options={locations}
                            value={formData.to}
                            onChange={(value) => handleFieldChange("to", value)}
                        />
                        {errors.to && (
                            <span className="text-xs block text-red-500 mt-1 absolute top-full left-0">
                                {errors.to}
                            </span>
                        )}
                    </div>
                </div>

                {/* Select Date */}
                <div className="flex gap-4">
                    {/* DEPARTURE DATE */}
                    <div className="flex flex-col relative items-start">
                        <label className="text-xs font-normal text-gray-600 mb-1 uppercase tracking-wide">
                            DEPARTURE DATE
                        </label>
                        <DatePicker
                            onChange={(date, dateString) =>
                                handleFieldChange("departureDate", dateString)
                            }
                            className="min-w-[235px] h-13"
                            placeholder="DD / MM / YYYY  00:00"
                            prefix={<Calendar size={15} />}
                            suffixIcon={null}
                            value={
                                formData.departureDate
                                    ? dayjs(formData.departureDate)
                                    : null
                            }
                            status={errors.departureDate ? "error" : ""}
                        />
                        {errors.departureDate && (
                            <span className="text-xs block text-red-500 mt-1 absolute top-full left-0">
                                {errors.departureDate}
                            </span>
                        )}
                    </div>

                    {/* RETURN TRIP */}
                    <div className="flex flex-col relative items-start">
                        <div className="flex items-center gap-2 mb-1">
                            <Checkbox
                                id="returnTrip"
                                checked={formData.returnTrip}
                                onCheckedChange={(checked) =>
                                    handleFieldChange(
                                        "returnTrip",
                                        checked as boolean
                                    )
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
                            onChange={(date, dateString) =>
                                handleFieldChange("returnDate", dateString)
                            }
                            className="min-w-[235px] h-13"
                            placeholder="DD / MM / YYYY 00:00"
                            prefix={<Calendar size={15} />}
                            disabled={!formData.returnTrip}
                            suffixIcon={null}
                            value={
                                formData.returnDate
                                    ? dayjs(formData.returnDate)
                                    : null
                            }
                            status={errors.returnDate ? "error" : ""}
                        />
                        {errors.returnDate && (
                            <span className="text-xs block text-red-500 mt-1 absolute top-full left-0">
                                {errors.returnDate}
                            </span>
                        )}
                    </div>
                </div>

                {/* NO. OF PASSENGERS */}
                <div className="flex flex-col relative items-start">
                    <label className="text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
                        NO. OF PASSENGER
                    </label>
                    <InputNumber
                        prefix={
                            <Image
                                src="/user.svg"
                                alt="user-icon"
                                width={16}
                                height={16}
                            />
                        }
                        min={1}
                        value={formData.passengers}
                        onChange={(value) =>
                            handleFieldChange("passengers", value)
                        }
                        style={{
                            width: 142,
                            height: 52,
                            display: "flex",
                            alignItems: "center",
                        }}
                        status={errors.passengers ? "error" : ""}
                    />
                    {errors.passengers && (
                        <span className="text-xs block text-red-500 mt-1 absolute top-full left-0">
                            {errors.passengers}
                        </span>
                    )}
                </div>
            </div>

            <div className="flex justify-center py-6">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#19C0FF] cursor-pointer text-white font-semibold py-3.5 px-[92px] rounded-full transition-colors flex items-center gap-2 shadow-md whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#15A8E0]"
                >
                    <Search size={16} />
                    {isSubmitting ? "SEARCHING..." : "SEARCH"}
                </button>
            </div>
        </form>
    );
}
