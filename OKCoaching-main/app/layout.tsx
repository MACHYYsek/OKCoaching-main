import type { Metadata } from "next";
import { Providers } from "@/app/providers";
import { geistSans, geistMono } from "@/app/fonts";
import "@/app/globals.css";

export const metadata: Metadata = {
    title: "OKCoaching",
    manifest: "/manifest.json",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
            <head>
                <meta name="theme-color" content="#191919" />
            </head>
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
