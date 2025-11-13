import Navbar from "@/app/(home)/components/navbar";
import Image from "next/image";

export default function HeroSection() {
    return (
        <div className="bg-gradient-to-b from-[#F5F8FF] to-[#DBF5FF] py-[30px] text-center">
            <div className="max-w-4xl mx-auto relative">
                {/* Logo */}
                <div className="flex items-center gap-2 mb-6">
                    <Image
                        src="/emergency.svg"
                        alt="logo"
                        width={28.83}
                        height={30}
                    />
                    <h1 className="text-2xl font-bold text-[#19C0FF]">
                        Tripzy
                    </h1>
                </div>

                {/* Main Heading */}
                <h2 className="text-4xl font-bold text-gray-800 mb-2 mt-[133px]">
                    Travel Smarter, Not Harder
                </h2>

                {/* Tagline */}
                <p className="text-gray-600 text-base pb-[177px]">
                    Make every trip effortless. Tripzy lets you book rides and
                    plan journeys with ease
                </p>

                <div className="absolute h-[600px] w-full top-70">
                    <Navbar />
                </div>
            </div>
        </div>
    );
}
