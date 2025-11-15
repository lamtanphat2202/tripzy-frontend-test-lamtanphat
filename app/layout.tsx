import type { Metadata } from "next";
import { Geist, Geist_Mono, Nunito_Sans } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const nunitoSans = Nunito_Sans({
    variable: "--font-nunito-sans", // Tên CSS variable bạn muốn đặt
    subsets: ["latin"], // Thường là 'latin' hoặc 'vietnamese'
    weight: ["300", "400", "600", "700", "800"], // Chọn các độ đậm bạn cần
    display: "swap", // Tùy chọn, tốt cho performance
});

export const metadata: Metadata = {
    title: "Tripzy",
    description: "Tripzy layout",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${nunitoSans.variable} ${geistMono.variable} antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
