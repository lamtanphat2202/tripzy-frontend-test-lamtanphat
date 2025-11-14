// app/components/LocationSelect.js (Ví dụ)
"use client";

import Image from "next/image";
import { Select } from "antd";
export type SelectOption = {
    value: string;
    label: string;
};

interface LocationSelectProps {
    label: string;
    options: SelectOption[];
    value: string | null;
    onChange: (value: string) => void;
}

export default function LocationSelect({
    label,
    options,
    value,
    onChange,
}: LocationSelectProps) {
    return (
        <div className="flex flex-col items-start">
            {/* Dùng prop 'label' thay vì hard-code "FROM" */}
            <label className="text-xs font-normal text-gray-700 mb-2 uppercase tracking-wide">
                {label}
            </label>
            <div className="flex items-center">
                <Select
                    showSearch
                    prefix={
                        <Image
                            src="/bus-select.svg"
                            alt={`${label} icon`}
                            width={16}
                            height={16}
                        />
                    }
                    style={{
                        width: 207,
                        height: 52,
                    }}
                    placeholder="Enter city, terminal..."
                    optionFilterProp="label"
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? "")
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    options={options}
                    value={value}
                    onChange={onChange}
                />
            </div>
        </div>
    );
}
