import type { Metadata } from "next";
import "./globals.css";
// Đảm bảo đường dẫn này đúng
import StyledComponentsRegistry from "@/lib/AntdRegistry";
import StoreProvider from "@/store/StoreProvider";
import { App } from "antd";
import { AntdConfigProvider } from "@/providers/AntdConfigProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
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
        <ReactQueryProvider>
          <StyledComponentsRegistry>
            <AntdConfigProvider>
              <App>
                <StoreProvider> {children}</StoreProvider>
              </App>
            </AntdConfigProvider>
          </StyledComponentsRegistry>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
