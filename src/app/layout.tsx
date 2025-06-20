import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/component/Navbar";
import Footer from "@/app/component/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Psychological Quiz",
  description: "Psychological Quiz for self-discovery and fun",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-zinc-600 to-dark-100">
          <div className="flex-grow">
            <Navbar></Navbar>
            {children}
          </div>
          <Footer></Footer>
        </div>
      </body>
    </html>
  );
}
