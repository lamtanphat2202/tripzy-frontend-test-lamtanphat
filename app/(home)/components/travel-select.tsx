"use client";

import Image from "next/image";
import { Select } from "antd";

export type SelectOption = {
    short_code: string;
    english_name: string;
    code_state: string;
};

interface LocationSelectProps {
    label: string;
    options: SelectOption[];
    value: string | null;
    onChange: (value: string | null) => void;
}

export default function LocationSelect({
    label,
    options,
    value,
    onChange,
}: LocationSelectProps) {
    //MAPPING LẠI OPTION TRUYỀN VÀO PHÙ HỢP VỚI OPTIONS CỦA ANT
    const mappedOptions = options.map((opt) => ({
        value: opt.short_code,
        label: `${opt.short_code} - ${opt.english_name}`,
        code_state: opt.code_state,
    }));

    return (
        <div className="flex flex-col items-start">
            <label className="text-xs font-normal text-gray-700 mb-2 uppercase tracking-wide">
                {label}
            </label>
            <div className="flex items-center">
                <Select
                    placeholder="Enter city, terminal..."
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
                    optionFilterProp="label"
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? "")
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    options={mappedOptions}
                    optionRender={(option) => (
                        <div className="">
                            {/* 'option.data.label' đã được format đẹp */}
                            <span className="font-semibold block">
                                {option.data.label}
                            </span>
                            <span className="font-semibold text-[#65686F]">
                                {option.data.code_state}
                            </span>
                        </div>
                    )}
                    value={value}
                    onChange={onChange}
                    popupMatchSelectWidth={false}
                />
            </div>
        </div>
    );
}
