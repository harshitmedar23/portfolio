import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { BackToTop } from "@/components/BackToTop";
import { Cursor } from "@/components/Cursor";
import { Preloader } from "@/components/Preloader";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SectionDots } from "@/components/SectionDots";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Harshit Medar | Computer Science Engineer",
  description: "Harshit Medar is a computer science engineering student interested in software development, AI, web development, and practical applications.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Preloader />
        <Cursor />
        <ScrollProgress />
        <SectionDots />
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
