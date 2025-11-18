import type { Metadata } from "next";
import "./globals.css";
// Đảm bảo đường dẫn này đúng
import StyledComponentsRegistry from "@/lib/AntdRegistry"; 
import StoreProvider from "./StoreProvider";
import { App } from 'antd';
import AntdMessageListener from "@/components/AntdMessageListener";

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
      <body suppressHydrationWarning={true}>
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