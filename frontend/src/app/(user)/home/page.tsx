/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import { Form, Input, Button, DatePicker, Select, InputNumber } from "antd";
import { CalendarOutlined, UserOutlined } from "@ant-design/icons";
const { RangePicker } = DatePicker;

export default function HomePage() {
  const information = [
    { label: "Bed", total: 3500 },
    { label: "Hotels", total: 200 },
    { label: "Cities", total: 5 },
  ];
  const onFinish = (values: any) => {
    console.log("Search values:", values);
  };
  return (
    <>
      <section className="bg-gray-50 mt-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-8 py-16">
          {/* Left side */}
          <div className="flex flex-col max-w-xl space-y-6 ml-5">
            <h1 className="font-bold text-5xl leading-tight text-gray-900">
              Forget busy work, <br />
              <span className="text-blue-600">start your next vacation</span>
            </h1>

            <p className="text-gray-600 text-lg">
              We provide everything you need to enjoy your trip — from cozy
              hotels to relaxing destinations.
            </p>

            <button className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg w-fit shadow hover:bg-blue-700 transition">
              Show Me Now
            </button>

            {/* Info section */}
            <div className="flex flex-row justify-between md:justify-start md:gap-16 mt-10">
              {information.map((info) => (
                <div
                  key={info.label}
                  className="flex flex-col items-center text-center min-w-[80px]"
                >
                  <span className="text-3xl font-bold text-gray-900 leading-none">
                    {info.total.toLocaleString()}+
                  </span>
                  <span className="text-gray-500 text-sm mt-1 tracking-wide uppercase">
                    {info.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right side image */}
          <div className="mt-10 md:mt-0 mr-5 relative w-full md:w-[480px] h-[320px] rounded-2xl overflow-hidden shadow-lg">
            <Image src="/hero.jpg" alt="Hotel Logo" fill priority />
            <div className="absolute inset-0 bg-black/10"></div>
          </div>
        </div>
      </section>
      <section className="bg-white pt-15">
        {/* Container này dùng để căn giữa và chứa Form */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-lg rounded-2xl p-5 lg:px-[30px] py-5 relative z-10 -translate-y-1/2">
            <Form
              onFinish={onFinish}
              className="flex flex-col md:flex-row justify-between items-center w-full gap-4 md:gap-0"
            >
              {/* 1. Destination Input */}
              <Form.Item
                name="city"
                colon={false}
                className="w-full md:flex-1 md:pl-5 md:pr-2 !mb-0"
              >
                <Input
                  placeholder="Where are you going?"
                  variant="borderless"
                  className="text-base"
                />
              </Form.Item>

              {/* --- Thêm Divider 1 --- */}
              <div className="hidden md:block w-px h-6 bg-gray-200"></div>

              {/* 2. Check In Date Picker */}
              <Form.Item
                name="checkin"
                colon={false}
                className="w-full md:flex-1 md:px-2 !mb-0"
              >
                <DatePicker
                  placeholder="Select date"
                  variant="borderless"
                  // Thay đổi: Thêm prefix, xóa suffix, xóa !p-0
                  prefix={<CalendarOutlined className="text-gray-400" />}
                  suffixIcon={null}
                  className="text-base w-full"
                />
              </Form.Item>

              {/* --- Thêm Divider 2 --- */}
              <div className="hidden md:block w-px h-6 bg-gray-200"></div>

              {/* 3. Check Out Date Picker */}
              <Form.Item
                name="checkout"
                colon={false}
                // Thay đổi: Dùng px-2
                className="w-full md:flex-1 md:px-2 !mb-0"
              >
                <DatePicker
                  placeholder="Select date"
                  variant="borderless"
                  // Thay đổi: Thêm prefix, xóa suffix, xóa !p-0
                  prefix={<CalendarOutlined className="text-gray-400" />}
                  suffixIcon={null}
                  className="text-base w-full"
                />
              </Form.Item>

              {/* --- Thêm Divider 3 --- */}
              <div className="hidden md:block w-px h-6 bg-gray-200"></div>

              {/* 4. Guests Input */}
              <Form.Item
                name="capacity"
                colon={false}
                className="w-full md:flex-1 md:pl-2 md:pr-5 !mb-0"
              >
                <InputNumber
                  placeholder="Số lượng..."
                  min={1}
                  variant="borderless"
                  prefix={<UserOutlined className="text-gray-400" />}
                  className="text-base w-full"
                />
              </Form.Item>

              {/* 5. Search Button */}
              <Form.Item className="!mb-0 w-full md:w-auto">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-[35px] py-[15px] text-lg font-bold w-full h-auto"
                >
                  Search
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </section>
    </>
  );
}
