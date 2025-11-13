// app/components/LocationSelect.js (Ví dụ)
"use client";

import Image from "next/image";
import { Select } from "antd"; // Giả sử bạn dùng Ant Design

export type SelectOption = {
    value: string;
    label: string;
};

interface LocationSelectProps {
    label: string;
    iconSrc: string;
    placeholder: string;
    options: SelectOption[];
    value: string | null; // Dùng `string | null` để cho phép giá trị rỗng/chưa chọn
    onChange: (value: string | null) => void; // Hàm callback trả về giá trị đã chọn
}

export default function LocationSelect({
    label, // <-- Prop quan trọng nhất để phân biệt
    iconSrc, // <-- Prop cho icon
    placeholder, // <-- Prop cho placeholder
    options, // <-- Prop cho danh sách lựa chọn
    value, // <-- Prop cho giá trị đang được chọn
    onChange, // <-- Prop cho hàm xử lý khi thay đổi
}: LocationSelectProps) {
    return (
        <div className="flex flex-col items-start flex-1">
            {/* Dùng prop 'label' thay vì hard-code "FROM" */}
            <label className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                {label}
            </label>
            <div className="flex items-center">
                <Select
                    showSearch
                    prefix={
                        <Image
                            src={iconSrc} // Dùng prop 'iconSrc'
                            alt={`${label} icon`} // Alt text động
                            width={16}
                            height={16}
                        />
                    }
                    style={{
                        width: 207,
                        height: 52,
                    }}
                    placeholder={placeholder} // Dùng prop 'placeholder'
                    optionFilterProp="label"
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? "")
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    options={options} // Dùng prop 'options'
                    value={value} // Dùng prop 'value'
                    onChange={onChange} // Dùng prop 'onChange'
                />
            </div>
        </div>
    );
}
