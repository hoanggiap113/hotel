"use client";

import React from "react";
import { Form, Input, Button, Checkbox, Divider, message } from "antd";
import { LoginUserForm } from "@/types/user.type";
import {
  UserOutlined,
  LockOutlined,
  GoogleOutlined,
  FacebookFilled,
} from "@ant-design/icons";
import Link from "next/link";
import api from "@/lib/api";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { loginSuccess } from "@/store/slices/auth.slice";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values: LoginUserForm) => {
    try {
      console.log(values);
      const res = await api.post("/login", values, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { accessToken, user } = res.data;
      if (!accessToken) {
        throw new Error("Không nhận được token");
      }
      dispatch(loginSuccess({ accessToken, user }));
      message.success("Đăng nhập thành công");
      //Check role
      const role = user.role?.toLowerCase();
      if (role?.includes("admin") || role?.includes("manager")) {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (err) {
      console.log("Lỗi", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-2xl text-gray-800 mb-6 text-left font-semibold">
        Đăng nhập tài khoản
      </h2>

      <Form name="normal_login" onFinish={onFinish} layout="vertical">
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Vui lòng nhập email!" }]}
          className="mb-2"
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Nhập email"
            autoComplete="email"
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          className="mb-2"
        >
          <Input.Password
            prefix={<LockOutlined />}
            type="password"
            placeholder="Mật khẩu"
            autoComplete="current-password"
          />
        </Form.Item>

        <Form.Item className="mb-2">
          <p className="text-sm text-gray-500">
            Bằng việc đăng nhập, bạn đồng ý với{" "}
            <a href="#" className="text-blue-500 hover:underline">
              điều khoản & chính sách
            </a>{" "}
            của chúng tôi.
          </p>
        </Form.Item>

        <Form.Item>
          <Button
            htmlType="submit"
            className="w-full py-4 bg-gray-500 hover:bg-blue-600 text-white font-semibold"
            loading={loading}
          >
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>

      <p className="text-center mt-4 text-sm">
        Chưa có tài khoản?{" "}
        <Link
          href="/register"
          className="text-blue-500 hover:underline font-medium"
        >
          Tạo tài khoản
        </Link>
      </p>

      {/* Social Login*/}
      <Divider className="my-6">
        <span className="text-gray-500 text-sm px-3">Hoặc đăng nhập với</span>
      </Divider>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          icon={<GoogleOutlined />}
          className="w-full sm:flex-1 flex items-center justify-center"
        >
          Google
        </Button>
        <Button
          icon={<FacebookFilled />}
          className="w-full sm:flex-1 flex items-center justify-center"
          style={{
            background: "#1877F2",
            color: "white",
            borderColor: "#1877F2",
          }}
        >
          Facebook
        </Button>
      </div>
    </>
  );
}
