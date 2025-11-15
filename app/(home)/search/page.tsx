import type { Metadata } from "next";
import { Suspense } from "react";

import SearchContent from "@/app/(home)/search/components";
import SearchLoading from "@/app/(home)/search/components/loading";

export const metadata: Metadata = {
    title: "Search Page",
    description: "Tripzy search page",
};

export default function SearchPage() {
    return (
        <Suspense fallback={<SearchLoading />}>
            <SearchContent />
        </Suspense>
    );
}
