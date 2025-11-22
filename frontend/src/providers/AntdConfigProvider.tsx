"use client";

import React from "react";
import { App, ConfigProvider } from "antd";
import { AntdStaticHolder } from "@/lib/antd-helper";
import viVN from "antd/locale/vi_VN"; 

export function AntdConfigProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConfigProvider locale={viVN}>
      <App>
        <AntdStaticHolder />
        {children}
      </App>
    </ConfigProvider>
  );
}
