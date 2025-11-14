"use client"; // Cần thiết để sử dụng hook

import React, { useState, useEffect } from "react"; // Import thêm useState và useEffect

// Định nghĩa kiểu cho state
interface SearchParamsState {
    from: string;
    to: string;
    departureDate: string;
    returnDate: string;
    passengers: string;
}

export default function SearchContent() {
    // 1. Dùng state để lưu trữ các giá trị query params
    const [params, setParams] = useState<SearchParamsState>({
        from: "",
        to: "",
        departureDate: "",
        returnDate: "", // Giá trị mặc định
        passengers: "1", // Giá trị mặc định
    });

    useEffect(() => {
        // Đảm bảo code này chỉ chạy trên client (nơi có 'window')
        if (typeof window !== "undefined") {
            // Dùng API chuẩn của trình duyệt
            const searchParams = new URLSearchParams(window.location.search);

            // 3. Lấy từng giá trị và cập nhật state
            setParams({
                from: searchParams.get("from") || "",
                to: searchParams.get("to") || "",
                departureDate: searchParams.get("departureDate") || "",
                returnDate: searchParams.get("returnDate") || "",
                passengers: searchParams.get("passengers") || "1",
            });
        }
    }, []); // Mảng dependency rỗng [] đảm bảo useEffect chỉ chạy một lần

    return (
        <div className="h-[872px] w-full bg-white mt-[58px]">
            {/* Search Content */}
            <div className="px-[86px] py-[97px]">
                {/* 4. Hiển thị dữ liệu từ state */}
                <div className="flex flex-col space-y-2 text-lg">
                    <p>
                        <strong>From:</strong> {params.from}
                    </p>
                    <p className="mt-13.5">
                        <strong>To:</strong> {params.to}
                    </p>
                    <p className="mt-13.5">
                        <strong>Departure Date:</strong> {params.departureDate}
                    </p>
                    <p className="mt-13.5">
                        <strong>Return Date:</strong> {params.returnDate}
                    </p>
                    <p className="mt-13.5">
                        <strong>Passengers:</strong> {params.passengers}
                    </p>
                </div>
            </div>
        </div>
    );
}
