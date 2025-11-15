// Trong file: app/(home)/search/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function SearchLoading() {
    return (
        // 1. Dùng layout y hệt như SearchContent
        <div className="h-[872px] w-full bg-white mt-[58px]">
            <div className="px-[86px] py-[97px]">
                {/* 2. Dùng cấu trúc y hệt: space-y-2 và text-lg 
                     (text-lg có line-height mặc định là 1.75rem, tức là 28px, tương ứng với h-7 của Tailwind)
                */}
                <div className="flex flex-col space-y-2 text-lg">
                    {/* 3. Dùng Skeleton với h-7 (28px) để khớp với
                         chiều cao dòng của text-lg.
                         Điều chỉnh chiều rộng (w-...) theo ý bạn.
                    */}

                    {/* Skeleton cho "From" */}
                    <Skeleton className="h-7 w-[350px]" />

                    {/* Skeleton cho "To" (dùng mt-13.5 y như code của bạn) */}
                    <div className="mt-13.5">
                        <Skeleton className="h-7 w-[350px]" />
                    </div>

                    {/* Skeleton cho "Departure Date" */}
                    <div className="mt-13.5">
                        <Skeleton className="h-7 w-[300px]" />
                    </div>

                    {/* Skeleton cho "Return Date" */}
                    <div className="mt-13.5">
                        <Skeleton className="h-7 w-[300px]" />
                    </div>

                    {/* Skeleton cho "Passengers" */}
                    <div className="mt-13.5">
                        <Skeleton className="h-7 w-[200px]" />
                    </div>
                </div>
            </div>
        </div>
    );
}
