"use client";

import React from "react";
import { Form, Input, Button, Checkbox, Divider, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  GoogleOutlined,
  FacebookFilled,
} from "@ant-design/icons";
import { RegisterUserForm } from "@/types/user.type";
import Link from "next/link";
export default function RegisterPage() {
  const onFinish = (values: RegisterUserForm) => {
    console.log("Data", values);
  };

  return (
    <>
      <h2 className="text-5xl text-gray-800 mb-6 font-semibold text-center">
        Đăng Ký
      </h2>
      <Form name="Đăng ký" onFinish={onFinish} layout="vertical">
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Xin vui lòng nhập tên" }]}
          label="Tên người dùng"
        >
          <Input placeholder="Tên" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Xin vui lòng nhập email" }]}
          label="Email"
        >
          <Input placeholder="Mật khẩu" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
          label="Mật khẩu"
        >
          <Input type="password" placeholder="Nhập lại mật khẩu" />
        </Form.Item>
        <Form.Item
          name="confirmedPassword"
          label="Nhập lại mật khẩu"
          dependencies={["password"]}
          hasFeedback
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Hai mật khẩu bạn nhập không khớp!")
                );
              },
            }),
          ]}
        >
          <Input type="password" placeholder="Mật khẩu" />
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
            className="w-full py-4 bg-gray-500 hover:bg-blue-600 text-white font-semibold"
          >
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
      <p className="text-center mt-4 text-sm">
        Đã có tài khoản?{" "}
        <Link
          href="/login"
          className="text-blue-500 hover:underline font-medium"
        >
          Đăng nhập
        </Link>
      </p>
    </>
  );
}
