// app/(main)/components/LoadingScreen.tsx
"use client";

import React from 'react';
import { Spin } from 'antd';

export default function LoadingScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spin size="large" />
    </div>
  );
}