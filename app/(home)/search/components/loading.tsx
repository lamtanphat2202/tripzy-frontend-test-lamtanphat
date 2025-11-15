// Trong file: app/(home)/search/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function SearchLoading() {
    return (
        <div className="h-[872px] w-full bg-white mt-[58px]">
            <div className="px-[86px] py-[97px]">
                <div className="flex flex-col space-y-2 text-lg">
                    <Skeleton className="h-7 w-[350px]" />

                    <div className="mt-13.5">
                        <Skeleton className="h-7 w-[350px]" />
                    </div>

                    <div className="mt-13.5">
                        <Skeleton className="h-7 w-[300px]" />
                    </div>

                    <div className="mt-13.5">
                        <Skeleton className="h-7 w-[300px]" />
                    </div>

                    <div className="mt-13.5">
                        <Skeleton className="h-7 w-[200px]" />
                    </div>
                </div>
            </div>
        </div>
    );
}
