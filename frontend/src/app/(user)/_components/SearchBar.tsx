/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Form, Input, Button, DatePicker, App, InputNumber } from "antd";
import { CalendarOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
export default function SearchBar() {
  const router = useRouter();
  const { message } = App.useApp();
  const onFinish = (values: any) => {
    if (!values.checkIn || !values.checkOut) {
      message.error(
        "Vui lòng chọn ngày đi và ngày về để chúng tôi có thể hỗ trợ bạn!"
      );
      return;
    }
    const checkIn = values.checkIn.toISOString();
    const checkOut = values.checkOut.toISOString();

    const params = new URLSearchParams();
    if (values.city) params.set("city", values.city);
    params.set("checkIn", checkIn);
    params.set("checkOut", checkOut);
    if (values.capacity) params.set("capacity", values.capacity.toString());
    router.push(`/buildings?${params.toString()}`);
  };
  return (
    <>
      <section className="bg-white pt-15">
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
                name="checkIn"
                colon={false}
                className="w-full md:flex-1 md:px-2 !mb-0"
              >
                <DatePicker
                  placeholder="Ngày đi"
                  variant="borderless"
                  // Thay đổi: Thêm prefix, xóa suffix, xóa !p-0
                  prefix={<CalendarOutlined className="text-gray-400" />}
                  suffixIcon={null}
                  className="text-base w-full"
                />
              </Form.Item>

              <div className="hidden md:block w-px h-6 bg-gray-200"></div>

              <Form.Item
                name="checkOut"
                colon={false}
                className="w-full md:flex-1 md:px-2 !mb-0"
                dependencies={["checkIn"]}
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      const checkin_value = getFieldValue("checkIn");

                      if (!value || !checkin_value) {
                        return Promise.resolve();
                      }

                      if (value.isBefore(checkin_value, "day")) {
                        return Promise.reject(
                          new Error("Ngày về phải sau hoặc bằng ngày đi!")
                        );
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <DatePicker
                  placeholder="Ngày về"
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
