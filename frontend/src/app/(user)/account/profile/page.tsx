/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";

type ProfileForm = {
  name: string;
  email: string;
  phone?: string;
};

export default function ProfilePage(){
  const [form] = Form.useForm<ProfileForm>();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: ProfileForm) => {
    setLoading(true);
    try {
      const res = await fetch("/api/user/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Lỗi khi lưu hồ sơ.");
      }
      message.success("Lưu hồ sơ thành công.");
    } catch (err: any) {
      message.error(err?.message ?? "Lỗi khi lưu hồ sơ.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: 20 }}>
      <h1>Profile</h1>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ name: "", email: "", phone: "" }}
      >
        <Form.Item
          label="Tên"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên." }]}
        >
          <Input placeholder="Tên của bạn" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email." },
            { type: "email", message: "Email không hợp lệ." },
          ]}
        >
          <Input placeholder="email@example.com" />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[
            {
              pattern: /^[0-9+\-()\s]{6,20}$/,
              message: "Số điện thoại không hợp lệ.",
            },
          ]}
        >
          <Input placeholder="+84 9xx xxx xxx" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            {loading ? "Đang lưu..." : "Lưu thay đổi"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
