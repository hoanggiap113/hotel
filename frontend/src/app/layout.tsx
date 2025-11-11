import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// Đảm bảo đường dẫn này đúng
import StyledComponentsRegistry from "@/lib/AntdRegistry"; 
import StoreProvider from "./StoreProvider";
import { App } from 'antd';
import AntdMessageListener from "@/components/AntdMessageListener";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agenda",
  description: "Quản lý phòng",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <StyledComponentsRegistry>
        <App>
          <AntdMessageListener />
          <StoreProvider> {children}</StoreProvider>
          </App>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}